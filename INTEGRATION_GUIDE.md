# WandaExchange Blog Integration Guide

## Overview
This guide provides step-by-step instructions for integrating the WandaExchange blog API into your Vue.js frontend application.

## Prerequisites
- Vue.js application (2.x or 3.x)
- Axios or Fetch API for HTTP requests
- Vue Router for navigation

## Quick Start

### 1. Install Dependencies
```bash
npm install axios
# or
yarn add axios
```

### 2. Create API Service
Create a new file `src/services/blogAPI.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_STRAPI_URL || 'http://localhost:1337/api';

const blogAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
blogAPI.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
blogAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default blogAPI;
```

### 3. Create Blog Service Functions
Create `src/services/blogService.js`:

```javascript
import blogAPI from './blogAPI';

// Get all articles with pagination
export const getArticles = async (params = {}) => {
  const defaultParams = {
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    'locale': 'en',
    'sort': 'publicationDate:desc',
    'populate': 'featuredImage,tags',
    ...params
  };
  
  try {
    const response = await blogAPI.get('/articles', { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get single article by slug
export const getArticleBySlug = async (slug, locale = 'en') => {
  try {
    const response = await blogAPI.get(`/articles/slug/${slug}`, {
      params: { locale, populate: 'featuredImage,tags' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Get articles by tag
export const getArticlesByTag = async (tagSlug, params = {}) => {
  const defaultParams = {
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    'locale': 'en',
    'sort': 'publicationDate:desc',
    'populate': 'featuredImage,tags',
    'filters[tags][slug][$eq]': tagSlug,
    ...params
  };
  
  try {
    const response = await blogAPI.get('/articles', { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    throw error;
  }
};

// Get all tags
export const getTags = async (locale = 'en') => {
  try {
    const response = await blogAPI.get('/tags', {
      params: { locale, populate: 'articles' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

// Get tag by slug
export const getTagBySlug = async (slug, locale = 'en') => {
  try {
    const response = await blogAPI.get(`/tags/slug/${slug}`, {
      params: { locale, populate: 'articles' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tag:', error);
    throw error;
  }
};
```

## Vue.js Components

### 4. Blog List Component
Create `src/components/BlogList.vue`:

```vue
<template>
  <div class="blog-list">
    <div class="blog-header">
      <h1>{{ $t('blog.title') }}</h1>
      <div class="language-switcher">
        <button 
          @click="switchLanguage('en')" 
          :class="{ active: currentLocale === 'en' }"
        >
          English
        </button>
        <button 
          @click="switchLanguage('pl')" 
          :class="{ active: currentLocale === 'pl' }"
        >
          Polski
        </button>
      </div>
    </div>

    <!-- Tag Filter -->
    <div class="tag-filter" v-if="tags.length">
      <button 
        @click="clearTagFilter" 
        :class="{ active: !selectedTag }"
      >
        {{ $t('blog.allPosts') }}
      </button>
      <button 
        v-for="tag in tags" 
        :key="tag.id"
        @click="filterByTag(tag.attributes.slug)"
        :class="{ active: selectedTag === tag.attributes.slug }"
      >
        {{ tag.attributes.name }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      {{ $t('common.loading') }}
    </div>

    <!-- Articles Grid -->
    <div v-else-if="articles.length" class="articles-grid">
      <article 
        v-for="article in articles" 
        :key="article.id" 
        class="article-card"
        @click="navigateToArticle(article.attributes.slug)"
      >
        <div class="article-image" v-if="article.attributes.featuredImage?.data">
          <img 
            :src="getImageUrl(article.attributes.featuredImage.data.attributes.url)"
            :alt="article.attributes.featuredImage.data.attributes.alternativeText || article.attributes.title"
          />
        </div>
        <div class="article-content">
          <h2>{{ article.attributes.title }}</h2>
          <p>{{ article.attributes.shortDescription }}</p>
          <div class="article-meta">
            <span class="author">{{ article.attributes.author }}</span>
            <span class="date">{{ formatDate(article.attributes.publicationDate) }}</span>
          </div>
          <div class="article-tags" v-if="article.attributes.tags?.data?.length">
            <span 
              v-for="tag in article.attributes.tags.data" 
              :key="tag.id"
              class="tag"
            >
              {{ tag.attributes.name }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      {{ $t('blog.noArticles') }}
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.pageCount > 1" class="pagination">
      <button 
        @click="changePage(pagination.page - 1)"
        :disabled="pagination.page <= 1"
      >
        {{ $t('common.previous') }}
      </button>
      <span>{{ pagination.page }} / {{ pagination.pageCount }}</span>
      <button 
        @click="changePage(pagination.page + 1)"
        :disabled="pagination.page >= pagination.pageCount"
      >
        {{ $t('common.next') }}
      </button>
    </div>
  </div>
</template>

<script>
import { getArticles, getTags, getArticlesByTag } from '@/services/blogService';

export default {
  name: 'BlogList',
  data() {
    return {
      articles: [],
      tags: [],
      loading: false,
      currentLocale: 'en',
      selectedTag: null,
      pagination: null,
      currentPage: 1
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        // Load tags
        const tagsResponse = await getTags(this.currentLocale);
        this.tags = tagsResponse.data;

        // Load articles
        await this.loadArticles();
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        this.loading = false;
      }
    },

    async loadArticles() {
      try {
        const params = {
          'pagination[page]': this.currentPage,
          'locale': this.currentLocale
        };

        let response;
        if (this.selectedTag) {
          response = await getArticlesByTag(this.selectedTag, params);
        } else {
          response = await getArticles(params);
        }

        this.articles = response.data;
        this.pagination = response.meta.pagination;
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    },

    async switchLanguage(locale) {
      this.currentLocale = locale;
      this.currentPage = 1;
      await this.loadData();
    },

    async filterByTag(tagSlug) {
      this.selectedTag = tagSlug;
      this.currentPage = 1;
      await this.loadArticles();
    },

    async clearTagFilter() {
      this.selectedTag = null;
      this.currentPage = 1;
      await this.loadArticles();
    },

    async changePage(page) {
      this.currentPage = page;
      await this.loadArticles();
    },

    navigateToArticle(slug) {
      this.$router.push(`/blog/${slug}`);
    },

    getImageUrl(url) {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      return `${process.env.VUE_APP_STRAPI_URL || 'http://localhost:1337'}${url}`;
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(this.currentLocale);
    }
  }
};
</script>

<style scoped>
.blog-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.language-switcher button {
  margin-left: 10px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.language-switcher button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.tag-filter {
  margin-bottom: 30px;
}

.tag-filter button {
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 20px;
}

.tag-filter button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.article-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.article-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-content h2 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
}

.article-content p {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 10px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>
```

