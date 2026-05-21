import { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Users, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from "sonner";

interface AdminUsersProps {
  navigateTo: (page: string) => void;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  isActive: boolean;
  dateAdded: string;
  lastLogin: string;
  permissions: string[];
}

const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'super-admin',
    isActive: true,
    dateAdded: '2024-01-01',
    lastLogin: '2024-01-20',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'john.manager@example.com',
    role: 'admin',
    isActive: true,
    dateAdded: '2024-01-05',
    lastLogin: '2024-01-19',
    permissions: ['orders', 'products', 'customers']
  },
  {
    id: '3',
    name: 'Sarah Support',
    email: 'sarah.support@example.com',
    role: 'admin',
    isActive: true,
    dateAdded: '2024-01-10',
    lastLogin: '2024-01-18',
    permissions: ['orders', 'customers']
  },
  {
    id: '4',
    name: 'Mike Inventory',
    email: 'mike.inventory@example.com',
    role: 'admin',
    isActive: false,
    dateAdded: '2024-01-15',
    lastLogin: '2024-01-16',
    permissions: ['products', 'inventory']
  }
];

const availablePermissions = [
  { id: 'orders', label: 'Orders Management' },
  { id: 'products', label: 'Products Management' },
  { id: 'customers', label: 'Customer Support' },
  { id: 'inventory', label: 'Inventory Management' },
  { id: 'analytics', label: 'Analytics & Reports' },
  { id: 'settings', label: 'System Settings' }
];

export function AdminUsers({ navigateTo }: AdminUsersProps) {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'super-admin',
    isActive: true,
    permissions: [] as string[]
  });

  const filteredUsers = useMemo(() => {
    let filtered = adminUsers.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'inactive' && !user.isActive);
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'email':
          return a.email.localeCompare(b.email);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'date-new':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'date-old':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case 'last-login':
          return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime();
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [adminUsers, searchTerm, roleFilter, statusFilter, sortBy]);

  const resetForm = () => {
    setUserForm({
      name: '',
      email: '',
      role: 'admin',
      isActive: true,
      permissions: []
    });
    setEditingUser(null);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: AdminUser = {
      id: Date.now().toString(),
      ...userForm,
      dateAdded: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    setAdminUsers([...adminUsers, newUser]);
    setShowAddDialog(false);
    resetForm();
    toast.success('Admin user added successfully');
  };

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      permissions: user.permissions.filter(p => p !== 'all')
    });
    setShowAddDialog(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) return;

    const updatedUsers = adminUsers.map(u => 
      u.id === editingUser.id 
        ? { ...u, ...userForm }
        : u
    );

    setAdminUsers(updatedUsers);
    setShowAddDialog(false);
    resetForm();
    toast.success('Admin user updated successfully');
  };

  const handleDeleteUser = (userId: string) => {
    // Prevent deleting super-admin
    const user = adminUsers.find(u => u.id === userId);
    if (user?.role === 'super-admin') {
      toast.error('Cannot delete super admin user');
      return;
    }

    setAdminUsers(adminUsers.filter(u => u.id !== userId));
    toast.success('Admin user deleted successfully');
  };

  const toggleUserStatus = (userId: string) => {
    // Prevent deactivating super-admin
    const user = adminUsers.find(u => u.id === userId);
    if (user?.role === 'super-admin') {
      toast.error('Cannot deactivate super admin user');
      return;
    }

    const updatedUsers = adminUsers.map(u => 
      u.id === userId 
        ? { ...u, isActive: !u.isActive }
        : u
    );
    setAdminUsers(updatedUsers);
    toast.success('User status updated');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handlePermissionToggle = (permission: string) => {
    const updatedPermissions = userForm.permissions.includes(permission)
      ? userForm.permissions.filter(p => p !== permission)
      : [...userForm.permissions, permission];
    
    setUserForm({ ...userForm, permissions: updatedPermissions });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Admin Users</h1>
          <p className="text-muted-foreground">
            Manage admin users and their permissions
          </p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit Admin User' : 'Add New Admin User'}
              </DialogTitle>
              <DialogDescription>
                {editingUser ? 'Update admin user information and permissions' : 'Create a new admin user account'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={userForm.role} onValueChange={(value: 'admin' | 'super-admin') => setUserForm({...userForm, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center space-x-2 h-10">
                    <Switch
                      id="isActive"
                      checked={userForm.isActive}
                      onCheckedChange={(checked) => setUserForm({...userForm, isActive: checked})}
                    />
                    <Label htmlFor="isActive">
                      {userForm.isActive ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                </div>
              </div>

              {userForm.role === 'admin' && (
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availablePermissions.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Switch
                          id={permission.id}
                          checked={userForm.permissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingUser ? 'Update User' : 'Add User'}
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
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminUsers.filter(u => u.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminUsers.filter(u => u.role === 'super-admin').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Regular Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminUsers.filter(u => u.role === 'admin').length}
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
                  placeholder="Search admin users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super-admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
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
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="email">Email A-Z</SelectItem>
                <SelectItem value="role">Role</SelectItem>
                <SelectItem value="date-new">Date: Newest</SelectItem>
                <SelectItem value="date-old">Date: Oldest</SelectItem>
                <SelectItem value="last-login">Last Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'super-admin' ? 'default' : 'secondary'}>
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.includes('all') ? (
                        <Badge variant="outline">All Permissions</Badge>
                      ) : (
                        user.permissions.slice(0, 2).map(permission => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {availablePermissions.find(p => p.id === permission)?.label.split(' ')[0]}
                          </Badge>
                        ))
                      )}
                      {user.permissions.length > 2 && !user.permissions.includes('all') && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {user.lastLogin === 'Never' ? (
                      <span className="text-muted-foreground">Never</span>
                    ) : (
                      user.lastLogin
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                      disabled={user.role === 'super-admin'}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.role !== 'super-admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No admin users found</h3>
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