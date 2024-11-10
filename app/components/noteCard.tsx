import Link from "next/link";

interface NoteCardPropsType {
    title: string
    tag: string[]
    createdAt: string;
    updatedAt: string;
    uuid: string
} 

export const NoteCard = (props: {note: NoteCardPropsType}) => {
    const { note } = props
    return <Link href={`/note/${note.uuid}`}>
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-xl my-2">
            <strong>{note.title}</strong>
            <section className="mt-2">
                <p className="text-slate-300 text-sm">
                    <span>创建时间：</span>
                    <span>{note.createdAt}</span>
                </p>
                <p className="text-slate-300 text-sm">
                    <span>最终更新时间：</span>
                    <span>{note.createdAt}</span>
                </p>
            </section>
            <section className="mt-2 flex flex-row items-start">
                {
                    Array.isArray(note.tag) ? note.tag.map((item, index) => {
                        return (
                            <div className="bg-[#bbf7d0] rounded-sm min-w-10 text-center text-xs p-1 text-white mr-2" key={index}>{item}</div>
                        )
                    }) : null
                }
            </section>
        </div>
    </Link>
}