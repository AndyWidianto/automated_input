"use client";

import React from 'react';
import { Zap, Clock, Sparkles, Building2, BrainCircuit, ThumbsUp, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';



interface Feature {
    name: string;
    description: string;
    icon: React.ElementType;
}

const features: Feature[] = [
    {
        name: 'Privacy-First Processing',
        description: 'All data is processed locally in your browser. No uploads, no servers, and all data is automatically cleared after each automation run.',
        icon: ShieldCheck,
    },
    {
        name: 'Instant Autofill',
        description: 'Fill inputs and forms instantly without manual typing.',
        icon: Zap,
    },
    {
        name: 'Smart Field Detection',
        description: 'Automatically detects input fields across any website.',
        icon: BrainCircuit,
    },
    {
        name: 'Error Reduction',
        description: 'Minimize mistakes with consistent and accurate autofill.',
        icon: ShieldCheck,
    },
    {
        name: 'Works Across Websites',
        description: 'Compatible with most websites and web applications.',
        icon: Globe,
    },
    {
        name: 'Time Saving Automation',
        description: 'Eliminate repetitive typing and boost productivity.',
        icon: Clock,
    },
];

const PricingTier = ({ tier, isMostPopular }: { tier: any; isMostPopular?: boolean }) => (
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

const pricingTiers = [
    {
        name: 'Free',
        price: 'Free',
        description: 'Perfect for trying out basic automation.',
        features: [
            '50 automation runs / day',
            'Basic field detection',
            'Excel upload (limited)',
            'Community support',
        ],
        href: '#',
        icon: Sparkles,
        mostPopular: false,
        cta: 'Get Started Free',
    },
    {
        name: 'Pro',
        price: '49k/month',
        description: 'For individuals who need higher limits and faster automation.',
        features: [
            '500 automation runs / day',
            'Full Excel / CSV upload',
            'Smart field detection',
            'Bulk processing support',
            'Priority support',
        ],
        href: '#',
        icon: Zap,
        mostPopular: true,
        cta: 'Upgrade to Pro',
    },
    {
        name: 'Enterprise',
        price: '149k/month',
        description: 'For heavy users with large-scale automation needs.',
        features: [
            'Unlimited automation runs',
            'Everything in Pro',
            'Higher performance processing',
            'Advanced automation rules',
        ],
        href: '#',
        icon: Building2,
        mostPopular: false,
        cta: 'Choose Enterprise',
    },
];

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            <main>
                <div className="relative isolate px-6 pt-10 lg:px-8">
                    <div className="mx-auto max-w-4xl py-20 sm:py-24 lg:py-30">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-6xl">
                                Automate Data Input from Excel.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Stop entering data one by one. Upload your spreadsheet and automatically fill and submit forms across websites—saving hours of manual work every day.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href="/signup" className="rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                                    Try it Free
                                </Link>
                                <Link href="/learn-more" className="text-sm font-semibold leading-6 text-gray-950 flex items-center gap-x-1">
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="features" className="py-24 sm:py-32 bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-emerald-600">
                                Bulk Data Automation
                            </h2>
                            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                                From Excel to Web—Automated
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Upload your spreadsheet and automatically fill and submit forms across websites.
                                Save hours of manual work, reduce errors, and process thousands of entries effortlessly—right from your browser.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {features.map((feature) => (
                                    <div key={feature.name} className="flex flex-col">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-950">
                                            <feature.icon className="h-6 w-6 flex-none text-emerald-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                            <p className="flex-auto">{feature.description}</p>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                <div id="pricing" className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-base font-semibold leading-7 text-emerald-600">
                                Pricing
                            </h2>
                            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                                Simple, Transparent Pricing
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Choose a plan that fits your workflow. Start for free and upgrade as you automate more tasks and save more time.
                            </p>
                        </div>
                        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-10 lg:grid-cols-3 lg:max-w-none lg:gap-x-12">
                            {pricingTiers.map((tier) => (
                                <PricingTier key={tier.name} tier={tier} isMostPopular={tier.mostPopular} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;