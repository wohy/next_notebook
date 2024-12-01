import { ReactElement } from "react";

export const Tags = ({ tag }: { tag: string[] }): ReactElement => {
    return  <section className="mt-2 flex flex-row items-start">
    {Array.isArray(tag)
      ? tag.map((item, index) => {
          return (
            <div
              className="bg-[#bbf7d0] rounded-sm min-w-10 text-center text-xs p-1 text-white mr-2"
              key={index}
            >
              {item}
            </div>
          );
        })
      : null}
  </section>
}