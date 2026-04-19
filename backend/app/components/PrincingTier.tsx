import { ThumbsUp } from "lucide-react";

export const PricingTier = ({ tier, isMostPopular }: { tier: any; isMostPopular?: boolean }) => (
    <div className={`relative flex flex-col p-8 bg-white border border-gray-200 rounded-3xl shadow-sm ${isMostPopular ? 'ring-2 ring-emerald-600' : ''}`}>
        {isMostPopular && (
            <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-600">
                Most Popular
            </div>
        )}
        <div className="flex items-center gap-x-3">
            <tier.icon className="h-7 w-7 text-emerald-600" aria-hidden="true" />
            <h3 className="text-xl font-bold tracking-tight text-gray-950">{tier.name}</h3>
        </div>
        <p className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950">{tier.price}</p>
        <p className="mt-1.5 text-sm text-gray-600">{tier.description}</p>
        <ul role="list" className="mt-8 space-y-3 text-sm text-gray-600">
            {tier.features.map((feature: string) => (
                <li key={feature} className="flex gap-x-3">
                    <ThumbsUp className="h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                    {feature}
                </li>
            ))}
        </ul>
        <a
            href={tier.href}
            className={`mt-10 block w-full rounded-full px-8 py-3.5 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${tier.mostPopular
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                }`}
        >
            {tier.cta}
        </a>
    </div>
);