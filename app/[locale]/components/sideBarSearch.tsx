"use client"
import { useTranslations } from "next-intl";
import { ReactElement, use, useEffect, useState } from "react";

interface NotesProps { content: ReactElement, title: string, key: string }

export const SideBarSearch = ({
  notes,
}: {
  notes: NotesProps[];
}) => {
    const [keyWords, setKeyWords] = useState('')
    const [searchNotes, setSearchNotes] = useState<NotesProps[]>([])
    const t = useTranslations("Basic");
    useEffect(() => {
      setSearchNotes(notes)
    })
    const handleSearch = () => {
      if (keyWords) {
        const result = notes?.filter(item => {
          const title = item.title.toLowerCase()
          return title.includes(keyWords.toLowerCase())
        })
        setSearchNotes(result)
      } else {
        setSearchNotes(notes)
      }
    }
    return <>
        <section className="h-15 p-5">
        <div className="flex flex-row justify-between">
          <input
            className="h-10 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            value={keyWords}
            onChange={(e) => {setKeyWords(e.target.value)}}
          />
          <button
            className="ml-2 w-16 h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black"
            onClick={handleSearch}
          >
            {t('search')}
          </button>
        </div>
      </section>
      <section className="flex-1 px-5 overflow-auto">
        {
          searchNotes?.map(item => {
            return <div key={item.key}>
              {item.content}
            </div>
          })
        }
      </section>
    </>
}