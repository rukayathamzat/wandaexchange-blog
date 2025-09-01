# WandaExchange Blog - Strapi CMS

A modern, multilingual blog system built with Strapi CMS for WandaExchange, supporting Polish and English content with advanced features for cryptocurrency and blockchain content.

## 🚀 Features

- **Multilingual Support**: Full Polish (pl) and English (en) localization
- **Content Management**: Rich text editor with SEO optimization
- **Tag System**: Flexible tagging with article relationships
- **Media Management**: Image uploads with optimization
- **REST API**: Comprehensive API endpoints for frontend integration
- **SEO Ready**: Built-in SEO components and metadata
- **Responsive Admin**: Modern admin panel for content creators
- **Production Ready**: Optimized for production deployment

## 🏗️ Architecture

- **Backend**: Strapi CMS v5.23.1
- **Database**: PostgreSQL (production) / SQLite (development)
- **API**: RESTful API with custom controllers
- **Authentication**: JWT-based with role management
- **File Storage**: Local storage with cloud storage support
- **Multilingual**: Strapi i18n plugin integration

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production)
- Git

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd wanda-strapi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=wandaexchange_blog
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false

# Strapi Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_generated_keys
API_TOKEN_SALT=your_generated_salt
ADMIN_JWT_SECRET=your_generated_secret
JWT_SECRET=your_generated_secret
```

### 4. Build Application

```bash
npm run build
```

### 5. Start Development Server

```bash
npm run develop
```

The admin panel will be available at: `http://localhost:1337/admin`

## 🗄️ Database Setup

### PostgreSQL (Recommended for Production)

```sql
CREATE DATABASE wandaexchange_blog;
CREATE USER wandaexchange_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE wandaexchange_blog TO wandaexchange_user;
ALTER USER wandaexchange_user CREATEDB;
```

### SQLite (Development)

For development, you can use SQLite by setting:

```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## 📚 Content Types

### Article

- **Title**: Multilingual text (required)
- **Content**: Rich text content (required, multilingual)
- **Short Description**: Brief description for previews (max 300 chars)
- **Featured Image**: Single image upload
- **Publication Date**: Date when article was published
- **Author**: Author name
- **Slug**: URL-friendly identifier (auto-generated)
- **SEO**: SEO metadata component
- **Tags**: Related tags (many-to-many relationship)
- **Language**: Locale (en/pl)

### Tag

- **Name**: Tag name (required, multilingual)
- **Slug**: URL-friendly identifier (auto-generated)
- **Description**: Tag description (optional, multilingual)
- **Articles**: Related articles (many-to-many relationship)

## 🔌 API Endpoints

### Articles

- `GET /api/articles` - Get all articles with filtering and pagination
- `GET /api/articles/slug/:slug` - Get article by slug
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/tag/:tagSlug` - Get articles by tag
- `POST /api/articles` - Create new article (authenticated)
- `PUT /api/articles/:id` - Update article (authenticated)
- `DELETE /api/articles/:id` - Delete article (authenticated)

### Tags

- `GET /api/tags` - Get all tags with article counts
- `GET /api/tags/slug/:slug` - Get tag by slug
- `GET /api/tags/popular` - Get popular tags
- `POST /api/tags` - Create new tag (authenticated)
- `PUT /api/tags/:id` - Update tag (authenticated)
- `DELETE /api/tags/:id` - Delete tag (authenticated)

### Query Parameters

- `locale`: Language filter (en/pl)
- `page`: Page number for pagination
- `limit`: Items per page
- `tags`: Filter by tag slugs
- `search`: Search in title, description, and content
- `sort`: Sort order (e.g., `publicationDate:desc`)

## 🌐 Multilingual Support

The system supports Polish and English content:

- **Default Locale**: English (en)
- **Supported Locales**: Polish (pl), English (en)
- **Localized Fields**: title, content, shortDescription, slug, seo
- **API Usage**: Use `?locale=pl` or `?locale=en` in API calls

