import { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { formatUsdAsPhp } from '../utils/currency';

interface CartProps {
  navigateTo: (page: string) => void;
}

export function Cart({ navigateTo }: CartProps) {
  const { user, cart, updateCartQuantity, removeFromCart, clearCart } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThresholdUsd = 100;
  const shippingBaseUsd = 15;
  const shipping = subtotal > freeShippingThresholdUsd ? 0 : shippingBaseUsd;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      toast.success('Order placed successfully! You will receive a confirmation email shortly.');
      navigateTo('home');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart to get started.
            </p>
            <Button onClick={() => navigateTo('products')}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatUsdAsPhp(item.price)} each
                        </p>
                        {item.stock <= 10 && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Only {item.stock} left
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatUsdAsPhp(item.price * item.quantity, { withCents: true })}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < cart.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatUsdAsPhp(subtotal, { withCents: true })}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      formatUsdAsPhp(shipping, { withCents: true })
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatUsdAsPhp(tax, { withCents: true })}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatUsdAsPhp(total, { withCents: true })}</span>
                </div>

                {subtotal < freeShippingThresholdUsd && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatUsdAsPhp(freeShippingThresholdUsd - subtotal, { withCents: true })} more for free shipping
                  </p>
                )}

                <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Checkout</DialogTitle>
                      <DialogDescription>
                        {user ? 'Review and update your information' : 'Please fill in your details'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={orderForm.city}
                            onChange={(e) => setOrderForm({...orderForm, city: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={orderForm.zipCode}
                            onChange={(e) => setOrderForm({...orderForm, zipCode: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatUsdAsPhp(total, { withCents: true })}</span>
                      </div>

                      <Button type="submit" className="w-full">
                        Confirm Order
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigateTo('products')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}