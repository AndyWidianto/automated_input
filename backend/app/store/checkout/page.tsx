import { ArrowLeftIcon, ShieldCheckIcon } from 'lucide-react';
import useCheckout from "../../lib/hooks/Checkout";

const CheckoutPage = () => {
  const { selectedPlan, tax, adminFee, totalPrice, handlePayment, loading } = useCheckout();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-1">
      {loading && <div className='fixed top-0 left-0 w-full h-screen bg-black/20 flex justify-center items-center z-50'><div className="w-10 h-10 rounded-full border-3 border-gray-200 border-t-blue-600 animate-spin"></div></div>}
      <div className="max-w-5xl mx-auto">
        {/* Tombol Kembali */}
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Kembali ke Pilihan Paket
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sisi Kiri: Ringkasan Paket */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Langganan</h3>
              <div className="flex items-start justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div>
                  <p className="font-bold text-blue-900">{selectedPlan.name}</p>
                  <p className="text-sm text-blue-700">Penagihan Bulanan</p>
                </div>
                <p className="font-bold text-blue-900">Rp {selectedPlan.price.toLocaleString('id-ID')}</p>
              </div>
              
              <ul className="mt-6 space-y-3">
                {selectedPlan.features.map((f, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100">
              <ShieldCheckIcon className="h-6 w-6 text-green-600 mr-3" />
              <p className="text-sm text-green-800">
                Pembayaran kamu diamankan dengan enkripsi SSL 256-bit.
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Rincian Biaya (Invoice Card) */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Biaya</h3>
              
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Harga Paket</span>
                  <span>Rp {selectedPlan.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pajak (PPN 11%)</span>
                  <span>Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Admin</span>
                  <span>Rp {adminFee.toLocaleString('id-ID')}</span>
                </div>
                
                <hr className="border-gray-100 my-4" />
                
                <div className="flex justify-between text-lg font-extrabold text-gray-900">
                  <span>Total Bayar</span>
                  <span className="text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button 
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                onClick={handlePayment}
              >
                Konfirmasi & Bayar
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                Dengan mengklik tombol di atas, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;