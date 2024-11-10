import { EidtOrNewNote } from "@/app/components/eidtOrNewNote";

export default function EidtPage({ params }: { params: {id: string}}) {
    return <>
        <EidtOrNewNote flag="eidt" noteUuid={params.id} />
    </>
}