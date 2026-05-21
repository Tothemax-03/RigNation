import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from "sonner";
import { formatUsdAsPhp } from '../../utils/currency';
import { normalizeImageUrl } from '../../utils/imageUrl';

interface AdminProductsProps {
  navigateTo: (page: string) => void;
}

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
  isLimitedStock: boolean;
  description: string;
  isActive: boolean;
  dateAdded: string;
}

import { products as importedProducts } from '../data/products';

// Convert imported products to admin format
const mockProducts: Product[] = importedProducts.map(p => ({
  ...p,
  isActive: p.stock > 0,
  dateAdded: '2024-01-01'
}));

export function AdminProducts({ navigateTo }: AdminProductsProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    brand: '',
    price: 0,
    image: '',
    stock: 0,
    isLimitedStock: false,
    description: '',
    isActive: true
  });

  const categories = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'];
  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && product.isActive) ||
        (statusFilter === 'inactive' && !product.isActive) ||
        (statusFilter === 'out-of-stock' && product.stock === 0) ||
        (statusFilter === 'limited-stock' && product.isLimitedStock);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'stock-low':
          return a.stock - b.stock;
        case 'stock-high':
          return b.stock - a.stock;
        case 'date-new':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, statusFilter, sortBy]);

  const resetForm = () => {
    setProductForm({
      name: '',
      category: '',
      brand: '',
      price: 0,
      image: '',
      stock: 0,
      isLimitedStock: false,
      description: '',
      isActive: true
    });
    setEditingProduct(null);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productForm,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setProducts([...products, newProduct]);
    setShowAddDialog(false);
    resetForm();
    toast.success('Product added successfully');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
      stock: product.stock,
      isLimitedStock: product.isLimitedStock,
      description: product.description,
      isActive: product.isActive
    });
    setShowAddDialog(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...productForm }
        : p
    );

    setProducts(updatedProducts);
    setShowAddDialog(false);
    resetForm();
    toast.success('Product updated successfully');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Product deleted successfully');
  };

  const toggleProductStatus = (productId: string) => {
    const updatedProducts = products.map(p => 
      p.id === productId 
        ? { ...p, isActive: !p.isActive }
        : p
    );
    setProducts(updatedProducts);
    toast.success('Product status updated');
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'bg-red-500' };
    if (product.isLimitedStock) return { label: 'Limited Stock', color: 'bg-yellow-500' };
    if (product.stock < 10) return { label: 'Low Stock', color: 'bg-orange-500' };
    return { label: 'In Stock', color: 'bg-green-500' };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Products Management</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Add a new product to your catalog'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPU">CPU</SelectItem>
                      <SelectItem value="GPU">GPU</SelectItem>
                      <SelectItem value="RAM">RAM</SelectItem>
                      <SelectItem value="Storage">Storage</SelectItem>
                      <SelectItem value="Motherboard">Motherboard</SelectItem>
                      <SelectItem value="PSU">PSU</SelectItem>
                      <SelectItem value="Case">Case</SelectItem>
                      <SelectItem value="Cooling">Cooling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (â‚±)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: normalizeImageUrl(e.target.value)})}
                    onBlur={(e) => setProductForm({...productForm, image: normalizeImageUrl(e.target.value)})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isLimitedStock"
                    checked={productForm.isLimitedStock}
                    onCheckedChange={(checked) => setProductForm({...productForm, isLimitedStock: checked})}
                  />
                  <Label htmlFor="isLimitedStock">Limited Stock Item</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={productForm.isActive}
                    onCheckedChange={(checked) => setProductForm({...productForm, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock === 0).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="limited-stock">Limited Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="stock-low">Stock: Low to High</SelectItem>
                <SelectItem value="stock-high">Stock: High to Low</SelectItem>
                <SelectItem value="date-new">Date: Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className="font-medium">{formatUsdAsPhp(product.price)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{product.stock}</span>
                        <Badge className={stockStatus.color}>
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.isActive}
                        onCheckedChange={() => toggleProductStatus(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
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