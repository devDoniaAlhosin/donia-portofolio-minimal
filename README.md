# Donia's Minimal Portfolio

A modern, responsive personal portfolio website showcasing Donia's skills, experience, projects, and achievements. Built with React, TypeScript, and Tailwind CSS for a clean, professional presentation.

## 🚀 Features

- **Modern Design**: Clean, minimal aesthetic with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Elements**: Custom cursor, smooth scrolling, and hover effects
- **Comprehensive Sections**:
  - Hero section with personal introduction
  - About section with background information
  - Skills showcase with progress indicators
  - Professional experience timeline
  - Educational courses and certifications
  - Honors and awards
  - Project portfolio with detailed descriptions
  - Contact information and social links

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router DOM
- **State Management**: TanStack Query for data fetching
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Custom CSS animations and Intersection Observer API

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd donia-minimal-folio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the portfolio

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Portfolio/          # Portfolio-specific components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── HonorsAwardsSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── ui/                 # Reusable UI components
├── pages/                  # Page components
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── data/                   # Static data and content
└── assets/                 # Images and static assets
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Customization

### Content Updates
- Update personal information in the respective section components
- Modify project data in the `ProjectsSection.tsx`
- Edit skills and experience in their respective components

### Styling
- Customize colors and themes in `tailwind.config.ts`
- Modify animations in `src/index.css`
- Update component styles using Tailwind classes

### Adding New Sections
1. Create a new component in `src/components/Portfolio/`
2. Import and add it to the main `Index.tsx` page
3. Follow the existing component patterns for consistency

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌐 Deployment

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service
3. Configure your domain in the hosting settings

## 🔧 Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add proper TypeScript types for all props and data

### Performance
- Optimize images and assets
- Use lazy loading for components when appropriate
- Minimize bundle size with proper imports

## 📄 License

This project is private and intended for personal portfolio use.

## 🤝 Contributing

This is a personal portfolio project. For any suggestions or improvements, please reach out directly.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
