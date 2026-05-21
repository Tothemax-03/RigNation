import { ShoppingCart, Heart, User, Computer, Package, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavbarProps {
  currentPage: string;
  navigateTo: (page: any) => void;
}

export function Navbar({ currentPage, navigateTo }: NavbarProps) {
  const { user, signOut, cart, favorites } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/15 bg-slate-950/65 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <Computer className="h-8 w-8 text-primary" />
              <span className="text-xl font-black tracking-tight text-white">RigNation</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => navigateTo('home')}
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'products' ? 'default' : 'ghost'}
              onClick={() => navigateTo('products')}
            >
              <Package className="h-4 w-4 mr-2" />
              Products
            </Button>
            <Button
              variant={currentPage === 'custom-pc' ? 'default' : 'ghost'}
              onClick={() => navigateTo('custom-pc')}
            >
              <Computer className="h-4 w-4 mr-2" />
              Custom PC
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('favorites')}
                  className="relative"
                >
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('cart')}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('profile')}
                >
                  <User className="h-5 w-5 mr-2" />
                  {user.name}
                </Button>
                {user.isAdmin && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigateTo('admin-dashboard')}
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('cart')}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('signin')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigateTo('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-white/10">
        <div className="px-4 py-2 space-y-1">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigateTo('home')}
          >
            Home
          </Button>
          <Button
            variant={currentPage === 'products' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigateTo('products')}
          >
            <Package className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button
            variant={currentPage === 'custom-pc' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigateTo('custom-pc')}
          >
            <Computer className="h-4 w-4 mr-2" />
            Custom PC
          </Button>
        </div>
      </div>
    </nav>
  );
}