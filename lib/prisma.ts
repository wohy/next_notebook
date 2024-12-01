import { PrismaClient } from '@prisma/client'
import { auth } from "auth"

const globalForPrisma = global;

export interface Note {
    title: string
    content: string | null
    updatedAt: Date 
    createdAt: Date
    id: string
}

export interface NeedNote {
    title: string
    content: string | null
    createTime: string 
    updateTime: string
    tag?: string[]
}

export interface User {
    name: string
    username: string
    id: string
}

export const prisma = globalForPrisma.prisma || new PrismaClient()


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAllNotes(): Promise<{[id: string]: NeedNote}> {
    const session = await auth()
    if (session == null) return {};
    // 查找登录用户的笔记
    const notes = await prisma.note.findMany({
        where: {
            authorId: session?.user?.id
        }
    })
    // 构造返回数据
    const res = {} as {[id: string]: NeedNote}
    notes.forEach(({ title, content, id, updatedAt, createdAt }) => {
        res[id] = {
            title,
            content: content || '',
            createTime: createdAt?.toISOString(),
            updateTime: updatedAt.toISOString()
        }
    })
    return res
}

export async function addNote(data: Omit<Note, 'createdAt' | 'id'>): Promise<string | undefined> {
    const session = await auth()
    console.log("session", session)
    if (session == null) return
    const result = await prisma.note.create({
        data: {
            title: data.title,
            content: data.content,
            author: { connect: { id: session?.user?.id } },
        }
    })

    return result.id
}

export async function updateNote(uuid: string, data: Omit<Note, 'createdAt' | 'id'>): Promise<void> {
    await prisma.note.update({
        where: {
            id: uuid
        },
        data: {
            title: data.title,
            content: data.content,
            updatedAt: data.updatedAt
        }
    })
}

export async function getNote(uuid: string): Promise<Omit<NeedNote, 'id' | 'createTime' | 'updateTime'> | undefined> {
    const session = await auth()
    if (session == null) return;
    
    const note = await prisma.note.findFirst({
      where: {
        id: uuid
      }
    })
  
    if (!note) return undefined;
  
    const { title, content, updatedAt, id, createdAt } = note;
  
    return { title, content }
  }

export async function delNote(uuid: string): Promise<void> {
    await prisma.note.delete({
        where: {
            id: uuid
        }
    })
}

export async function addUser(username: string, password: string): Promise<User> {
    const user = await prisma.user.create({
        data: {
            username,
            password,
            notes: {
                create: []
            }
        }
    })

    return {
        name: username,
        username,
        id: user.id
    }
}

export async function getUser(username: string, password:string): Promise<User | number> {
    const user = await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            notes: true
        }
    })
    if (!user) return 0;
    if (user.password !== password) return 1
    return {
        name: username,
        username,
        id: user.id
    }
}

export default prisma