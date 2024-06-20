import {
  Calendar,
  FolderClosed,
  Files,
  Users,
  FlaskConical,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Teams", href: "teams", icon: Users, current: false },
  { name: "Projects", href: "projects", icon: FolderClosed, current: false },
  { name: "Calendar", href: "calendar", icon: Calendar, current: false },
  { name: "Documents", href: "documents", icon: Files, current: false },
  { name: "Protocols", href: "protocols", icon: FlaskConical, current: false },
];
const teams = [
  { id: 1, name: "Tempus AI", href: "#", initial: "T", current: false },
  { id: 2, name: "Vanderbilt", href: "#", initial: "V", current: false },
  { id: 3, name: "DARPA", href: "#", initial: "D", current: false },
];

export default function Navbar() {
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
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.current
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
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
              <span className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Matt Hensen</span>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
