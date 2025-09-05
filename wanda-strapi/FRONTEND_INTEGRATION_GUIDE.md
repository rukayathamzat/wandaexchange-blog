# Frontend Integration Guide for WandaExchange Blog API

## 🚀 Quick Start

Your Strapi API is now deployed and ready for frontend integration. Here's everything you need to know:

## 📡 API Base URL

Once deployed on Vercel, your API will be available at:
```
https://your-vercel-app.vercel.app/api
```

## 🔑 Essential Requirements for Frontend Integration

### 1. **API Endpoints** (No domain needed before deployment)
- ✅ All endpoints are ready and documented
- ✅ CORS is configured for frontend domains
- ✅ No authentication required for read operations

### 2. **Environment Variables for Frontend**
You'll need to set these in your frontend environment:

```env
# API Configuration
VITE_API_URL=https://your-vercel-app.vercel.app/api
# or
NEXT_PUBLIC_API_URL=https://your-vercel-app.vercel.app/api
# or
REACT_APP_API_URL=https://your-vercel-app.vercel.app/api
```

### 3. **Key API Endpoints for Frontend**

#### Articles
```javascript
// Get all articles
GET /api/articles?page=1&limit=10&locale=en

// Get article by slug
GET /api/articles/slug/{slug}?locale=en

// Get featured articles
GET /api/articles/featured?locale=en&limit=5

// Search articles
GET /api/articles?search=bitcoin&locale=en

// Filter by tags
GET /api/articles?tags=crypto,blockchain&locale=en
```

#### Tags
```javascript
// Get all tags
GET /api/tags?locale=en

// Get popular tags
GET /api/tags/popular?locale=en&limit=10

// Get articles by tag
GET /api/articles/tag/{tagSlug}?locale=en
```

### 4. **Response Format**
All responses follow this structure:
```json
{
  "data": [...], // Array of items
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "pageCount": 5,
      "total": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 🛠 Frontend Integration Examples

### Vue.js / Nuxt.js
```javascript
// composables/useApi.js
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl || 'https://your-vercel-app.vercel.app/api'
  
  const fetchArticles = async (params = {}) => {
    const { data } = await $fetch(`${baseURL}/articles`, { params })
    return data
  }
  
  const fetchArticle = async (slug, locale = 'en') => {
    const data = await $fetch(`${baseURL}/articles/slug/${slug}`, {
      params: { locale }
    })
    return data
  }
  
  return { fetchArticles, fetchArticle }
}
```

### React / Next.js
```javascript
// lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://your-vercel-app.vercel.app/api'

export const api = {
  articles: {
    getAll: (params = {}) => fetch(`${API_BASE}/articles?${new URLSearchParams(params)}`),
    getBySlug: (slug, locale = 'en') => fetch(`${API_BASE}/articles/slug/${slug}?locale=${locale}`),
    getFeatured: (locale = 'en', limit = 5) => fetch(`${API_BASE}/articles/featured?locale=${locale}&limit=${limit}`)
  },
  tags: {
    getAll: (locale = 'en') => fetch(`${API_BASE}/tags?locale=${locale}`),
    getPopular: (locale = 'en', limit = 10) => fetch(`${API_BASE}/tags/popular?locale=${locale}&limit=${limit}`)
  }
}
```

### Vanilla JavaScript
```javascript
// api.js
class BlogAPI {
  constructor(baseURL = 'https://your-vercel-app.vercel.app/api') {
    this.baseURL = baseURL
  }
  
  async fetchArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${this.baseURL}/articles?${queryString}`)
    return response.json()
  }
  
  async fetchArticle(slug, locale = 'en') {
    const response = await fetch(`${this.baseURL}/articles/slug/${slug}?locale=${locale}`)
    return response.json()
  }
}

const api = new BlogAPI()
```

## 🌐 Multilingual Support

The API supports Polish (`pl`) and English (`en`) locales:

```javascript
// Get Polish articles
const polishArticles = await fetch('/api/articles?locale=pl')

// Get English articles (default)
const englishArticles = await fetch('/api/articles?locale=en')
```

## 🖼 Image Handling

Images are served from the API:
```javascript
// Image URL structure
const imageUrl = `${API_BASE}${article.featuredImage.url}`
// Example: https://your-vercel-app.vercel.app/api/uploads/image.jpg
```

## 🔍 Search and Filtering

```javascript
// Search articles
const searchResults = await fetch('/api/articles?search=cryptocurrency&locale=en')

// Filter by multiple tags
const filteredArticles = await fetch('/api/articles?tags=crypto,blockchain&locale=en')

// Sort by publication date
const sortedArticles = await fetch('/api/articles?sort=publicationDate:desc&locale=en')
```

## 📱 Pagination

```javascript
// Handle pagination
const response = await fetch('/api/articles?page=2&limit=10')
const { data, meta } = await response.json()

// meta.pagination contains:
// - page: current page
// - limit: items per page
// - pageCount: total pages
// - total: total items
// - hasNextPage: boolean
// - hasPrevPage: boolean
```

## 🚨 Error Handling

```javascript
try {
  const response = await fetch('/api/articles')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
} catch (error) {
  console.error('API Error:', error)
  // Handle error appropriately
}
```

## 🔧 CORS Configuration

The API is configured to allow requests from:
- Your frontend domain (once deployed)
- Local development (localhost)
- Any configured frontend URLs

## 📊 Rate Limiting

- **Public endpoints**: 100 requests per minute per IP
- **No authentication required** for reading content

## 🎯 SEO Features

Each article includes SEO metadata:
```javascript
const article = await fetchArticle('my-article-slug')
const seoData = {
  title: article.seo?.seoTitle || article.title,
  description: article.seo?.seoDescription || article.shortDescription,
  keywords: article.seo?.seoKeywords || []
}
```

## 🚀 Deployment Checklist

Before deploying your frontend:

1. ✅ **API is deployed** (you'll handle this)
2. ✅ **Set environment variables** in your frontend
3. ✅ **Update API base URL** in your frontend code
4. ✅ **Test API endpoints** from your frontend
5. ✅ **Configure CORS** if needed (already done in API)

## 📞 Support

If you encounter any issues during frontend integration:
1. Check the API documentation
2. Verify your API base URL
3. Check browser network tab for errors
4. Ensure CORS is properly configured

## 🔄 Next Steps

1. Deploy your API to Vercel
2. Update your frontend with the new API URL
3. Test all endpoints
4. Implement error handling
5. Add loading states
6. Test multilingual functionality

Your API is production-ready and doesn't require a domain before deployment. The Vercel URL will work perfectly for frontend integration!
