import { motion } from 'framer-motion';
import { AlertTriangle, BedDouble, ClipboardCheck, Clock3, Hospital, MessageSquareText, ShieldCheck, UserRound } from 'lucide-react';
import { useState } from 'react';
import { apiRequest } from '../api/client';
import { staffDashboardData as fallbackDashboardData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import AIChatModal from '../components/AIChatModal';

export default function StaffDashboard() {
  const { token } = useAuth();
  const { data: staffDashboardData, error: dashboardError, setData } = useDashboard('staff', fallbackDashboardData);
  const [actionError, setActionError] = useState('');

  const updateBedStatus = async (event, bed) => {
    const status = event.target.value;
    try {
      await apiRequest(`/beds/${encodeURIComponent(bed.bedNumber)}/status`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status }),
      });
      setData((current) => ({
        ...current,
        beds: current.beds.map((item) => item.bedNumber === bed.bedNumber ? { ...item, status } : item),
      }));
      setActionError('');
    } catch (error) {
      setActionError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 text-slate-800 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Nurse / Staff</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Ward Operations</h1>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Department synchronized
            </div>
          </div>
        </header>

        {dashboardError && <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Showing sample data because the database API is unavailable: {dashboardError}</div>}
        {actionError && <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{actionError}</div>}

        <section className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Available Beds', value: '12' },
            { label: 'Admissions today', value: '09' },
            { label: 'Discharges pending', value: '03' },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ y: -5 }} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="mt-4 text-3xl font-black text-slate-900">{stat.value}</div>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Bed management</h2>
            <div className="mt-5 space-y-4">
              {staffDashboardData.beds.map((bed) => (
                <div key={bed.bedNumber} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">{bed.bedNumber}</div>
                    <div className="text-sm text-slate-500">{bed.department} • {bed.ward}</div>
                  </div>
                  <div className="text-sm text-slate-600">Patient: {bed.patient}</div>
                  <select aria-label={`Update ${bed.bedNumber} status`} value={bed.status} onChange={(event) => updateBedStatus(event, bed)} className={`w-fit rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${bed.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : bed.status === 'Occupied' ? 'bg-rose-100 text-rose-700' : bed.status === 'Reserved' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                    {['Available', 'Occupied', 'Reserved', 'Cleaning'].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Department information</h2>
            <div className="mt-5 space-y-4">
              {[
                { label: 'General Ward', value: '12 beds available' },
                { label: 'ICU', value: '4 beds available' },
                { label: 'Emergency', value: '6 beds active' },
                { label: 'Pediatrics', value: '2 discharge pending' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-2 font-bold text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Admission & discharge status</h2>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Admission clearance', status: 'Pending', icon: ClipboardCheck },
                { label: 'Discharge paperwork', status: 'In progress', icon: Clock3 },
                { label: 'Bed cleaning', status: 'Urgent', icon: AlertTriangle },
              ].map(({ label, status, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="flex items-center gap-3 font-medium text-slate-700"><Icon className="h-4 w-4 text-sky-600" /> {label}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status === 'Pending' ? 'bg-amber-100 text-amber-700' : status === 'Urgent' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Notifications</h2>
            <div className="mt-5 space-y-4">
              {staffDashboardData.notifications.map((notification) => (
                <div key={notification} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <Hospital className="h-4 w-4 text-sky-600" />
                  {notification}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <AIChatModal title="Ward Assistant" suggestions={['Show available beds', 'What rooms need cleaning?', 'What is the current admission status?']} />
    </div>
  );
}
