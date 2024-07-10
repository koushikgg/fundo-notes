import axios from "axios";

const token =localStorage.getItem('AcessToken')
const baseUrl="https://fundoonotes.incubation.bridgelabz.com/api/notes"
const configForAddNotes = {
    headers: {
        "Content-Type": "multipart/form-data",
    }
}
export const CreateNoteApi = async (data) =>{
    return await axios.post(`${baseUrl}/addNotes?access_token=${token}`,data)
}

export const fetchNotesApi = async () => {
    return await axios.get(`${baseUrl}/getNotesList?access_token=${token}`)
// console.log(res);
        // return res
}

export const trashNotesApi = async () => {
    return  await axios.get(`${baseUrl}/getTrashNotesList?access_token=${token}`)
}

export const archiveNotesApi = async () => {
    return  await axios.get(`${baseUrl}/getArchiveNotesList?access_token=${token}`)
}

export const updateArchiveApi = async (id) =>{
    return await axios.post(`https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes?access_token=${token}`,id)
}

export const updateTrashApi = async (id) =>{
    return await axios.post(`https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes?access_token=${token}`,id)
}

export const deleteForeverApi = async (data) =>{
    return await axios.post(`https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes?access_token=${token}`,data)
}

export const changeColorApi = async (data) =>{
    return await axios.post(`https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes?access_token=${token}`,data)
}

export const updateNoteApi = async (data) => {
    return await axios.post(`https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes?access_token=${token}`,data,configForAddNotes)
}