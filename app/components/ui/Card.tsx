import React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-purple-500/20 bg-[#0d0b21] hover:bg-[#13112b] text-slate-50 shadow-sm transition-all duration-300 ${className}`}>
        {children}
    </div>
);
