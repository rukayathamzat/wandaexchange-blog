#!/usr/bin/env node

/**
 * WandaExchange Blog - Production Deployment Script
 * 
 * This script helps deploy the Strapi backend to production
 * Run with: node deploy-production.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 WandaExchange Blog - Production Deployment');
console.log('==============================================\n');

// Step 1: Check if we're in the right directory
const currentDir = process.cwd();
const strapiDir = path.join(currentDir, 'wanda-strapi');

if (!fs.existsSync(strapiDir)) {
    console.error('❌ Error: wanda-strapi directory not found!');
    console.error('Please run this script from the project root directory.');
    process.exit(1);
}

console.log('✅ Found wanda-strapi directory');

// Step 2: Create production environment file
const envProductionContent = `# Production Environment Variables for WandaExchange Blog

# Database Configuration - PostgreSQL for production
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=wandaexchange_blog_prod
DATABASE_USERNAME=wandaexchange_user
DATABASE_PASSWORD=your_secure_password_here
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Alternative: Use DATABASE_URL for connection string
# DATABASE_URL=postgresql://wandaexchange_user:your_secure_password_here@localhost:5432/wandaexchange_blog_prod

# Strapi Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys - CHANGE THESE IN PRODUCTION!
APP_KEYS=your_production_app_keys_here_change_this
API_TOKEN_SALT=your_production_api_token_salt_here_change_this
ADMIN_JWT_SECRET=your_production_admin_jwt_secret_here_change_this
JWT_SECRET=your_production_jwt_secret_here_change_this
TRANSFER_TOKEN_SALT=your_production_transfer_token_salt_here_change_this

# File Upload Configuration (Cloudinary)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# CORS Configuration
CORS_ORIGIN=https://wandaexchange.com,https://www.wandaexchange.com

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000`;

const envPath = path.join(strapiDir, '.env.production');
fs.writeFileSync(envPath, envProductionContent);
console.log('✅ Created .env.production file');

// Step 3: Update CORS configuration for production
const middlewaresPath = path.join(strapiDir, 'config', 'middlewares.ts');
const middlewaresContent = `export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:1337'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];`;

fs.writeFileSync(middlewaresPath, middlewaresContent);
console.log('✅ Updated CORS configuration for production');

// Step 4: Build the application
console.log('\n📦 Building Strapi application...');
try {
    process.chdir(strapiDir);
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Strapi application built successfully');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

// Step 5: Create deployment instructions
const deploymentInstructions = `
# WandaExchange Blog - Production Deployment Instructions

## 🚀 Deployment Steps

### 1. Environment Setup
- Copy .env.production to .env in your production server
- Update all environment variables with your actual production values
- Ensure PostgreSQL database is set up and accessible

### 2. Database Setup
\`\`\`sql
-- Create database
CREATE DATABASE wandaexchange_blog_prod;

-- Create user
CREATE USER wandaexchange_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE wandaexchange_blog_prod TO wandaexchange_user;
\`\`\`

### 3. Deploy Application
\`\`\`bash
# Navigate to wanda-strapi directory
cd wanda-strapi

# Install dependencies
npm ci --production

# Copy environment file
cp .env.production .env

# Start the application
npm start
\`\`\`

### 4. Verify Deployment
- Check admin panel: https://your-domain.com/admin
- Test API endpoints: https://your-domain.com/api/articles
- Verify CORS settings work with your frontend

### 5. Security Checklist
- [ ] Change all default passwords and secrets
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 📊 Current Progress
- ✅ Core Setup & Configuration (Tasks 1-5)
- ✅ Multilingual Setup - Locales configured (Task 10)
- ✅ Content Types: Article and Tag schemas ready
- ✅ API Endpoints: All endpoints configured
- ✅ Production Configuration: Ready for deployment

## 🔗 API Endpoints
- Articles: GET /api/articles
- Single Article: GET /api/articles/slug/{slug}
- Filtered Articles: GET /api/articles/filtered
- Tags: GET /api/tags
- Single Tag: GET /api/tags/slug/{slug}

## 🌐 Multilingual Support
- English (en) - default locale
- Polish (pl) - configured and ready
- Use ?locale=pl parameter for Polish content

## 📝 Next Steps After Deployment
1. Create admin user account
2. Add sample content (tags and articles)
3. Test all API endpoints
4. Configure frontend integration
5. Set up monitoring and analytics

---
Generated: ${new Date().toISOString()}
`;

fs.writeFileSync('DEPLOYMENT_INSTRUCTIONS.md', deploymentInstructions);
console.log('✅ Created deployment instructions');

console.log('\n🎉 Deployment preparation completed!');
console.log('\n📋 Next Steps:');
console.log('1. Review and update .env.production with your actual values');
console.log('2. Set up your production database');
console.log('3. Deploy to your production server');
console.log('4. Follow the instructions in DEPLOYMENT_INSTRUCTIONS.md');
console.log('\n📊 Current Progress: 6/46 tasks completed (13.0%)');
console.log('🚀 Ready for production deployment!');
