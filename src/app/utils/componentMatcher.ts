/**
 * Component Matcher - Finds products based on AI-suggested component names
 * Provides fuzzy matching for flexible component lookup
 */

import { Product } from '../components/data/products';

/**
 * Finds a component by exact or fuzzy name match within a category
 * @param componentName - Name of component to find (e.g., "Intel Core i9-14900K")
 * @param category - Category to search in (CPU, GPU, RAM, etc.)
 * @param products - Array of products to search through
 * @returns Product if found, null otherwise
 */
export function findComponentByName(
  componentName: string,
  category: string,
  products: Product[]
): Product | null {
  if (!componentName || !category) {
    return null;
  }

  // Filter by category first
  const categoryProducts = products.filter(p => p.category === category);

  if (categoryProducts.length === 0) {
    return null;
  }

  // Exact match (case-insensitive)
  const exactMatch = categoryProducts.find(
    p => p.name.toLowerCase() === componentName.toLowerCase()
  );

  if (exactMatch) {
    return exactMatch;
  }

  // Fuzzy match - check if product name contains key parts of the search term
  const searchTerms = componentName.toLowerCase().split(/[\s\-()]+/).filter(Boolean);
  const fuzzyMatches = categoryProducts.filter(product => {
    const productNameLower = product.name.toLowerCase();
    // Check if product contains at least 70% of search terms
    const matchedTerms = searchTerms.filter(term => productNameLower.includes(term));
    return matchedTerms.length >= Math.ceil(searchTerms.length * 0.7);
  });

  // Return first fuzzy match if found
  if (fuzzyMatches.length > 0) {
    return fuzzyMatches[0];
  }

  // If still no match, try matching by brand + category
  const brandMatch = categoryProducts.find(product => {
    const productNameLower = product.name.toLowerCase();
    return searchTerms.some(term => productNameLower.includes(term));
  });

  return brandMatch || null;
}

/**
 * Finds multiple components by name for a complete build
 * @param components - Object with component names keyed by category
 * @param products - Array of products to search through
 * @returns Object with matched products and list of missing components
 */
export function findBuildComponents(
  components: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard: string;
    psu: string;
    case: string;
  },
  products: Product[]
) {
  const categoryMap: { [key: string]: string } = {
    cpu: 'CPU',
    gpu: 'GPU',
    ram: 'RAM',
    storage: 'Storage',
    motherboard: 'Motherboard',
    psu: 'PSU',
    case: 'Case'
  };

  const results: { [key: string]: Product | null } = {};
  const missing: string[] = [];

  for (const [key, componentName] of Object.entries(components)) {
    const category = categoryMap[key];
    const found = findComponentByName(componentName, category, products);
    results[key] = found;

    if (!found) {
      missing.push(`${category}: ${componentName}`);
    }
  }

  return { results, missing };
}

/**
 * Calculates total build statistics
 * @param components - Array of found products
 * @returns Object with total price and power draw
 */
export function calculateBuildStats(components: (Product | null)[]) {
  const validComponents = components.filter((c) => c !== null) as Product[];

  const totalPrice = validComponents.reduce((sum, component) => sum + component.price, 0);
  const totalPower = validComponents.reduce(
    (sum, component) => sum + component.powerConsumption,
    0
  );

  return {
    totalPrice,
    totalPower,
    componentCount: validComponents.length
  };
}
