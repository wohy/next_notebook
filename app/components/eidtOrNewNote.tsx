"use client";
import { useActionState, useState } from "react";
import NotePreview from "./notePreview";
import { Tags } from "./tag";
import { deleteNote, saveNote } from "../note/actionInRedis";
import { SaveButton } from "./saveButton";
import { DeleteButton } from "./deleteButton";

const initialState = {
  message: "",
};

export const EidtOrNewNote = (props: {
  noteUuid?: string;
  initialTitle: string;
  intialContent: string;
  intialTags: string[];
}) => {
  const { noteUuid, initialTitle, intialContent, intialTags } = props;
  const [, saveFormAction] = useActionState(saveNote, initialState);
  const [, delFormAction] = useActionState(deleteNote, initialState);
  const [content, setContent] = useState(intialContent);
  const [title, setTitle] = useState(initialTitle);
  const [tags] = useState(intialTags);
  const isDraft = !noteUuid;

  return (
    <form autoComplete="off" className="flex flex-row py-5">
      <div className="flex flex-col">
        <input type="hidden" name="noteId" value={noteUuid} />
        <input
          type="text"
          value={title}
          name="title"
          className="mb-4 bg-white h-10 p-2 min-w-[50vh] border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1"
          placeholder="Please Input The Title Of Note ..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          value={content}
          name="body"
          className="p-2 h-[80vh] overflow-auto min-w-[50vh] bg-white border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1"
          placeholder="Please Input The Content Of The Note ..."
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="ml-10 flex flex-col flex-1">
        <div className="flex flex-row mb-4 ml-auto">
          <SaveButton formAction={saveFormAction} />
          <DeleteButton formAction={delFormAction} isDraft={isDraft} />
        </div>
        <div className="p-2 h-[80vh] shadow-xl border-slate-100 overflow-y-auto">
          <div className="text-white rounded-xl px-3 py-2 bg-[#a5f3fc] text-sm w-fit font-bold mb-4">
            Preview
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{title}</div>
            <Tags tag={tags}></Tags>
          </div>
          <NotePreview>{content}</NotePreview>
        </div>
      </div>
    </form>
  );
};
