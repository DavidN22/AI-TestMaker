import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalTemplateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  fullScreen?: boolean;
}

export default function ModalTemplate({
  isOpen,
  setIsOpen,
  title,
  children,
  size = "md",
  fullScreen = false,
}: ModalTemplateProps) {
  const handleClose = () => {
    setTimeout(() => setIsOpen(false), 0);
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-sm",
    lg: "max-w-2xl h-[55vh]",
    xl: "max-w-5xl",
    custom: "max-w-lg flex-col",
  };

  return (
    <Dialog as="div" open={isOpen} className="relative z-50" onClose={handleClose}>
      {/* ✅ Removed transition object — only `transition` boolean is allowed */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <AnimatePresence>
          {isOpen && (
            <DialogPanel
              as={motion.div}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={true}
              className={`bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg p-6 w-full ${
                sizeClasses[size]
              } ${fullScreen ? "h-[90vh]" : "max-h-[80vh]"} overflow-y-auto`}
            >
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </DialogTitle>
              <div className="mt-4">{children}</div>
            </DialogPanel>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
