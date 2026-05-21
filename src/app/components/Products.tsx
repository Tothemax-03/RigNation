import { useState, useMemo } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { products, categories, brands } from './data/products';
import { formatUsdAsPhp } from '../utils/currency';

interface ProductsProps {
  navigateTo: (page: string) => void;
}

export function Products({ navigateTo }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { user, favorites, addToFavorites, removeFromFavorites, addToCart, showAuthDialog } = useAuth();

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, sortBy]);

  const handleAddToCart = (product: any) => {
    if (product.isLimitedStock && !user) {
      showAuthDialog('Purchase Limited Stock Item', 'Please sign in to purchase limited stock items.');
      return;
    }
    
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      removeFromFavorites(productId);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(productId);
      // Success handled by AuthContext if signed in
      if (user) {
        toast.success('Added to favorites');
      }
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">PC Components</h1>
          <p className="text-muted-foreground">
            Browse our extensive collection of high-quality PC parts
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-lg mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative cursor-pointer" onClick={() => navigateTo(`product-${product.id}`)}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                {product.isLimitedStock && (
                  <Badge className="absolute top-2 left-2 bg-destructive">
                    Limited Stock
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 
                  className="font-semibold mb-1 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => navigateTo(`product-${product.id}`)}
                >
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({product.rating})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-primary">
                    {formatUsdAsPhp(product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigateTo(`product-${product.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}