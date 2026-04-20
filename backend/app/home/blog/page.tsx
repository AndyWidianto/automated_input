import React from 'react';
import { Search, Calendar, Clock, ChevronRight } from 'lucide-react';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: "Cara Otomatisasi Input Data dari Excel ke Formulir Web",
            excerpt: "Pelajari cara menghemat waktu berjam-jam dengan memindahkan data spreadsheet secara otomatis tanpa coding...",
            category: "Automation Guides",
            date: "Apr 18, 2026",
            readTime: "5 min read",
            image: "/blog/automation.jpg",
            author: "Andy Widianto"
        },
        {
            id: 2,
            title: "5 Tips Meningkatkan Produktivitas Admin di Tahun 2026",
            excerpt: "Dunia kerja berubah cepat. Gunakan tools ini untuk memastikan tim Anda tetap efisien dan fokus pada hal penting.",
            category: "Workflow Hacks",
            date: "Apr 15, 2026",
            readTime: "4 min read",
            image: "/blog/productivity.jpg",
            author: "Team Automate"
        },
        {
            id: 3,
            title: "Update: Integrasi DeepSeek AI untuk Mapping Kolom Otomatis",
            excerpt: "Kini sistem kami bisa mengenali nama kolom Excel Anda secara cerdas menggunakan teknologi Local LLM terbaru.",
            category: "Product Updates",
            date: "Apr 10, 2026",
            readTime: "3 min read",
            image: "/blog/update.jpg",
            author: "Engineering"
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Blog Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-16 pb-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                            Insights & <span className="text-emerald-600">Resources</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Pelajari tips otomatisasi, berita industri, dan cara memaksimalkan efisiensi kerja Anda.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-10 flex justify-center">
                            <div className="relative w-full max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Cari artikel (ex: Excel tips)..."
                                    className="w-full rounded-full border-0 py-4 pl-12 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
                                />
                                <Search className="absolute left-4 top-4 text-slate-400" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {['All Stories', 'Automation Guides', 'Workflow Hacks', 'Product Updates', 'Case Studies'].map((cat) => (
                        <button key={cat} className="px-5 py-2 rounded-full text-sm font-medium border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-all">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start group">
                            <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/9]">
                                <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder while loading */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="max-w-xl">
                                <div className="mt-6 flex items-center gap-x-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} /> {post.readTime}
                                    </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-xl font-bold leading-6 text-slate-900 group-hover:text-emerald-600 transition-colors">
                                        <a href={`/blog/${post.id}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-x-3">
                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[10px]">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-900">{post.author}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA Section / Newsletter */}
                <div className="mt-32 rounded-3xl bg-slate-900 px-8 py-16 sm:px-16 sm:py-24 lg:flex lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ingin tips otomatisasi di email Anda?
                        </h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Bergabunglah dengan 5,000+ profesional yang mendapatkan tips efisiensi setiap minggu.
                        </p>
                    </div>
                    <div className="mt-10 flex w-full max-w-md gap-x-4 lg:mt-0">
                        <input
                            type="email"
                            required
                            className="min-w-0 flex-auto rounded-xl border-0 bg-white/5 px-4 py-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                            placeholder="Masukkan email Anda"
                        />
                        <button className="flex-none rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPage;