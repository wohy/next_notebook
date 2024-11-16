"use client";
import { useState } from "react";
import NotePreview from "./notePreview";
import { useFormStatus } from "react-dom";
import { Tags } from "./tag";
import { deleteNote, saveNote } from "../note/actionInRedis";

export const EidtOrNewNote = (props: {
  noteUuid?: string;
  initialTitle: string;
  intialContent: string;
  intialTags: string[];
}) => {
  const { noteUuid, initialTitle, intialContent, intialTags } = props;
  const { pending } = useFormStatus()
  const [content, setContent] = useState(intialContent);
  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState(intialTags);
  const isDraft = !noteUuid;
  return (
    <>
      <section className="flex flex-row items-center justify-between">
        <form autoComplete="off">
          <input
            type="text"
            value={title}
            className="flex-1 bg-white h-10 p-2 min-w-[50vh] border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1"
            placeholder="Please Input The Title Of Note ..."
            onChange={(e) => {
            setTitle(e.target.value)
          }}
          />
        </form>
        <form role="menubar">
          <div className="ml-10">
            <button disabled={pending} formAction={() => saveNote(noteUuid, title, content)} className="h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black">
              {isDraft ? "Create" : "Done"}
            </button>
            {!isDraft && <button disabled={pending} formAction={() => deleteNote(noteUuid)} className="h-10 rounded-md text-white bg-[#ef4444] px-2 font-semibold ml-2">
              Delete
            </button>}
          </div>
        </form>
      </section>
      <section className="mt-8 flex flex-row">
        <form autoComplete="off">
          <textarea
            value={content}
            className="p-2 h-[80vh] overflow-auto min-w-[50vh] bg-white border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1"
            placeholder="Please Input The Content Of The Note ..."
            onChange={(e) => {
              setContent(e.target.value)
            }}
          ></textarea>
        </form>
        <div className="max-h-[80vh] p-2 overflow-auto shadow-xl border-slate-100 flex-1 ml-20">
          <div className="text-white rounded-xl px-3 py-2 bg-[#a5f3fc] text-sm w-fit font-bold">
            Preview
          </div>
          <div className="flex flex-col">
              <div className="text-2xl font-bold">{title}</div>
              <Tags tag={tags}></Tags>
          </div>
          <NotePreview>{content}</NotePreview>
        </div>
      </section>
    </>
  );
};
