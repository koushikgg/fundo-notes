import { useEffect, useState } from "react"
import Note from "../Note/Note"
import Notecard from "../Notecard/Notecard"
import { archiveNotesApi, fetchNotesApi } from "../../services/NoteService"
import { useSelector } from "react-redux"
import './NotesContainer.scss'


function NotesContainer() {
    const [notesList, setNotesList] = useState([])
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)
    useEffect(() => {
        fetchData()
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

    async function fetchData() {
        try {
            const res = await fetchNotesApi();
            // console.log(res);
            const filteredNote = res?.data?.data?.data.filter(note => note.isArchived !== true && note.isDeleted !== true)
            setOriginalNotesList(filteredNote)
            setNotesList(filteredNote || []);
            setLoading(false)
        } catch (err) {
            console.error("Error fetching notes:", err);
            setLoading(false)
        }
    }


    const handleNotesList = (action, data) => {
        // console.log("step2");
        if (action === "add") {
            // console.log(action);
            // console.log(data);
            setNotesList([data, ...notesList])
        }
        if (action === "archive" || action === "trash") {
            const archivedNotes = notesList.filter((note) => note?.id !== data?.id);
            setNotesList(archivedNotes)
            // console.log(notesList);
            
        }
        if (action === "color") {
            // console.log("step3");
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
        if (action === "update") {
            // console.log("step3");
            const updatedNotes = notesList.map((note) => {
                if (note?.id === data?.id) {
                    return {
                        ...note,
                        title: data.title,
                        description: data.description
                    };
                }
                return note;
            });
            setNotesList(updatedNotes);
        }
        console.log(notesList);
    
    }

    return (
        <>
            <Note updateList={handleNotesList} />
            <div className="note-main-cnt">
                {loading && <div className="Notes-not-found">Loading...</div>}
                {noteFound && <div className="Notes-not-found">Notes Not Found</div>}
                {!loading && !noteFound && notesList?.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"notesContent"} />
                )}
            </div>
        </>
    )
}

export default NotesContainer;