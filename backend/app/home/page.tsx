"use client";

import React, { useEffect, useState } from 'react';
import { Zap, Clock, Sparkles, Building2, BrainCircuit, ThumbsUp, ShieldCheck, Globe, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { PricingTier } from '../components/PrincingTier';
import useAxios from '../lib/hooks/Axios';
import { Plan } from '../lib/types';



interface Feature {
    name: string;
    description: string;
    icon: React.ElementType;
}

const features: Feature[] = [
    {
        name: 'AI-Powered Automation',
        description: 'Fill complex forms with a single prompt. Our AI understands context to complete tasks in seconds, not minutes.',
        icon: BrainCircuit, // Menonjolkan sisi AI
    },
    {
        name: 'Unified Extension Hub',
        description: 'Access all your productivity tools in one place. One account to manage and sync every extension you own.',
        icon: LayoutGrid, // Atau icon hub lainnya
    },
    {
        name: 'Advanced Bulk Processing',
        description: 'Effortlessly automate data entry from Excel or JSON directly to any web interface with high precision.',
        icon: Zap,
    },
    {
        name: 'Secure & Synchronized',
        description: 'Your settings and automation scripts are securely stored and synced across devices via your account.',
        icon: ShieldCheck, // Mengganti narasi "No servers" menjadi "Secure Sync" karena sekarang ada sistem login
    },
    {
        name: 'Smart Field Detection',
        description: 'Intelligently identifies input fields, dropdowns, and buttons across diverse web applications.',
        icon: Globe,
    },
    {
        name: 'Workflow Efficiency',
        description: 'Eliminate repetitive manual work and reduce human error with consistent, automated workflows.',
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
            'Community support',
        ],
        href: '#',
        icon: Sparkles,
        mostPopular: false,
        cta: 'Get Started Free',
    },
    {
        name: 'Pro',
        price: '29k/month',
        description: 'For individuals who need higher limits and faster automation.',
        features: [
            '500 automation runs / day',
            'Full Excel / CSV upload',
            'Smart field detection',
            'Bulk processing support',
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
            'Multi-user Access (5 Seats)'
        ],
        href: '#',
        icon: Building2,
        mostPopular: false,
        cta: 'Choose Enterprise',
    },
];

const LandingPage: React.FC = () => {
    // const { apiPrivate } = useAxios();
    // const [plans, setPlans] = useState<Plan[]>([]);
    // const fetchPlans = async () => {
    //     try {
    //         const res = await apiPrivate.get("/api/plans");
    //         console.log(res.data);
    //         const data = res.data;
    //         setPlans(data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // useEffect(() => {
    //     fetchPlans();
    // }, [])
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
                            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                                Smart Extensions <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 selection:text-gray-800 bg-clip-text text-transparent">
                                    for Intelligent Workflows.
                                </span>
                            </h1>
                            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                                From AI-powered form filling with a single prompt to bulk Excel-to-Web automation.
                                Sign in to access our full suite of extensions and transform how you interact with the web.
                            </p>
                            <div className="mt-12 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-emerald-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                                {/* <Link href="/home/learn-more" className="text-sm font-semibold leading-6 text-slate-900 group">
                                    View Demo <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                                </Link> */}
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
                {/* <div id="pricing" className="py-24 sm:py-32 bg-slate-50">
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
                </div> */}
            </main>
        </div>
    );
};

export default LandingPage;