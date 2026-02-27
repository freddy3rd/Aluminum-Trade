# SEO Optimization Guide for Aluminum Trade

This document outlines all SEO improvements implemented in this project and best practices for maintaining and expanding SEO.

## ✅ Implemented Improvements

### 1. **Meta Tags & Head Configuration** ✓

- **File**: `index.html`
- **Improvements**:
  - Comprehensive meta description (160 characters)
  - Open Graph tags for social media sharing
  - Twitter Card tags for Twitter integration
  - Canonical URL to prevent duplicate content
  - Keywords meta tag
  - Author and language meta tags
  - Theme color for browser chrome
  - Apple mobile web app meta tags

### 2. **Structured Data (JSON-LD)** ✓

- **File**: `index.html`
- **Implementations**:
  - Organization schema for brand recognition
  - Breadcrumb schema for navigation
  - Extensible for Product, Article, and Event schemas

### 3. **Robots & Crawling** ✓

- **File**: `public/robots.txt`
- **Features**:
  - Allow all major search engines
  - Disallow sample and build directories
  - Set crawl delay to prevent server overload
  - Sitemap reference

### 4. **Sitemap** ✓

- **File**: `public/sitemap.xml`
- **Coverage**:
  - Homepage (priority 1.0)
  - Main sections (Collection, Studio, Craft - priority 0.8-0.9)
  - Contact page (priority 0.9)
  - Last modified dates and change frequency

### 5. **Attribution** ✓

- **File**: `public/humans.txt`
- **Contains**:
  - Team information
  - Development tools used
  - Last update date

### 6. **SEO Utilities** ✓

- **Files**:
  - `src/utils/seoMetaTags.js`
  - `src/hooks/usePageMeta.js`
- **Features**:
  - Dynamic meta tag updates
  - Structured data generation
  - Product and Article schema helpers
  - React hook for easy integration

## 🚀 Usage in Components

### Using the SEO Hook

```jsx
import { usePageMeta } from "../hooks/usePageMeta";

function MyPage() {
  usePageMeta({
    title: "My Page Title | Aluminum Trade",
    description: "Page description for search engines...",
    image: "https://aluminumtrade.com/image.jpg",
    url: "https://aluminumtrade.com/my-page",
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      // ... product details
    },
  });

  return <div>Page content</div>;
}
```

### Using SEO Utilities Directly

```jsx
import { updateMetaTags, addStructuredData } from "../utils/seoMetaTags";

updateMetaTags({
  title: "New Title",
  description: "New description",
});

addStructuredData({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Product Name",
  // ... more details
});
```

## 📋 Best Practices Going Forward

### 1. **Image Optimization**

- Always add descriptive `alt` attributes to images
- Use modern formats (WebP) with fallbacks
- Compress images before uploading
- Example:
  ```jsx
  <img
    src="/image.webp"
    alt="Aluminum sliding door system with modern design"
    loading="lazy"
  />
  ```

### 2. **Heading Structure**

- Use semantic HTML headings (h1, h2, h3...)
- Should only have ONE h1 per page
- Follow logical hierarchy
- Example:
  ```jsx
  <h1>Aluminum Trade</h1>
  <h2>Our Products</h2>
  <h3>Sliding Door Systems</h3>
  ```

### 3. **Links & Navigation**

- Use descriptive anchor text instead of "click here"
- Add internal links to related content
- Use proper rel attributes:
  ```jsx
  <a href="/external-site" rel="noopener noreferrer" target="_blank">
    External Link
  </a>
  ```

### 4. **Page Speed**

- Minimize JavaScript bundle size
- Use code splitting for large components
- Lazy load images and below-fold content
- Monitor Core Web Vitals

### 5. **Schema Markup**

When adding new content types, use appropriate schemas:

- **Products**: Use Product schema
- **Articles/Blog**: Use Article schema
- **Events**: Use Event schema
- **LocalBusiness**: If location-based
- Use Google's [Structured Data Testing Tool](https://search.google.com/test/rich-results) to validate

### 6. **Mobile Optimization**

- Ensure responsive design (already using Tailwind)
- Test on multiple devices
- Ensure touch-friendly interactive elements
- Verify Core Web Vitals on mobile

### 7. **Content Guidelines**

- Write unique meta descriptions (50-160 characters)
- Use natural language with keywords
- Avoid keyword stuffing
- Write descriptive page titles
- Create valuable, original content

## 🔍 Monitoring & Testing

### Tools to Use:

1. **Google Search Console**
   - Submit sitemap: `https://aluminumtrade.com/sitemap.xml`
   - Monitor indexing status
   - Check search performance
   - Fix issues reported

2. **Google PageSpeed Insights**
   - Monitor Core Web Vitals
   - Get performance recommendations

3. **Schema.org Validator**
   - Validate structured data
   - Ensure proper implementation

4. **Lighthouse**
   - Run via Chrome DevTools
   - Check SEO score (target: 90+)

5. **SEMrush or Ahrefs**
   - Analyze backlinks
   - Check keyword rankings
   - Competitor analysis

## 📱 Social Media Meta Tags

Make sure to update these with actual URLs and images:

In `index.html`, update:

- `og:image` - Replace with actual OG image URL
- `twitter:image` - Replace with actual Twitter image URL
- `og:url` & `twitter:url` - Use actual domain

## 🔄 Sitemap & Robots.txt Updates

When adding new pages:

1. **Update `public/sitemap.xml`**:

   ```xml
   <url>
     <loc>https://aluminumtrade.com/new-page</loc>
     <lastmod>2026-02-27</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.8</priority>
   </url>
   ```

2. **Disallow sensitive paths in `public/robots.txt`**:
   ```
   Disallow: /admin/
   Disallow: /private/
   ```

## ⚙️ Configuration Notes

### Vite Configuration

- Ensure `public/` files are served correctly
- The `robots.txt`, `sitemap.xml`, and `humans.txt` will be automatically served from the public directory

### Domain Configuration

Replace `https://aluminumtrade.com` with your actual domain in:

- `index.html` (meta tags and JSON-LD)
- `public/sitemap.xml`
- `public/robots.txt`
- `src/utils/seoMetaTags.js` (DEFAULT_META)

## 🎯 Quick SEO Checklist

Before launch:

- [ ] Update all domain URLs from placeholder
- [ ] Create and upload actual OG images
- [ ] Submit sitemap to Google Search Console
- [ ] Submit site to Bing Webmaster Tools
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test structured data with Schema validator
- [ ] Run PageSpeed Insights
- [ ] Check Lighthouse SEO score
- [ ] Verify robots.txt allows all content
- [ ] Test social sharing (use URL debugger tools)

## 📚 Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Web.dev by Google](https://web.dev/lighthouse-seo/)
- [Schema.org Documentation](https://schema.org/)
- [MDN Web Docs - SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO)
- [Content Guidelines](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

**Last Updated**: 2026-02-27
**Maintained By**: Clifford Arnejo
