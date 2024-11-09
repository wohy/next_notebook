"use server"
import { connectDb } from '@/lib/db';
import { NoteModel, Note } from '@/lib/model';

/**
 * 获取所有笔记
 * @returns 
 */
export async function getAllNotes() {
    await connectDb()
    try {
        // 从数据库中获取所有用户
        const allNotes = await NoteModel.find({});
        return allNotes
    } catch (err) {
        console.error("Failed to fetch notes", err);
        throw new Error("Failed to fetch notes");
    }
}

/**
 * 添加笔记
 * @param data 笔记数据
 * @returns 
 */
export async function addNote(data: Note) {
    await connectDb();  // 确保数据库连接
    try {
        const newNote = new NoteModel({
            title: data.title,
            content: data.content,
            uuid: data.uuid,
            tag: data.tag,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedNote = await newNote.save();  // 保存笔记
        return savedNote;  // 返回保存后的笔记
    } catch (err) {
        console.error("Failed to add note", err);
        throw new Error("Failed to add note");
    }
}

/**
 * 
 * @param uuid 笔记 uuid
 * @param data 笔记数据
 */
export async function updateNote(uuid: string, data: Note) {
    await connectDb();  // 确保数据库连接

    try {
        const updatedNote = await NoteModel.findOneAndUpdate(
            { uuid: uuid },
            { ...data, updatedAt: new Date() },  // 更新笔记内容，并设置更新时间
            { new: true }  // 返回更新后的文档
        );

        if (!updatedNote) {
            throw new Error("Note not found");
        }

        return updatedNote;  // 返回更新后的笔记
    } catch (err) {
        console.error("Failed to update note", err);
        throw new Error("Failed to update note");
    }
}

/**
 * 获取某一条笔记
 * @param uuid 笔记 uuid
 * @returns 
 */
export async function getNote(uuid: string) {
}

/**
 * 删除某一条笔记
 * @param uuid 笔记的 uuid
 * @returns 
 */
export async function delNote(uuid: string) {
}