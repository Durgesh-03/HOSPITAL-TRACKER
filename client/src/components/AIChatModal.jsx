import { useState } from 'react';
import { MessageCircleMore, SendHorizonal, Sparkles, X } from 'lucide-react';

const defaultPrompts = [
  'What is my queue number?',
  'Which departments have available beds?',
  'How do I book an appointment?',
  'Where is the OPD department?',
];

export default function AIChatModal({ title = 'AI Assistant', suggestions = defaultPrompts }) {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hi! I can help with queue updates, appointments, OPD guidance, and bed availability.' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const prompt = input.trim();
    const response = prompt.toLowerCase().includes('queue')
      ? 'Your current queue number is Q-204 and there are 7 patients ahead of you.'
      : prompt.toLowerCase().includes('bed')
        ? 'General Ward and Pediatrics currently have available beds. ICU has 4 available spots.'
        : prompt.toLowerCase().includes('appointment')
          ? 'You can book an appointment from the dashboard or by contacting the front desk.'
          : 'I can help with queue, appointments, bed information, hospital services, and navigation guidance.';

    setMessages((prev) => [...prev, { sender: 'user', text: prompt }, { sender: 'assistant', text: response }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[360px] overflow-hidden rounded-3xl border border-sky-100 bg-white/90 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">{title}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/10" aria-label="Close assistant">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto bg-sky-50/70 p-3">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.sender === 'assistant' ? 'bg-white text-slate-700' : 'ml-auto bg-sky-600 text-white'}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-sky-100 bg-white p-2">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] text-sky-700 transition hover:bg-sky-100">
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-sky-100 bg-white p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSend()}
              placeholder="Ask about queues or bed availability"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400"
            />
            <button type="button" onClick={handleSend} className="rounded-full bg-sky-600 p-2 text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
              <SendHorizonal className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-200 transition hover:scale-105">
          <MessageCircleMore className="h-4 w-4" />
          AI Assistant
        </button>
      )}
    </div>
  );
}
