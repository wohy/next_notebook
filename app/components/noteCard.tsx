import Link from "next/link";
import dayjs from 'dayjs';
import { Tags } from "./tag";

interface NoteCardPropsType {
  title: string;
  tag: string[];
  createdAt: string;
  updatedAt: string;
}

export const NoteCard = (props: { note: NoteCardPropsType, uuid: string }) => {
  const { note, uuid } = props;
  return (
    <Link href={`/note/${uuid}`}>
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-xl my-2">
        <strong>{note.title}</strong>
        <section className="mt-2">
          <p className="text-slate-300 text-sm">
            <span>创建时间：</span>
            <span>{dayjs(note.createdAt).format('YYYY-MM-DD hh:mm:ss')}</span>
          </p>
          <p className="text-slate-300 text-sm">
            <span>最终更新时间：</span>
            <span>{dayjs(note.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</span>
          </p>
        </section>
        <Tags tag={note.tag}></Tags>
      </div>
    </Link>
  );
};
