import './header.scss';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeepLogo from '../../assets/keep_logo.png'
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchQuery, resetuserName, setSearchQuery } from '../../store/searchNoteSlice';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';


function Header({ toggleDrawer }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const userName = useSelector((store) => store.userNames.userName)
    const userFName = (localStorage.getItem('userFName'))
    const userLName = (localStorage.getItem('userLName'))
    const userEmail = (localStorage.getItem('userEmail'))

    // console.log(userName);
    const showDropdownBox = () => {
        setShowDropdown(!showDropdown);
    }

    async function logout() {
        navigate('/');
        localStorage.removeItem("AcessToken")
        localStorage.removeItem("userFName")
        localStorage.removeItem("userLName")
        localStorage.removeItem("userEmail")
    }

    function clearSearchInput(){
        dispatch(resetSearchQuery())
        document.getElementById('header-search-inp-value-cnt').value=''
    }
    return (
        <>
            <div className='header-main-cnt'>
                <div className='header-logo-main-cnt'>
                    <div className='header-menu-opt-cnt'>
                        <div className='header-menu-cnt' onClick={toggleDrawer}>
                            <IconButton><MenuIcon /></IconButton>
                        </div>
                    </div>
                    <div className='header-logo-icon-txt-cnt'>
                        <div className='header-logo-cnt'>
                            <img src={KeepLogo} alt="" />
                        </div>
                        <span>Keep</span>
                    </div>
                </div>
                <div className='header-serch-main-cnt'>
                    <div className='header-serch-logo-cnt'>
                        <div className='header-search-logo-inner-cnt'>
                            <div className='header-search-icon'>
                                <IconButton><SearchIcon /></IconButton>
                            </div>
                            <div className='header-search-inp-cnt'>
                                <input type="text" placeholder='Search' id='header-search-inp-value-cnt' onChange={(e) => dispatch(setSearchQuery(e.target.value))} />
                            </div>
                            <CancelIcon onClick={(e) => clearSearchInput()} />
                        </div>
                    </div>
                    <div className='header-search-oth-app-cnt'>
                        <div className='header-opt-same-cnt'>
                            <IconButton><RefreshIcon /></IconButton>
                        </div>
                        <div className='header-opt-same-cnt'>
                            <IconButton>< ViewStreamIcon /></IconButton>
                        </div>
                        <div className='header-opt-same-cnt'>
                            <IconButton>< SettingsIcon /></IconButton>
                        </div>
                    </div>
                </div>
                <div className='header-apps-mian-cnt'>
                    <div className='header-apps-logo-cnt'>
                        <IconButton><AppsIcon /></IconButton>
                    </div>
                    <div className='header-profile-logo-cnt'>
                        <div className='header-profile-logo-inner-cnt'  onClick={showDropdownBox}><p>{userFName[0]}</p></div>
                        {showDropdown ? (
                            <div className="header-dropdown-box">
                                <div className="dropdown-item"><p>First Name : {userFName} </p></div>
                                <div className="dropdown-item"><p>Last Name : {userLName} </p></div>
                                <div className="dropdown-item"><p>{userEmail} </p></div>
                                <Button id='header-logout-btn' onClick={logout}>Log Out</Button>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;