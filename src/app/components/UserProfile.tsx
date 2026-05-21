import { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { User, ShoppingBag, Settings, LogOut, Truck, PackageCheck, Clock3 } from 'lucide-react';
import { toast } from 'sonner';
import { formatUsdAsPhp } from '../utils/currency';

interface UserProfileProps {
  navigateTo: (page: string) => void;
}

export function UserProfile({ navigateTo }: UserProfileProps) {
  const { user, signOut, orders } = useAuth();
  const [activeTab, setActiveTab] = useState(() => (localStorage.getItem('lastOrderId') ? 'orders' : 'overview'));
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
      case 'pending': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrackingIcon = (completed: boolean, finalStep: boolean) => {
    if (completed && finalStep) return <PackageCheck className="h-4 w-4" />;
    if (completed) return <Truck className="h-4 w-4" />;
    return <Clock3 className="h-4 w-4" />;
  };

  const userOrders = orders
    .filter((order) => order.email.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestOrder = userOrders[0];
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = userOrders.filter(order => order.status === 'delivered').length;

  const renderTrackingTimeline = (order: typeof userOrders[number]) => (
    <div className="space-y-3">
      {order.tracking.steps.map((step, index) => (
        <div key={step.label} className="flex items-start gap-3">
          <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {getTrackingIcon(step.completed, index === order.tracking.steps.length - 1)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{step.label}</p>
              <Badge variant={step.completed ? 'default' : 'secondary'}>{step.completed ? 'Done' : 'Pending'}</Badge>
            </div>
            {step.timestamp && <p className="text-xs text-muted-foreground">{new Date(step.timestamp).toLocaleString()}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and view your order history
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userOrders.length}</div>
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
                  <p className="text-xs text-muted-foreground">Valued customer</p>
                </CardContent>
              </Card>
            </div>

            {latestOrder && (
              <Card>
                <CardHeader>
                  <CardTitle>Latest Order Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold">Order {latestOrder.id}</p>
                      <p className="text-sm text-muted-foreground">Tracking {latestOrder.tracking.number} • ETA {latestOrder.tracking.eta}</p>
                    </div>
                    <Badge className={getStatusColor(latestOrder.status)}>{latestOrder.status}</Badge>
                  </div>
                  {renderTrackingTimeline(latestOrder)}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No orders yet. Once you place an order, you will see tracking updates here.</p>
                ) : (
                  <div className="space-y-4">
                    {userOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <p className="mt-1 font-medium">{formatUsdAsPhp(order.total)}</p>
                          <p className="text-sm text-muted-foreground">Tracking {order.tracking.number}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-8 text-center">
                    <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No tracked orders yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Place an order from the cart and your tracking details will appear here.</p>
                    <Button className="mt-4" onClick={() => navigateTo('products')}>Browse Products</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-6 space-y-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">Placed {new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            <p className="font-semibold mt-1">{formatUsdAsPhp(order.total)}</p>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/30 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium">Tracking number</p>
                              <p className="text-sm text-muted-foreground">{order.tracking.number} • {order.tracking.carrier}</p>
                            </div>
                            <p className="text-sm font-medium">ETA {order.tracking.eta}</p>
                          </div>
                        </div>

                        <Separator />

                        {renderTrackingTimeline(order)}

                        <Separator />

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm gap-4">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>{formatUsdAsPhp(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
