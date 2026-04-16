import React, { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';
import Logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiPublic } from '../shared/axios.service';
import { toast } from 'sonner';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.99 10.21C19.99 9.53 19.93 8.85 19.82 8.19H10.19V11.99H15.69C15.45 13.26 14.73 14.33 13.63 15.06V17.58H16.96C18.91 15.78 19.99 13.12 19.99 10.21Z" fill="#4285F4" />
    <path d="M10.19 20.00C12.89 20.00 15.15 19.11 16.96 17.58L13.63 15.06C12.71 15.68 11.56 16.06 10.19 16.06C7.58 16.06 5.37 14.3 4.58 11.93H1.14V14.59C2.79 17.88 6.22 20.00 10.19 20.00Z" fill="#34A853" />
    <path d="M4.58 11.93C4.38 11.33 4.27 10.69 4.27 10.00C4.27 9.31 4.38 8.67 4.58 8.07V5.41H1.14C0.41 6.87 0 8.44 0 10.00C0 11.56 0.41 13.13 1.14 14.59L4.58 11.93Z" fill="#FBBC05" />
    <path d="M10.19 3.94C11.66 3.94 12.98 4.45 14.02 5.43L16.96 2.49C15.15 0.95 12.89 0 10.19 0C6.22 0 2.79 2.12 1.14 5.41L4.58 8.07C5.37 5.7 7.58 3.94 10.19 3.94Z" fill="#EA4335" />
  </svg>
);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const chrome = (window as any).chrome;
  const navigate = useNavigate();


  const validateForm = () => {
    let errors: Partial<{ email?: string; password?: string }> = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await apiPublic.post('/auth/login', {
        email,
        password
      }, { withCredentials: true });
      chrome.storage.local.set({ token: res.data.accessToken });
      chrome.storage.local.set({ refresh_token: res.data.accessToken });
      toast.success('Login successful!');
      console.log('Login successful:', res.data);
      navigate('/app');
    } catch (error) {
      toast.error((error as any).response?.data?.message || 'Login failed!');
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
    // Add logic for Google authentication here
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-x-3">
          <img src={Logo} alt="Logo" className='h-10 w-10' />
          <span className="text-3xl font-extrabold text-gray-950">Automate</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-950">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-950">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-10 py-3 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-950">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-10 py-3 border border-gray-200 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-6 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center items-center gap-x-3 py-3 px-6 border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-950 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <GoogleIcon />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            Not a member?{' '}
            <NavLink to="/signup" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 flex items-center gap-x-1.5 justify-center">
              <UserPlus className="h-4 w-4" /> Start for Free
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;