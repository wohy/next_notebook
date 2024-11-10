import Link from "next/link";
import Image from 'next/image'
import { NoteCard } from "./noteCard";

const list = [
    {
        title: "Newest Note Title",
        tag: ["tailwind", "next", "app"],
        createdAt: "2025/11/10 16:49",
        updatedAt: "2025/11/10 16:49",
        uuid: "1"
    },
    {
        title: "Newest Note Title",
        tag: ["tailwind", "next", "app"],
        createdAt: "2025/11/10 16:49",
        updatedAt: "2025/11/10 16:49",
        uuid: "2"
    },
    {
        title: "Newest Note Title",
        tag: ["tailwind", "next", "app"],
        createdAt: "2025/11/10 16:49",
        updatedAt: "2025/11/10 16:49",
        uuid: "3"
    },
]

export const SideBar = () => {
    return <section className="bg-white dark:bg-slate-800 h-screen overflow-auto px-5 py-3 w-[100%]">
        <section className="flex flex-row justify-between items-center">
            <Link href={'/'} className="text-[#1e293b] flex flex-row">
                <Image
                    className="logo"
                    src="/favicon.ico"
                    width="25"
                    height="20"
                    alt=""
                    role="presentation"
                ></Image>
                <strong className="text-15 ml-3">React Notes</strong>
            </Link>
            <Link href={'/note/eidt'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                </svg>
            </Link>
        </section>
        <section className="py-5">
            <form className="flex flex-row justify-between" action="">
                <input className="h-10 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block w-70 rounded-md sm:text-sm focus:ring-1" type="text" name="noteKeyWords" />
                <button type="submit" className="h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black">Search</button>
            </form>
        </section>
        <section>
            {
                list.map((item, index) => {
                    return <NoteCard note={item} key={index}></NoteCard>
                })
            }
        </section>
    </section>
}