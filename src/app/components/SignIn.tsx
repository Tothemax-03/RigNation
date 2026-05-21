import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../App';
import { Computer, Eye, EyeOff } from 'lucide-react';

interface SignInProps {
  navigateTo: (page: string) => void;
}

export function SignIn({ navigateTo }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await signIn(email, password);
    if (success) {
      // Navigation is handled in signIn function based on user role
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Computer className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-muted-foreground">
            Access your PC Builder account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="link"
                  className="px-0"
                  onClick={() => navigateTo('forgot-password')}
                >
                  Forgot your password?
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Button
                  type="button"
                  variant="link"
                  className="px-0"
                  onClick={() => navigateTo('signup')}
                >
                  Sign up
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Accounts:</p>
              <div className="text-sm space-y-2">
                <div>
                  <p><strong>Regular User:</strong></p>
                  <p className="text-muted-foreground">user@example.com / password</p>
                  <p className="text-xs text-muted-foreground">Access to store, cart, favorites, PC builder</p>
                </div>
                <div>
                  <p><strong>Admin:</strong></p>
                  <p className="text-muted-foreground">admin@example.com / admin</p>
                  <p className="text-xs text-muted-foreground">Access to admin dashboard only</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}