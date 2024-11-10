import Link from "next/link";

export default function NoteDetail({ params }: { params: {id: string}}) {
    return <div>
        <section className="h-20 flex flex-row justify-between items-center">
            <div className="text-2xl font-bold">{`Note ${params.id}`}</div>
            <Link href={`/note/eidt/${params.id}`}>
                <button className="w-24 h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black">
                    Eidt
                </button>
            </Link>
        </section>
    </div>
}