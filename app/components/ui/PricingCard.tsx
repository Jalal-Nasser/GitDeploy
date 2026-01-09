import React from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Check, X } from "lucide-react";
import { Badge } from "./Badge";

interface PricingCardProps {
    title: string;
    price: string;
    sarPrice: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export const PricingCard = ({
    title,
    price,
    sarPrice,
    description,
    features,
    isPopular = false,
    buttonText = "Get Started",
    onButtonClick,
    isLoading = false,
    disabled = false,
}: PricingCardProps) => {
    return (
        <Card className={`relative flex flex-col p-6 ${isPopular ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]" : "border-slate-800"}`}>
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-purple-600 border-purple-400 text-white shadow-lg">Most Popular</Badge>
                </div>
            )}

            <div className="mb-5">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm h-10">{description}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">{price}</span>
                    <span className="text-slate-500 ml-2">/mo</span>
                </div>
                <div className="text-sm text-slate-500 mt-1">
                    ≈ {sarPrice}
                </div>
            </div>

            <Button
                variant={isPopular ? "primary" : "outline"}
                className="w-full mb-8"
                onClick={onButtonClick}
                disabled={isLoading || disabled}
            >
                {isLoading ? "Processing..." : buttonText}
            </Button>

            <div className="flex-1 space-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start text-sm text-slate-300">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
