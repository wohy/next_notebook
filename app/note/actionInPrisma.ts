"use server"

import { addNote, delNote, updateNote } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveNote(prevState: unknown, formData: FormData): Promise<any> {
    // 构建保存的笔记数据
    const noteId = formData.get('noteId') as string

    const data = {
      title: formData.get('title') as string,
      content: formData.get('body') as string,
      updatedAt: new Date()
    }

    if (noteId) {
        // 如果有 noteId，则更新笔记
        await updateNote(noteId, data)
        revalidatePath('/', "layout")
        redirect(`/note/${noteId}`) // 重定向到更新后的笔记页面
    } else {
        // 如果没有 noteId，则添加新笔记
        const res = await addNote(data)
        revalidatePath('/', "page")
        if (res) redirect(`/note/${res}`) // 重定向到新创建的笔记页面
    }
}

export async function deleteNote(prevState: unknown,  // 状态类型为 DeleteNoteResponse
formData: FormData): Promise<unknown>{
    const noteId = formData.get('noteId') as string
    // 删除笔记并重定向到主页
    await delNote(noteId)
    revalidatePath('/', "page")
    redirect('/')
}