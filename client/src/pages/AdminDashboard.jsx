import { motion } from 'framer-motion';
import { Activity, BedDouble, Building2, CalendarRange, FileBarChart, Hospital, MessageSquareText, Stethoscope, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { adminChartData, adminStats, departmentPatients, queueTable } from '../data/mockData';
import { useDashboard } from '../hooks/useDashboard';
import AIChatModal from '../components/AIChatModal';

const sidebarItems = ['Dashboard', 'OPD Queue Management', 'Appointments', 'Patients', 'Doctors', 'Departments', 'Bed Management', 'Staff', 'Notifications', 'Reports & Analytics', 'AI Insights', 'Settings', 'Logout'];

export default function AdminDashboard() {
  const { data: dashboard, error: dashboardError } = useDashboard('admin', {
    stats: adminStats,
    queue: queueTable,
    beds: [
      { bed: 'G-14', department: 'General', ward: 'Ward A', status: 'Available' },
      { bed: 'ICU-02', department: 'ICU', ward: 'ICU Block', status: 'Occupied' },
      { bed: 'ER-06', department: 'Emergency', ward: 'ER', status: 'Reserved' },
      { bed: 'PED-09', department: 'Pediatrics', ward: 'Pediatric Ward', status: 'Cleaning' },
    ],
    chartData: adminChartData,
    departmentData: departmentPatients,
  });

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 text-slate-800 lg:p-6">
      <div className="mx-auto flex max-w-[1600px] gap-6">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-slate-200 bg-slate-900 p-5 text-slate-100 shadow-2xl shadow-slate-300 lg:block">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400"><Hospital className="h-5 w-5 text-white" /></div>
            <div>
              <div className="text-lg font-black">CareOps</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Admin Console</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {sidebarItems.map((item) => (
              <button key={item} type="button" className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition ${item === 'Dashboard' ? 'bg-sky-500/20 text-sky-200' : 'text-slate-300 hover:bg-slate-800'}`}>
                <span>{item}</span>
                {item === 'Dashboard' && <Activity className="h-4 w-4" />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Operations Overview</p>
                <h1 className="mt-2 text-3xl font-black text-slate-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <Building2 className="h-4 w-4" />
                All systems healthy
              </div>
            </div>
          </header>

          {dashboardError && <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Showing sample data because the database API is unavailable: {dashboardError}</div>}

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dashboard.stats.map((stat) => (
              <motion.div key={stat.label} whileHover={{ y: -5 }} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
                <div className="text-sm text-slate-500">{stat.label}</div>
                <div className="mt-4 text-3xl font-black text-slate-900">{stat.value}</div>
              </motion.div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">OPD Queue Management</h2>
                <button type="button" className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Filter by department</button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Patient</th>
                      <th className="px-4 py-3 font-semibold">Queue</th>
                      <th className="px-4 py-3 font-semibold">Doctor</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Wait</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.queue.map((row) => (
                      <tr key={row.patient} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-medium text-slate-800">{row.patient}</td>
                        <td className="px-4 py-3 text-slate-600">{row.queue}</td>
                        <td className="px-4 py-3 text-slate-600">{row.doctor}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${row.status === 'In Consultation' ? 'bg-sky-100 text-sky-700' : row.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.wait}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Bed Management</h2>
              <div className="mt-5 space-y-4">
                {dashboard.beds.map((bed) => (
                  <div key={bed.bed} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{bed.bed}</span>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${bed.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : bed.status === 'Occupied' ? 'bg-rose-100 text-rose-700' : bed.status === 'Reserved' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>{bed.status}</span>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{bed.department} • {bed.ward}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Daily OPD patient count</h2>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={adminChartData}>
                    <defs>
                      <linearGradient id="patients" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="patients" stroke="#0ea5e9" fill="url(#patients)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Department-wise patients</h2>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPatients}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="patients" fill="#22c55e" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Bed occupancy rate</h2>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: 'Occupied', value: 42 }, { name: 'Available', value: 38 }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} fill="#0ea5e9" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Operational insights</h2>
              <div className="mt-5 space-y-4">
                {[
                  'Which department has the highest queue?',
                  'Show today\'s bed occupancy.',
                  'Which department has the longest waiting time?',
                  'How many beds are available?',
                ].map((question) => (
                  <div key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{question}</div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <AIChatModal title="Admin Insights" suggestions={['Which department has the highest queue?', 'Show today\'s bed occupancy.', 'Give me today\'s OPD summary.']} />
    </div>
  );
}
