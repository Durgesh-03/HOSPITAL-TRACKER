import { motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  HeartPulse,
  Hospital,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { bedPreview, features, homeStats } from '../data/mockData';

const quickLinks = ['Home', 'Services', 'OPD Queue', 'Bed Availability', 'About', 'Contact'];

const iconMap = {
  Stethoscope,
  BedDouble,
  CalendarCheck,
  BellRing,
  Sparkles,
};

export default function HomePage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(135deg,#f8fbff_0%,#edf8ff_30%,#ffffff_100%)] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 shadow-lg shadow-sky-200">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">MediFlow</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Hospital Network</div>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            {quickLinks.map((item) => (
              <a key={item} href={item === 'Home' ? '#' : '#'} className="transition hover:text-sky-700">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700 sm:inline-flex">Login</Link>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:translate-y-[-1px] hover:shadow-xl">
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              <ShieldCheck className="h-4 w-4" />
              Trusted Healthcare Platform
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Smarter Hospital Management. Better Patient Care.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Track OPD queues, appointments, doctors, and bed availability in real time from one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-200 transition hover:translate-y-[-1px]">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/user/dashboard" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
                View Bed Availability
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 24/7 patient visibility</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Reduced wait times</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-100 via-cyan-50 to-indigo-100 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_30px_80px_rgba(14,116,144,0.12)] backdrop-blur-lg">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-5 text-white shadow-xl shadow-sky-200">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 p-2"><Hospital className="h-5 w-5" /></span>
                    <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">Live</span>
                  </div>
                  <div className="mt-10 text-4xl font-black">1,248</div>
                  <div className="mt-2 text-sm text-sky-50">Patients tracked</div>
                </div>

                <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white p-2 text-sky-600"><Users className="h-5 w-5" /></span>
                  </div>
                  <div className="mt-10 text-3xl font-black text-slate-900">42</div>
                  <div className="mt-2 text-sm text-slate-600">Doctors available</div>
                </div>

                <div className="rounded-3xl border border-sky-100 bg-white p-5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Today</p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">Queue status</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <Clock3 className="h-3.5 w-3.5" /> 12 min average wait
                    </span>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Current serving</span>
                      <strong className="text-slate-900">Q-157</strong>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-sky-100">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-600 to-cyan-500" />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-slate-500">
                      <span>Patients ahead: 7</span>
                      <span>Waiting: 12 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeStats.map((stat) => (
              <motion.div key={stat.label} whileHover={{ y: -4 }} className="rounded-3xl border border-sky-100 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
                <div className="text-sm text-slate-500">{stat.label}</div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Features</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Everything your hospital needs in one focused workspace.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <motion.div key={feature.title} whileHover={{ y: -6 }} className="rounded-3xl border border-sky-100 bg-white p-6 shadow-[0_20px_50px_rgba(12,74,110,0.06)]">
                  <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 p-3 text-sky-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">How it works</p>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">A smooth experience from arrival to consultation.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { title: 'Register', text: 'Create an account in minutes and verify your details.' },
                { title: 'Book OPD', text: 'Select doctor, department, and appointment slot.' },
                { title: 'Track Queue', text: 'Follow your spot in real time and get wait updates.' },
                { title: 'Visit Doctor', text: 'Proceed to the OPD on time with a prepared visit.' },
              ].map((item, index) => (
                <div key={item.title} className="rounded-3xl border border-slate-700 bg-slate-800/80 p-6">
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-300">0{index + 1}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Bed availability</p>
              <h2 className="mt-4 text-3xl font-black text-slate-900">Live capacity overview</h2>
            </div>
            <Link to="/user/dashboard" className="hidden rounded-full border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 md:inline-flex">View all wards</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {bedPreview.map((department) => (
              <div key={department.department} className="rounded-3xl border border-sky-100 bg-white p-5 shadow-md shadow-sky-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{department.department}</h3>
                  <BedDouble className="h-5 w-5 text-sky-600" />
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-500"><span>Total Beds</span><strong className="text-slate-900">{department.total}</strong></div>
                  <div className="flex items-center justify-between text-sm text-slate-500"><span>Occupied</span><strong className="text-rose-600">{department.occupied}</strong></div>
                  <div className="flex items-center justify-between text-sm text-slate-500"><span>Available</span><strong className="text-emerald-600">{department.available}</strong></div>
                  <div className="flex items-center justify-between text-sm text-slate-500"><span>Reserved</span><strong className="text-amber-600">{department.reserved}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sky-50/80 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-xl shadow-sky-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">AI Assistant</p>
              <h2 className="mt-4 text-3xl font-black text-slate-900">Meet your AI Hospital Assistant</h2>
              <p className="mt-4 text-slate-600">Your digital front-desk guide for queue information, bed availability, appointment assistance, and hospital FAQs.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> OPD navigation and directions</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Queue and waiting time guidance</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Appointment support and service info</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> FAQ responses for bed and department queries</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-600 to-cyan-500 p-8 text-white shadow-[0_30px_80px_rgba(14,165,233,0.25)]">
              <div className="mb-6 inline-flex rounded-full bg-white/15 p-3">
                <MessageSquareText className="h-6 w-6" />
              </div>
              <div className="space-y-4 text-sm text-sky-50">
                <div className="max-w-[80%] rounded-2xl bg-white/10 p-3">What is my queue number?</div>
                <div className="ml-auto max-w-[80%] rounded-2xl bg-white p-3 text-sky-700">You are in queue Q-204 and there are 7 people before you.</div>
                <div className="max-w-[80%] rounded-2xl bg-white/10 p-3">Which departments have available beds?</div>
                <div className="ml-auto max-w-[80%] rounded-2xl bg-white p-3 text-sky-700">General, Pediatrics, and Emergency have beds available.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500">
                <Hospital className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">MediFlow</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Care Without Delay</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Helping hospitals streamline patient flow, doctor coordination, and resource planning with modern digital tools.</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Quick links</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {['Home', 'Services', 'About', 'Contact'].map((item) => <li key={item}><a href="#" className="hover:text-sky-700">{item}</a></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Services</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {['OPD Queue', 'Bed Tracking', 'Doctor Availability', 'AI Assistant'].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-sky-600" /> 24 City Care Avenue</li>
              <li>hello@mediflow.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sky-100">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
            <span>© 2026 MediFlow Health Systems</span>
            <div className="flex gap-5">
              <span>Privacy Policy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
