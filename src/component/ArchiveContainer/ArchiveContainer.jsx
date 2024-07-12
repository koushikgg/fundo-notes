import { useEffect, useState } from "react"
import { archiveNotesApi, updateArchiveApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
import Note from "../Note/Note";
import './ArchiveContainer.scss'
import { useSelector } from "react-redux";

function ArchiveContainer() {
    const [notesList, setNotesList] = useState([]);
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)
    useEffect(() => {
        fetchArchive()
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

    async function fetchArchive() {
        console.log("hii archive page");
        const res = await archiveNotesApi();
        console.log(res?.data?.data?.data);
        const filteredData = res?.data?.data?.data.filter(note => note.isArchived == true && note.isDeleted !== true)
        console.log(filteredData);
        setOriginalNotesList(filteredData)
        setNotesList(filteredData)
        setLoading(false)
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
            <div className="archive-main-cnt">
                {loading && <div className="Notes-not-found">Loading...</div>}
                {noteFound && <div className="Notes-not-found">Notes Not Found</div>}
                {!noteFound && !loading && notesList?.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"archiveContent"} />
                )}
            </div>
        </>
    )
}

export default ArchiveContainer
