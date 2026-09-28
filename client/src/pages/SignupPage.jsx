import { ArrowRight, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'Male',
  });

  const strength = Math.min(100, Math.round(((form.password.length >= 8 ? 40 : 0) + (/[A-Z]/.test(form.password) ? 20 : 0) + (/[0-9]/.test(form.password) ? 20 : 0) + (/[^A-Za-z0-9]/.test(form.password) ? 20 : 0))));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agree) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        dob: form.dob,
        gender: form.gender,
      });
      navigate('/user/dashboard');
    } catch (submitError) {
      setError(submitError.message || 'Unable to create account');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(135deg,#f3fbff_0%,#eef8ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-sky-100 bg-white/90 shadow-[0_30px_80px_rgba(9,89,116,0.12)] backdrop-blur-lg">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden bg-gradient-to-br from-sky-700 to-cyan-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="mt-8 text-4xl font-black">Create your account</h1>
              <p className="mt-4 max-w-sm text-sky-50/90 leading-8">Join MediFlow to simplify queue tracking, appointment management, and hospital coordination.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-sky-100">Why join</p>
              <div className="mt-5 space-y-4 text-sm text-sky-50/90">
                {['Book OPD visits quickly', 'Track real-time queues', 'Manage care and notifications'].map((item) => (
                  <div key={item} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900">Sign Up</h2>
              <p className="mt-2 text-sm text-slate-500">Create your patient profile and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm outline-none focus:border-sky-400" />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm outline-none focus:border-sky-400" />
                    <button type="button" onClick={() => setShowConfirm((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Date of Birth</label>
                  <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs text-slate-500"><span>Password strength</span><span>{strength}%</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${strength >= 80 ? 'bg-emerald-500' : strength >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${strength}%` }} />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" checked={agree} onChange={() => setAgree((prev) => !prev)} className="mt-1 accent-sky-600" />
                <span>I agree to the terms & privacy policy and understand my data will be used securely.</span>
              </label>

              {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:translate-y-[-1px]">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <Link to="/login" className="font-bold text-sky-700">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
