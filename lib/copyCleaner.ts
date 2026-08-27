import {
  DEFAULT_ARCHITECTURE_SERVICES,
  DEFAULT_ARCHITECTURE_HIGHLIGHTS,
} from './architectureContent';

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

/**
 * Cleans an architectural business tagline, replacing interior/decorator copy with architectural positioning.
 */
export function cleanArchitectureTagline(
  tagline: string | undefined,
  defaultTagline = 'Thoughtful Architecture for Everyday Living'
): string {
  if (!tagline) return defaultTagline;
  const lower = tagline.toLowerCase();
  if (
    lower.includes('interior') ||
    lower.includes('decor') ||
    lower.includes('furnish') ||
    lower.includes('modular') ||
    lower.includes('cupboard') ||
    lower.includes('curtain') ||
    lower.includes('thoughtful interiors')
  ) {
    return defaultTagline;
  }
  return tagline.trim();
}

/**
 * Cleans an architectural firm description, replacing any interior design boilerplate with architecture copy.
 */
export function cleanArchitectureDescription(
  description: string | undefined,
  name: string,
  city = 'Chennai',
  defaultDesc?: string
): string {
  const fallback =
    defaultDesc ||
    `We design and build refined, functional villas, residential homes, and commercial spaces tailored to your plot, budget, and lifestyle.`;
  if (!description) return fallback;

  const cleaned = cleanClinicDescription(description, name);
  const lower = cleaned.toLowerCase();

  // If the description mentions interior, decor, modular kitchen, furniture, or is the default interior copy
  if (
    lower.includes('interior') ||
    lower.includes('decor') ||
    lower.includes('furnish') ||
    lower.includes('modular') ||
    lower.includes('cupboard') ||
    lower.includes('curtain') ||
    lower.includes('lifestyle, budget, and space') ||
    lower.includes('thoughtful interiors')
  ) {
    return fallback;
  }

  return cleaned || fallback;
}

/**
 * Cleans services list for an architecture firm, stripping interior/modular items and falling back to architecture disciplines.
 */
export function cleanArchitectureServices(
  services: string[] | undefined,
  defaultServices: string[] = DEFAULT_ARCHITECTURE_SERVICES
): string[] {
  if (!services || services.length === 0) return defaultServices;

  const isInterior = (s: string) =>
    /interior|modular|kitchen|styling|makeover|furniture|curtain|wardrobe|cupboard|decor/i.test(s);

  const filtered = services.filter((s) => !isInterior(s));

  if (filtered.length < 3) {
    return defaultServices;
  }

  return filtered;
}

/**
 * Cleans highlights list for an architecture firm, ensuring structural & architectural standards.
 */
export function cleanArchitectureHighlights(
  highlights: string[] | undefined,
  defaultHighlights: string[] = DEFAULT_ARCHITECTURE_HIGHLIGHTS
): string[] {
  if (!highlights || highlights.length === 0) return defaultHighlights;

  const isInterior = (h: string) =>
    /interior|decor|furnish|finish guidance|styling|design concepts/i.test(h);
  const filtered = highlights.filter((h) => !isInterior(h));

  if (filtered.length < 3) {
    return defaultHighlights;
  }

  return filtered;
}

/**
 * Cleans doctor / principal specialization for an architecture firm.
 */
export function cleanArchitectureSpecialization(
  specialization: string | undefined,
  defaultSpec = 'Architecture & Turnkey Construction'
): string {
  if (!specialization) return defaultSpec;
  if (/interior|decor|furnish/i.test(specialization)) {
    return defaultSpec;
  }
  return specialization;
}

