import { GithubIcon, LinkedinIcon } from "../../components/Icons";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          About <span className="text-emerald-600">Automate</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          Automate is built to simplify repetitive digital tasks through practical
          automation tools. From image enhancement and document conversion to bulk
          Excel processing, our goal is to help users save time and work more efficiently.
        </p>
      </section>

      {/* Our Journey */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>

            <p className="text-gray-600 leading-8">
              Automate started from a simple idea: repetitive digital work should be
              easier. Many everyday tasks—such as improving image quality, converting
              image content into editable documents, or processing spreadsheet data—
              often take unnecessary time when done manually.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              To solve these challenges, Automate was created as a growing collection
              of productivity-focused tools designed to make workflows faster,
              simpler, and more accessible. More automation features will continue
              to be added over time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <p className="text-lg text-gray-700 italic leading-8">
              “Simplify repetitive tasks and let automation handle the work for you.”
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Core Values</h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Simplicity
              </h3>

              <p className="text-gray-600 leading-7">
                Productivity tools should be easy to use. Automate is designed with
                a simple experience to help users complete tasks without unnecessary complexity.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Efficiency
              </h3>

              <p className="text-gray-600 leading-7">
                We focus on reducing repetitive manual work through practical automation,
                helping users save time and improve workflow productivity.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Continuous Improvement
              </h3>

              <p className="text-gray-600 leading-7">
                Automate continues to grow with new tools and features aimed at solving
                real productivity challenges in a practical way.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>

          <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 max-w-xl mx-auto">
            <img
              src="/profile001.jpeg"
              alt="Andy Widianto"
              className="w-28 h-28 rounded-full mx-auto mb-6 object-cover"
            />

            <h3 className="text-2xl font-bold whitespace-nowrap">Andy Widianto</h3>
            <p className="text-emerald-600 font-medium mb-4">Full-stack Developer</p>

            <p className="text-gray-600 leading-7 mb-6">
              Focused on building reliable backend systems with Go, NestJS and NextJS,
              and crafting responsive user interfaces with React and Tailwind CSS.
              Passionate about solving repetitive workflow challenges through
              scalable automation.
            </p>

            <div className="flex justify-center gap-4">
              <a href="https://github.com/AndyWidianto" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/andy-widianto-8a9067340/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
                <LinkedinIcon className="w-5 h-5 text-blue-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Technology Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Built with modern, reliable technologies to ensure performance,
            scalability, and a seamless user experience.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["React", "Tailwind CSS", "PostgreSQL", "Next.js"].map((tech) => (
              <div
                key={tech}
                className="rounded-2xl border border-gray-200 p-6 shadow-sm font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}