import { useEffect, useState } from "react"
import Note from "../Note/Note"
import Notecard from "../Notecard/Notecard"
import { fetchNotesApi } from "../../services/NoteService"
import { useDispatch, useSelector } from "react-redux"
import './NotesContainer.scss'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { addNotetoRedux, updateNoteList } from "../../store/noteDetailsSlice"
import { isDisabled } from "@testing-library/user-event/dist/utils"


function NotesContainer() {
    const [notesList, setNotesList] = useState([])
    const [originalNotesList, setOriginalNotesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noteFound, setNoteFound] = useState(false);
    const searchQuery = useSelector((store) => store.searchNote.searchQuery)
    const noteDeatilsList = useSelector((store) => store.noteDetails.noteDetailsList)
    const [count, setCount] = useState([])
    const dispatch = useDispatch();
    // useEffect(() => {
    //     fetchData()
    // }, [])

    useEffect(() => {
        fetchData();
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

    async function fetchData() {
        try {
            const res = await fetchNotesApi();
            const filteredNote = res?.data?.data?.data.filter(note => note.isArchived !== true && note.isDeleted !== true)
            const newfilteredNote = noteDeatilsList.filter(note => note.isArchived !== true && note.isDeleted !== true)
            // console.log(res?.data?.data?.data);
            // console.log(newfilteredNote);
            setOriginalNotesList(newfilteredNote)
            setNotesList(newfilteredNote || []);
            setLoading(false)
        } catch (err) {
            console.error("Error fetching notes:", err);
            setLoading(false)
        }
        // console.log(notesList);

    }



    const handleNotesList = (action, data) => {
        // console.log("step2");
        if (action === "add") {
            // console.log(action);
            // console.log(data);
            setNotesList([data, ...notesList])
            setOriginalNotesList([data, ...notesList])
            dispatch(addNotetoRedux(data))
        }
        if (action === "archive" || action === "trash") {
            const archivedNotes = notesList.filter((note) => note?.id !== data?.id);
            const newarchivedNotes = noteDeatilsList.filter((note) => note?.id !== data?.id);
            setNotesList(newarchivedNotes)
            setOriginalNotesList(newarchivedNotes)
            // console.log(notesList);
            const newData = noteDeatilsList.map(note => {
                if (note?.id === data?.id) {
                    if (action === "archive") {
                        return {
                            ...note,
                            isArchived: true
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
            const updatedNote = updatedNotes.find(note => note.id === data?.id);
            console.log(updatedNote);
            dispatch(updateNoteList(updatedNote))

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
            const updatedNote = updatedNotes.find(note => note.id === data?.id);
            dispatch(updateNoteList(updatedNote))
        }
        // console.log(notesList);
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
            <Note updateList={handleNotesList} />
            <div className="note-main-cnt">
                {loading && <div className="Notes-not-found"><CircularProgress /></div>}
                {noteFound && <div className="Notes-not-found">Notes Not Found</div>}
                {!loading && !noteFound && notesList?.map((note, key) =>
                    <Notecard noteDetails={note} updateList={handleNotesList} typeOfContent={"notesContent"} />
                )}
            </div>
        </>
    )
}

export default NotesContainer;