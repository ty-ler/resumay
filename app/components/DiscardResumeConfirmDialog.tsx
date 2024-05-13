'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

type DiscardResumeConfirmDialogProps = {
  open: boolean;
  onClose(): void;
  onResponse(response: boolean): void;
};

export default function DiscardResumeConfirmDialog({
  open,
  onClose,
  onResponse,
}: DiscardResumeConfirmDialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (open) return;

    onClose();
  };

  const handleClickDiscardButton = () => {
    onResponse(true);
  };

  const handleClickCloseButton = () => {
    onResponse(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl font-semibold">You have an active resume</h3>
        </DialogHeader>
        Are you sure you want to discard it?
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClickDiscardButton}
            >
              Discard
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClickCloseButton}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
