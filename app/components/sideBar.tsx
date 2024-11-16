import Link from "next/link";
import Image from "next/image";
import { NoteCard } from "./noteCard";
import { getAllNotes } from "@/lib/redis";

// const list = [
//   {
//     title: "Newest Note Title",
//     tag: ["tailwind", "next", "app"],
//     createdAt: "2025/11/10 16:49",
//     updatedAt: "2025/11/10 16:49",
//     uuid: "1",
//   },
// ];

export const SideBar = async () => {
  const notes = await getAllNotes()
  return (
    <section className="bg-white dark:bg-slate-800 h-screen py-3 w-[100%] flex flex-col">
      <section className="h-15 px-5 flex flex-row justify-between items-center">
        <Link href={"/"} className="text-[#1e293b] flex flex-row">
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
        <Link href={"/note/eidt"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </section>
      <section className="h-15 p-5">
        <form className="flex flex-row justify-between" action="">
          <input
            className="h-10 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            name="noteKeyWords"
          />
          <button
            type="submit"
            className="ml-2 h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black"
          >
            Search
          </button>
        </form>
      </section>
      <section className="flex-1 px-5 overflow-auto">
        {
          Reflect.ownKeys(notes)?.length ? Reflect.ownKeys(notes).map(item => {
            const uuid = String(item)
            return <NoteCard note={notes[uuid]} key={uuid} uuid={uuid}></NoteCard>;
          }) : <div className="notes-empty">
          {'No notes created yet!'}
        </div>
        }
      </section>
    </section>
  );
};
