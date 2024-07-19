import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SideBar from '../sideBar/SideBar';
import './Dashboard.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import { addLabelName, removeLabelName } from '../../store/labelNameSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const labelsList = useSelector((store) => store.labelNames.labelsName)
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [labelName, setLabelName] = useState('');
  const dispatch = useDispatch()


  const handleMouseEnter = (key) => {
    setHoveredLabel(key);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  function createLabel(value) {
    //  dispatch(addLabelName(value))
  }

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <div className="dashboard-container">
        <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <div className="content-container">
          <div className='dash-sidebar-main-div'>
            <div className='sidebar-opt-cnt' style={location?.pathname.includes('notes') ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
              <LightbulbOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt' style={location?.pathname.includes('Notify') ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
              <NotificationsOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            {
              labelsList?.map((label, key) => (
                <div key={key} className='sidebar-opt-cnt' style={location?.pathname.includes(label) ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
                  <DoubleArrowIcon className='dash-sidebar-opt-logo' />
                </div>)
              )}
            <div className='sidebar-opt-cnt' onClick={handleOpen} style={location?.pathname.includes('label') ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
              <CreateOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt' style={location?.pathname.includes('archive') ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
              <ArchiveOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt' style={location?.pathname.includes('trash') ? { backgroundColor: "#feefc3" } : { backgroundColor: "#ffffff" }}>
              <DeleteIcon className='dash-sidebar-opt-logo' />
            </div>
          </div>
          <div className='dashboard-child-main-cnt'>
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} id="dashboard-label-main-cnt">
          <div className='notecardlabel-label-main-cnt'>
            <div className='notecardlabel-label-txt-cnt'>
              <p>Label note</p>
              <div className='notecardlabel-label-inp-cnt'>
                <CloseIcon />
                <input type="text" placeholder='Create new label' onChange={(e) => setLabelName(e.target.value)} />
                <DoneIcon id='notecardlabel-label-search-logo' onClick={() => dispatch(addLabelName(labelName))} />
              </div>
            </div>
            <div className='notecardlabel-labels-cnt'>
              {labelsList?.map((label, key) => (
                <div
                  key={key}
                  className='notecardlabel-labels-inner-cnt'
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className='notecardlabel-labels-arrow-cnt' style={{ display: hoveredLabel === key ? 'none' : 'block' }}>
                    <DoubleArrowIcon />
                  </div>
                  <div className='notecardlabel-labels-delete-cnt' onClick={() => dispatch(removeLabelName(label))} style={{ display: hoveredLabel === key ? 'block' : 'none' }}>
                    <DeleteIcon />
                  </div>
                  <input type="text" name={label} id={`label-${key}`} value={label} readOnly />
                  <ModeEditIcon />
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Dashboard;
