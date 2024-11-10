export default function NewNotePage() {
    return <>
        <section className="flex flex-row items-center justify-between">
            <input type="text" className="flex-1 bg-white h-10 p-2 min-w-[50vh] border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1" placeholder="Please Input The Title Of Note ..."/>
            <div className="ml-10">
                <button className="h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black">Create</button>
                <button className="h-10 rounded-md text-white bg-[#ef4444] px-2 font-semibold ml-2">Delete</button>
            </div>
        </section>
        <section className="mt-8 flex flex-row">
            <textarea name="noteContent" id="noteContent" className="p-2 h-[80vh] overflow-auto min-w-[50vh] bg-white border shadow-sm border-slate-100 placeholder-slate-300 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1" placeholder="Please Input The Content Of The Note ..."></textarea>
            <div className="max-h-[80vh] p-2 overflow-auto shadow-xl border-slate-100 flex-1 ml-20"></div>
        </section>
    </>
}