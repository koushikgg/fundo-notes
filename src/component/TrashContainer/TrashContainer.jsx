import { useEffect, useState } from "react";
import { trashNotesApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
import './TrashContainer.scss'
import { useSelector } from "react-redux";


function TrashContainer() {
    const [notesList, setNotesList] = useState([])
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)

    useEffect(() => {
        fetchTrash()
    }, [])
    useEffect(() => {
        if (!searchQuery) {
            setNotesList(originalNotesList || []);
            return;
        }
        const filteredNote = originalNotesList.filter(note => note.title.includes(searchQuery) || note.description.includes(searchQuery))
        setNotesList(filteredNote || []);
    }, [searchQuery])
    useEffect(() => {
        setNoteFound(notesList.length === 0 && !loading);
    }, [notesList]);


    async function fetchTrash() {
        const res = await trashNotesApi()
        console.log(res);
        setOriginalNotesList(res?.data?.data?.data || [])
        setNotesList(res?.data?.data?.data || [])
        setLoading(false)
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
                {loading && <div className="Notes-not-found">Loading...</div>}
                {noteFound && <div className="Notes-not-found">Notes Not Found</div>}
                {!noteFound && !loading && notesList.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"trashContent"} />
                )
                }
            </div>
        </>
    )
}

export default TrashContainer;