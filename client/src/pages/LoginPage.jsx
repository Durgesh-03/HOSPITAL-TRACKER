import { ArrowRight, Building2, LockKeyhole, Mail, ShieldCheck, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleList = [
  { label: 'Patient/User', value: 'user' },
  { label: 'Doctor', value: 'doctor' },
  { label: 'Admin', value: 'admin' },
  { label: 'Nurse/Staff', value: 'staff' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'patient@hospital.com', password: 'Patient@123', role: 'user' });
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form.email, form.password, form.role);
      navigate(`/${user.role}/dashboard`);
    } catch (submitError) {
      setError(submitError.message || 'Login failed');
    }
  };

  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_40%),linear-gradient(135deg,#f4fbff_0%,#eef9ff_100%)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden items-center justify-center bg-gradient-to-br from-sky-700 to-cyan-600 p-12 text-white lg:flex">
        <div className="max-w-md">
          <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <Stethoscope className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-black">Welcome back to MediFlow</h1>
          <p className="mt-4 text-sky-50/90 leading-8">One secure workspace for appointments, queues, patient flow, and bed readiness across your hospital.</p>
          <div className="mt-10 space-y-4">
            {[
              { icon: Building2, text: 'Smart hospital operations monitoring' },
              { icon: ShieldCheck, text: 'Role-based access and secure login' },
              { icon: LockKeyhole, text: 'Protected queue and patient data' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-cyan-100" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md rounded-[2rem] border border-sky-100 bg-white/80 p-6 shadow-[0_30px_80px_rgba(9,89,116,0.12)] backdrop-blur-lg sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 shadow-lg shadow-sky-200">
              <Stethoscope className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-black text-slate-900">Hospital Login</h2>
            <p className="mt-2 text-sm text-slate-500">Access your role-specific dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-sky-400" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input name="password" value={form.password} onChange={handleChange} type="password" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-sky-400" placeholder="Enter password" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Login as</label>
              <div className="grid grid-cols-2 gap-2">
                {roleList.map((role) => (
                  <label key={role.value} className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition ${form.role === role.value ? 'border-sky-400 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-600'}`}>
                    <input type="radio" name="role" value={role.value} checked={form.role === role.value} onChange={handleChange} className="accent-sky-600" />
                    {role.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" checked={remember} onChange={() => setRemember((prev) => !prev)} className="accent-sky-600" />
                Remember Me
              </label>
              <a href="#" className="font-medium text-sky-700">Forgot Password?</a>
            </div>

            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:translate-y-[-1px]">
              Login
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-bold text-sky-700">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
