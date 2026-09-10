import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Search, Star } from 'lucide-react';
import projectsData from '@/data/projects.json';
import {
  Project,
  getCategoryLabel,
  getProjectSlug,
} from '@/types/project';

type Scope = 'all' | 'projects';

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;
  const q = query.trim();
  const parts: ReactNode[] = [];
  let i = 0;
  const lower = text.toLowerCase();
  const needle = q.toLowerCase();

  while (i < text.length) {
    const idx = lower.indexOf(needle, i);
    if (idx === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(
      <mark
        key={`${idx}-${needle}`}
        className="bg-transparent text-accent underline decoration-accent decoration-2 underline-offset-2 rounded-sm"
      >
        {text.slice(idx, idx + needle.length)}
      </mark>
    );
    i = idx + needle.length;
  }
  return parts;
};

interface ProjectsSearchProps {
  className?: string;
}

export const ProjectsSearch = ({ className = '' }: ProjectsSearchProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const projects = (projectsData?.projects as Project[]) || [];

  useEffect(() => setMounted(true), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...projects];

    if (scope === 'projects') {
      list = list.filter((p) => p.featured || p.category === 'native' || p.category === 'wordpress');
    }

    if (q) {
      list = list.filter((p) => {
        const hay = [
          p.title,
          p.description,
          p.longDescription,
          p.company,
          getCategoryLabel(p.category),
          ...(p.technologies || []),
          ...(p.features || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }

    return list
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 12);
  }, [projects, query, scope]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, scope]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(`/projects/${getProjectSlug(results[activeIndex])}`);
        close();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, activeIndex, navigate, close]);

  useEffect(() => {
    const onGlobal = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onGlobal);
    return () => window.removeEventListener('keydown', onGlobal);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[14vh]">
            <button
              type="button"
              aria-label="Close search"
              className="absolute inset-0 bg-primary/25 backdrop-blur-md animate-in fade-in duration-300"
              onClick={close}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Search projects"
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_28px_80px_-24px_rgba(15,23,42,0.45)] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, stack, features…"
                  className="flex-1 bg-transparent text-[15px] text-primary placeholder:text-muted-foreground/60 outline-none"
                />
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground hover:text-primary hover:border-border transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[min(52vh,420px)] overflow-y-auto py-2">
                {results.length === 0 ? (
                  <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No matches for “{query}”
                  </p>
                ) : (
                  <ul className="px-2 space-y-0.5">
                    {results.map((project, index) => {
                      const active = index === activeIndex;
                      const snippet =
                        project.description ||
                        project.features?.[0] ||
                        project.technologies?.slice(0, 3).join(' · ');

                      return (
                        <li key={project.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => {
                              navigate(`/projects/${getProjectSlug(project)}`);
                              close();
                            }}
                            className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors ${
                              active ? 'bg-secondary/80' : 'hover:bg-secondary/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary shrink-0 ring-1 ring-border/50">
                                {project.images?.[0] ? (
                                  <img
                                    src={project.images[0]}
                                    alt=""
                                    className="w-full h-full object-cover object-top"
                                  />
                                ) : null}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-[14px] font-semibold text-primary truncate">
                                    {highlightMatch(project.title, query)}
                                  </p>
                                  {project.featured && (
                                    <span className="inline-flex items-center gap-0.5 shrink-0 text-[10px] font-semibold text-accent">
                                      <Star size={11} className="fill-accent" />
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
                                  {highlightMatch(snippet, query)}
                                </p>
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-md border border-border/60 text-muted-foreground">
                                    {getCategoryLabel(project.category)}
                                  </span>
                                  {project.technologies?.slice(0, 2).map((tech) => (
                                    <span
                                      key={tech}
                                      className="text-[10px] px-1.5 py-0.5 rounded-md bg-accent/5 text-accent/90 border border-accent/15"
                                    >
                                      {highlightMatch(tech, query)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-border/50 bg-secondary/30">
                <div className="flex items-center gap-1.5">
                  {(
                    [
                      { id: 'all' as const, label: 'All' },
                      { id: 'projects' as const, label: 'Projects' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScope(item.id)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-colors ${
                        scope === item.id
                          ? 'bg-secondary text-primary border-border'
                          : 'bg-white text-muted-foreground border-border/70 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5 rounded border border-border/70 px-1 py-0.5">
                    <ArrowUp size={10} />
                    <ArrowDown size={10} />
                  </span>
                  <span>navigate</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 text-sm font-medium text-primary shadow-sm hover:border-accent/35 hover:text-accent transition-all ${className}`}
      >
        <Search size={15} />
        Search
        <kbd className="hidden sm:inline-flex ml-1 rounded border border-border/70 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      {modal}
    </>
  );
};
