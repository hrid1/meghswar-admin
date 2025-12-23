import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for className merging

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  showHeader?: boolean;
  className?: string;
  contentClassName?: string;
  maxHeight?: string;
}

export default function CustomDialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  showHeader = false,
  className = "",
  contentClassName = "",
  maxHeight = "90vh",
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "bg-white border-0 rounded-[16px] overflow-hidden",
          className
        )}
      >
        {showHeader && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </DialogHeader>
        )}
        
        <div className="flex flex-col min-h-0" style={{ maxHeight }}>
          <div className={cn(
            "overflow-y-auto min-h-0 custom-scrollbar",
            contentClassName
          )}>
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}