"use client";

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  type = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      btnBg: "bg-rose-600 hover:bg-rose-700 text-white",
      iconBg: "bg-rose-100 text-rose-600 border-rose-200",
      icon: "🗑️",
    },
    warning: {
      btnBg: "bg-amber-600 hover:bg-amber-700 text-white",
      iconBg: "bg-amber-100 text-amber-600 border-amber-200",
      icon: "⚠️",
    },
    primary: {
      btnBg: "bg-brand-navy hover:bg-brand-navy-dark text-white",
      iconBg: "bg-blue-100 text-blue-600 border-blue-200",
      icon: "ℹ️",
    },
  }[type];

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 shadow-inner ${typeConfig.iconBg}`}
          >
            {typeConfig.icon}
          </div>
          <div className="space-y-1.5 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer ${typeConfig.btnBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
