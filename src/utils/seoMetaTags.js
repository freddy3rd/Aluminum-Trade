/**
 * SEO Meta Tags Utility
 * Dynamically updates meta tags in the document head
 */

const DEFAULT_META = {
  title: "Aluminum Trade | Premium Architectural Aluminum Systems",
  description:
    "Discover innovative aluminum architectural systems that bridge design and functionality. Premium solutions for modern construction and design projects.",
  image: "https://aluminumtrade.com/og-image.jpg",
  url: "https://aluminumtrade.com/",
  author: "Aluminum Trade",
  twitterHandle: "@aluminumtrade",
  type: "website",
};

/**
 * Update meta tags in the document head
 * @param {Object} meta - Meta tag configuration
 */
export const updateMetaTags = (meta = {}) => {
  const config = { ...DEFAULT_META, ...meta };

  // Update title
  document.title = config.title;
  updateOrCreateMeta("og:title", config.title);
  updateOrCreateMeta("twitter:title", config.title);

  // Update description
  updateOrCreateMeta("description", config.description);
  updateOrCreateMeta("og:description", config.description);
  updateOrCreateMeta("twitter:description", config.description);

  // Update image
  updateOrCreateMeta("og:image", config.image);
  updateOrCreateMeta("twitter:image", config.image);

  // Update URL
  updateOrCreateMeta("og:url", config.url);
  updateOrCreateMeta("twitter:url", config.url);

  // Update type
  updateOrCreateMeta("og:type", config.type);

  // Update canonical URL
  updateOrCreateCanonical(config.url);
};

/**
 * Update or create a meta tag
 * @param {string} property - Meta property or name
 * @param {string} content - Meta content
 * @param {string} isProperty - Whether to use property (og:) or name attribute
 */
const updateOrCreateMeta = (property, content, isProperty = true) => {
  const selector = isProperty
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`;
  let meta = document.querySelector(selector);

  if (meta) {
    meta.setAttribute(isProperty ? "content" : "content", content);
  } else {
    meta = document.createElement("meta");
    meta.setAttribute(isProperty ? "property" : "name", property);
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
  }
};

/**
 * Update or create canonical link
 * @param {string} url - Canonical URL
 */
const updateOrCreateCanonical = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (canonical) {
    canonical.setAttribute("href", url);
  } else {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", url);
    document.head.appendChild(canonical);
  }
};

/**
 * Add structured data (JSON-LD) to the page
 * @param {Object} structuredData - Structured data object
 */
export const addStructuredData = (structuredData) => {
  if (!structuredData) return;

  const script = document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

/**
 * Creates common structured data for products
 * @param {Object} product - Product data
 * @returns {Object} Structured data object
 */
export const createProductStructuredData = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "Aluminum Trade",
    },
    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: product.currency || "USD",
      price: product.price,
      availability: product.availability || "https://schema.org/InStock",
    },
  };
};

/**
 * Creates common structured data for articles
 * @param {Object} article - Article data
 * @returns {Object} Structured data object
 */
export const createArticleStructuredData = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      "@type": "Organization",
      name: "Aluminum Trade",
    },
  };
};

export default {
  updateMetaTags,
  addStructuredData,
  createProductStructuredData,
  createArticleStructuredData,
};
