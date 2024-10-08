import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Menu } from "lucide-react";
import { Navbar, PageHeader } from "@/components/common";
import { Outlet } from "react-router-dom";
import { useUserWorkspace } from "@/features/userWorkspaces/api/useUserWorkspace";
import Spinner from "../ui/Spinner";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isPending } = useUserWorkspace();

  if (!data || isPending) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <p className="h-8 w-auto font-mono text-2xl font-semibold text-indigo-600">
                CoLab
              </p>
            </div>
            <Navbar />
          </div>
        </div>

        {/* Sidebar for screens smaller than lg */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex h-16 shrink-0 items-center">
                      <p className="h-8 w-auto">CoLab</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <Navbar />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1 text-sm font-semibold leading-6 text-gray-700">
            Dashboard
          </div>
          <div>
            <span className="sr-only">Your profile</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
              {data.user.initials}
            </span>
          </div>
        </div>

        <main className="h-screen pb-8 lg:pl-72">
          <div className="flex h-full flex-col px-4 sm:px-6 lg:px-8">
            <PageHeader />
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
