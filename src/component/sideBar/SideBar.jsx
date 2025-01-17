import React from 'react';
import Drawer from '@mui/material/Drawer';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import './SideBar.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


function SideBar({ drawerOpen, toggleDrawer }) {
  const labelsList = useSelector((store) => store.labelNames.labelsName)
  const navigate = useNavigate();

  return (
    <Drawer open={drawerOpen} onClose={toggleDrawer}>
      <div className='sidebar-main-div' role="presentation" onClick={toggleDrawer}>
        <div className='sidebar-opt-cnt' onClick={() => navigate('/dashboard/notes')}>
          <LightbulbOutlinedIcon className='sidebar-opt-logo' />
          <p>Notes</p>
        </div>
        <div className='sidebar-opt-cnt'>
          <NotificationsOutlinedIcon className='sidebar-opt-logo' />
          <p>Reminder</p>
        </div>
        {
          labelsList?.map((label, key) => (
          <div key={key} className='sidebar-opt-cnt' onClick={() =>     navigate(`/dashboard/label/${label}`)  }>
              <DoubleArrowIcon className='sidebar-opt-logo' />
              <p>{label}</p>
            </div>)
          )}
        
        <div className='sidebar-opt-cnt' >
          <CreateOutlinedIcon className='sidebar-opt-logo' />
          <p>Edit labels</p>
        </div>
        <div className='sidebar-opt-cnt' onClick={() => navigate('/dashboard/archive')}>
          <ArchiveOutlinedIcon className='sidebar-opt-logo' />
          <p>Archive</p>
        </div>
        <div className='sidebar-opt-cnt' onClick={() => navigate('/dashboard/trash')}>
          <DeleteIcon className='sidebar-opt-logo' />
          <p>Trash</p>
        </div>
      </div>
    </Drawer>
  );
}

export default SideBar;
