import NotePreview from "@/app/components/notePreview";
import { Tags } from "@/app/components/tag";
import { getNote } from "@/lib/redis";
import Link from "next/link";


export default async function NoteDetail({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params
    const note = await getNote(id)
    const content = note?.content || ""
    const tag = note?.tag || []
    const title = note?.title || ""
    return <div className="flex flex-col h-screen py-5">
        <section className="h-20 flex flex-row justify-between items-center">
            <div className="flex flex-col">
                <div className="text-2xl font-bold">{title}</div>
                <Tags tag={tag}></Tags>
            </div>
            <Link href={`/note/eidt/${id}`}>
                <button className="w-20 h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black">
                    Eidt
                </button>
            </Link>
        </section>
        <div className="flex-1 overflow-y-auto">
            <NotePreview>{content}</NotePreview>
        </div>
    </div>
}