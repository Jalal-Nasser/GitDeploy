import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline";
}

export const Badge = ({ children, className = "", variant = "default" }: BadgeProps) => {
    const variants = {
        default: "bg-purple-500/10 border-purple-500/30 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
        outline: "bg-transparent border-slate-700 text-slate-400"
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
