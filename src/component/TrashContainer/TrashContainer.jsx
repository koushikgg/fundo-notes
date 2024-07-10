import { useEffect, useState } from "react";
import { trashNotesApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";

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
            <div style={{ width: "81.6%%", display: "flex", flexWrap: "wrap", gap: "15px", padding: "75px 3% 50px 15.4%" }}>
                {notesList.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"trashContent"} />
                )
                }
            </div>
        </>
    )
}

export default TrashContainer;