### 5. Single Article Component
Create `src/components/ArticleDetail.vue`:

```vue
<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">
      {{ $t('common.loading') }}
    </div>

    <div v-else-if="article" class="article-content">
      <!-- Back Button -->
      <button @click="$router.go(-1)" class="back-button">
        ← {{ $t('common.back') }}
      </button>

      <!-- Article Header -->
      <header class="article-header">
        <h1>{{ article.attributes.title }}</h1>
        <div class="article-meta">
          <span class="author">{{ article.attributes.author }}</span>
          <span class="date">{{ formatDate(article.attributes.publicationDate) }}</span>
        </div>
        <div class="article-tags" v-if="article.attributes.tags?.data?.length">
          <span 
            v-for="tag in article.attributes.tags.data" 
            :key="tag.id"
            class="tag"
            @click="navigateToTag(tag.attributes.slug)"
          >
            {{ tag.attributes.name }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="article.attributes.featuredImage?.data" class="featured-image">
        <img 
          :src="getImageUrl(article.attributes.featuredImage.data.attributes.url)"
          :alt="article.attributes.featuredImage.data.attributes.alternativeText || article.attributes.title"
        />
      </div>

      <!-- Article Content -->
      <div class="content" v-html="article.attributes.content"></div>

      <!-- SEO Meta -->
      <div v-if="article.attributes.seoDescription" class="seo-meta">
        <h3>{{ $t('blog.seoInfo') }}</h3>
        <p><strong>{{ $t('blog.seoDescription') }}:</strong> {{ article.attributes.seoDescription }}</p>
        <p v-if="article.attributes.seoKeywords"><strong>{{ $t('blog.seoKeywords') }}:</strong> {{ article.attributes.seoKeywords }}</p>
      </div>
    </div>

    <div v-else class="error">
      {{ $t('blog.articleNotFound') }}
    </div>
  </div>
</template>

<script>
import { getArticleBySlug } from '@/services/blogService';

export default {
  name: 'ArticleDetail',
  data() {
    return {
      article: null,
      loading: true
    };
  },
  async mounted() {
    await this.loadArticle();
  },
  watch: {
    '$route.params.slug'() {
      this.loadArticle();
    }
  },
  methods: {
    async loadArticle() {
      this.loading = true;
      try {
        const slug = this.$route.params.slug;
        const locale = this.$route.query.locale || 'en';
        const response = await getArticleBySlug(slug, locale);
        this.article = response.data;
        
        // Update page title for SEO
        if (this.article.attributes.seoTitle) {
          document.title = this.article.attributes.seoTitle;
        } else {
          document.title = this.article.attributes.title;
        }
        
        // Update meta description
        if (this.article.attributes.seoDescription) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', this.article.attributes.seoDescription);
          }
        }
      } catch (error) {
        console.error('Error loading article:', error);
        this.article = null;
      } finally {
        this.loading = false;
      }
    },

    navigateToTag(tagSlug) {
      this.$router.push(`/blog?tag=${tagSlug}`);
    },

    getImageUrl(url) {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      return `${process.env.VUE_APP_STRAPI_URL || 'http://localhost:1337'}${url}`;
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(this.$route.query.locale || 'en');
    }
  }
};
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.article-header {
  margin-bottom: 30px;
}

.article-header h1 {
  font-size: 2.5rem;
  margin: 0 0 15px 0;
  color: #333;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tag:hover {
  background: #e0e0e0;
}

.featured-image {
  margin-bottom: 30px;
}

.featured-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.content {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.content h2, .content h3, .content h4 {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #222;
}

.content p {
  margin-bottom: 20px;
}

.content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 20px 0;
}

.seo-meta {
  margin-top: 40px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.seo-meta h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.seo-meta p {
  margin: 8px 0;
  font-size: 0.9rem;
  color: #666;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #dc3545;
}
</style>
```

