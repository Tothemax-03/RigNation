import { BarChart3, Package, ShoppingBag, Users, LogOut, Computer } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../App';

interface AdminSidebarProps {
  currentPage: string;
  navigateTo: (page: string) => void;
}

export function AdminSidebar({ currentPage, navigateTo }: AdminSidebarProps) {
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: BarChart3
    },
    {
      id: 'admin-orders',
      label: 'Orders',
      icon: ShoppingBag
    },
    {
      id: 'admin-products',
      label: 'Products',
      icon: Package
    },
    {
      id: 'admin-users',
      label: 'Admin Users',
      icon: Users
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Computer className="h-8 w-8 text-sidebar-primary" />
          <span className="text-xl font-bold text-sidebar-primary">PC Builder Admin</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigateTo(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
        <div className="mb-4">
          <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
          <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}