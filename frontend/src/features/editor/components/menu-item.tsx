import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

export default function MenuItem({
  icon: Icon,
  title,
  action,
  isActive = null,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  action: () => void;
  isActive: (() => boolean) | null;
}) {
  return (
    <button
      className={cn(
        isActive?.()
          ? "bg-gray-200 text-indigo-600"
          : "text-gray-500 hover:bg-gray-200 hover:text-indigo-600",
        "group mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-1",
      )}
      onClick={action}
      title={title}
    >
      <Icon
        className={cn(
          isActive?.()
            ? "bg-gray-200 text-indigo-600"
            : "text-gray-500 hover:bg-gray-200 group-hover:text-indigo-600",
          "h-6 w-6 shrink-0",
        )}
        aria-hidden="true"
        strokeWidth={1.6}
      />
    </button>
  );
}
