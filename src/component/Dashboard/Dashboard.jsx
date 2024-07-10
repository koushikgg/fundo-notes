// Dashboard.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import SideBar from '../sideBar/SideBar';
import './Dashboard.scss';
import { fabClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';


function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <div>
        <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <div className="content-container">
          <div className='dash-sidebar-main-div' role="presentation" >
            <div className='sidebar-opt-cnt' >
              <LightbulbOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt'>
              <NotificationsOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt' >
              <CreateOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt'>
              <ArchiveOutlinedIcon className='dash-sidebar-opt-logo' />
            </div>
            <div className='sidebar-opt-cnt' >
              <DeleteIcon className='dash-sidebar-opt-logo' />
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

