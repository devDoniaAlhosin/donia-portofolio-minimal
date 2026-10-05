import { useState } from 'react';
import {
  MonitorSmartphone,
  AppWindow,
  Boxes,
  Database,
  ShieldCheck,
} from 'lucide-react';

const LAYERS = [
  {
    id: 'interface',
    n: '01',
    title: 'Interface',
    role: 'What people see and use',
    desc: 'Screens, navigation, and forms. The layout works on a phone and on a desktop, and can switch language when the product needs it.',
    pieces: ['React', 'Next.js', 'Responsive UI'],
    example: 'A student opens a lesson, or a client searches a trip, and the screen shows the right state.',
    flow: 'Someone uses the screen',
    icon: MonitorSmartphone,
  },
  {
    id: 'application',
    n: '02',
    title: 'Application',
    role: 'How a click becomes a request',
    desc: 'Pages and forms are wired to real endpoints. The frontend in React or Next.js sends a clear request to Laravel or Node.js.',
    pieces: ['React', 'Next.js', 'Laravel', 'Node.js'],
    example: 'Enrolling in a course or submitting a task is sent as data the server can check.',
    flow: 'The app sends a request',
    icon: AppWindow,
  },
  {
    id: 'services',
    n: '03',
    title: 'Business rules',
    role: 'What the system is allowed to do',
    desc: 'Accounts, payments, courses, tasks, careers, and finance live here. This layer is what turns a set of pages into software.',
    pieces: ['Auth', 'Payments', 'LMS', 'Tasks', 'Finance'],
    example: 'The system checks login, payment, and whether that person can open the lesson, task, or record.',
    flow: 'Rules check permission and payment',
    icon: Boxes,
  },
  {
    id: 'data',
    n: '04',
    title: 'Data',
    role: 'What the product stores',
    desc: 'Users, courses, tasks, applications, payments, and files are stored in MySQL so the product can read and update them reliably.',
    pieces: ['MySQL', 'Records', 'Files'],
    example: 'A booking, a quiz result, or a payment is saved and can be opened again later.',
    flow: 'The record is saved or read',
    icon: Database,
  },
  {
    id: 'control',
    n: '05',
    title: 'Admin',
    role: 'How the business runs it',
    desc: 'A dashboard for staff to publish content, manage students or applicants, approve submissions, and update what the public site shows.',
    pieces: ['Dashboard', 'Roles', 'Content'],
    example: 'An admin publishes a course, approves a review, or reviews finance records without changing code.',
    flow: 'Staff manage the result',
    icon: ShieldCheck,
  },
] as const;

export const AboutDesignProcess = () => {
  const [activeId, setActiveId] = useState<string>(LAYERS[2].id);
  const active = LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-14 sm:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Boxes size={14} className="text-accent" strokeWidth={2.25} />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
              Process
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
            How the software is structured
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
            Each product is five layers. Select a layer to see what is built there, and how one user action moves through the system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-4 lg:gap-6 items-start">
          <ol className="rounded-lg border border-border/70 bg-secondary/30 p-3 sm:p-4">
            {LAYERS.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = layer.id === active.id;
              const isLast = index === LAYERS.length - 1;
              return (
                <li key={layer.id} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums border ${
                        isActive
                          ? 'bg-accent text-white border-accent'
                          : 'bg-background text-accent border-border'
                      }`}
                    >
                      {layer.n}
                    </span>
                    {!isLast && <span className="w-px flex-1 min-h-3 bg-border my-1" />}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveId(layer.id)}
                    aria-pressed={isActive}
                    className={`flex-1 rounded-lg border px-3 py-3 text-left transition-colors ${
                      isLast ? '' : 'mb-2'
                    } ${
                      isActive
                        ? 'border-accent/40 bg-background shadow-sm'
                        : 'border-transparent bg-transparent hover:bg-background/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={15} className={isActive ? 'text-accent' : 'text-muted-foreground'} />
                      <span className="font-display text-[15px] sm:text-base font-bold text-primary tracking-tight">
                        {layer.title}
                      </span>
                    </span>
                    <span className="mt-1 block text-[12px] text-muted-foreground leading-snug">
                      {layer.role}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <article className="rounded-lg border border-border/70 bg-background p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Layer {active.n}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-primary tracking-tight">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">{active.role}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent border border-accent/20">
                <ActiveIcon size={18} />
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{active.desc}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.pieces.map((piece) => (
                <span
                  key={piece}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-accent/10 text-accent border border-accent/20"
                >
                  {piece}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-secondary/70 px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                In a real product
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{active.example}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-border/70">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                This step in the request
              </p>
              <p className="mt-1 text-sm font-medium text-primary">{active.flow}</p>
              <div className="mt-3 flex items-center gap-1.5" aria-hidden>
                {LAYERS.map((layer) => (
                  <span
                    key={layer.id}
                    className={`h-1.5 flex-1 rounded-full ${
                      layer.id === active.id ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
