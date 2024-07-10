import { useState } from 'react';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Tooltip from '@mui/material/Tooltip';
import './Notecard.scss';
import { toast } from 'react-toastify';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { changeColorApi, deleteForeverApi, updateArchiveApi, updateNoteApi, updateTrashApi } from '../../services/NoteService';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    p: 1,
};

function Notecard({ noteDetails, updateList, typeOfContent }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const open = Boolean(anchorEl);
    const openColorBox = Boolean(anchorE2);
    const [showNoteCard, setShowNoteCard] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState(noteDetails.title);
    const [description, setDescription] = useState(noteDetails.description)
    

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickColorBox = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleCloseColorBox = () => {
        setAnchorE2(null);
    };
    const hanldeNoteCard = () => {
        setShowNoteCard(!showNoteCard);
    }

    async function handleClick(action, data, color = "#ffffff") {
        if (action === 'archive') {
            const res = await updateArchiveApi({
                "noteIdList": [data.id],
                "isArchived": true
            });
            updateList(action, data);
        }
        if (action === 'trash') {
            const res = await updateTrashApi({
                "noteIdList": [data.id],
                "isDeleted": true
            });
            updateList(action, data);
        }
        if (action === 'restore') {
            await updateTrashApi({
                "noteIdList": [data.id],
                "isDeleted": false
            });
            updateList(action, data);
        }
        if (action === "unArchive") {
            await updateArchiveApi({
                "noteIdList": [data.id],
                "isArchived": false
            });
            updateList(action, data);
        }
        if (action === "color") {
            console.log("step1");
            await changeColorApi({
                "noteIdList": [data.id],
                "color": color
            });
            data.color = color;
            console.log(data.color);
            updateList(action, data);
        }
        if (action === "deleteForever") {
            console.log("step1");
            await deleteForeverApi({
                "noteIdList": [data.id],
                "isDeleted": false
            });
            updateList(action, data);
        }
        if (action === "update") {
            setOpenModal(!openModal)
            console.log("step1");
            await updateNoteApi({
                "noteId": data.id,
                "title": title,
                "description":description
            });
            data.title=title
            data.description=description
            updateList(action, data);
        }
        

    }

    return (
        <>
            <div className='notecard-info-main-cnt'>
                <div className='notecard-info-inner-main-cnt' style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}>
                    <div className='notecard-info-txt-main-cnt' onClick={()=> setOpenModal(!openModal)}>
                        <div className='notecard-title-cnt'>
                            <span onClick={()=>setOpenModal(!openModal)}>{noteDetails?.title}</span>
                            <PushPinOutlinedIcon />
                        </div>
                        <div className='notecard-notebody-cnt'>
                            <p onClick={()=>setOpenModal(!openModal)}>{noteDetails?.description}</p>
                        </div>
                    </div>
                    <div className='notecard-opt-main-cnt'>
                        {typeOfContent === "trashContent" ? (
                            <>
                                <DeleteForeverOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' onClick={() => handleClick("deleteForever", noteDetails)} />
                                <RestoreFromTrashOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' onClick={() => handleClick("restore", noteDetails)} />
                            </>
                        ) : (
                            <>
                                <AddAlertOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' />
                                <PersonAddAltOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' />
                                <div className='notecard-color-optn-cnt notecard-menu1-cnt'>
                                    <PaletteOutlinedIcon
                                        className='notecard-main-opt-cnt-one'
                                        id="basic-button"
                                        aria-controls={openColorBox ? 'color-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openColorBox ? 'true' : undefined}
                                        onClick={handleClickColorBox}
                                    />
                                    <Menu
                                        id="color-menu"
                                        anchorEl={anchorE2}
                                        open={openColorBox}
                                        onClose={handleCloseColorBox}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className="notecard-color-menu"
                                    >
                                        <Tooltip title="Default"><div className='col1' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FFFFFF'); }}></div></Tooltip>
                                        <Tooltip title="Coral"><div className='col2' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FAAFA8'); }}></div></Tooltip>
                                        <Tooltip title="Peach"><div className='col4' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FFF8B8'); }}></div></Tooltip>
                                        <Tooltip title="Sand"><div className='col3' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#F39F76'); }}></div></Tooltip>
                                        <Tooltip title="Mint"><div className='col5' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#E2F6D3'); }}></div></Tooltip>
                                        <Tooltip title="Sage"><div className='col6' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#B4DDD3'); }}></div></Tooltip>
                                        <Tooltip title="Fog"><div className='col7' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#D4E4ED'); }}></div></Tooltip>
                                        <Tooltip title="Storm"><div className='col8' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#AECCDC'); }}></div></Tooltip>
                                        <Tooltip title="Dusk"><div className='col9' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#D3BFDB'); }}></div></Tooltip>
                                        <Tooltip title="Blossom"><div className='col10' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#F6E2DD'); }}></div></Tooltip>
                                        <Tooltip title="Clay"><div className='col11' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#E9E3D4'); }}></div></Tooltip>
                                        <Tooltip title="Chalk"><div className='col12' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#EFEFF1'); }}></div></Tooltip>
                                    </Menu>
                                </div>
                                <InsertPhotoOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' />
                                {typeOfContent === "notesContent" ? (
                                    <ArchiveOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}
                                        className='notecard-main-opt-cnt-one'
                                        onClick={() => handleClick('archive', noteDetails)}
                                    />
                                ) : (
                                    <UnarchiveOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='notecard-main-opt-cnt-one ' onClick={() => handleClick('unArchive', noteDetails)} />
                                )}
                                <div>
                                    <MoreVertOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}
                                        className='notecard-main-opt-cnt-one'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClickMenu}
                                    />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }} className='notecard-more-opt-main-cnt'
                                    >
                                        <MenuItem onClick={() => { handleCloseMenu(); handleClick('trash', noteDetails); }}>Delete</MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Modal
                    open={openModal}
                    onClose={()=>setOpenModal(!openModal)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} id="innernotecard-inner-modal-main-cnt">
                        <div className="innernotecard-inner-main-cnt">
                            <div className='innernotecard-main-title-cnt'>
                                <input className='notecard-title-inp'  type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} />
                                <PushPinOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}/>
                            </div>
                            <div className='innernotecard-main-inp-cnt'>
                                <input type="text" value={description}  onChange={(e) => setDescription(e.target.value)} style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} />
                            </div>
                            <div className='innernotecard-main-opt-cnt'>
                                <div className='notecardcard-opt-cnt '>
                                    <AddAlertOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one innernote-first-opt' />
                                    <PersonAddAltOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one' />
                                    <div className='notecard-color-optn-cnt notecard-menu1-cnt innernotecard-color-menu-opt-cnt'>
                                        <PaletteOutlinedIcon
                                        style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}
                                            className='innernotecard-main-opt-cnt-one'
                                            id="basic-button"
                                            aria-controls={openColorBox ? 'color-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openColorBox ? 'true' : undefined}
                                            onClick={handleClickColorBox}
                                        />
                                        <Menu
                                            id="color-menu"
                                            anchorEl={anchorE2}
                                            open={openColorBox}
                                            onClose={handleCloseColorBox}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            className="notecard-color-menu"
                                        >
                                            <Tooltip title="Default"><div className='col1' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FFFFFF'); }}></div></Tooltip>
                                            <Tooltip title="Coral"><div className='col2' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FAAFA8'); }}></div></Tooltip>
                                            <Tooltip title="Peach"><div className='col4' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#FFF8B8'); }}></div></Tooltip>
                                            <Tooltip title="Sand"><div className='col3' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#F39F76'); }}></div></Tooltip>
                                            <Tooltip title="Mint"><div className='col5' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#E2F6D3'); }}></div></Tooltip>
                                            <Tooltip title="Sage"><div className='col6' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#B4DDD3'); }}></div></Tooltip>
                                            <Tooltip title="Fog"><div className='col7' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#D4E4ED'); }}></div></Tooltip>
                                            <Tooltip title="Storm"><div className='col8' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#AECCDC'); }}></div></Tooltip>
                                            <Tooltip title="Dusk"><div className='col9' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#D3BFDB'); }}></div></Tooltip>
                                            <Tooltip title="Blossom"><div className='col10' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#F6E2DD'); }}></div></Tooltip>
                                            <Tooltip title="Clay"><div className='col11' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#E9E3D4'); }}></div></Tooltip>
                                            <Tooltip title="Chalk"><div className='col12' onClick={() => { handleCloseColorBox(); handleClick('color', noteDetails, '#EFEFF1'); }}></div></Tooltip>
                                        </Menu>
                                    </div>
                                    <InsertPhotoOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one' />
                                    <ArchiveOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }}  className='innernotecard-main-opt-cnt-one' />
                                    <MoreVertOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one' />
                                    <UndoOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one' />
                                    <RedoOutlinedIcon style={noteDetails.color ? { backgroundColor: noteDetails.color } : { backgroundColor: "#ffffff" }} className='innernotecard-main-opt-cnt-one' />
                                </div>
                                <div className='innernotecard-main-opt-cnt-two'>
                                    <Button variant="text" onClick={()=>handleClick('update',noteDetails)}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div >
        </>
    );
}

export default Notecard;