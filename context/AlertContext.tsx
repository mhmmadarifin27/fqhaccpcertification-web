"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Trash2, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type ToastType = "default" | "success" | "destructive" | "warning" | "info";

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  variant: ToastType;
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "warning" | "default";
}

interface AlertContextType {
  toast: (options: { title: string; message?: string; variant?: ToastType }) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve: (val: boolean) => void;
  } | null>(null);

  const toast = useCallback(({ title, message, variant = "default" }: { title: string; message?: string; variant?: ToastType }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, variant };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmModal({
        isOpen: true,
        options,
        resolve: (result: boolean) => {
          setConfirmModal(null);
          resolve(result);
        },
      });
    });
  }, []);

  return (
    <AlertContext.Provider value={{ toast, confirm }}>
      {children}

      {/* FLOATING TOAST NOTIFICATIONS (TOP-RIGHT) */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-300 transition-all"
          >
            <Alert
              variant={item.variant}
              className={`shadow-2xl border backdrop-blur-md relative pr-10 flex items-start gap-3 rounded-2xl ${
                item.variant === "success"
                  ? "bg-emerald-950/90 text-emerald-100 border-emerald-500/40"
                  : item.variant === "destructive"
                  ? "bg-red-950/90 text-red-100 border-red-500/40"
                  : item.variant === "warning"
                  ? "bg-amber-950/90 text-amber-100 border-amber-500/40"
                  : item.variant === "info"
                  ? "bg-blue-950/90 text-blue-100 border-blue-500/40"
                  : "bg-slate-900/90 text-white border-white/20"
              }`}
            >
              {item.variant === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
              {item.variant === "destructive" && <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />}
              {item.variant === "warning" && <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />}
              {item.variant === "info" && <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />}
              {item.variant === "default" && <Info className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />}

              <div className="flex-1">
                <AlertTitle className="text-sm font-bold font-heading">{item.title}</AlertTitle>
                {item.message && (
                  <AlertDescription className="text-xs opacity-90 mt-0.5 font-normal text-slate-200">
                    {item.message}
                  </AlertDescription>
                )}
              </div>

              <button
                onClick={() => removeToast(item.id)}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          </div>
        ))}
      </div>

      {/* CUSTOM CONFIRMATION MODAL DIALOG (SWEETALERT / SHADCN STYLE) */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-slate-900 border border-white/20 text-white max-w-md w-full p-6 sm:p-7 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  confirmModal.options.variant === "destructive"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : confirmModal.options.variant === "warning"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-blue-500/20 text-brand-cyan border border-brand-cyan/30"
                }`}
              >
                {confirmModal.options.variant === "destructive" ? (
                  <Trash2 className="h-6 w-6" />
                ) : confirmModal.options.variant === "warning" ? (
                  <AlertTriangle className="h-6 w-6" />
                ) : (
                  <Info className="h-6 w-6" />
                )}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-heading">
                  {confirmModal.options.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {confirmModal.options.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => confirmModal.resolve(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/10"
              >
                {confirmModal.options.cancelText || "Batal"}
              </button>
              <button
                type="button"
                onClick={() => confirmModal.resolve(true)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-lg cursor-pointer active:scale-95 border-none ${
                  confirmModal.options.variant === "destructive"
                    ? "bg-red-600 hover:bg-red-700 shadow-red-600/30"
                    : confirmModal.options.variant === "warning"
                    ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30"
                    : "bg-brand-navy hover:bg-brand-navy-dark shadow-brand-navy/30"
                }`}
              >
                {confirmModal.options.confirmText || "Ya, Lanjutkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
