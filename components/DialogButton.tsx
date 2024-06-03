import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

type Props = {
  trigger: { type: string; icon: string | React.ReactNode };
  title: string;
  description?: string;
  children: React.ReactNode;
  save?: boolean;
  className?: string;
};

export function DialogButton({
  trigger,
  title,
  description,
  children,
  save,
  className,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={trigger.type == 'icon' ? 'icon' : 'default'}
        >
          {trigger.icon}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {save && <Button type="submit">Save changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
