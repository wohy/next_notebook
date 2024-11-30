import { EidtOrNewNote } from "../../../components/eidtOrNewNote";
import { getNote } from "@/lib/strapi";
export default async function EidtPage({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params
    const note = await getNote(id)
    const content = note?.content || ""
    const tag = note?.tag || []
    const title = note?.title || ""
    
    return <>
        <EidtOrNewNote initialTitle={title} intialContent={content} intialTags={tag} noteUuid={id} />
    </>
}