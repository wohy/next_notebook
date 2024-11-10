export default function EidtPage({ params }: { params: {id: string}}) {
    return <div>
        {`Eidt Note ${params.id}`}
    </div>
}