## Router Configuration

### 6. Add Blog Routes
Update your `src/router/index.js`:

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogList from '@/components/BlogList.vue';
import ArticleDetail from '@/components/ArticleDetail.vue';

Vue.use(VueRouter);

const routes = [
  // ... your existing routes
  {
    path: '/blog',
    name: 'Blog',
    component: BlogList
  },
  {
    path: '/blog/:slug',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
```

## Environment Configuration

### 7. Environment Variables
Create `.env` file in your Vue.js project root:

```env
VUE_APP_STRAPI_URL=http://localhost:1337
```

For production, update with your actual Strapi URL:

```env
VUE_APP_STRAPI_URL=https://your-domain.com
```

## Internationalization (i18n)

### 8. Add Translations
If you're using Vue i18n, add these translations:

```javascript
// en.json
{
  "blog": {
    "title": "Blog",
    "allPosts": "All Posts",
    "noArticles": "No articles found",
    "articleNotFound": "Article not found",
    "seoInfo": "SEO Information",
    "seoDescription": "SEO Description",
    "seoKeywords": "SEO Keywords"
  },
  "common": {
    "loading": "Loading...",
    "back": "Back",
    "previous": "Previous",
    "next": "Next"
  }
}

// pl.json
{
  "blog": {
    "title": "Blog",
    "allPosts": "Wszystkie wpisy",
    "noArticles": "Nie znaleziono artykułów",
    "articleNotFound": "Artykuł nie został znaleziony",
    "seoInfo": "Informacje SEO",
    "seoDescription": "Opis SEO",
    "seoKeywords": "Słowa kluczowe SEO"
  },
  "common": {
    "loading": "Ładowanie...",
    "back": "Wstecz",
    "previous": "Poprzednia",
    "next": "Następna"
  }
}
```

## Testing the Integration

### 9. Test API Connection
Create a simple test component to verify the API connection:

```vue
<template>
  <div class="api-test">
    <h2>API Connection Test</h2>
    <button @click="testConnection">Test Connection</button>
    <div v-if="result" class="result">
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/services/blogService';

export default {
  name: 'ApiTest',
  data() {
    return {
      result: null
    };
  },
  methods: {
    async testConnection() {
      try {
        const response = await getArticles({ 'pagination[pageSize]': 1 });
        this.result = response;
      } catch (error) {
        this.result = { error: error.message };
      }
    }
  }
};
</script>
```

## Deployment Checklist

### 10. Production Deployment
Before deploying to production:

1. **Update API URL**: Set `VUE_APP_STRAPI_URL` to your production Strapi URL
2. **CORS Configuration**: Ensure your Strapi CORS settings include your production domain
3. **SSL/HTTPS**: Use HTTPS for both frontend and API
4. **Error Handling**: Implement proper error boundaries and fallbacks
5. **SEO**: Ensure meta tags are properly set for each article
6. **Performance**: Consider implementing caching strategies
7. **Analytics**: Add tracking for blog page views and interactions

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check Strapi CORS configuration in `config/middlewares.ts`
2. **Image Loading**: Ensure image URLs are correctly formatted
3. **Multilingual Issues**: Verify locale parameters are being passed correctly
4. **Pagination**: Check that pagination parameters are properly formatted
5. **API Timeouts**: Increase timeout values if needed

### Debug Tips

1. Use browser developer tools to inspect API requests
2. Check Strapi admin panel for content and configuration
3. Verify environment variables are loaded correctly
4. Test API endpoints directly using tools like Postman

## Support

For additional support or questions about the integration, refer to:
- [Strapi Documentation](https://docs.strapi.io/)
- [Vue.js Documentation](https://vuejs.org/guide/)
- API Documentation provided in `API_DOCUMENTATION.md`
