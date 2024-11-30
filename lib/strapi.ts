export interface Note {
    title: string;
    content: string;
    updatedAt: string;
    createdAt: string;
    tag?: string[];
}

export interface StrapiNote {
    id: number
    documentId: string
    title: string
    content: string
    updateTime: string
    createTime: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    slug: string
    tag?: string[];
}

export async function getAllNotes(): Promise<Record<string, StrapiNote>> {
    const response = await fetch(`http://localhost:1337/api/notes`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer 61917c2c355bb1b8a0fef68de61124299ac41eca96498eab9226b237ee56f4537f64ab270f7b1422043a6cf22cf8806283520097fe67f2649de7467ae273359348fa8e70f90cd217db44d5fef9631ae87415de306f54f2641d183164a8f715add4df6e179d96058aa720d4ca3ca6399da87aa2641163ef9417fa762eee9c7b4b',
            "Content-Type": "application/json"
        }
    })
    const { data } = await response.json()
    const res = {} as Record<string, StrapiNote>
    Array.isArray(data) ? data.forEach((item: StrapiNote) => {
        res[item.documentId] = item
    }) : []
    console.log('data', data)

    return res

}

export async function addNote(note: Omit<Note, "createdAt" | "updatedAt">): Promise<string> {
    console.log('note', note)
    const response = await fetch(`http://localhost:1337/api/notes`, {
        method: 'POST',
        headers: {
            Authorization: 'bearer 61917c2c355bb1b8a0fef68de61124299ac41eca96498eab9226b237ee56f4537f64ab270f7b1422043a6cf22cf8806283520097fe67f2649de7467ae273359348fa8e70f90cd217db44d5fef9631ae87415de306f54f2641d183164a8f715add4df6e179d96058aa720d4ca3ca6399da87aa2641163ef9417fa762eee9c7b4b',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: note
        })
    })
    const { data } = await response.json() || {}
    return data?.documentId
}

export async function updateNote(uuid: string, data: Partial<Omit<Note, "createdAt">>): Promise<void> {
    const existingNote = await getNote(uuid);
    if (!existingNote) {
        throw new Error(`Note with uuid ${uuid} not found.`);
    }
    const updatedNote = {
        createTime: existingNote.createTime,
        ...data
    };
    await fetch(`http://localhost:1337/api/notes/${uuid}`, {
        method: 'PUT',
        headers: {
            Authorization: 'bearer 61917c2c355bb1b8a0fef68de61124299ac41eca96498eab9226b237ee56f4537f64ab270f7b1422043a6cf22cf8806283520097fe67f2649de7467ae273359348fa8e70f90cd217db44d5fef9631ae87415de306f54f2641d183164a8f715add4df6e179d96058aa720d4ca3ca6399da87aa2641163ef9417fa762eee9c7b4b',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: updatedNote
        })
    })
}

export async function getNote(uuid: string): Promise<StrapiNote | null> {
    const response = await fetch(`http://localhost:1337/api/notes/${uuid}`, {
        method: 'GET',
        headers: {
            Authorization: 'bearer 61917c2c355bb1b8a0fef68de61124299ac41eca96498eab9226b237ee56f4537f64ab270f7b1422043a6cf22cf8806283520097fe67f2649de7467ae273359348fa8e70f90cd217db44d5fef9631ae87415de306f54f2641d183164a8f715add4df6e179d96058aa720d4ca3ca6399da87aa2641163ef9417fa762eee9c7b4b',
            "Content-Type": "application/json"
        }
    })
    const { data } = await response.json();

    console.log('response', data)
    return data ? data : null;
}

export async function delNote(uuid: string): Promise<Response> {
    return fetch(`http://localhost:1337/api/notes/${uuid}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer 61917c2c355bb1b8a0fef68de61124299ac41eca96498eab9226b237ee56f4537f64ab270f7b1422043a6cf22cf8806283520097fe67f2649de7467ae273359348fa8e70f90cd217db44d5fef9631ae87415de306f54f2641d183164a8f715add4df6e179d96058aa720d4ca3ca6399da87aa2641163ef9417fa762eee9c7b4b',
            "Content-Type": "application/json"
        }
    })
}
