import React from "react";
import { Check, Minus, Info } from "lucide-react";

interface ComparisonRow {
    feature: string;
    free: boolean | string;
    pro: boolean | string;
    cloud: boolean | string;
    power: boolean | string;
}

const rows: ComparisonRow[] = [
    { feature: "Local Encrypted Vault", free: true, pro: true, cloud: true, power: true },
    { feature: "Password Storage Limit", free: "4 Passwords", pro: "Unlimited", cloud: "Unlimited", power: "Unlimited" },
    { feature: "Daily Secret Generation", free: "3 / day", pro: "Unlimited", cloud: "Unlimited", power: "Unlimited" },
    { feature: "Developer Secret Generator", free: true, pro: true, cloud: true, power: true },
    { feature: "Project Folder Selection", free: false, pro: true, cloud: true, power: true },
    { feature: ".env Injection", free: false, pro: true, cloud: true, power: true },
    { feature: "Portable USB Vault", free: true, pro: true, cloud: true, power: true },
    { feature: "Cloud Backup (G-Drive)", free: false, pro: false, cloud: true, power: true },
    { feature: "Dropbox / OneDrive", free: false, pro: false, cloud: "Coming Soon", power: "Coming Soon" },
    { feature: "S3-Compatible Storage", free: false, pro: false, cloud: false, power: true },
    { feature: "Supabase Storage", free: false, pro: false, cloud: false, power: "Coming Soon" },
    { feature: "Priority Support", free: false, pro: false, cloud: false, power: true },
];

export const ComparisonTable = () => {
    const renderCell = (value: boolean | string) => {
        if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
        if (value === false) return <Minus className="w-5 h-5 text-slate-600 mx-auto" />;
        if (value === "Coming Soon") return <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">Coming Soon</span>;
        return <span className="text-sm text-slate-300">{value}</span>;
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-slate-800">
                        <th className="p-4 text-slate-400 font-medium w-1/3">Feature</th>
                        <th className="p-4 text-center text-slate-300 font-bold w-1/6">Free</th>
                        <th className="p-4 text-center text-purple-400 font-bold w-1/6">PRO</th>
                        <th className="p-4 text-center text-blue-400 font-bold w-1/6">CLOUD</th>
                        <th className="p-4 text-center text-orange-400 font-bold w-1/6">POWER</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {rows.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                            <td className="p-4 text-slate-300 font-medium">{row.feature}</td>
                            <td className="p-4 text-center">{renderCell(row.free)}</td>
                            <td className="p-4 text-center">{renderCell(row.pro)}</td>
                            <td className="p-4 text-center">{renderCell(row.cloud)}</td>
                            <td className="p-4 text-center">{renderCell(row.power)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
