import Link from "next/link";
import Image from "next/image";
import { NoteCard } from "./noteCard";
import { SideBarSearch } from "./sideBarSearch";
import NoteList from "./sideBarNoteList";

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
      <NoteList/>
    </section>
  );
};
