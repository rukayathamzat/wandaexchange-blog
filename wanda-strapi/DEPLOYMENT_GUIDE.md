# WandaExchange Blog Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the WandaExchange Blog built with Strapi CMS to a production server. The deployment includes database setup, server configuration, and production optimizations.

## Prerequisites

- Server with Ubuntu 20.04+ or CentOS 8+
- Root or sudo access
- Domain name configured
- SSL certificate (Let's Encrypt recommended)
- Minimum 2GB RAM, 20GB storage

## Server Setup

### 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js 18+

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE wandaexchange_blog;
CREATE USER wandaexchange_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE wandaexchange_blog TO wandaexchange_user;
ALTER USER wandaexchange_user CREATEDB;
\q
```

### 4. Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

## Application Deployment

### 1. Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/your-repo/wanda-strapi.git
sudo chown -R $USER:$USER wanda-strapi
cd wanda-strapi
```

### 2. Install Dependencies

```bash
npm install
npm run build
```

### 3. Environment Configuration

Create production environment file:

```bash
cp env.example .env
nano .env
```

Configure with your production values:

```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=wandaexchange_blog
DATABASE_USERNAME=wandaexchange_user
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=false

# Strapi Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_generated_app_keys
API_TOKEN_SALT=your_generated_api_token_salt
ADMIN_JWT_SECRET=your_generated_admin_jwt_secret
JWT_SECRET=your_generated_jwt_secret

# Generate secure keys
# You can use: openssl rand -base64 32
```

### 4. Generate Secure Keys

```bash
# Generate APP_KEYS (comma-separated)
openssl rand -base64 32
openssl rand -base64 32

# Generate API_TOKEN_SALT
openssl rand -base64 32

# Generate ADMIN_JWT_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### 5. Database Migration

```bash
# Start Strapi to run migrations
npm run start

# In another terminal, check if tables are created
sudo -u postgres psql -d wandaexchange_blog -c "\dt"
```

### 6. Create Admin User

```bash
# Start Strapi
npm run start

# Visit http://your-server-ip:1337/admin
# Create your first admin user
# Set up roles and permissions
```

## PM2 Configuration

### 1. Create PM2 Ecosystem File

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'wanda-strapi',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wanda-strapi',
    env: {
      NODE_ENV: 'production',
      PORT: 1337
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/wanda-strapi/err.log',
    out_file: '/var/log/wanda-strapi/out.log',
    log_file: '/var/log/wanda-strapi/combined.log',
    time: true
  }]
};
```

### 2. Create Log Directory

```bash
sudo mkdir -p /var/log/wanda-strapi
sudo chown -R $USER:$USER /var/log/wanda-strapi
```

### 3. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Nginx Configuration

### 1. Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/wandaexchange-blog
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Proxy to Strapi
    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Static files (uploads)
    location /uploads/ {
        alias /var/www/wanda-strapi/public/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Admin panel
    location /admin/ {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/wandaexchange-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate (Let's Encrypt)

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. Auto-renewal

```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Security Configuration

### 1. Firewall Setup

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Strapi Security

```bash
# Update config/middlewares.ts
nano config/middlewares.ts
```

```typescript
export default [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 3. CORS Configuration

```bash
# Update config/middlewares.ts
nano config/middlewares.ts
```

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Performance Optimization

### 1. Database Optimization

```sql
-- Connect to PostgreSQL
sudo -u postgres psql -d wandaexchange_blog

-- Create indexes for better performance
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_locale ON articles(locale);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_locale ON tags(locale);

-- Analyze tables
ANALYZE articles;
ANALYZE tags;
```

### 2. PM2 Clustering (Optional)

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'wanda-strapi',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wanda-strapi',
    env: {
      NODE_ENV: 'production',
      PORT: 1337
    },
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/wanda-strapi/err.log',
    out_file: '/var/log/wanda-strapi/out.log',
    log_file: '/var/log/wanda-strapi/combined.log',
    time: true
  }]
};
```

## Monitoring and Logs

### 1. PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs wanda-strapi

# View status
pm2 status
```

### 2. System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop -y

# Monitor system resources
htop
```

### 3. Log Rotation

```bash
sudo nano /etc/logrotate.d/wanda-strapi
```

```
/var/log/wanda-strapi/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Backup Strategy

### 1. Database Backup

```bash
# Create backup script
nano /var/www/wanda-strapi/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/wandaexchange-blog"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="wandaexchange_blog"
DB_USER="wandaexchange_user"

mkdir -p $BACKUP_DIR

# Database backup
sudo -u postgres pg_dump $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Database backup completed: db_backup_$DATE.sql.gz"
```

```bash
chmod +x /var/www/wanda-strapi/backup-db.sh

# Add to crontab
sudo crontab -e
# Add this line for daily backup at 2 AM:
0 2 * * * /var/www/wanda-strapi/backup-db.sh
```

### 2. File Backup

```bash
# Create file backup script
nano /var/www/wanda-strapi/backup-files.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/wandaexchange-blog"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/wanda-strapi"

mkdir -p $BACKUP_DIR

# Backup uploads
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz -C $APP_DIR/public uploads/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "uploads_backup_*.tar.gz" -mtime +7 -delete

echo "File backup completed: uploads_backup_$DATE.tar.gz"
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo netstat -tlnp | grep :1337
   sudo kill -9 <PID>
   ```

2. **Database connection failed**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Check connection
   sudo -u postgres psql -d wandaexchange_blog
   ```

3. **Permission denied**
   ```bash
   sudo chown -R $USER:$USER /var/www/wanda-strapi
   sudo chmod -R 755 /var/www/wanda-strapi
   ```

4. **Nginx configuration error**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Log Locations

- **PM2 logs**: `/var/log/wanda-strapi/`
- **Nginx logs**: `/var/log/nginx/`
- **PostgreSQL logs**: `/var/log/postgresql/`
- **System logs**: `/var/log/syslog`

## Maintenance

### 1. Regular Updates

```bash
# Update Strapi
cd /var/www/wanda-strapi
git pull origin main
npm install
npm run build
pm2 restart wanda-strapi
```

### 2. Database Maintenance

```sql
-- Monthly maintenance
VACUUM ANALYZE articles;
VACUUM ANALYZE tags;
REINDEX DATABASE wandaexchange_blog;
```

### 3. Log Cleanup

```bash
# Clean old logs
sudo find /var/log -name "*.log" -mtime +30 -delete
sudo find /var/log -name "*.gz" -mtime +30 -delete
```

## Support

For deployment issues or questions:
1. Check logs for error messages
2. Verify configuration files
3. Test individual components
4. Contact development team

## Conclusion

This deployment guide provides a production-ready setup for the WandaExchange Blog. The configuration includes security best practices, performance optimization, monitoring, and backup strategies. Regular maintenance and updates are essential for long-term stability.
