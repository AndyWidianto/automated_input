"use client";

import { useState } from 'react';
import { User, Bell, Lock, Shield, Moon } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifikasi', icon: <Bell size={20} /> },
    { id: 'security', label: 'Keamanan', icon: <Lock size={20} /> },
    { id: 'privacy', label: 'Privasi', icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigasi */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Pengaturan</h1>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'profile' && (
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-6">Informasi Publik</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <User size={40} />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                    Ganti Foto
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-6">Preferensi Notifikasi</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Email Marketing</p>
                    <p className="text-sm text-gray-500">Dapatkan update terbaru tentang fitur baru.</p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Notifikasi Pesan</p>
                    <p className="text-sm text-gray-500">Beritahu saya saat ada pesan masuk.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {/* Footer Card */}
          <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-3 border-t border-gray-200">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">
              Batal
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;