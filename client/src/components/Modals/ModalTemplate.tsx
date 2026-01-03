import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useIsMobile } from "../../utils/useIsMobile";

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
  const isMobile = useIsMobile();
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

      <div className={`fixed inset-0 flex items-center justify-center ${isMobile ? 'p-0' : 'p-4'}`}>
        <AnimatePresence>
          {isOpen && (
            <DialogPanel
              as={motion.div}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: isMobile ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: isMobile ? 1 : 0.95 }}
              transition={true}
              className={`relative bg-white dark:bg-[#1E1E1E] shadow-lg w-full ${
                isMobile 
                  ? 'h-full rounded-none overflow-y-auto' 
                  : `rounded-lg p-6 ${sizeClasses[size]} ${fullScreen ? "h-[90vh]" : "max-h-[80vh]"} overflow-y-auto`
              }`}
            >
              {/* X Button - Top Right */}
              <button
                onClick={handleClose}
                className={`${isMobile ? 'sticky top-4 float-right mr-4 mt-4' : 'absolute top-6 right-6'} z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <div className={isMobile ? 'p-6 pt-2' : ''}>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white pr-10">
                  {title}
                </DialogTitle>
                <div className="mt-4">{children}</div>
              </div>
            </DialogPanel>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
