import { getAllNotes } from "@/lib/prisma";
import { SideBarSearch } from "./sideBarSearch";
import { NoteCard } from "./noteCard";

export default async function NoteList() {
    const notes = await getAllNotes()
    return Reflect.ownKeys(notes)?.length ? (
        <SideBarSearch
          notes={Reflect.ownKeys(notes).map((item) => {
            const uuid = String(item);
            const { title, createTime, updateTime } = notes[uuid] || {};
            return {
              content: (
                // 将服务端组件以 props 的形式传入到客户端组件中渲染，避免服务端组件中的依赖等一些不必要的代码 打包到 客户端 bundle 中
                <NoteCard
                  note={{
                    title,
                    tag: [],
                    createdAt: createTime,
                    updatedAt: updateTime,
                  }}
                  key={uuid}
                  uuid={uuid}
                ></NoteCard>
              ),
              title,
              key: uuid
            };
          })}
        ></SideBarSearch>
      ) : (
        <div className="w-[100%] m-auto text-center">{"No notes created yet!"}</div>
      )
}