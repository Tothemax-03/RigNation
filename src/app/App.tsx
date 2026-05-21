import { useState, useEffect, createContext, useContext } from 'react';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';
import { Products } from './components/Products';
import { ProductDetails } from './components/ProductDetails';
import { Favorites } from './components/Favorites';
import { Cart } from './components/Cart';
import { CustomPC } from './components/CustomPC';
import { UserProfile } from './components/UserProfile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminUsers } from './components/admin/AdminUsers';
import { Navbar } from './components/Navbar';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AuthDialog } from './components/AuthDialog';

// Auth Context
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => void;
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  showAuthDialog: (title?: string, message?: string) => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

type Page = 'home' | 'signin' | 'signup' | 'forgot-password' | 'products' | 'favorites' | 'cart' | 'custom-pc' | 'profile' | 'admin-dashboard' | 'admin-orders' | 'admin-products' | 'admin-users' | string;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [authDialog, setAuthDialog] = useState({
    isOpen: false,
    title: 'Authentication Required',
    message: 'Please sign in to continue with this action.'
  });

  // Mock users data
  const mockUsers = [
    { id: '1', email: 'user@example.com', password: 'password', name: 'John Doe' },
    { id: '2', email: 'admin@example.com', password: 'admin', name: 'Admin User', isAdmin: true }
  ];

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Redirect admin users to admin dashboard
      if (userWithoutPassword.isAdmin) {
        setCurrentPage('admin-dashboard');
      }
      
      return true;
    }
    return false;
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - in real app would make API call
    const newUser = { id: Date.now().toString(), email, name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const signOut = () => {
    const wasAdmin = user?.isAdmin;
    setUser(null);
    setFavorites([]);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    localStorage.removeItem('cart');
    
    // Redirect to appropriate page based on user type
    if (wasAdmin) {
      setCurrentPage('signin');
    } else {
      setCurrentPage('home');
    }
  };

  const showAuthDialog = (title?: string, message?: string) => {
    setAuthDialog({
      isOpen: true,
      title: title || 'Authentication Required',
      message: message || 'Please sign in to continue with this action.'
    });
  };

  const addToFavorites = (productId: string) => {
    if (!user) {
      showAuthDialog('Add to Favorites', 'Please sign in to add items to your favorites.');
      return;
    }
    const newFavorites = [...favorites, productId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addToCart = (product: any, quantity = 1) => {
    if (!user) {
      showAuthDialog('Add to Cart', 'Please sign in to add items to your cart.');
      return;
    }
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateCartQuantity(product.id, existingItem.quantity + quantity);
    } else {
      const newCart = [...cart, { ...product, quantity }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    const savedCart = localStorage.getItem('cart');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Redirect admin to dashboard on page load
      if (parsedUser.isAdmin && currentPage === 'home') {
        setCurrentPage('admin-dashboard');
      }
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Visual-only reveal animation hook for sections/cards marked with data-reveal.
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (revealTargets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [currentPage]);

  const authValue: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
    favorites,
    addToFavorites,
    removeFromFavorites,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    showAuthDialog
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    // If user is admin, only allow admin pages
    if (user?.isAdmin) {
      switch (currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard navigateTo={navigateTo} />;
        case 'admin-orders':
          return <AdminOrders navigateTo={navigateTo} />;
        case 'admin-products':
          return <AdminProducts navigateTo={navigateTo} />;
        case 'admin-users':
          return <AdminUsers navigateTo={navigateTo} />;
        case 'signin':
          return <SignIn navigateTo={navigateTo} />;
        default:
          return <AdminDashboard navigateTo={navigateTo} />;
      }
    }

    // Regular user pages
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'signin':
        return <SignIn navigateTo={navigateTo} />;
      case 'signup':
        return <SignUp navigateTo={navigateTo} />;
      case 'forgot-password':
        return <ForgotPassword navigateTo={navigateTo} />;
      case 'products':
        return <Products navigateTo={navigateTo} />;
      case 'favorites':
        return <Favorites navigateTo={navigateTo} />;
      case 'cart':
        return <Cart navigateTo={navigateTo} />;
      case 'custom-pc':
        return <CustomPC navigateTo={navigateTo} />;
      case 'profile':
        return <UserProfile navigateTo={navigateTo} />;
      default:
        // Check if it's a product details page
        if (currentPage.startsWith('product-')) {
          const productId = currentPage.replace('product-', '');
          return <ProductDetails productId={productId} navigateTo={navigateTo} />;
        }
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen bg-background text-foreground dark">
        {user?.isAdmin ? (
          // Admin Layout - Only admin pages
          <div className="flex">
            <AdminSidebar currentPage={currentPage} navigateTo={navigateTo} />
            <main className="flex-1 ml-64">
              {renderPage()}
            </main>
          </div>
        ) : (
          // Regular User Layout
          <>
            <Navbar currentPage={currentPage} navigateTo={navigateTo} />
            <main>
              {renderPage()}
            </main>
            {/* Major visual change: structured footer with clear navigation and social links. */}
            <footer className="bg-[#050a14] text-slate-200 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">RigNation</h3>
                    <p className="mt-3 text-sm text-slate-300">
                      Premium PC components, compatibility-first shopping, and custom build guidance from experts.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Shop</h4>
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                      <button onClick={() => navigateTo('products')} className="footer-link text-left">All Products</button>
                      <button onClick={() => navigateTo('custom-pc')} className="footer-link text-left">Custom PC Builder</button>
                      <button onClick={() => navigateTo('favorites')} className="footer-link text-left">Favorites</button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Account</h4>
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                      <button onClick={() => navigateTo('profile')} className="footer-link text-left">My Profile</button>
                      <button onClick={() => navigateTo('cart')} className="footer-link text-left">Cart</button>
                      <button onClick={() => navigateTo('signin')} className="footer-link text-left">Sign In</button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Follow</h4>
                    <div className="mt-3 flex items-center gap-3 text-sm">
                      <a className="footer-social" href="#" aria-label="RigNation on X">X</a>
                      <a className="footer-social" href="#" aria-label="RigNation on Instagram">IG</a>
                      <a className="footer-social" href="#" aria-label="RigNation on YouTube">YT</a>
                      <a className="footer-social" href="#" aria-label="RigNation on LinkedIn">IN</a>
                    </div>
                  </div>
                </div>
                <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
                  © {new Date().getFullYear()} RigNation. All rights reserved.
                </div>
              </div>
            </footer>
          </>
        )}
        
        {!user?.isAdmin && (
          <AuthDialog
            isOpen={authDialog.isOpen}
            onClose={() => setAuthDialog(prev => ({ ...prev, isOpen: false }))}
            onSignIn={() => {
              setAuthDialog(prev => ({ ...prev, isOpen: false }));
              navigateTo('signin');
            }}
            onSignUp={() => {
              setAuthDialog(prev => ({ ...prev, isOpen: false }));
              navigateTo('signup');
            }}
            title={authDialog.title}
            message={authDialog.message}
          />
        )}
      </div>
    </AuthContext.Provider>
  );
}