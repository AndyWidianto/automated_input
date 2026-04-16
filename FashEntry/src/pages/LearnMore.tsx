

const LearnMore = () => {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <section id='learn-more' className="py-20 px-6 max-w-7xl mx-auto">
                <div className="bg-indigo-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white">

                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Automate Your Workflow?
                        </h2>

                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Save hours of manual data entry by automating bulk input directly from Excel to any website. Faster, safer, and built to handle repetitive tasks with ease.
                        </p>

                        <ul className="space-y-3 mb-8">
                            {[
                                'Bulk automation from Excel',
                                'Secure client-side processing',
                                'Fast and reliable execution',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="bg-indigo-500 rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 w-full flex justify-center">
                        <div className="w-full aspect-video bg-indigo-800 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
                            <span className="text-indigo-300 italic">Preview Illustration</span>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default LearnMore;