export default function NoteDetail({ params }: { params: {id: string}}) {
    return <div>
        {`Note ${params.id}`}
    </div>
}