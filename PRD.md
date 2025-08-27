

## Product Requirements Document (PRD) for Strapi-Based Blog Integration on WandaExchange Website

### Version History

- **Version**: 1.0
- **Date**: August 12, 2025
- **Description**: Initial draft based on provided project requirements from screenshots, including X post and order details.
- **Future Versions**: To be updated as needed during development.

## 1. Introduction

### 1.1 Purpose

This Product Requirements Document (PRD) outlines the complete requirements for setting up a blog feature on the existing WandaExchange website using Strapi CMS as the backend admin panel. The blog will support company events, news, and public content, with multilingual capabilities in Polish and English. The goal is to enable seamless content management, integration with the existing Vue.js frontend, and full functionality similar to `https://www.binance.com/en/blog`.

This PRD ensures all details from the project description are covered, allowing for implementation without omissions. It focuses on backend setup (Strapi configuration), API exposure, documentation, and hosting considerations, while assuming the frontend integration will be handled separately by the client's team.

### 1.2 Scope

- **In Scope**:
  - Installation and configuration of Strapi CMS on the client's server.
  - Creation of custom content types for blog articles, tags, and related entities.
  - Multilingual support for Polish and English.
  - API endpoints for data retrieval, including pagination, filtering, and single-article views.
  - Image upload and storage configuration.
  - SEO and URL slug management.
  - Comprehensive documentation and instructions for frontend integration.
  - Recommendations on hosting options, costs, and setup (though actual hosting will use the client's provided server and domain).

- **Out of Scope**:
  - Frontend development or modifications (e.g., Vue.js integration code).
  - Ongoing maintenance post-delivery.
  - Additional languages beyond Polish and English.
  - Custom themes or designs beyond basic Strapi admin panel.
  - Performance optimization for high-traffic scenarios unless specified.
  - Integration with external services not mentioned (e.g., email notifications).

### 1.3 Target Audience

- **End Users**: WandaExchange administrators (for content creation via Strapi) and website visitors (for reading blog posts).
- **Developers**: Client's frontend team (for integrating API data into the Vue.js site).
- **Industry Context**: Crypto & Blockchain, with a focus on business localization (e.g., multilingual content for Polish and English markets).

### 1.4 Assumptions and Dependencies

- The existing website is built with Vue.js and is ready for API integration.
- Client will provide server access, hosting details, and domain during development.
- Strapi version: Latest stable (e.g. v4x or higher as of August 2025) latest version 5.22.0
- Database: PostgreSQL or SQLite (configurable in Strapi; recommend PostgreSQL for production).
- No additional packages beyond Strapi's ecosystem unless required for multilingualism or image handling.
- Delivery timeline: Configured for completion by August 29, 2025.

## 2. Functional Requirements

### 2.1 Content Management System (CMS) Setup

- Install and configure Strapi CMS on the client's server.
- Set up user roles: Admin (full access), Editor (content creation/editing), Viewer (read-only if needed).
- Configure database connection (e.g., client's provided PostgreSQL instance).
- Enable plugins: Internationalization (for multilingual support), GraphQL (optional for advanced queries), and Media Library.

### 2.2 Content Types and Fields

- **Article**
  - **Fields**:
    - Title (Text, required, multilingual).
    - Content (Rich Text/WYSIWYG, required, multilingual).
    - Short Description (Text, max 300 characters, multilingual, for previews).
    - SEO Title (Text, optional, multilingual).
    - SEO Description (Text, optional, multilingual).
    - SEO Keywords (Component or multilingual).
    - Slug (UID field, auto-generated from title, unique, multilingual if supported).
    - Featured Image (Media, single image upload).
    - Publication Date (DateTime, default to now).
    - Author (Relation to User or simple text field).
    - Tags (Relation to Tag content type, many-to-many).
    - Language (Enum: Polish, English; or use Strapi's i18n for full localization).
    - Validation: Ensure slugs are unique per language.

- **Tag**
  - **Fields**:
    - Name (Text, required, multilingual).
    - Slug (UID, auto-generated).
    - Description (Text, optional).

- **Additional Types if Needed**:
  - Category (if tags are insufficient; similar to Tag).
  - SEO Component (reusable for articles).

### 2.3 Multilingual Support

- Implement Strapi's Internationalization plugin to support Polish (pl) and English (en) locales.
- Default locale: English.
- All translatable fields (e.g., title, content, description) must have versions for each language.
- API queries must support locale filtering (e.g., `?locale=pl`).
- Ensure URL slugs can be localized (e.g., `/blog/en/article-slug` vs. `/blog/pl/artykul-slug`).

### 2.4 Image and Media Handling

- Configure Strapi's Media Library for image uploads.
- **Storage**: On the server (client's hosting); integrate with cloud storage if recommended (e.g., AWS S3 for scalability).
- **Features**:
  - Automatic resizing/thumbnail generation for previews.
  - Alt text and caption fields for accessibility/SEO.
  - Support formats: JPG, PNG, WEBP.

### 2.5 API Endpoints

- Expose REST API (and optionally GraphQL) for frontend consumption:
  - **Get All Articles**:
    - Endpoint: `/api/articles`
    - Parameters: pagination (page, limit), filters (tags, locale), sorting (by date desc).
    - Response: List of article previews (id, title, short description, featured image, tags, slug, publication date).
  - **Get Single Article**:
    - Endpoint: `api/articles/:slug`
    - Parameters: locale.
    - Response: Full article data (all fields).
  - **Tag Filtering**:
    - Integrated into `/api/articles?filters[tags][$eq]=tag-slug`
  - **Pagination**:
    - Use Strapi's built-in pagination (`?pagination[page]=1&pagination[limit]=10`).
  - **Security**: API keys or JWT authentication for public read access (no auth needed for reads, but configurable).

### 2.6 Blog Page Features (Backend Support)

- **Previews**: Ensure API returns data for displaying image, headline, short description on main blog page.
- **Navigation**: Pagination support as above.
- **Filtering**: By tags via API queries.

### 2.7 Integration Instructions

Provide detailed documentation (e.g., Markdown or PDF file):

- Step-by-step guide for Vue.js integration: How to fetch API data, handle pagination, render multilingual content.
- Example code snippets (e.g., Axios or Fetch for API calls).
- URL structure recommendations (e.g., `site.com/blog` for list, `site.com/blog/:slug` for single).
- Handling errors, caching, and SEO (e.g., meta tags from API).

## 3. Non-Functional Requirements

### 3.1 Performance

- API response time: < 500ms for standard queries.
- Scalability: Handle up to 100 concurrent users initially (crypto/news traffic).
- Image optimization: Compress uploads to reduce load times.

### 3.2 Security

- Strapi admin panel: HTTPS enforced, strong passwords, role-based access.
- API: Rate limiting, CORS configuration for client's domain.
- Data: No sensitive info stored in blog (focus on public content).

### 3.3 Usability

- Admin Panel: Intuitive Strapi UI for non-technical users.
- Multilingual: Easy switching between languages in admin.

### 3.4 Hosting and Deployment

- Use client's provided hosting and domain.
- **Recommendations (for reference or future scaling)**:
  - Options: AWS (scalable, ~$10-50/month for EC2 + S3), DigitalOcean (~$5-20/month for droplets), Vercel (serverless, ~$20/month but may not suit Strapi fully).
  - Why: AWS for robust storage/integration in crypto space; DigitalOcean for cost-effectiveness; Vercel for ease but limited for databases.
  - Approximate Costs: Hosting ~$10-50/month (server + DB), Image Storage ~$0.02/GB on S3 equivalents. Exact depends on usage.
- **Deployment Process**: SSH access for setup, PM2 or Docker for running Strapi.

### 3.5 Testing

- Unit Tests: For content types and API endpoints.
- Integration Tests: API calls with sample data.
- Multilingual Tests: Ensure content displays correctly in both languages.
- Browser Compatibility: N/A (backend-focused).

## 4. Deliverables

- Configured Strapi instance on client's server.
- Database schema and seed data (sample articles).
- API documentation (e.g., via Strapi's built-in docs or Postman collection).
- Integration guide document.
- Source code repository (if requested, e.g., Git).
- Final handover by August 29, 2025.

## 5. Risks and Mitigations

- **Risk**: Integration issues with Vue.js. **Mitigation**: Provide detailed docs and offer Q&A support.
- **Risk**: Multilingual plugin bugs. **Mitigation**: Use stable Strapi version; test thoroughly.
- **Risk**: Server access delays. **Mitigation**: Coordinate early with client.

## 6. Appendix

- **Reference**: Binance Blog for UI/UX inspiration (previews, tags, pagination).
- **X Post Context**: Emphasis on Polish and English support for public company news/events.
- **Contact**: For any clarifications, refer back to order details.


