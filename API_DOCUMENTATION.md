# WandaExchange Blog API Documentation

## Base URL
```
http://localhost:1337/api
```

## Authentication
All endpoints are public and don't require authentication for read operations.

## Endpoints

### Articles

#### Get All Articles
```
GET /articles
```

**Query Parameters:**
- `pagination[page]` (number): Page number (default: 1)
- `pagination[pageSize]` (number): Items per page (default: 10)
- `locale` (string): Language code - 'en' or 'pl' (default: 'en')
- `sort` (string): Sort field - 'publicationDate:desc', 'publicationDate:asc', 'title:asc', etc.
- `filters[tags][slug][$eq]` (string): Filter by tag slug
- `filters[tags][slug][$in][]` (array): Filter by multiple tag slugs

**Example:**
```
GET /api/articles?pagination[page]=1&pagination[pageSize]=5&locale=en&sort=publicationDate:desc
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Article Title",
        "shortDescription": "Short description...",
        "slug": "article-slug",
        "publicationDate": "2025-08-12T10:00:00.000Z",
        "author": "Author Name",
        "featuredImage": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/image.jpg",
              "width": 800,
              "height": 600
            }
          }
        },
        "tags": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "name": "Crypto",
                "slug": "crypto"
              }
            }
          ]
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 5,
      "pageCount": 2,
      "total": 10
    }
  }
}
```

#### Get Single Article by Slug
```
GET /articles/slug/{slug}
```

**Parameters:**
- `slug` (string): Article slug
- `locale` (string): Language code - 'en' or 'pl'

**Example:**
```
GET /api/articles/slug/my-article-slug?locale=en
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Article Title",
      "content": "<p>Full article content...</p>",
      "shortDescription": "Short description...",
      "seoTitle": "SEO Title",
      "seoDescription": "SEO Description",
      "seoKeywords": "crypto, blockchain, news",
      "slug": "my-article-slug",
      "publicationDate": "2025-08-12T10:00:00.000Z",
      "author": "Author Name",
      "language": "en",
      "featuredImage": {
        "data": {
          "id": 1,
          "attributes": {
            "url": "/uploads/image.jpg",
            "width": 800,
            "height": 600,
            "alternativeText": "Image description"
          }
        }
      },
      "tags": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "name": "Crypto",
              "slug": "crypto",
              "description": "Cryptocurrency related content"
            }
          }
        ]
      }
    }
  }
}
```

#### Get Filtered Articles
```
GET /articles/filtered
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tags` (string|array): Tag slugs to filter by
- `locale` (string): Language code
- `sort` (string): Sort field

**Example:**
```
GET /api/articles/filtered?page=1&limit=5&tags=crypto&locale=en&sort=publicationDate:desc
```

### Tags

#### Get All Tags
```
GET /tags
```

**Query Parameters:**
- `locale` (string): Language code - 'en' or 'pl'
- `populate` (string): Relations to populate - 'articles'

**Example:**
```
GET /api/tags?locale=en&populate=articles
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Crypto",
        "slug": "crypto",
        "description": "Cryptocurrency related content",
        "articles": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "title": "Article Title",
                "slug": "article-slug"
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Get Tag by Slug
```
GET /tags/slug/{slug}
```

**Parameters:**
- `slug` (string): Tag slug
- `locale` (string): Language code

**Example:**
```
GET /api/tags/slug/crypto?locale=en
```

## Error Responses

### 404 Not Found
```json
{
  "error": {
    "status": 404,
    "name": "Not Found",
    "message": "Article not found"
  }
}
```

### 400 Bad Request
```json
{
  "error": {
    "status": 400,
    "name": "Bad Request",
    "message": "Invalid parameters"
  }
}
```

## Usage Examples

### Vue.js Integration Example

```javascript
// Fetch all articles
async function getArticles(page = 1, locale = 'en') {
  try {
    const response = await fetch(
      `http://localhost:1337/api/articles?pagination[page]=${page}&pagination[pageSize]=10&locale=${locale}&sort=publicationDate:desc`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

// Fetch single article by slug
async function getArticleBySlug(slug, locale = 'en') {
  try {
    const response = await fetch(
      `http://localhost:1337/api/articles/slug/${slug}?locale=${locale}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

// Fetch articles by tag
async function getArticlesByTag(tagSlug, page = 1, locale = 'en') {
  try {
    const response = await fetch(
      `http://localhost:1337/api/articles?filters[tags][slug][$eq]=${tagSlug}&pagination[page]=${page}&locale=${locale}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    throw error;
  }
}
```

### Axios Example

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337/api';

const blogAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Get all articles
export const getArticles = (params = {}) => {
  return blogAPI.get('/articles', { params });
};

// Get article by slug
export const getArticleBySlug = (slug, locale = 'en') => {
  return blogAPI.get(`/articles/slug/${slug}`, {
    params: { locale }
  });
};

// Get articles by tag
export const getArticlesByTag = (tagSlug, params = {}) => {
  return blogAPI.get('/articles', {
    params: {
      ...params,
      'filters[tags][slug][$eq]': tagSlug
    }
  });
};
```

## Multilingual Support

The API supports Polish (pl) and English (en) locales. All content types have localized fields:

- `title`
- `content`
- `shortDescription`
- `seoTitle`
- `seoDescription`
- `seoKeywords`
- `slug`
- `author`

To get content in a specific language, add the `locale` parameter to your requests:

```
GET /api/articles?locale=pl
GET /api/articles?locale=en
```

## Image Handling

Images are served from the `/uploads/` directory. The full URL structure is:

```
http://localhost:1337/uploads/filename.jpg
```

For production, replace `localhost:1337` with your actual domain.

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:3000`
- `http://localhost:8080`
- `https://wandaexchange.com`

For additional domains, update the CORS configuration in `config/middlewares.ts`.
