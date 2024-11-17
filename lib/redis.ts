import { Redis } from "ioredis";

// 定义笔记的接口
export interface Note {
    title: string;
    content: string;
    updatedAt: string;
    createdAt: string;
    tag: string[];
}

// 展示使用 redis 操作代替数据库操作
const redis = new Redis()
/**
 * 获取所有笔记
 * @returns 
 */
export async function getAllNotes(): Promise<Record<string, Note>> {
    const rawNotes = await redis.hgetall("notes")
    // 将每条笔记从 JSON 字符串解析为 Note 对象
    const parsedNotes: Record<string, Note> = Object.fromEntries(
        Object.entries(rawNotes).map(([uuid, data]) => [uuid, JSON.parse(data)])
    );
    return parsedNotes;
}

/**
 * 添加笔记
 * @param data 笔记数据
 * @returns 返回新添加的笔记的 uuid
 * Omit<Note, "createdAt" | "updatedAt"> 从 Note 中移除 "createdAt" 和 "updatedAt" 属性
 */
export async function addNote(data: Omit<Note, "createdAt" | "updatedAt">): Promise<string> {
    const uuid = Date.now().toString();
    const timestamp = new Date().toISOString();
    const note: Note = { ...data, createdAt: timestamp, updatedAt: timestamp };
    await redis.hset("notes", uuid, JSON.stringify(note));
    return uuid;
}

/**
 * 更新笔记
 * @param uuid 笔记 uuid
 * @param data 要更新的笔记数据（部分字段或全部字段）
 * Partial<T> 将 T 中属性变为可选
 */
export async function updateNote(uuid: string, data: Partial<Omit<Note, "createdAt">>): Promise<void> {
    const existingNote = await getNote(uuid);
    if (!existingNote) {
        throw new Error(`Note with uuid ${uuid} not found.`);
    }
    const updatedNote: Note = {
        ...existingNote,
        ...data,
        updatedAt: new Date().toISOString(), // 更新更新时间
    };
    await redis.hset("notes", uuid, JSON.stringify(updatedNote));
}

/**
 * 获取某一条笔记
 * @param uuid 笔记 uuid
 * @returns 返回对应的 Note 对象
 */
export async function getNote(uuid: string): Promise<Note | null> {
    const rawData = await redis.hget("notes", uuid);
    return rawData ? JSON.parse(rawData) : null;
}

/**
 * 删除某一条笔记
 * @param uuid 笔记 uuid
 * @returns 返回删除的结果，1 表示成功，0 表示失败
 */
export async function delNote(uuid: string): Promise<number> {
    return redis.hdel("notes", uuid);
}

// export async function searchNoteByKeyWords(query: string, page: number = 1, pageSize: number = 10): Promise<number>

export default redis