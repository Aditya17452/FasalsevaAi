import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, LogOut, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StorageLayout() {
  const { user, logout } = useAuth();

  if (!user || user.role !== "storage_owner") {
    return <Navigate to="/storage/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <nav className="border-b bg-white dark:bg-slate-900 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/storage/dashboard" className="flex items-center gap-2 font-bold text-emerald-600">
            <Building2 className="h-6 w-6" /> FasalSeva Storage
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => {
              const isHi = document.cookie.includes('googtrans=/en/hi');
              document.cookie = `googtrans=/en/${isHi ? 'en' : 'hi'}; path=/`;
              document.cookie = `googtrans=/en/${isHi ? 'en' : 'hi'}; domain=${window.location.hostname}; path=/`;
              if (isHi) document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
              window.location.reload();
            }} aria-label="Translate">
              <Languages className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
