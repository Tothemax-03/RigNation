import { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { User, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { toast } from "sonner";
import { formatUsdAsPhp } from '../utils/currency';

interface UserProfileProps {
  navigateTo: (page: string) => void;
}

const mockOrders = [
  {
    id: '#1234',
    date: '2024-01-20',
    status: 'delivered',
    total: 1299,
    items: [
      { name: 'Intel Core i9-13900K', price: 599, quantity: 1 },
      { name: 'NVIDIA RTX 4080', price: 1199, quantity: 1 }
    ]
  },
  {
    id: '#1235',
    date: '2024-01-15',
    status: 'shipped',
    total: 899,
    items: [
      { name: 'AMD RX 7800 XT', price: 899, quantity: 1 }
    ]
  },
  {
    id: '#1236',
    date: '2024-01-10',
    status: 'processing',
    total: 499,
    items: [
      { name: 'Corsair Vengeance 32GB DDR5', price: 299, quantity: 1 },
      { name: 'Samsung 980 PRO 2TB', price: 199, quantity: 1 }
    ]
  }
];

export function UserProfile({ navigateTo }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    zipCode: '10001'
  });

  if (!user) {
    navigateTo('signin');
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = mockOrders.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and view your order history
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* User Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockOrders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {completedOrders} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatUsdAsPhp(totalSpent)}</div>
                  <p className="text-xs text-muted-foreground">
                    Lifetime value
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2024</div>
                  <p className="text-xs text-muted-foreground">
                    Valued customer
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">{formatUsdAsPhp(order.total)}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="font-semibold mt-1">{formatUsdAsPhp(order.total)}</p>
                        </div>
                      </div>
                      
                      <Separator className="mb-4" />
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>{formatUsdAsPhp(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Save Changes</Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={signOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}