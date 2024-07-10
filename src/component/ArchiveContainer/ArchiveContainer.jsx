import { useEffect, useState } from "react"
import { archiveNotesApi, updateArchiveApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
import Note from "../Note/Note";

function ArchiveContainer() {
    const [notesList, setNotesList] = useState([]);
    useEffect(() => {
        fetchArchive()
    }, [])
    async function fetchArchive() {
        console.log("hii archive page");
        const res = await archiveNotesApi();
        console.log(res?.data?.data?.data);
        const filteredData = res?.data?.data?.data.filter(note => note.isArchived == true && note.isDeleted !== true)
        console.log(filteredData);
        setNotesList(filteredData)
    }
    async function handleNotesList(action, data) {
        if (action == 'archive') {
            setNotesList(data, ...notesList)
        }
        if (action == "unArchive" || action == "trash") {
            const unArchivedNotes = notesList.filter((note) => note?.id != data?.id);
            setNotesList(unArchivedNotes);
        }
        if (action === "color") {
            console.log("step3");
            const updatedNotes = notesList.map((note) => {
                if (note?.id === data?.id) {
                    return {
                        ...note,
                        color: data.color
                    };
                }
                return note;
            });
            setNotesList(updatedNotes);
        }
    }
    return (
        <>
            <div style={{ width: "81.6%%", display: "flex", flexWrap: "wrap", gap: "15px", padding: "75px 3% 50px 15.4%" }}>
                {notesList?.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"archiveContent"} />
                )}
            </div>
        </>
    )
}

export default ArchiveContainer