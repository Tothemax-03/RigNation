import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { formatUsdAsPhp } from '../../utils/currency';

interface AdminDashboardProps {
  navigateTo: (page: string) => void;
}

const salesData = [
  { month: 'Jan', revenue: 12000, orders: 45 },
  { month: 'Feb', revenue: 15000, orders: 52 },
  { month: 'Mar', revenue: 18000, orders: 61 },
  { month: 'Apr', revenue: 22000, orders: 75 },
  { month: 'May', revenue: 25000, orders: 83 },
  { month: 'Jun', revenue: 28000, orders: 91 }
];

const categoryData = [
  { name: 'CPU', value: 35, color: '#8884d8' },
  { name: 'GPU', value: 28, color: '#82ca9d' },
  { name: 'RAM', value: 15, color: '#ffc658' },
  { name: 'Storage', value: 12, color: '#ff7300' },
  { name: 'Other', value: 10, color: '#00ff88' }
];

const recentOrders = [
  { id: '#1234', customer: 'John Doe', total: 1299, status: 'completed', date: '2024-01-20' },
  { id: '#1235', customer: 'Jane Smith', total: 899, status: 'processing', date: '2024-01-20' },
  { id: '#1236', customer: 'Mike Johnson', total: 2199, status: 'pending', date: '2024-01-19' },
  { id: '#1237', customer: 'Sarah Wilson', total: 1599, status: 'completed', date: '2024-01-19' },
  { id: '#1238', customer: 'Tom Brown', total: 799, status: 'shipped', date: '2024-01-18' }
];

export function AdminDashboard({ navigateTo }: AdminDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'shipped': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUsdAsPhp(128450)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500">+23</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Revenue & Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'Revenue (₱)' && typeof value === 'number') {
                      return [formatUsdAsPhp(value), name];
                    }

                    return [value, name];
                  }}
                />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₱)" />
                <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <div className="text-right">
                    <p className="font-medium">{formatUsdAsPhp(order.total)}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}