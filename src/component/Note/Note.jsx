import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import Button from '@mui/material/Button';

import './Note.scss';
import { useState } from 'react';
import { CreateNoteApi } from '../../services/NoteService';

function Note({updateList}) {
    // let showTakeNote = true
    const [showTakeNote, setShowTakeNote] = useState(true)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const handleCreateNote = async() => {
        let validCreateNote=true;
        if (title === "") {
            validCreateNote=false;
        }
        if (description=== "") {
            validCreateNote=false;
        }
        if(validCreateNote){
            const res = await CreateNoteApi({"title":title,"description":description});
            console.log(res?.data?.status?.details);
            updateList("add",{"title":title,"description":description})
        }
        setShowTakeNote(!showTakeNote)
        console.log(showTakeNote);
        setTitle('')
        setDescription('')
    }
    return (
        <>
            {showTakeNote ?
                <div id="mainnote-main_cnt" onClick={handleCreateNote}>
                    <div className="mainnote-inner-main-cnt">
                        <div>
                            <span>Take a note...</span>
                        </div>
                        <div className='mainnote-opt-maincnt'>
                            <div className='mainnote-opt-same-cnt'>
                                <CheckBoxOutlinedIcon />
                            </div>
                            <div className='mainnote-opt-same-cnt'>
                                <CreateOutlinedIcon />
                            </div>
                            <div className='mainnote-opt-same-cnt'>
                                <InsertPhotoOutlinedIcon />
                            </div>
                        </div>
                    </div>
                </div> :
                <div className='innernote-main-note'>
                    <div className="innernote-inner-main-cnt">
                        <div className='innernote-main-title-cnt'>
                            <input className='note-title-inp' type="text" placeholder='Title' onChange={(e)=> setTitle(e.target.value)} />
                            <PushPinOutlinedIcon />
                        </div>
                        <div className='innernote-main-inp-cnt'>
                            <input type="text" placeholder='Take a note...' onChange={(e)=> setDescription(e.target.value)}/>
                        </div>
                        <div className='innernote-main-opt-cnt'>
                            <div className='innernote-main-optinner-cnt'>
                                <AddAlertOutlinedIcon className='innernote-main-opt-cnt-one innernote-first-opt' />
                                <PersonAddAltOutlinedIcon className='innernote-main-opt-cnt-one' />
                                <PaletteOutlinedIcon className='innernote-main-opt-cnt-one' />
                                <InsertPhotoOutlinedIcon className='innernote-main-opt-cnt-one' />
                                <ArchiveOutlinedIcon className='innernote-main-opt-cnt-one'  />
                                <MoreVertOutlinedIcon className='innernote-main-opt-cnt-one' />
                                <UndoOutlinedIcon className='innernote-main-opt-cnt-one' />
                                <RedoOutlinedIcon className='innernote-main-opt-cnt-one' />
                            </div>
                            <div className='innernote-main-opt-cnt-two'>
                                <Button variant="text" onClick={handleCreateNote}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Note;