"use server"

import { addNote, delNote, updateNote } from "@/lib/redis";
import { redirect } from "next/navigation";

// 定义保存笔记的接口类型
interface NoteData {
    title: string;
    content: string;
    tag: string[]
}

export async function saveNote(noteId: string | undefined, title: string, body: string): Promise<void> {
    // 构建保存的笔记数据
    const data: NoteData = {
        title,
        content: body,
        tag: []
    }

    if (noteId) {
        // 如果有 noteId，则更新笔记
        await updateNote(noteId, data)
        redirect(`/note/${noteId}`) // 重定向到更新后的笔记页面
    } else {
        // 如果没有 noteId，则添加新笔记
        const res = await addNote(data)
        redirect(`/note/${res}`) // 重定向到新创建的笔记页面
    }
}

export async function deleteNote(noteId: string): Promise<void> {
    // 删除笔记并重定向到主页
    await delNote(noteId)
    redirect('/')
}