import { useAuth } from '../App';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Star, LogIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { formatUsdAsPhp } from '../utils/currency';

interface FavoritesProps {
  navigateTo: (page: string) => void;
}

import { products } from './data/products';

export function Favorites({ navigateTo }: FavoritesProps) {
  const { user, favorites, removeFromFavorites, addToCart } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sign in to view favorites</h2>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to access your favorite products.
            </p>
            <Button onClick={() => navigateTo('signin')}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId);
    toast.success('Removed from favorites');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
          <p className="text-muted-foreground">
            Your saved products ({favoriteProducts.length} items)
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start browsing and add products to your favorites to see them here.
              </p>
              <Button onClick={() => navigateTo('products')}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
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
                      handleRemoveFromFavorites(product.id);
                    }}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
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
        )}
      </div>
    </div>
  );
}