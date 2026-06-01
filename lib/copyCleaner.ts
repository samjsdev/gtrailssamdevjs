/**
 * Utility functions for cleaning up scraped Google Maps SEO keyword stuffing and other junk text
 * from business names, descriptions, and taglines.
 */

/**
 * Cleans a business name by removing trailing spaces, pipes, and SEO suffixes.
 * E.g., "SKETCHLAB | Interior Designers in Pallikaranai..." -> "SKETCHLAB"
 */
export function cleanClinicName(name: string): string {
  if (!name) return "";
  let cleaned = name.trim();
  
  // Split on typical SEO dividers
  if (cleaned.includes('|')) {
    cleaned = cleaned.split('|')[0].trim();
  }
  if (cleaned.includes(' - ')) {
    cleaned = cleaned.split(' - ')[0].trim();
  }
  
  return cleaned;
}

/**
 * Cleans a scraped description by removing standard Google Maps intro boilerplate and keyword stuffing.
 * E.g., "Welcome to SKETCHLAB | Interior Designers... We create refined..." -> "We create refined..."
 */
export function cleanClinicDescription(description: string, name: string): string {
  if (!description) return "";
  
  let cleaned = description.trim();
  const rawName = name || "";
  const nameTrimmed = cleanClinicName(rawName);
  
  if (nameTrimmed) {
    // Regex escape the name
    const escapedName = nameTrimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Pattern to match "Welcome to [Name] | [SEO junk]... " or "Welcome to [Name]. "
    // We look for "Welcome to" followed by the name, then any character non-greedily,
    // up to an ellipsis or a period, followed by a space and a capital letter.
    const pattern = new RegExp(`Welcome to\\s+${escapedName}[^]*?(\\.\\.\\.|\\.)\\s*(?=[A-Z])`, 'i');
    
    if (pattern.test(cleaned)) {
      cleaned = cleaned.replace(pattern, '');
    } else {
      // Fallback: match welcome to name and everything up to the first dot or ellipsis
      const fallbackPattern = new RegExp(`Welcome to\\s+${escapedName}[^\\.\\!]*(\\.\\.\\.|\\.)?`, 'i');
      cleaned = cleaned.replace(fallbackPattern, '');
    }
  }
  
  cleaned = cleaned.trim();
  
  // Ensure the description starts with a capitalized letter
  if (cleaned) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  } else {
    // Elegant default interior description
    cleaned = "We create refined, functional interiors tailored to your lifestyle, budget, and space.";
  }
  
  return cleaned;
}
