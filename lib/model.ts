import mongoose, { Schema, Document } from 'mongoose'


export interface Note extends Document {
    title: string
    content: string
    uuid: string
    tag: string[]
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<Note>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    uuid: { type: String, required: true },
    tag: { type: [String]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const NoteModel = mongoose.models.Note || mongoose.model<Note>('Note', noteSchema)





