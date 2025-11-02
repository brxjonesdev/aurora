"use client";

import { useSearchParams} from "next/navigation";
import Editor from "@/lib/aurora/features/manuscript/components/dashboard/editor";
import Cards from "@/lib/aurora/features/manuscript/components/dashboard/board";

type Props = {
  file: string;
  defaultView: "editor" | "board";
};

export default function ManuscriptDashboard({
  file,
  defaultView,
}: Props) {
  const searchParams = useSearchParams();
  const view = (searchParams.get("view") as "editor" | "board") ?? defaultView;
  return (
    <div className="flex flex-col flex-1 gap-2">

      {view === "editor" ? (
        <Editor />
      ) : (
        <Cards fileSlug={file}/>
      )}
    </div>
  );
}
