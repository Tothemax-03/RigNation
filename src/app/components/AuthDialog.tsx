import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  title?: string;
  message?: string;
}

export function AuthDialog({ 
  isOpen, 
  onClose, 
  onSignIn, 
  onSignUp, 
  title = "Authentication Required",
  message = "Please sign in to continue with this action."
}: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onSignIn} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button onClick={onSignUp} variant="outline" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}