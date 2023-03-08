import { useAppDispatch, useAppSelector } from "../hooks"
import { editNote, selectNote } from "../store/editSlice"
import { Note as NoteType } from "../schemas/schemas"


export const Note: React.FC<NoteType> = ({ body, isDone }) => {
    const editState = useAppSelector(state => state.edit)
    const dispatch = useAppDispatch()

    return (
        <div className="Note">
            {body}
        </div>
    )
}