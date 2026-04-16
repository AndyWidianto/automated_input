import { FileSpreadsheet, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
        <p className="text-gray-600 mt-2">
          Start automating your workflow by choosing one of the available features below.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-7 h-7 text-emerald-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Broadcast from Excel
          </h2>

          <p className="text-gray-600 leading-7 mb-6 text-sm">
            Upload your Excel file and automate repetitive form submissions quickly and accurately. Save time by processing bulk entries directly from your spreadsheet.
          </p>

          <NavLink to="/app/broadcast" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-700 transition-all">
            Open Feature
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>

      {/* Upcoming Features */}
      {/* <div className="mt-12 bg-white rounded-2xl border border-dashed border-gray-300 p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">More Features Coming Soon</h3>
        <p className="text-gray-500">
          We are continuously building new automation tools to make your workflow even more efficient.
        </p>
      </div> */}
    </div>
  );
}