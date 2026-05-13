import { createContext, useCallback, useContext, useMemo, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((toast) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...toast }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      toast: (message, options = {}) => pushToast({ title: message, ...options }),
      success: (message) => pushToast({ title: message, variant: "success" }),
      error: (message) => pushToast({ title: message, variant: "danger" }),
      info: (message) => pushToast({ title: message, variant: "info" }),
    }),
    [pushToast],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            open
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id);
            }}
            duration={toast.duration || 3500}
            className={cn(
              "glass-panel mb-3 flex w-[360px] items-start justify-between gap-3 rounded-2xl border p-4",
              toast.variant === "success" && "border-emerald-400/20",
              toast.variant === "danger" && "border-rose-400/20",
              toast.variant === "info" && "border-sky-400/20",
            )}
          >
            <div>
              <ToastPrimitive.Title className="font-medium">{toast.title}</ToastPrimitive.Title>
              {toast.description ? (
                <ToastPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  {toast.description}
                </ToastPrimitive.Description>
              ) : null}
            </div>
            <ToastPrimitive.Close className="rounded-full p-1 text-muted-foreground hover:bg-white/5 hover:text-foreground">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-5 right-5 z-[100] flex max-w-[420px] flex-col outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
