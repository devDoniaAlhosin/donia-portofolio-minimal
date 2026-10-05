import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';
import projectsData from '@/data/projects.json';
import {
  Project,
  getCategoryLabel,
  getProjectLinks,
  getProjectSlug,
  inferServiceCategory,
  getServiceCategoryLabel,
} from '@/types/project';
import {
  Sparkles,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Target,
  TriangleAlert,
  BrainCircuit,
  Workflow,
  BadgeCheck,
  Link2,
  Plus,
  X as CloseIcon,
  Home,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react';

type ProcessSection = {
  title: string;
  desc: string;
  points?: string[];
};

const LMS_PROCESS: ProcessSection[] = [
  {
    title: 'Public Site & Course Catalog',
    desc: 'Marketing homepage, mastery programs, and course discovery that convert visitors into learners.',
    points: [
      'Built conversion-focused public pages for programs, courses, and brand positioning.',
      'Structured catalog browsing so learners can find and enroll in the right track.',
      'Connected public CTAs to enrollment and payment flows.',
    ],
  },
  {
    title: 'Course & Lesson Engine',
    desc: 'Full LMS content model for courses, lessons, and learning paths with controlled delivery.',
    points: [
      'Modeled courses, modules, and lessons for flexible curriculum updates.',
      'Delivered sequential learning with clear progress through each lesson.',
      'Kept content editable through CMS without code changes.',
    ],
  },
  {
    title: 'Student Management',
    desc: 'Enrollment, profiles, and role-based access for learners across the platform.',
    points: [
      'Managed student accounts, enrollments, and access rules by role.',
      'Separated learner experience from admin operations cleanly.',
      'Tracked who is enrolled in which program or course at any time.',
    ],
  },
  {
    title: 'Tasks, Quizzes & Progress',
    desc: 'Assignments, assessments, and progress tracking that keep learning measurable.',
    points: [
      'Built task and assignment workflows for practical coursework.',
      'Added quizzes and assessment tracking with clear completion states.',
      'Exposed progress on the learner dashboard so students know what’s next.',
    ],
  },
  {
    title: 'Payments & Checkout',
    desc: 'Fawaterak-powered payments with reliable status handling for course purchases.',
    points: [
      'Integrated Fawaterak for course and program checkout.',
      'Handled success, failure, and pending payment states safely.',
      'Unlocked course access only after confirmed payment.',
    ],
  },
  {
    title: 'Admin CMS & Dashboards',
    desc: 'Admin control panel for content, students, assessments, and platform operations.',
    points: [
      'Delivered admin dashboard for courses, lessons, users, and enrollments.',
      'Enabled CMS-driven updates for pages and learning content.',
      'Gave operators full visibility into learning activity and payment status.',
    ],
  },
];

const SUNSNOW_PROCESS: ProcessSection[] = [
  {
    title: 'Discovery & Trip Search',
    desc: 'Arabic-first homepage with trip type, destination, price range, and duration filters.',
    points: [
      'Built the public journey around winter, summer, honeymoon, adventure, and general trips.',
      'Mapped destinations with most-requested, top-rated, and connected-destination views.',
      'Kept search results tied to live package data instead of static pages.',
    ],
  },
  {
    title: 'Packages & Account Gate',
    desc: 'Full itineraries, prices, and program details unlock after registration.',
    points: [
      'Gated package prices and day-by-day programs behind traveler accounts.',
      'Structured packages with stays, activities, restaurants, and visit timing.',
      'Supported custom package requests from the contact flow.',
    ],
  },
  {
    title: 'Multilingual Content',
    desc: 'Arabic, English, and French content for a Dubai-based travel brand.',
    points: [
      'Shipped language switching across navigation, packages, and articles.',
      'Kept RTL layout correct for the Arabic experience.',
      'Let admins publish the same offer in more than one language.',
    ],
  },
  {
    title: 'Reviews with Admin Approval',
    desc: 'Travelers submit ratings, photos, and stories that stay hidden until an admin approves them.',
    points: [
      'Public review form with name, role, rating, optional photo, and comment.',
      'Moderation queue so nothing goes live before admin approval.',
      'Approved stories appear in the customer opinions section.',
    ],
  },
  {
    title: 'Articles & Contact',
    desc: 'Travel guides plus a structured inquiry form for bookings and custom trips.',
    points: [
      'Article CMS for planning guides and destination posts.',
      'Contact subjects cover general questions, listed packages, bookings, and custom trips.',
      'Stored inquiries for the team in Dubai to follow up.',
    ],
  },
  {
    title: 'Admin Control Panel',
    desc: 'Operators manage packages, destinations, reviews, articles, users, and featured placements.',
    points: [
      'Full CMS for packages, destinations, price bands, and itinerary content.',
      'Controls for featured, most-requested, and highest-rated destinations.',
      'User accounts, review moderation, and site content updates without a deploy.',
    ],
  },
];

const SOLAR_PROCESS: ProcessSection[] = [
  {
    title: 'Custom layout builder',
    desc: 'Home, About, the single service page, and Contact were built natively and stay editable from the dashboard.',
    points: [
      'Built the layouts natively in Arabic RTL: Home, About, single service, and Contact.',
      'A custom builder controls every section from the dashboard.',
      'Each layout is a composition of components, so content updates from the admin without a code change.',
    ],
  },
  {
    title: 'Booking system',
    desc: 'Booking flow for car size, services, branch, time, and payment, on the same platform.',
    points: [
      'Six steps: car size, service category and products, branch and time, customer details, summary, then payment.',
      'Sidebar summary stays in sync, and the selection is kept if the customer leaves and comes back.',
      'Arabic RTL layout, with sliders and a product carousel on mobile.',
    ],
  },
  {
    title: 'Services and cart',
    desc: 'Standard products plus spraying, professional polishing, and professional upholstery.',
    points: [
      'Simple products add from the card. Variable products open a quick view for options.',
      'Spraying uses zone tabs and a live color preview. Polishing and upholstery use pattern and color.',
      'The WooCommerce cart stores more than one category, with sale and regular prices in SAR.',
    ],
  },
  {
    title: 'Branch, time, and orders',
    desc: 'The customer picks a region, branch, date, and time before the order is created.',
    points: [
      'Regions and branches come from the branch configuration.',
      'Date and time slots are chosen before checkout.',
      'The order stores size, categories, branch, region, date, and time, and can apply a coupon.',
    ],
  },
  {
    title: 'Payment and confirmation',
    desc: 'Enabled WooCommerce payment methods, then a custom Arabic thank-you page.',
    points: [
      'Lists the gateways turned on in WooCommerce, with cash on delivery as the default.',
      'Saves the chosen gateway on the order.',
      'Thank-you page confirms the booking in Arabic, with the services and SAR prices.',
    ],
  },
  {
    title: 'User and admin dashboards',
    desc: 'A customer dashboard and an admin dashboard for the same booking system.',
    points: [
      'Customers use a dashboard to follow their booking after checkout.',
      'Staff use the admin dashboard to manage services, orders, and bookings.',
      'Order details stay attached to the booking so both sides see the same visit.',
    ],
  },
];

const SOLAR_LAYOUTS = [
  {
    id: 'homepage',
    title: 'Homepage',
    role: 'A registered layout. Each block is a component with its own fields, media, and Arabic/English copy.',
    parts: [
      { name: 'Hero', stores: 'Image, buttons, eyebrow, title, offer, description, gauge copy.', renders: 'Split hero. A National Day flag swaps this block without rebuilding the page.' },
      { name: 'USP', stores: 'Icon and label pairs.', renders: 'Icon strip under the hero.' },
      { name: 'About', stores: 'Copy and media for the about block.', renders: 'Homepage about section.' },
      { name: 'Experience', stores: 'Strip copy.', renders: 'Experience band.' },
      { name: 'Gallery', stores: 'Ordered media attachments. Alt text is read from the file, not a second field.', renders: 'Reorderable gallery.' },
      { name: 'Offers', stores: 'Stat, side image, offer copy, booking target.', renders: 'Offer card beside the 10-year stat.' },
      { name: 'Services', stores: 'Section copy plus a card list: image, title, popup, details URL, booking target. PDR can route to WhatsApp.', renders: 'Service cards with a detail popup.' },
      { name: 'FAQ', stores: 'Question, answer, optional booking and phone rows.', renders: 'Accordion.' },
      { name: 'Reviews', stores: 'Review entries.', renders: 'Reviews block.' },
      { name: 'Contact', stores: 'Contact copy. Action is Book Now.', renders: 'Closing contact band.' },
    ],
  },
  {
    id: 'national',
    title: 'National Day',
    role: 'A campaign layer. It can override the homepage hero and inject banners without a separate site.',
    parts: [
      { name: 'Hero mode', stores: 'On/off, banner, eyebrow, title, offer, description.', renders: 'Replaces the homepage hero while the campaign is on.' },
      { name: 'Marquee', stores: 'Arabic and English lines, speed, destination URL.', renders: 'Scrolling offer. Separator icon changes with the campaign flag.' },
      { name: 'Separators', stores: 'Mark assets.', renders: 'Dividers between sections.' },
      { name: 'Hero banner', stores: 'Standalone hero media and copy.', renders: 'Campaign hero, independent of the homepage hero.' },
      { name: 'Book banner', stores: 'Banner media and booking target.', renders: 'Campaign booking band.' },
      { name: 'Cinematic banner', stores: 'Background, title, subtitle, logo visibility, icon size, URL.', renders: 'Full-bleed banner. A percentage in the subtitle is highlighted.' },
    ],
  },
  {
    id: 'book',
    title: 'Book Now',
    role: 'Page chrome for the booking entry. Title falls back to the WordPress page title when the field is empty.',
    parts: [
      { name: 'Page title', stores: 'Background, title, subtitle.', renders: 'Cinematic header: photo, shade, centered title, bars beside the subtitle, highlighted percentage.' },
    ],
  },
  {
    id: 'about',
    title: 'About',
    role: 'A second composed layout. It reuses the offers component from the homepage.',
    parts: [
      { name: 'Intro', stores: 'Company copy, stats, phone, action.', renders: 'Intro with stats.' },
      { name: 'Features', stores: 'Center image and feature items: icon, title, text, links. PDR can book on WhatsApp.', renders: 'Features around a center image.' },
      { name: 'Offers', stores: 'Same offer model as the homepage.', renders: 'Shared offers component.' },
      { name: 'Before and after', stores: 'Three comparisons and a badge.', renders: 'Comparison columns.' },
    ],
  },
  {
    id: 'services',
    title: 'Services gallery',
    role: 'Gallery data is keyed to the global services catalog, so a new service adds a filter tab.',
    parts: [
      { name: 'Gallery', stores: 'Images with a service key and an optional caption.', renders: 'Masonry grid filtered by catalog tabs.' },
      { name: 'Cards', stores: 'Heading plus card image, title, text, and action.', renders: 'Service card row.' },
      { name: 'Spray', stores: 'Steps, part labels, color swatches, action.', renders: 'Interactive color picker.' },
      { name: 'PDR', stores: 'Three comparison pairs.', renders: 'Before-and-after sliders. This module is not part of the full gallery composition.' },
    ],
  },
  {
    id: 'pages',
    title: 'Other pages',
    role: 'Each page is its own layout registration with a dedicated template.',
    parts: [
      { name: 'Videos', stores: 'Title and a video list.', renders: 'Player plus playlist.' },
      { name: 'Contact', stores: 'Panel copy, social links, form embed.', renders: 'Contact layout.' },
      { name: 'Branches', stores: 'Reads the shared branch records.', renders: 'Map plus address, hours, and WhatsApp per branch.' },
      { name: 'Defender', stores: 'Story sections: hero, details, interior, comparisons, result, videos, closing action.', renders: 'Case-study page.' },
    ],
  },
  {
    id: 'globals',
    title: 'Globals',
    role: 'Shared config. Layouts read it instead of duplicating brand, catalog, and branch data.',
    parts: [
      { name: 'Brand', stores: 'Color, radius, Book Now URL, services anchor, email, phone, company, hours.', renders: 'Injected into every layout that needs brand or contact data.' },
      { name: 'Services catalog', stores: 'Key, Arabic title, English title, page URL.', renders: 'Gallery filter tabs and booking service keys.' },
      { name: 'Branches', stores: 'Shared branch records.', renders: 'The branches page and booking branch list.' },
    ],
  },
] as const;

const SOLAR_BOOKING = [
  { title: 'Car size', layer: 'Query input', edit: 'Size is a taxonomy term with an image. The selected term is the filter for every product query after it.' },
  { title: 'Services', layer: 'Catalog', edit: 'Products load by size and category. Simple items, variations, spray zones, polishing, and upholstery all write into one cart model.' },
  { title: 'Branch and time', layer: 'Slot', edit: 'Region and branch come from branch config. Date and time are stored on the selection before the order exists.' },
  { title: 'Details', layer: 'Customer', edit: 'Name and contact are kept with the selection, including if the browser session is resumed.' },
  { title: 'Summary', layer: 'Cart', edit: 'The sidebar reads the live cart: lines, sale and regular prices in SAR, and a coupon.' },
  { title: 'Payment', layer: 'Order', edit: 'Enabled gateways are listed. The order stores size, categories, branch, region, date, and time, then the thank-you page reads that order.' },
] as const;

function SolarProjectStudio() {
  const [pageId, setPageId] = useState<(typeof SOLAR_LAYOUTS)[number]['id']>('homepage');
  const [partName, setPartName] = useState<string>(SOLAR_LAYOUTS[0].parts[0].name);
  const [step, setStep] = useState(0);

  const page = SOLAR_LAYOUTS.find((item) => item.id === pageId) ?? SOLAR_LAYOUTS[0];
  const part = page.parts.find((item) => item.name === partName) ?? page.parts[0];
  const booking = SOLAR_BOOKING[step];

  const selectPage = (id: (typeof SOLAR_LAYOUTS)[number]['id']) => {
    const next = SOLAR_LAYOUTS.find((item) => item.id === id) ?? SOLAR_LAYOUTS[0];
    setPageId(next.id);
    setPartName(next.parts[0].name);
  };

  return (
    <div className="space-y-4">
      <section id="layout-engine" className="rounded-lg border border-border/70 bg-background p-5 sm:p-6">
        <p className="text-[11px] font-bold tabular-nums text-accent">01</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-primary tracking-tight">
          Modular WordPress Layout Engine
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Layouts are registered as compositions of components. Admin fields, media, and Arabic/English copy live on the component. Pick a layout, then a module.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['Layout registry', 'Component fields', 'Media library', 'AR / EN locale'].map((item) => (
            <span key={item} className="rounded-full bg-secondary px-3 py-1 text-[12px] text-primary">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[13rem_minmax(0,1fr)] gap-4">
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1">
            {SOLAR_LAYOUTS.map((item) => {
              const on = item.id === page.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPage(item.id)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    on ? 'bg-accent text-white' : 'bg-secondary text-primary hover:bg-secondary/70'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          <div className="rounded-lg border border-border/70 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{page.role}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {page.parts.map((item) => {
                const on = item.name === part.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setPartName(item.name)}
                    className={`rounded-full border px-3 py-1 text-[12px] transition-colors ${
                      on
                        ? 'border-accent bg-accent/10 text-primary'
                        : 'border-border/80 text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 grid gap-2">
              <div className="rounded-lg bg-secondary/60 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">Stores</p>
                <p className="mt-1 text-sm text-primary leading-relaxed">{part.stores}</p>
              </div>
              <div className="rounded-lg bg-secondary/60 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">Renders</p>
                <p className="mt-1 text-sm text-primary leading-relaxed">{part.renders}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="rounded-lg border border-border/70 bg-background p-5 sm:p-6">
        <p className="text-[11px] font-bold tabular-nums text-accent">02</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-primary tracking-tight">
          Booking system
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          A step pipeline. Selection state feeds the product query, the cart, then the order. Select a step.
        </p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SOLAR_BOOKING.map((item, index) => {
            const on = index === step;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setStep(index)}
                className={`rounded-lg border px-2.5 py-2.5 text-left transition-colors ${
                  on ? 'border-accent bg-accent text-white' : 'border-border/80 hover:border-accent/40'
                }`}
              >
                <span className={`block text-[10px] font-bold tabular-nums ${on ? 'text-white/75' : 'text-accent'}`}>
                  {item.layer}
                </span>
                <span className={`mt-0.5 block text-[13px] font-semibold ${on ? 'text-white' : 'text-primary'}`}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 rounded-lg bg-secondary/60 px-4 py-3.5">
          <p className="text-sm font-semibold text-primary">{booking.title}</p>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{booking.edit}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <p className="rounded-lg border border-border/70 px-3 py-2.5 text-primary">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-accent">Customer</span>
            Follows the booking after checkout.
          </p>
          <p className="rounded-lg border border-border/70 px-3 py-2.5 text-primary">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-accent">Admin</span>
            Manages services, orders, and visits.
          </p>
        </div>
      </section>
    </div>
  );
}

const inferWebsiteStructure = (project: Project): ProcessSection[] => {
  if (project.brandTheme === 'solarpro') {
    return SOLAR_PROCESS;
  }

  if (project.brandTheme === 'sunsnow') {
    return SUNSNOW_PROCESS;
  }

  if (project.brandTheme === 'abdelrahman' || project.brandTheme === 'fouad') {
    return LMS_PROCESS;
  }

  if (project.brandTheme === 'o2nations') {
    return [
      {
        title: 'Home Page',
        desc: 'Lead with AI value proposition, brand voice, and primary conversion CTA.',
      },
      {
        title: 'Services',
        desc: 'Present service pillars with clear outcomes and scannable blocks.',
      },
      {
        title: 'Case Studies',
        desc: 'Show proof of delivery across industries with focused business impact.',
      },
      {
        title: 'Solutions',
        desc: 'Map tailored solutions to business needs and reinforce trust before contact.',
      },
    ];
  }

  const featureText = project.features.map((f) => f.toLowerCase()).join(' | ');
  const sections = [
    { title: 'Hero Section', match: ['hero', 'home', 'landing'], desc: 'Clear value proposition and main CTA.' },
    { title: 'Service / Expertise', match: ['service', 'expertise', 'solution'], desc: 'Explains core offerings with strong hierarchy.' },
    { title: 'Case Studies', match: ['case', 'portfolio', 'project'], desc: 'Builds trust through real implementation examples.' },
    { title: 'Content / Insights', match: ['blog', 'insight', 'news'], desc: 'Supports SEO and topical authority.' },
    { title: 'Contact / Conversion', match: ['contact', 'form', 'booking', 'enrollment'], desc: 'Guides users to conversion touchpoints.' },
    { title: 'Team / Social Proof', match: ['team', 'testimonial', 'instructor', 'partner'], desc: 'Adds credibility with people and proof.' },
  ].filter((item) => item.match.some((token) => featureText.includes(token)));

  if (sections.length >= 3) {
    return sections.map(({ title, desc }) => ({ title, desc }));
  }

  return [
    { title: 'Hero Section', desc: 'Communicate the offer and product positioning quickly.' },
    { title: 'Core Services', desc: 'Show key capabilities in a scannable visual layout.' },
    { title: 'Case Studies', desc: 'Demonstrate proven outcomes and implementation quality.' },
    { title: 'Conversion Area', desc: 'Provide clear next action via contact or booking flow.' },
  ];
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = useMemo(
    () => (projectsData.projects as Project[]).find((item) => getProjectSlug(item) === slug),
    [slug]
  );
  const [zoomedAssetIndex, setZoomedAssetIndex] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeSection, setActiveSection] = useState(
    project?.brandTheme === 'solarpro' ? 'layout-engine' : 'built'
  );
  const [linkCopied, setLinkCopied] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const pageGallery = useMemo(() => {
    if (!project) return [];
    const heroImage = project.images[0];
    return (project.assets ?? []).filter(
      (asset) => asset.type === 'image' && asset.url !== heroImage
    );
  }, [project]);
  const hasPageGallery = pageGallery.length > 0;

  const goGallery = (dir: 1 | -1) => {
    setZoomedAssetIndex((prev) => {
      if (prev === null || pageGallery.length === 0) return prev;
      return (prev + dir + pageGallery.length) % pageGallery.length;
    });
  };

  useEffect(() => {
    if (zoomedAssetIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedAssetIndex(null);
      if (e.key === 'ArrowRight') {
        setZoomedAssetIndex((prev) =>
          prev === null || pageGallery.length === 0
            ? prev
            : (prev + 1) % pageGallery.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setZoomedAssetIndex((prev) =>
          prev === null || pageGallery.length === 0
            ? prev
            : (prev - 1 + pageGallery.length) % pageGallery.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedAssetIndex, pageGallery.length]);

  useEffect(() => {
    if (!project) return;

    const isWebsite =
      project.category === 'wordpress' ||
      Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '');
    const ids = [
      'built',
      'objective',
      'features',
      'challenge',
      'solutions',
      ...(isWebsite ? ['process'] : []),
      ...(hasPageGallery ? ['gallery'] : []),
      'results',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.2, 0.4, 0.6] }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slug, project, hasPageGallery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  if (!project) {
    return (
      <>
        <main className="pt-28 pb-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Project Not Found</h1>
            <Button asChild variant="cta">
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </>
    );
  }

  const { hasValidLiveUrl, hasValidGithubUrl } = getProjectLinks(project);
  const isWebsiteProject =
    project.category === 'wordpress' ||
    Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '');
  const websiteStructure = inferWebsiteStructure(project);
  const isLmsProcess =
    project.brandTheme === 'abdelrahman' || project.brandTheme === 'fouad';
  const isSunsnow = project.brandTheme === 'sunsnow';
  const isSolar = project.brandTheme === 'solarpro';
  const processSteps = websiteStructure.map((section, idx) => ({
    id: idx,
    indexLabel: `1.${idx + 1}`,
    title: section.title,
    summary: section.desc,
    points: section.points ?? [
      `Defined clear scope and section priorities for ${section.title.toLowerCase()}.`,
      'Aligned UX decisions with business goals and conversion intent.',
      'Implemented reusable components to keep delivery scalable and maintainable.',
    ],
  }));
  const ownership = /solo/i.test(project.teamSize)
    ? 'Owned the software end to end — from structure and UI through build and delivery.'
    : `Delivered with a ${project.teamSize.toLowerCase()} team.`;
  const workKind =
    project.category === 'native'
      ? 'Full-stack web application'
      : project.category === 'wordpress'
        ? 'WordPress build'
        : project.category === 'testing'
          ? 'Testing and quality work'
          : 'UI design';
  const shipped = project.features.slice(0, 5);
  const engineered = project.solutions.slice(0, 3);

  const sectionAnchors = isSolar
    ? [
        { id: 'layout-engine', label: 'Layout engine', icon: Target },
        { id: 'booking', label: 'Booking system', icon: BadgeCheck },
      ]
    : [
    { id: 'built', label: 'What was built', icon: Target },
    { id: 'objective', label: 'The product', icon: Target },
    { id: 'features', label: 'Software shipped', icon: BadgeCheck },
    { id: 'challenge', label: 'Constraints', icon: TriangleAlert },
    { id: 'solutions', label: 'How I built it', icon: BrainCircuit },
    ...(isWebsiteProject ? [{ id: 'process', label: 'Process', icon: Workflow }] : []),
    ...(hasPageGallery ? [{ id: 'gallery', label: 'Screenshots', icon: ZoomIn }] : []),
    { id: 'results', label: 'Results', icon: Sparkles },
  ];
  const activeSectionIndex = Math.max(
    0,
    sectionAnchors.findIndex((section) => section.id === activeSection)
  );
  const sectionProgress = ((activeSectionIndex + 1) / sectionAnchors.length) * 100;
  const serviceCategory = inferServiceCategory(project);
  const relatedProjects = (projectsData.projects as Project[])
    .filter((item) => item.id !== project.id)
    .filter((item) => inferServiceCategory(item) === serviceCategory || item.category === project.category)
    .slice(0, 3);
  const resultHighlights = project.solutions.slice(0, 4).map((text, idx) => ({
    title: ['Primary Outcome', 'Technical Approach', 'User Experience', 'Business Impact'][idx] || 'Outcome',
    text,
  }));
  const roleLabel =
    project.category === 'testing'
      ? 'QA Engineer'
      : project.category === 'ui'
        ? 'UI/UX Designer'
        : 'Full-stack Developer';
  const clientLabel = project.company || 'Independent';
  const keywords = [
    ...project.technologies,
    ...(isSolar
      ? [
          'Layout engine',
          'Component fields',
          'Media library',
          'Booking pipeline',
          'Admin dashboard',
          'User dashboard',
          'RTL',
          'Bilingual',
        ]
      : project.features.slice(0, 4)),
  ];

  const shareProject = (kind: 'x' | 'linkedin' | 'email' | 'copy') => {
    const url = window.location.href;
    const text = project.title;
    if (kind === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setLinkCopied(true);
        window.setTimeout(() => setLinkCopied(false), 1600);
      });
      return;
    }
    if (kind === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
      return;
    }
    const href =
      kind === 'x'
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <main className="pt-28 sm:pt-32 pb-16 relative overflow-x-clip">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
                <li>
                  <Link to="/" className="inline-flex items-center hover:text-accent transition-colors" aria-label="Home">
                    <Home size={15} />
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/40">
                  <ChevronRight size={14} />
                </li>
                <li>
                  <Link to="/projects" className="hover:text-accent transition-colors">
                    Projects
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/40">
                  <ChevronRight size={14} />
                </li>
                <li className="text-primary font-medium truncate max-w-[12rem] sm:max-w-xs">{project.title}</li>
              </ol>
            </nav>
            <span className="shrink-0 rounded-lg border border-border px-3 py-1 text-[13px] text-primary">
              {project.duration}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.72fr)] gap-8 lg:gap-12 items-start">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary tracking-[-0.03em] leading-[1.05]">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] sm:text-base text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent mb-2.5">
                  Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[13px] font-medium text-primary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex lg:justify-end">
                {hasValidLiveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Check it out
                  </a>
                ) : hasValidGithubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Source code
                  </a>
                ) : null}
              </div>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2">
                  <dt className="font-semibold text-primary">Roles:</dt>
                  <dd className="text-primary/90">{roleLabel}</dd>
                </div>
                <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2">
                  <dt className="font-semibold text-primary">Client:</dt>
                  <dd className="text-primary/90">{clientLabel}</dd>
                </div>
                <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2">
                  <dt className="font-semibold text-primary">Team:</dt>
                  <dd className="text-primary/90">{project.teamSize}</dd>
                </div>
                <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-2">
                  <dt className="font-semibold text-primary">Focus:</dt>
                  <dd className="text-primary/90">{isSolar ? 'Layout engine and booking' : workKind}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.72fr)] gap-8 lg:gap-12 items-start">
            <div className="overflow-hidden rounded-lg bg-secondary/40">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-auto object-contain"
              />
            </div>

            <aside className="lg:sticky lg:top-28 space-y-8">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <span className="inline-flex flex-col gap-0.5" aria-hidden>
                    <span className="block h-px w-3.5 bg-primary" />
                    <span className="block h-px w-3.5 bg-primary" />
                    <span className="block h-px w-3.5 bg-primary" />
                  </span>
                  On this page
                </h2>
                <nav className="mt-3 rounded-lg border border-border/80 p-1.5">
                  {sectionAnchors.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-muted-foreground">No headings</p>
                  ) : (
                    sectionAnchors.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-secondary text-primary font-medium'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          {section.label}
                        </button>
                      );
                    })
                  )}
                </nav>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-primary">Share this project</h2>
                <div className="mt-3 flex items-center gap-4 text-primary">
                  <button type="button" onClick={() => shareProject('x')} aria-label="Share on X" className="hover:text-accent transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button type="button" onClick={() => shareProject('linkedin')} aria-label="Share on LinkedIn" className="hover:text-accent transition-colors">
                    <Linkedin size={18} />
                  </button>
                  <button type="button" onClick={() => shareProject('email')} aria-label="Share by email" className="hover:text-accent transition-colors">
                    <Mail size={18} />
                  </button>
                  <button type="button" onClick={() => shareProject('copy')} aria-label="Copy link" className="hover:text-accent transition-colors">
                    <Link2 size={18} />
                  </button>
                </div>
                {linkCopied && (
                  <p className="mt-2 text-[12px] text-muted-foreground">Link copied</p>
                )}
              </div>
            </aside>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 mt-12 sm:mt-16">
          <div className="space-y-5 sm:space-y-8">
              {isSolar && <SolarProjectStudio />}
              {!isSolar && (
              <>
              <section id="built" className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-4 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Project overview
                </p>
                <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
                  {isSolar ? 'Custom layout builder' : workKind}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {isSolar
                    ? 'Solar Pro runs on WordPress. The layouts were built natively, and a custom builder makes every layout customizable from the dashboard. Staff control all section content, and that content is placed on the page through a shortcode. The same build includes booking, a user dashboard, and an admin dashboard.'
                    : `${ownership} Stack: ${project.technologies.slice(0, 6).join(', ')}${project.technologies.length > 6 ? `, +${project.technologies.length - 6} more` : ''}.`}
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
                      What the software does
                    </p>
                    <ul className="space-y-1.5">
                      {shipped.map((item) => (
                        <li key={item} className="text-[13px] text-muted-foreground leading-snug flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
                      How it was engineered
                    </p>
                    <ul className="space-y-1.5">
                      {engineered.map((item) => (
                        <li key={item} className="text-[13px] text-muted-foreground leading-snug flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="objective" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Target size={18} className="text-accent" />
                  The product
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </section>

              <section id="features" className="bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md">
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-accent" />
                  Software shipped
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Concrete pieces of the product that were designed and implemented.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground rounded-lg border border-border/40 bg-background/90 px-3 py-2.5"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="challenge" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <TriangleAlert size={18} className="text-accent" />
                  Product constraints
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  The software problems this build had to solve.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.challenges.map((item) => (
                    <div key={item} className="rounded-lg border border-border/50 bg-background/90 px-3 py-2.5 text-sm text-muted-foreground hover:border-accent/30 hover:shadow-sm transition-all">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section id="solutions" className="bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <BrainCircuit size={18} className="text-accent" />
                  How I built it
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Engineering choices behind the product, in the order they were applied.
                </p>
                <div className="space-y-3">
                  {project.solutions.map((solution, idx) => (
                    <div
                      key={solution}
                      className="flex gap-3 rounded-xl border border-border/50 bg-background/90 p-4 hover:border-accent/30 transition-colors"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent/15 text-accent text-xs font-bold flex items-center justify-center border border-accent/20">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              {isWebsiteProject && (
                <section id="process" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                  <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                    <Workflow size={18} className="text-accent" />
                    {isSolar
                      ? 'How it was built'
                      : isSunsnow
                        ? 'Trip Platform Build'
                        : isLmsProcess
                          ? 'LMS Build Process'
                          : 'Process'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {isSolar
                      ? 'Native layouts, a custom builder for every section, dashboard control, and a shortcode that places that content on the page — plus booking and both dashboards.'
                      : isSunsnow
                        ? 'Laravel travel platform for Sunsnow — trip search, gated packages, multilingual content, moderated reviews, articles, and full admin control.'
                        : isLmsProcess
                          ? 'End-to-end Laravel LMS delivery — from public catalog and lessons to students, quizzes, payments, and admin CMS.'
                          : 'Structured implementation flow from analysis to delivery, tailored for client-facing outcomes.'}
                  </p>

                  <div className="space-y-3">
                    {processSteps.map((step) => {
                      const isActive = activeProcessStep === step.id;
                      return (
                        <div
                          key={step.id}
                          className={`rounded-2xl border transition-all ${
                            isActive
                              ? 'border-accent/40 bg-accent/5 shadow-md shadow-accent/10'
                              : 'border-border/50 bg-background/85'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveProcessStep(isActive ? -1 : step.id)}
                            className="w-full flex items-start justify-between gap-3 p-3.5 sm:p-4 text-left"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="inline-flex items-center justify-center min-w-10 h-10 px-2 rounded-xl bg-accent/15 text-accent text-xs font-bold border border-accent/20 shrink-0">
                                {step.indexLabel}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[15px] sm:text-base font-semibold text-primary leading-snug">{step.title}</p>
                                <p className="text-[13px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">{step.summary}</p>
                              </div>
                            </div>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-background border border-border/60 text-accent">
                              {isActive ? <CloseIcon size={14} /> : <Plus size={14} />}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-4 pb-4 pt-1 border-t border-border/40">
                                <ul className="space-y-2.5">
                                  {step.points.map((point, idx) => (
                                    <li key={`${step.id}-${idx}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {hasPageGallery && (
                <section id="gallery" className="bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <ZoomIn size={18} className="text-accent" />
                    Page Screenshots
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4 sm:mb-5">
                    Tap any screenshot to view fullscreen. Swipe to browse.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {pageGallery.map((asset, idx) => (
                      <button
                        key={`${asset.name}-${idx}`}
                        type="button"
                        onClick={() => setZoomedAssetIndex(idx)}
                        className="group rounded-xl overflow-hidden border border-border/40 bg-background/60 hover:border-accent/40 active:scale-[0.99] transition-all text-left"
                      >
                        <div className="aspect-[16/10] bg-muted/20 relative overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/55 text-white flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <ZoomIn size={15} />
                          </div>
                        </div>
                        <div className="p-3 border-t border-border/30">
                          <p className="text-sm font-medium text-primary">{asset.name}</p>
                          {asset.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{asset.description}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section id="results" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-accent" />
                  Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resultHighlights.map((result) => (
                    <div key={result.title} className="rounded-xl border border-border/50 bg-background/90 p-4 hover:border-accent/30 transition-colors">
                      <p className="text-sm font-semibold text-primary mb-1">{result.title}</p>
                      <p className="text-sm text-muted-foreground">{result.text}</p>
                    </div>
                  ))}
                </div>
              </section>
              </>
              )}

              {relatedProjects.length > 0 && (
                <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-primary mb-4">Related Case Studies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedProjects.map((item) => (
                      <Link
                        key={item.id}
                        to={`/projects/${getProjectSlug(item)}`}
                        className="group rounded-xl border border-border/50 bg-background/90 overflow-hidden hover:border-accent/40 transition-all"
                      >
                        <div className="h-28 overflow-hidden">
                          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-accent font-medium mb-1">{getServiceCategoryLabel(inferServiceCategory(item))}</p>
                          <p className="text-sm font-semibold text-primary line-clamp-2">{item.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

        </div>
      </main>
      {zoomedAssetIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot gallery"
            onClick={() => setZoomedAssetIndex(null)}
          >
            <div
              className="flex items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs tabular-nums">
                {zoomedAssetIndex + 1} / {pageGallery.length}
              </div>
              <p className="min-w-0 flex-1 text-center text-xs text-white/70 truncate px-2 hidden sm:block">
                {pageGallery[zoomedAssetIndex]?.name}
              </p>
              <button
                type="button"
                onClick={() => setZoomedAssetIndex(null)}
                className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-12 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStartX.current = e.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null || pageGallery.length < 2) return;
                const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 48) return;
                goGallery(delta < 0 ? 1 : -1);
              }}
            >
              {pageGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goGallery(-1)}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goGallery(1)}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="w-full h-full max-h-[calc(100dvh-5.5rem)] overflow-auto overscroll-contain flex items-start justify-center">
                <img
                  src={pageGallery[zoomedAssetIndex].url}
                  alt={pageGallery[zoomedAssetIndex].name}
                  className="w-full max-w-5xl h-auto object-contain select-none"
                  draggable={false}
                />
              </div>
            </div>

            {pageGallery.length > 1 && (
              <div
                className="sm:hidden flex items-center justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => goGallery(-1)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => goGallery(1)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default ProjectDetails;
