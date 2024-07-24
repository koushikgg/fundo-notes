import { useEffect, useState } from "react"
import { archiveNotesApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
// import Note from "../Note/Note";
import './ArchiveContainer.scss'
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { updateNoteList } from "../../store/noteDetailsSlice";


function ArchiveContainer() {
    const [notesList, setNotesList] = useState([]);
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)
    const noteDeatilsList = useSelector((store) => store.noteDetails.noteDetailsList)
    const dispatch = useDispatch();
    // console.log(noteDeatilsList);
    
    // useEffect(() => {
    //     fetchArchive()
    // }, [])
    useEffect(() => {
        fetchArchive()
    }, [noteDeatilsList])
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
        const res = await archiveNotesApi();
        const filteredNote = noteDeatilsList.filter(note => note.isArchived === true && note.isDeleted !== true)
        console.log(filteredNote);
        setOriginalNotesList(filteredNote || [])
        setNotesList (filteredNote || [])
        // const filteredData = res?.data?.data?.data.filter(note => note.isArchived === true && note.isDeleted !== true)
        // setOriginalNotesList(filteredData)
        // setNotesList(filteredData)
        setLoading(false)
    }
    async function handleNotesList(action, data) {
        if (action === 'archive') {
            setNotesList(data, ...notesList)
        }
        if (action === "unArchive" || action === "trash") {
            const unArchivedNotes = notesList.filter((note) => note?.id !== data?.id);
            setNotesList(unArchivedNotes);
            dispatch(updateNoteList(data))
            const newData = noteDeatilsList.map(note => {
                if (note?.id === data?.id) {
                    if (action === "unArchive") {
                        return {
                            ...note,
                            isArchived: false
                        };
                    }
                    if (action === "trash") {
                        return {
                            ...note,
                            isDeleted: true
                        };
                    }
                }
                return note
            });
            const updatedNote = newData.find(note => note.id === data?.id);
            // console.log(updatedNote);
            dispatch(updateNoteList(updatedNote))
        }
        if (action === "color") {
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
            dispatch(updateNoteList(data))
        }
        if (action === "label") {
            // console.log("step3");
            const updatedNotes = notesList.map((note) => {
                if (note?.id === data?.id) {
                    return {
                        ...note,
                        label: data.label
                    };
                }
                return note;
            });
            setNotesList(updatedNotes);
            const updatedNote = updatedNotes.find(note => note.id === data?.id);
            dispatch(updateNoteList(updatedNote))
        }
    }
    return (
        <>
            <div className="archive-main-cnt">
                {loading && <div className="Notes-not-found"><CircularProgress /></div>}
                {noteFound && <div className="Notes-not-found">Notes Not Found</div>}
                {!noteFound && !loading && notesList?.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"archiveContent"} />
                )}
            </div>
        </>
    )
}

export default ArchiveContainer
