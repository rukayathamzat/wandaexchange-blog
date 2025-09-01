# WandaExchange Blog API Documentation

## Overview

This document provides comprehensive documentation for the WandaExchange Blog API built with Strapi CMS. The API supports multilingual content (Polish and English) and provides endpoints for articles, tags, and related functionality.

## Base URL

```
http://your-domain.com/api
```

## Authentication

Most read endpoints are public and don't require authentication. Write operations (create, update, delete) require authentication with appropriate user roles.

## Content Types

### Article
- **Title**: Multilingual text field (required)
- **Content**: Rich text content (required, multilingual)
- **Short Description**: Brief description for previews (max 300 chars, multilingual)
- **Featured Image**: Single image upload
- **Publication Date**: Date when article was published
- **Author**: Author name (text field)
- **Slug**: URL-friendly identifier (auto-generated from title, multilingual)
- **SEO**: SEO metadata component (title, description, keywords)
- **Tags**: Related tags (many-to-many relationship)
- **Language**: Locale (en/pl)

### Tag
- **Name**: Tag name (required, multilingual)
- **Slug**: URL-friendly identifier (auto-generated from name)
- **Description**: Tag description (optional, multilingual)
- **Articles**: Related articles (many-to-many relationship)

## API Endpoints

### Articles

#### Get All Articles
```http
GET /articles
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `locale` (optional): Language filter (en/pl, default: en)
- `tags` (optional): Filter by tag slugs (comma-separated or array)
- `search` (optional): Search in title, description, and content
- `sort` (optional): Sort order (default: publicationDate:desc)

**Example:**
```http
GET /articles?page=1&limit=5&locale=pl&tags=crypto,blockchain&search=bitcoin
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Article Title",
      "shortDescription": "Article description...",
      "slug": "article-title",
      "publicationDate": "2025-08-12T10:00:00.000Z",
      "featuredImage": {
        "url": "/uploads/image.jpg",
        "alternativeText": "Image description"
      },
      "tags": [
        {
          "id": 1,
          "name": "Crypto",
          "slug": "crypto"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 5,
      "pageCount": 3,
      "total": 15,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Get Article by Slug
```http
GET /articles/slug/{slug}
```

**Path Parameters:**
- `slug`: Article slug

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)

**Example:**
```http
GET /articles/slug/my-article-title?locale=pl
```

**Response:**
```json
{
  "id": 1,
  "title": "Article Title",
  "content": "Full article content...",
  "shortDescription": "Article description...",
  "slug": "my-article-title",
  "publicationDate": "2025-08-12T10:00:00.000Z",
  "author": "John Doe",
  "featuredImage": {
    "url": "/uploads/image.jpg",
    "alternativeText": "Image description"
  },
  "seo": {
    "seoTitle": "SEO Title",
    "seoDescription": "SEO Description",
    "seoKeywords": ["keyword1", "keyword2"]
  },
  "tags": [
    {
      "id": 1,
      "name": "Crypto",
      "slug": "crypto",
      "description": "Cryptocurrency related content"
    }
  ],
  "locale": "pl"
}
```

#### Get Featured Articles
```http
GET /articles/featured
```

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)
- `limit` (optional): Number of articles (default: 5)

**Example:**
```http
GET /articles/featured?locale=en&limit=3
```

#### Get Articles by Tag
```http
GET /articles/tag/{tagSlug}
```

**Path Parameters:**
- `tagSlug`: Tag slug

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```http
GET /articles/tag/crypto?locale=pl&page=1&limit=5
```

### Tags

#### Get All Tags
```http
GET /tags
```

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)
- `limit` (optional): Number of tags (default: 50)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Crypto",
    "slug": "crypto",
    "description": "Cryptocurrency related content",
    "articleCount": 15,
    "locale": "en"
  }
]
```

#### Get Tag by Slug
```http
GET /tags/slug/{slug}
```

**Path Parameters:**
- `slug`: Tag slug

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)

**Response:**
```json
{
  "id": 1,
  "name": "Crypto",
  "slug": "crypto",
  "description": "Cryptocurrency related content",
  "articleCount": 15,
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "slug": "article-title",
      "featuredImage": {
        "url": "/uploads/image.jpg"
      }
    }
  ],
  "locale": "en"
}
```

#### Get Popular Tags
```http
GET /tags/popular
```

**Query Parameters:**
- `locale` (optional): Language filter (en/pl, default: en)
- `limit` (optional): Number of tags (default: 10)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

**Error Response Format:**
```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## Multilingual Support

All content types support Polish (pl) and English (en) locales:

- Use `?locale=pl` for Polish content
- Use `?locale=en` for English content (default)
- Slugs are unique per locale
- Content fields (title, description, content) are localized

## Image Handling

- Images are stored locally by default
- Supported formats: JPG, PNG, WEBP
- Maximum file size: 100KB
- Images are accessible via `/uploads/` path
- Each image includes `url` and `alternativeText` fields

## Pagination

Pagination is supported on list endpoints:

- `page`: Current page number (starts from 1)
- `limit`: Items per page
- Response includes pagination metadata with total count and page information

## Search

Search functionality is available on articles:

- Searches in title, short description, and content
- Case-insensitive search
- Use `?search=query` parameter

## Filtering

Filter articles by:

- **Tags**: `?tags=crypto,blockchain`
- **Language**: `?locale=pl`
- **Publication status**: Only published articles are returned by default

## Sorting

Sort articles by:

- `publicationDate:desc` (default: newest first)
- `publicationDate:asc` (oldest first)
- `title:asc` (alphabetical)
- `title:desc` (reverse alphabetical)

## Frontend Integration Examples

### Vue.js Integration

#### Fetch Articles
```javascript
import axios from 'axios';

const API_BASE = 'http://your-domain.com/api';

export const fetchArticles = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE}/articles`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Usage
const articles = await fetchArticles({
  page: 1,
  limit: 10,
  locale: 'pl',
  tags: 'crypto'
});
```

#### Fetch Single Article
```javascript
export const fetchArticleBySlug = async (slug, locale = 'en') => {
  try {
    const response = await axios.get(`${API_BASE}/articles/slug/${slug}`, {
      params: { locale }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};
```

#### Fetch Tags
```javascript
export const fetchTags = async (locale = 'en') => {
  try {
    const response = await axios.get(`${API_BASE}/tags`, {
      params: { locale }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};
```

### React Integration

```javascript
import { useState, useEffect } from 'react';

const useArticles = (params = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles?${new URLSearchParams(params)}`);
        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(params)]);

  return { articles, loading, error };
};
```

## Rate Limiting

- Public read endpoints: 100 requests per minute per IP
- Authenticated endpoints: 1000 requests per minute per user

## CORS Configuration

CORS is configured to allow requests from:
- Same origin
- Configured frontend domains
- Local development environments

## Security

- Input validation on all endpoints
- SQL injection protection
- XSS protection
- CSRF protection for authenticated endpoints
- Role-based access control

## Support

For technical support or questions about the API, please contact the development team.

## Changelog

- **v1.0**: Initial API release with basic CRUD operations
- **v1.1**: Added enhanced filtering, search, and pagination
- **v1.2**: Added multilingual support and SEO features
