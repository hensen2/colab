import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 size={64} className="animate-spin" />
      </div>
    </>
  );
}
