import { Callback, Redis } from "ioredis";

// 展示使用 redis 操作代替数据库操作
const redis = new Redis()
const initialData = {
    "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

/**
 * 获取所有笔记
 * @returns 
 */
export async function getAllNotes() {
    const data = await redis.hgetall("notes");
    if (Reflect.ownKeys(data).length == 0) {
        await redis.hset("notes", initialData);
    }
    return await redis.hgetall("notes")
}

/**
 * 添加笔记
 * @param data 笔记数据
 * @returns 
 */
export async function addNote(data: Callback) {
    const uuid = Date.now().toString();
    await redis.hset("notes", [uuid], data);
    return uuid
}

/**
 * 
 * @param uuid 笔记 uuid
 * @param data 笔记数据
 */
export async function updateNote(uuid: string, data: Callback) {
    await redis.hset("notes", [uuid], data);
}

/**
 * 获取某一条笔记
 * @param uuid 笔记 uuid
 * @returns 
 */
export async function getNote(uuid: string) {
    return JSON.parse(await redis.hget("notes", uuid) || "")
}

/**
 * 删除某一条笔记
 * @param uuid 笔记的 uuid
 * @returns 
 */
export async function delNote(uuid: string) {
    return redis.hdel("notes", uuid)
}

export default redis