import { useState, useMemo } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { formatUsdAsPhp } from '../../utils/currency';

interface AdminOrdersProps {
  navigateTo: (page: string) => void;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: '#1234',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2024-01-20',
    status: 'delivered',
    total: 1299,
    items: [
      { name: 'Intel Core i9-13900K', quantity: 1, price: 599 },
      { name: 'NVIDIA RTX 4080', quantity: 1, price: 700 }
    ],
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: '#1235',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-01-19',
    status: 'processing',
    total: 899,
    items: [
      { name: 'AMD RX 7800 XT', quantity: 1, price: 899 }
    ],
    address: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: '#1236',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    date: '2024-01-18',
    status: 'shipped',
    total: 2199,
    items: [
      { name: 'Custom PC Build', quantity: 1, price: 2199 }
    ],
    address: '789 Pine Rd, Chicago, IL 60601'
  },
  {
    id: '#1237',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    date: '2024-01-17',
    status: 'pending',
    total: 1599,
    items: [
      { name: 'AMD Ryzen 9 7900X', quantity: 1, price: 549 },
      { name: 'ASUS ROG Strix Z790-E', quantity: 1, price: 449 },
      { name: 'Corsair Vengeance 32GB DDR5', quantity: 2, price: 299 }
    ],
    address: '321 Elm St, Houston, TX 77001'
  },
  {
    id: '#1238',
    customer: 'Tom Brown',
    email: 'tom@example.com',
    date: '2024-01-16',
    status: 'cancelled',
    total: 799,
    items: [
      { name: 'Samsung 980 PRO 2TB', quantity: 4, price: 199 }
    ],
    address: '654 Maple Dr, Phoenix, AZ 85001'
  }
];

export function AdminOrders({ navigateTo }: AdminOrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [ordersSource, setOrdersSource] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('orders');
      if (saved) {
        const parsed = JSON.parse(saved) as any[];
        // Map persisted orders to admin Order shape when possible
        return parsed.map((o) => ({
          id: o.id || o.orderId || '#',
          customer: o.customer || o.name || o.customerName || 'Unknown',
          email: o.email || o.customerEmail || '',
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : (o.date || ''),
          status: o.status || 'pending',
          total: o.total || 0,
          items: (o.items || []).map((it: any) => ({ name: it.name, quantity: it.quantity || it.qty || 1, price: it.price || 0 })),
          address: o.address || ''
        }));
      }
    } catch (e) {
      // ignore parse errors and fall back to mockOrders
    }
    return mockOrders;
  });

  const filteredOrders = useMemo(() => {
    let filtered = ordersSource.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'total-high':
          return b.total - a.total;
        case 'total-low':
          return a.total - b.total;
        case 'customer':
          return a.customer.localeCompare(b.customer);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy, ordersSource]);

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

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Orders Management</h1>
        <p className="text-muted-foreground">
          View and manage all customer orders
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersSource.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">
              {ordersSource.filter(o => o.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ordersSource.filter(o => o.status === 'processing').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatUsdAsPhp(ordersSource.reduce((sum, order) => sum + order.total, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders, customers, or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date: Newest</SelectItem>
                <SelectItem value="date-asc">Date: Oldest</SelectItem>
                <SelectItem value="total-high">Total: High to Low</SelectItem>
                <SelectItem value="total-low">Total: Low to High</SelectItem>
                <SelectItem value="customer">Customer A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Clear orders where customer is John Doe
                const remaining = ordersSource.filter(o => o.customer !== 'John Doe');
                setOrdersSource(remaining);
                try {
                  const saved = localStorage.getItem('orders');
                  if (saved) {
                    const parsed = JSON.parse(saved) as any[];
                    const filtered = parsed.filter(p => (p.customer || p.name) !== 'John Doe');
                    localStorage.setItem('orders', JSON.stringify(filtered));
                  }
                } catch (e) {
                  console.error('Failed to update persisted orders', e);
                }
              }}
            >
              Clear John Doe Orders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-medium">{formatUsdAsPhp(order.total)}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>
                            Complete order information and items
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedOrder && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">Customer Information</h3>
                                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                                <p><strong>Email:</strong> {selectedOrder.email}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">Order Information</h3>
                                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                                <p><strong>Date:</strong> {selectedOrder.date}</p>
                                <p><strong>Status:</strong> 
                                  <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                                    {selectedOrder.status}
                                  </Badge>
                                </p>
                                <p><strong>Total:</strong> {formatUsdAsPhp(selectedOrder.total)}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Items</h3>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item, index) => (
                                  <div key={index} className="flex justify-between p-2 border rounded">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>{formatUsdAsPhp(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}