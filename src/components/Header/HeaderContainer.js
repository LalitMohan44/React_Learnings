import { Box, Toolbar, IconButton, Badge, ThemeProvider } from '@mui/material';
import React, { Component } from 'react';
import SearchBox from './SearchBox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar'
import { APP_THEME } from '../../utils/Utils';
import SideNav from '../Sidenav/SideNav';
import YouTubeLogo from './YouTubeLogo';
import {Menu, MenuItem} from '@mui/material';
import { userLogout, emptySavedVideos } from '../../redux';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            profileMenuAnchor: null,
            profileMenuOpen: false
        }
    }

    handleDrawerToggle = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    handleProfileMenuOpen = (event) => {
        this.setState({
            profileMenuAnchor: event.currentTarget,
            profileMenuOpen: true
        })
    };

    handleProfileMenuClose = () => {
        this.setState({
            profileMenuAnchor: null,
            profileMenuOpen: false
        })
    }

    logoutUser = () => {
        this.handleProfileMenuClose()
        this.props.emptySavedVideos()
        this.props.userLogout()
    }


    render() {
        const { drawerOpen, profileMenuAnchor, profileMenuOpen } = this.state;
        return (
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={APP_THEME}>
                    <AppBar position="fixed" color="primary" sx={{ zIndex: 10 }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="white"
                                onClick={this.handleDrawerToggle}
                                sx={{ mr: '1rem' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <YouTubeLogo />
                            <Box sx={{ flexGrow: 1 }} />
                            <SearchBox />
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: 'flex' }}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="red">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    id="profile-button"
                                    size="large"
                                    edge="end"
                                    aria-controls={profileMenuOpen ? 'profile-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={profileMenuOpen ? 'true' : undefined}
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={profileMenuAnchor}
                                    open={profileMenuOpen}
                                    onClose={this.handleProfileMenuClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'profile-button',
                                    }}
                                >
                                    <MenuItem onClick={this.handleProfileMenuClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleProfileMenuClose}>My account</MenuItem>
                                    <MenuItem>
                                        <GoogleLogout
                                            clientId="283436294814-k7vduug1bepj2pdvh8eb69gbs4ci3c8u.apps.googleusercontent.com"
                                            buttonText="Logout"
                                            onLogoutSuccess={this.logoutUser}
                                            >
                                        </GoogleLogout>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <SideNav open={drawerOpen} handleDrawerToggle={this.handleDrawerToggle} />
                </ThemeProvider>
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        video: state.video
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout()),
        emptySavedVideos: () => dispatch(emptySavedVideos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)