## 🔐 Authentication & Roles

### User Roles

- **Admin**: Full access to all features
- **Editor**: Create, edit, and publish content
- **Author**: Create and edit own content
- **Viewer**: Read-only access

### API Authentication

- **Public Endpoints**: Read operations (GET requests)
- **Protected Endpoints**: Write operations require authentication
- **Token-based**: JWT tokens for API access

## 📱 Admin Panel

Access the admin panel at `/admin` after starting the application:

1. **First Run**: Create your admin user account
2. **Content Management**: Create and manage articles and tags
3. **Media Library**: Upload and manage images
4. **User Management**: Manage users and roles
5. **Settings**: Configure application settings

## 🚀 Deployment

### Production Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed production deployment instructions.

### Quick Production Start

```bash
# Install PM2
npm install -g pm2

# Start production
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Sample Data

Populate the database with sample content:

```bash
# Update the ADMIN_TOKEN in seed-data.js
nano seed-data.js

# Run seeding script
node seed-data.js
```

This will create:
- 10 tags (5 in English, 5 in Polish)
- 6 sample articles (3 in English, 3 in Polish)
- Proper relationships between articles and tags

## 🔧 Configuration

### Custom Controllers

The application includes custom controllers for enhanced functionality:

- **Article Controller**: Enhanced filtering, search, and pagination
- **Tag Controller**: Article counts and popularity ranking
- **Custom Services**: Business logic and data manipulation

### Middleware Configuration

Security and CORS configuration in `config/middlewares.ts`:

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

## 📈 Performance

### Database Optimization

- **Indexes**: Automatic indexing on frequently queried fields
- **Relationships**: Optimized many-to-many relationships
- **Pagination**: Built-in pagination with metadata

### API Optimization

- **Response Caching**: HTTP caching headers
- **Image Optimization**: Automatic image processing
- **Query Optimization**: Efficient database queries

## 🧪 Testing

### API Testing

Test the API endpoints using the provided documentation or tools like Postman:

```bash
# Test articles endpoint
curl "http://localhost:1337/api/articles?locale=en&page=1&limit=5"

# Test tags endpoint
curl "http://localhost:1337/api/tags?locale=en"
```

### Content Testing

1. Create test articles and tags
2. Test multilingual functionality
3. Verify API responses
4. Check admin panel functionality

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify database credentials in `.env`
   - Check if database service is running
   - Ensure database exists and user has permissions

2. **Port Already in Use**
   ```bash
   sudo netstat -tlnp | grep :1337
   sudo kill -9 <PID>
   ```

3. **Permission Denied**
   ```bash
   sudo chown -R $USER:$USER .
   sudo chmod -R 755 .
   ```

4. **Build Errors**
   ```bash
   rm -rf .tmp dist
   npm install
   npm run build
   ```

### Logs

- **Application Logs**: Check console output during development
- **PM2 Logs**: `pm2 logs wanda-strapi` (production)
- **Database Logs**: Check PostgreSQL logs

## 📚 Documentation

- **API Documentation**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Strapi Documentation**: [https://docs.strapi.io](https://docs.strapi.io)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software developed for WandaExchange.

## 🆘 Support

For technical support or questions:

1. Check the documentation
2. Review troubleshooting section
3. Check logs for error messages
4. Contact the development team

## 🗓️ Roadmap

### Version 1.1 (Current)
- ✅ Basic blog functionality
- ✅ Multilingual support
- ✅ Custom API endpoints
- ✅ SEO optimization

### Version 1.2 (Planned)
- [ ] Advanced search functionality
- [ ] Content scheduling
- [ ] Analytics integration
- [ ] Social media sharing

### Version 1.3 (Future)
- [ ] Comment system
- [ ] Newsletter integration
- [ ] Advanced media management
- [ ] Performance monitoring

---

**Built with ❤️ using Strapi CMS**
