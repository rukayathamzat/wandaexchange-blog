# WandaExchange Blog - Strapi CMS

A modern, multilingual blog system built with Strapi v5.23.1 for WandaExchange, supporting Polish and English content with advanced API features.

## 🚀 Features

- **Multilingual Support**: Polish (pl) and English (en) locales
- **Advanced API**: Custom controllers with filtering, pagination, and search
- **SEO Optimized**: Built-in SEO components and slug generation
- **Content Management**: Rich text editor with media library
- **Tag System**: Flexible tagging with article relationships
- **Production Ready**: PostgreSQL support and deployment configurations

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL (for production)
- Git

## 🛠️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/wandaexchange-blog.git
   cd wandaexchange-blog
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp env.example .env
```

   Configure your environment variables in `.env`:
   ```env
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_app_keys_here
   API_TOKEN_SALT=your_api_token_salt_here
   ADMIN_JWT_SECRET=your_admin_jwt_secret_here
   TRANSFER_TOKEN_SALT=your_transfer_token_salt_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Start the development server**
   ```bash
   npm run develop
   ```

5. **Access the admin panel**
   - Open http://localhost:1337/admin
   - Create your admin account
   - Start creating content!

## 🗄️ Database Configuration

### Development (SQLite)
The project is configured to use SQLite by default for development.

### Production (PostgreSQL)
For production deployment, update your environment variables:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=your_postgres_host
DATABASE_PORT=5432
DATABASE_NAME=wandaexchange_blog
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

## 📚 API Documentation

### Base URL
```
http://localhost:1337/api
```

### Article Endpoints

#### Get All Articles
```http
GET /api/articles
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `locale` (string): Language code (en/pl, default: en)
- `tags` (string|array): Filter by tag slugs
- `search` (string): Search in title, content, and description
- `sort` (string): Sort order (default: publicationDate:desc)

**Example:**
```http
GET /api/articles?page=1&limit=5&locale=en&tags=cryptocurrency&search=bitcoin
```

#### Get Article by Slug
```http
GET /api/articles/slug/:slug
```

**Example:**
```http
GET /api/articles/slug/wandaexchange-launches-revolutionary-trading-platform
```

#### Get Featured Articles
```http
GET /api/articles/featured
```

**Query Parameters:**
- `locale` (string): Language code (default: en)
- `limit` (number): Number of articles (default: 5)

#### Get Articles by Tag
```http
GET /api/articles/tag/:tagSlug
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `locale` (string): Language code (default: en)

### Tag Endpoints

#### Get All Tags
```http
GET /api/tags
```

#### Get Tag by Slug
```http
GET /api/tags/slug/:slug
```

#### Get Popular Tags
```http
GET /api/tags/popular
```

## 🌐 Multilingual Support

The blog supports two locales:
- **English (en)**: Default locale
- **Polish (pl)**: Secondary locale

### Content Structure
All content types support multilingual fields:
- `title`
- `content`
- `shortDescription`
- `slug`
- SEO fields (`seo.title`, `seo.description`, `seo.keywords`)

### API Usage
Include the `locale` parameter in your API requests:
```http
GET /api/articles?locale=pl
```

## 🎨 Content Types

### Article
- **title**: Multilingual text field
- **content**: Rich text editor (multilingual)
- **shortDescription**: Text field for previews (multilingual)
- **slug**: Auto-generated from title (multilingual)
- **featuredImage**: Single image upload
- **publicationDate**: DateTime field
- **author**: Text field
- **tags**: Many-to-many relationship with Tag
- **seo**: Component with title, description, keywords

### Tag
- **name**: Multilingual text field
- **slug**: Auto-generated from name
- **description**: Multilingual text field
- **articles**: Many-to-many relationship with Article

## 🚀 Deployment (Vercel)

### GitHub Actions → Vercel

This repository is set to deploy to Vercel via GitHub Actions only.

1. **Set GitHub Secrets:**
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
   - `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`
   - Database secrets as needed (`DATABASE_CLIENT`, `DATABASE_HOST`, etc.)

2. **Trigger Deployment:**
   - Push to `main` branch. Workflow `.github/workflows/deploy.yml` will run and publish to Vercel.

No Docker/Railway/DigitalOcean deployment is included.

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test API Endpoints
```bash
node test-api-endpoints.js
```

### Test Relationships
```bash
node test-relationships.js
```

## 📝 Sample Data

Create sample content for testing:

```bash
node seed-content-enhanced.js
```

## 🔧 Development

### Project Structure
```
src/
├── api/
│   ├── article/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── content-types/
│   └── tag/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── content-types/
├── components/
├── extensions/
└── middlewares/
```

### Adding New Content Types
1. Use Strapi admin panel: `Content-Type Builder`
2. Or create manually in `src/api/`

### Custom Controllers
The project includes custom controllers with enhanced functionality:
- Advanced filtering and pagination
- Search capabilities
- Slug-based routing
- Multilingual support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact: support@wandaexchange.com

## 🔗 Links

- [Strapi Documentation](https://docs.strapi.io/)
- [WandaExchange Website](https://wandaexchange.com)
- [API Documentation](API_DOCUMENTATION.md)

---

**Built with ❤️ for WandaExchange**