"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full text-slate-800 font-sans selection:bg-brand-blue selection:text-white",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-64 flex-col bg-slate-950 text-white border-r border-white/10 shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        {openMobile && (
          <div
            onClick={() => setOpenMobile(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
          />
        )}
        <div
          className={cn(
            "fixed inset-y-0 z-50 flex h-full w-64 flex-col bg-slate-950 text-white border-r border-white/10 transition-transform duration-300 ease-in-out md:hidden",
            side === "left"
              ? openMobile
                ? "translate-x-0 left-0"
                : "-translate-x-full left-0"
              : openMobile
                ? "translate-x-0 right-0"
                : "translate-x-full right-0",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-slate-950 text-white border-r border-white/10 shrink-0 flex flex-col justify-between overflow-y-auto hidden md:flex transition-all duration-300 ease-in-out z-30",
        state === "collapsed" ? "w-20" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      className={cn(
        "p-2.5 bg-white hover:bg-slate-50 text-brand-blue border border-slate-200/80 transition-all duration-200 cursor-pointer flex items-center justify-center rounded-xl shadow-xs hover:shadow-md active:scale-95",
        className
      )}
      title="Toggle Sidebar"
      aria-label="Toggle Sidebar"
      {...props}
    >
      <PanelLeftIcon className="w-5 h-5 text-brand-blue" />
    </button>
  );
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-4 border-b border-white/10", className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-4 border-t border-white/10 mt-auto", className)}
      {...props}
    />
  );
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4", className)}
      {...props}
    />
  );
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative flex w-full min-w-0 flex-col space-y-1", className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-heading",
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("w-full space-y-1.5", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex w-full min-w-0 flex-col gap-1.5 list-none p-0 m-0", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("relative", className)} {...props} />;
}

export function SidebarMenuButton({
  isActive,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean;
}) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3.5 py-3 px-4 text-left font-semibold text-xs tracking-wide transition-all duration-200 border-none cursor-pointer rounded-xl",
        isActive
          ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-md shadow-brand-blue/30 font-bold"
          : "text-slate-300 hover:text-white hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-[#f8fafc] min-w-0 overflow-x-hidden",
        className
      )}
      {...props}
    />
  );
}
