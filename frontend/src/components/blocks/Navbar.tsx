/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Calendar,
  FolderClosed,
  Files,
  Users,
  FlaskConical,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { useLogout } from "@/features/auth/api/useLogout";
import { useUser } from "@/features/users/api/useUser";
import CreateWorkspace from "@/features/workspaces/components/CreateWorkspace";
import { useChangeWorkspace } from "@/features/users/api/useChangeWorkspace";

const navigation = [
  { name: "dashboard", href: "/", icon: Home },
  { name: "teams", href: "/teams", icon: Users },
  { name: "projects", href: "/projects", icon: FolderClosed },
  { name: "calendar", href: "/calendar", icon: Calendar },
  { name: "experiments", href: "/experiments", icon: Files },
  { name: "protocols", href: "/protocols", icon: FlaskConical },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useUser();
  const changeWorkspace = useChangeWorkspace();
  const logout = useLogout();

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
            <div className="flex flex-1 items-center justify-between">
              <div className="text-sm font-medium leading-6 tracking-wide text-gray-400">
                Workspaces
              </div>
              <CreateWorkspace />
            </div>

            <ul className="-mx-2 mt-3 space-y-1">
              {data?.user.workspaces.map((ws) => (
                <li
                  key={ws.id}
                  className={cn(
                    ws.id === data.user.currentWorkspace
                      ? "cursor-default bg-gray-50 text-indigo-600"
                      : "cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex justify-between gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                  onClick={() => {
                    changeWorkspace.mutate(
                      { workspaceId: ws.id },
                      {
                        onSuccess: () => {
                          navigate("/", { replace: true });
                        },
                      },
                    );
                  }}
                >
                  <div className="flex gap-x-3">
                    <span
                      className={cn(
                        ws.id === data.user.currentWorkspace
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                      )}
                    >
                      {ws.initial}
                    </span>
                    <span className="truncate">{ws.name}</span>
                  </div>

                  {ws.id === data.user.currentWorkspace && (
                    <span>
                      <Settings
                        className="h-6 w-6 shrink-0 text-gray-400 hover:scale-105 hover:cursor-pointer hover:text-indigo-600"
                        aria-hidden="true"
                        strokeWidth={1.4}
                      />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="user">
                <AccordionTrigger className="border-y border-gray-200 hover:bg-gray-50 hover:no-underline">
                  <div className="flex items-center gap-x-4 px-6 py-1 text-sm font-semibold leading-6 text-gray-700">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                      {data?.user.initials}
                    </span>
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{data?.user.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex-col items-center space-y-3 px-6">
                  <button
                    className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    onClick={() => logout.mutate()}
                  >
                    <Settings
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                      strokeWidth={1.4}
                    />
                    Profile Settings
                  </button>
                  <button
                    className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
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
