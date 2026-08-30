"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  timestamp?: string;
}

interface ToastContextType {
  showToast: (options: {
    title?: string;
    message: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      title,
      message,
      type = "success",
      duration = 4000,
    }: {
      title?: string;
      message: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      const defaultTitle =
        title ||
        (type === "success"
          ? "Berhasil"
          : type === "error"
          ? "Gagal"
          : type === "warning"
          ? "Peringatan"
          : "Informasi");

      const newToast: ToastItem = {
        id,
        title: defaultTitle,
        message,
        type,
        duration,
        timestamp: timeStr,
      };

      setToasts((prev) => [newToast, ...prev].slice(0, 5)); // Keep max 5 active toasts

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* TOAST CONTAINER FIXED AT TOP-RIGHT (KANAN ATAS) */}
      <aside
        aria-live="polite"
        aria-label="Notifikasi"
        className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 w-[calc(100vw-2.5rem)] max-w-sm sm:max-w-md pointer-events-none"
      >
        {toasts.map((toast) => {
          const typeStyles = {
            success: {
              badgeColor: "bg-emerald-500",
              borderColor: "border-emerald-200",
              titleColor: "text-emerald-950",
              accentBar: "bg-emerald-500",
              icon: "✓",
            },
            error: {
              badgeColor: "bg-rose-500",
              borderColor: "border-rose-200",
              titleColor: "text-rose-950",
              accentBar: "bg-rose-500",
              icon: "✕",
            },
            warning: {
              badgeColor: "bg-amber-500",
              borderColor: "border-amber-200",
              titleColor: "text-amber-950",
              accentBar: "bg-amber-500",
              icon: "!",
            },
            info: {
              badgeColor: "bg-brand-blue",
              borderColor: "border-blue-200",
              titleColor: "text-blue-950",
              accentBar: "bg-brand-blue",
              icon: "ℹ",
            },
          }[toast.type || "success"];

          return (
            <div
              key={toast.id}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className={`pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border ${typeStyles.borderColor} overflow-hidden transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-top-4 sm:slide-in-from-right-6`}
            >
              {/* Top Accent Color Bar */}
              <div className={`h-1 w-full ${typeStyles.accentBar}`} />

              {/* Toast Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <strong className={`text-xs font-bold font-heading truncate ${typeStyles.titleColor}`}>
                    {toast.title}
                  </strong>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <small className="text-[10px] text-slate-400 font-medium">
                    {toast.timestamp || "Baru saja"}
                  </small>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    className="w-6 h-6 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer border-0 bg-transparent p-0"
                    aria-label="Tutup Notifikasi"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Toast Body */}
              <div className="p-4 flex items-start gap-3 bg-white">
                <span
                  className={`w-5 h-5 rounded-full ${typeStyles.badgeColor} text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs`}
                >
                  {typeStyles.icon}
                </span>
                <div className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed break-words flex-1">
                  {toast.message}
                </div>
              </div>
            </div>
          );
        })}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
