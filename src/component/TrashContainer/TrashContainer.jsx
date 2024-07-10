import { useEffect, useState } from "react";
import { trashNotesApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
import './TrashContainer.scss'
function TrashContainer() {
    const [notesList, setNotesList] = useState([])
    useEffect(() => {
        fetchTrash()
    }, [])
    async function fetchTrash() {
        const res = await trashNotesApi()
        console.log(res);
        setNotesList(res?.data?.data?.data || [])
    }
    async function handleNotesList(action, data) {
        if (action === "restore" || action === "deleteForever") {
            const filteredData = notesList.filter(note => note.id !== data?.id)
            setNotesList(filteredData)
        }
    }
    console.log(notesList);
    return (
        <>
            <div className="trash-main-cnt" >
                {notesList.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"trashContent"} />
                )
                }
            </div>
        </>
    )
}

export default TrashContainer;