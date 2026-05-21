import { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { products } from './data/products';
import { formatUsdAsPhp } from '../utils/currency';

interface ProductDetailsProps {
  productId: string;
  navigateTo: (page: string) => void;
}

export function ProductDetails({ productId, navigateTo }: ProductDetailsProps) {
  const { user, addToCart, addToFavorites, removeFromFavorites, favorites, showAuthDialog } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigateTo('products')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const isInStock = product.stock > 0;

  const categoryGalleryImages: Record<string, string[]> = {
    CPU: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fit=crop',
    ],
    GPU: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
    ],
    Motherboard: [
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80&fit=crop',
    ],
    RAM: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800&q=80&fit=crop',
    ],
    Storage: [
      'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
    ],
    PSU: [
      'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&fit=crop',
    ],
    Case: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80&fit=crop',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80&fit=crop',
    ],
  };

  const productImages = [
    product.image,
    ...(categoryGalleryImages[product.category] ?? categoryGalleryImages.CPU),
  ];

  // Mock reviews
  const reviews = [
    {
      id: '1',
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Very satisfied with the performance.',
      date: '2024-01-15'
    },
    {
      id: '2',
      user: 'Sarah M.',
      rating: 4,
      comment: 'Good quality and fast delivery. Recommended!',
      date: '2024-01-10'
    },
    {
      id: '3',
      user: 'Mike R.',
      rating: 5,
      comment: 'Perfect for my gaming setup. Works flawlessly.',
      date: '2024-01-05'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!user) {
      showAuthDialog('Add to Cart', 'Please sign in to add items to your cart.');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      showAuthDialog('Add to Favorites', 'Please sign in to add items to your favorites.');
      return;
    }

    if (isFavorite) {
      removeFromFavorites(product.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(product.id);
      toast.success('Added to favorites');
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigateTo('products')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.category} component detail photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">
                {formatUsdAsPhp(product.price)}
              </p>
              <p className="text-muted-foreground mb-6">
                {product.description || `High-quality ${product.category.toLowerCase()} from ${product.brand}. Perfect for gaming and professional use.`}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                {isInStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            {isInStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleToggleFavorite}
                    className="px-4"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over {formatUsdAsPhp(100)}</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Manufacturer warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30 Day Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">General</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand:</span>
                          <span>{product.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span>{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model:</span>
                          <span>{product.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    {product.specs && (
                      <div>
                        <h4 className="font-semibold mb-2">Technical Details</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(averageRating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold">{averageRating.toFixed(1)} out of 5</span>
                      <span className="text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{review.user}</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Returns Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Options</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Standard Shipping (5-7 business days):</span>
                        <span>Free on orders over {formatUsdAsPhp(100)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Express Shipping (2-3 business days):</span>
                        <span>{formatUsdAsPhp(15.99, { withCents: true })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Day Delivery:</span>
                        <span>{formatUsdAsPhp(29.99, { withCents: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Return Policy</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>â€¢ 30-day return window from date of delivery</p>
                      <p>â€¢ Items must be unused and in original packaging</p>
                      <p>â€¢ Free return shipping for defective items</p>
                      <p>â€¢ Refund processed within 5-7 business days</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Warranty</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>â€¢ 2-year manufacturer warranty included</p>
                      <p>â€¢ Covers manufacturing defects and hardware failures</p>
                      <p>â€¢ Extended warranty options available at checkout</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {relatedProduct.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedProduct.brand}</p>
                    <p className="font-bold text-primary">{formatUsdAsPhp(relatedProduct.price)}</p>
                    <Button 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={() => navigateTo(`product-${relatedProduct.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}