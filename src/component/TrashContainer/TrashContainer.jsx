
import { useEffect, useState } from "react";
import { trashNotesApi } from "../../services/NoteService";
import Notecard from "../Notecard/Notecard";
import './TrashContainer.scss'
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { removeNotes, updateNoteList } from "../../store/noteDetailsSlice";


function TrashContainer() {
    const [notesList, setNotesList] = useState([])
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)
    const noteDeatilsList = useSelector((store) => store.noteDetails.noteDetailsList)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     fetchTrash()
    // }, [])
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
        const filteredNote = noteDeatilsList.filter(note => note.isDeleted === true)
        setOriginalNotesList(filteredNote || [])
        setNotesList(filteredNote || [])
        // setOriginalNotesList(res?.data?.data?.data || [])
        // setNotesList(res?.data?.data?.data || [])
        setLoading(false)
    }
    async function handleNotesList(action, data) {
        if (action === "restore" || action === "deleteForever") {
            const filteredData = notesList.filter(note => note.id !== data?.id)
            const newfilteredNote = noteDeatilsList.filter(note => note.id !== data?.id)
            setNotesList(newfilteredNote)
            setOriginalNotesList(newfilteredNote)
            // setNotesList(filteredData)
            // setOriginalNotesList(filteredData)
            if (action === "deleteForever") {
                const updatedNote = notesList.find(note => note.id === data?.id);
                dispatch(removeNotes(updatedNote))
                return
            }
            const newData = noteDeatilsList.map(note => {
                if (note?.id === data?.id) {
                    if (action === "restore") {
                        return {
                            ...note,
                            isDeleted: false
                        };
                    }
                }
                return note
            });
            const updatedNote = newData.find(note => note.id === data?.id);
            if (updatedNote) {
                dispatch(updateNoteList(updatedNote));
            }
        }
    }
    return (
        <>
            <div className="trash-main-cnt" >
                {loading && <div className="Notes-not-found"><CircularProgress /></div>}
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
