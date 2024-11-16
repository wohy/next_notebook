import { EidtOrNewNote } from "@/app/components/eidtOrNewNote";
import { getNote } from "@/lib/redis";

export default async function EidtPage({ params }: { params: {id: string}}) {
    const { id } = await params
    const note = await getNote(id)
    const content = note?.content || ""
    const tag = note?.tag || []
    const title = note?.title || ""
    return <>
        <EidtOrNewNote initialTitle={title} intialContent={content} intialTags={tag} noteUuid={id} />
    </>
}