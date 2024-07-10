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
import { useDispatch } from 'react-redux';
import { resetSearchQuery, setSearchQuery } from '../../store/searchNoteSlice';



function Header({toggleDrawer}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch()

    const showDropdownBox = () => {
        setShowDropdown(!showDropdown);
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
                                <input type="text" placeholder='Search' onChange={(e)=>dispatch(setSearchQuery(e.target.value))}/>
                            </div>
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
                        <AccountCircleIcon onClick={showDropdownBox} />
                        {showDropdown ? (
                            <div className="header-dropdown-box">
                                <div className="dropdown-item"></div>
                                <div className="dropdown-item"></div>
                                <Button>Log Out</Button>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;