interface NavigationLoaderProps {
  isLoading: boolean;
}

export const NavigationLoader = ({ isLoading }: NavigationLoaderProps) => (
  <div
    className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-300 ease-out ${
      isLoading ? 'opacity-100' : 'opacity-0'
    }`}
    aria-hidden={!isLoading}
  >
    <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden bg-accent/10">
      <div
        className={`h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 ${
          isLoading ? 'animate-nav-progress' : 'w-0'
        }`}
      />
    </div>

    <div
      className={`absolute inset-0 bg-background/25 backdrop-blur-[3px] transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    />

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-300 ${
          isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl border border-white/40 bg-white/50 dark:bg-background/40 backdrop-blur-xl shadow-lg shadow-accent/15 flex items-center justify-center">
            <span className="font-bold text-sm bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              DA
            </span>
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
        <span className="text-xs font-medium text-muted-foreground tracking-wide">Loading</span>
      </div>
    </div>
  </div>
);
