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
  title: string;
  children: React.ReactNode;
}

export default function ModalTemplate({ isOpen, setIsOpen, title, children }: ModalTemplateProps) {
  const handleClose = () => {
    setTimeout(() => setIsOpen(false), 0);
  };

  return (
    <Dialog as="div" open={isOpen} className="relative z-50" onClose={handleClose}>
      {/* Background Overlay (Keep Headless UI Transition) */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md"
            >
              <DialogPanel>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </DialogTitle>
                <div className="mt-4">{children}</div>
              </DialogPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
