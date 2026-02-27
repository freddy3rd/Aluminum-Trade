import { useEffect } from "react";
import { updateMetaTags, addStructuredData } from "./seoMetaTags";

/**
 * React Hook to update meta tags and structured data
 * Usage: usePageMeta({ title: 'Page Title', description: '...', structuredData: {...} })
 */
export const usePageMeta = (config = {}) => {
  useEffect(() => {
    // Update meta tags
    if (config.title || config.description || config.image) {
      updateMetaTags({
        title: config.title,
        description: config.description,
        image: config.image,
        url: config.url,
        type: config.type,
      });
    }

    // Add structured data if provided
    if (config.structuredData) {
      addStructuredData(config.structuredData);
    }
  }, [
    config.title,
    config.description,
    config.image,
    config.url,
    config.structuredData,
  ]);
};

export default usePageMeta;
