import { NavLink, Outlet } from "react-router-dom";
import { CalendarDays, BookOpen, ShoppingCart, Settings as SettingsIcon } from "lucide-react";

const navItems = [
  { to: "/", label: "Planner", Icon: CalendarDays },
  { to: "/library", label: "Library", Icon: BookOpen },
  { to: "/shopping", label: "Shopping", Icon: ShoppingCart },
  { to: "/settings", label: "Settings", Icon: SettingsIcon },
];

const AppLayout = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border">
        <div className="container py-3">
          <h1 className="text-lg font-semibold">Dinner Planner</h1>
        </div>
      </header>

      <main className="container py-4 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-border bg-card">
        <div className="mx-auto max-w-3xl grid grid-cols-4">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
              aria-label={label}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
