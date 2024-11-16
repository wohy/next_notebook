import { EidtOrNewNote } from "@/app/components/eidtOrNewNote";

export default function NewNotePage() {
  return (
    <>
      <EidtOrNewNote initialTitle={""} intialContent={"content"} intialTags={[]} />
    </>
  );
}
