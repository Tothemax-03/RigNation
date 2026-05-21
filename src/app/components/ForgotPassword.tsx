import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Computer, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  navigateTo: (page: string) => void;
}

export function ForgotPassword({ navigateTo }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Computer className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-bold">Check your email</h2>
            <p className="mt-2 text-muted-foreground">
              We've sent a password reset link to your email
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Alert>
                <AlertDescription>
                  A password reset link has been sent to <strong>{email}</strong>. 
                  Please check your email and follow the instructions to reset your password.
                </AlertDescription>
              </Alert>

              <div className="mt-6 flex flex-col space-y-4">
                <Button onClick={() => navigateTo('signin')}>
                  Back to Sign In
                </Button>
                <Button variant="outline" onClick={() => setSuccess(false)}>
                  Send another email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Computer className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Forgot your password?</h2>
          <p className="mt-2 text-muted-foreground">
            No worries! Enter your email and we'll send you a reset link
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending reset link...' : 'Send reset link'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigateTo('signin')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}