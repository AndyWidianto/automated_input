"use client";

import React from 'react';
import { Zap, Clock, Sparkles, Building2, BrainCircuit, ThumbsUp, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';
import { PricingTier } from '../components/PrincingTier';



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
        <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100">
            <main>
                {/* Hero Section */}
                <div className="relative isolate overflow-hidden bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50),white)]">
                    {/* Background Decorative Grid */}
                    <svg
                        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="0787a7c5-978c-4f86-83c0-20a31f7d882d"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f86-83c0-20a31f7d882d)" />
                    </svg>

                    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-20">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-8 flex justify-center">
                                <span className="rounded-full px-3 py-1 text-sm font-medium leading-6 text-emerald-600 ring-1 ring-inset ring-emerald-600/10 bg-emerald-50">
                                    New: AI-Powered Mapping is here
                                </span>
                            </div>
                            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                                Automate Data Input <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 selection:text-gray-800 bg-clip-text text-transparent">
                                    from Excel to Web.
                                </span>
                            </h1>
                            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                                Stop entering data one by one. Upload your spreadsheet and let our automation handle the tedious forms—saving you hours of manual work every single day.
                            </p>
                            <div className="mt-12 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-emerald-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-0.5"
                                >
                                    Get Started for Free
                                </Link>
                                <Link href="/home/learn-more" className="text-sm font-semibold leading-6 text-slate-900 group">
                                    View Demo <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-24 sm:py-32 relative">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-bold uppercase tracking-wider text-emerald-600">
                                Efficiency First
                            </h2>
                            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Everything you need to scale.
                            </p>
                        </div>

                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-16 transition-all hover:bg-slate-50 p-6 rounded-2xl">
                                        <dt className="text-base font-bold leading-7 text-slate-900">
                                            <div className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 shadow-md shadow-emerald-200">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div id="pricing" className="py-24 sm:py-32 bg-slate-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center mb-16">
                            <h2 className="text-base font-bold text-emerald-600">Pricing</h2>
                            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                                Simple, Transparent Plans
                            </p>
                        </div>
                        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                            {pricingTiers.map((tier) => (
                                <div
                                    key={tier.name}
                                    className={`rounded-3xl p-8 ring-1 transition-all duration-300 ${tier.mostPopular
                                            ? 'bg-white ring-emerald-600 shadow-2xl scale-105 z-10'
                                            : 'bg-white/60 ring-slate-200 hover:ring-emerald-300 shadow-sm'
                                        }`}
                                >
                                    <PricingTier tier={tier} isMostPopular={tier.mostPopular} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;