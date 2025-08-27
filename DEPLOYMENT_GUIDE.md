# WandaExchange Blog Deployment Guide

## Quick Setup Instructions

### 1. Start Strapi Application
```bash
cd strapi/wandaexchange-blog
npm run develop
```

### 2. Access Admin Panel
- Open: http://localhost:1337/admin
- Create admin account on first run
- Configure content types (Article, Tag)

### 3. API Endpoints Available
- Articles: http://localhost:1337/api/articles
- Tags: http://localhost:1337/api/tags
- Single Article: http://localhost:1337/api/articles/slug/{slug}

### 4. Vue.js Integration
```javascript
// Basic API call example
const response = await fetch('http://localhost:1337/api/articles?locale=en');
const data = await response.json();
```

## Production Deployment

### Environment Variables
```env
STRAPI_URL=https://your-domain.com
DATABASE_URL=your-database-connection-string
```

### Database Configuration
- PostgreSQL recommended for production
- Update `config/database.ts` with production credentials

### CORS Settings
Update `config/middlewares.ts` with your production domain:
```javascript
origin: ['https://wandaexchange.com', 'https://www.wandaexchange.com']
```

## Content Management
1. Create Tags first
2. Create Articles with proper slugs
3. Set publication dates
4. Upload featured images
5. Publish content

## Multilingual Support
- English (en) - default
- Polish (pl) - add translations for all fields
- Use locale parameter in API calls: `?locale=pl`

## File Structure
```
strapi/wandaexchange-blog/
├── src/api/
│   ├── article/          # Article content type
│   └── tag/             # Tag content type
├── config/              # Strapi configuration
├── public/              # Static files
└── database/            # Database files
```

## API Documentation
See `API_DOCUMENTATION.md` for complete endpoint details.

## The Problem

You have duplicate Strapi installations:
- One in the root directory (older version 5.22.0)
- One in `strapi/wandaexchange-blog/` (newer version 5.23.0)

The deployment guide expects you to run from `strapi/wandaexchange-blog/`, but you might be trying to run npm install from the root directory.

## The Solution

**Option 1: Use the correct Strapi application (Recommended)**

1. Navigate to the correct Strapi directory:
   ```bash
   cd strapi/wandaexchange-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run develop
   ```

4. Access the admin panel at: http://localhost:1337/admin

**Option 2: Clean up and use only one Strapi installation**

1. Delete the root-level Strapi files:
   ```bash
   # Remove root-level Strapi files
   rm -rf node_modules package.json package-lock.json .strapi-updater.json .strapi/
   ```

2. Use only the `strapi/wandaexchange-blog/` directory as your main Strapi application.

## Why This Happened

It looks like you might have:
1. Initially created a Strapi app in the root directory
2. Later created another Strapi app in the `strapi/` subdirectory
3. Both are trying to manage the same project, causing conflicts

The `strapi/wandaexchange-blog/` directory appears to be the more complete and up-to-date installation based on the file structure and version numbers.

Try running the commands from the correct directory (`strapi/wandaexchange-blog/`) and let me know if you still encounter issues!
