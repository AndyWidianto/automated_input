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
          We believe repetitive tasks should never consume valuable human time.
          Automate exists to eliminate manual data entry by transforming repetitive
          workflows into fast, reliable automation—giving people back the time to
          focus on what truly matters.
        </p>
      </section>

      {/* Our Journey */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-gray-600 leading-8">
              Automate was born from a real-world problem: countless hours wasted
              entering spreadsheet data into web forms manually, one row at a time.
              During the development process, this repetitive challenge became
              increasingly evident—especially in systems that lacked bulk import
              functionality.
            </p>
            <p className="text-gray-600 leading-8 mt-4">
              What started as an effort to solve a common operational bottleneck
              evolved into a mission: creating a smarter way to move data from
              spreadsheets into websites securely, efficiently, and at scale.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <p className="text-lg text-gray-700 italic leading-8">
              “Upload once, automate thousands of entries, and let technology handle
              the repetitive work.”
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
                Data Sovereignty
              </h3>
              <p className="text-gray-600 leading-7">
                User data security is our top priority. All automation runs locally
                in the browser, ensuring that sensitive information never leaves the device.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Simplicity
              </h3>
              <p className="text-gray-600 leading-7">
                Powerful automation should be simple. Automate is designed to make
                complex repetitive workflows easy to run without complicated setup.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Innovation
              </h3>
              <p className="text-gray-600 leading-7">
                We build with modern technologies and forward-thinking architecture
                to deliver scalable, intelligent automation for modern workflows.
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