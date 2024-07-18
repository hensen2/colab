import {
  Calendar,
  FolderClosed,
  Files,
  Users,
  FlaskConical,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { useLogout } from "@/features/auth/api/useLogout";

const navigation = [
  { name: "dashboard", href: "/", icon: Home },
  { name: "teams", href: "/teams", icon: Users },
  { name: "projects", href: "/projects", icon: FolderClosed },
  { name: "calendar", href: "/calendar", icon: Calendar },
  { name: "experiments", href: "/experiments", icon: Files },
  { name: "protocols", href: "/protocols", icon: FlaskConical },
];
const teams = [
  { id: 1, name: "Tempus AI", href: "#", initial: "T", current: false },
  { id: 2, name: "Vanderbilt", href: "#", initial: "V", current: false },
  { id: 3, name: "DARPA", href: "#", initial: "D", current: false },
];

export default function Navbar() {
  const logout = useLogout();
  const { pathname } = useLocation();

  return (
    <>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      item.href === pathname
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold capitalize leading-6",
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.href === pathname
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0",
                      )}
                      aria-hidden="true"
                      strokeWidth={1.4}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={cn(
                      team.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                  >
                    <span
                      className={cn(
                        team.current
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                      )}
                    >
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="user">
                <AccordionTrigger className="border-y border-gray-200 hover:bg-gray-50">
                  <div className="flex items-center gap-x-4 px-6 py-1 text-sm font-semibold leading-6 text-gray-700">
                    <span className="h-8 w-8 rounded-full bg-gray-200" />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Matt Hensen</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex items-center px-6">
                  <button
                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    onClick={() => logout.mutate()}
                  >
                    <LogOut
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                      strokeWidth={1.4}
                    />
                    Log Out
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </nav>
    </>
  );
}
