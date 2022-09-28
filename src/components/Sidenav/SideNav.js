import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { APP_THEME } from '../../utils/Utils';
import { ThemeProvider } from '@mui/material';
import YouTubeLogo from '../Header/YouTubeLogo';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link } from 'react-router-dom';

const drawerWidth = 250;

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            navItems:[{
                icon: <HomeIcon color='white' />,
                label: "Home",
                route: '/',
                active: false
            },
            {
                icon: <VideoLibraryIcon  color='white' />,
                label: "Library",
                route: '/library',
                active: false
            }]
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.open !== props.open) {
            return {
                ...state,
                open: props.open
            }
        }
        return null
    }

    render() {
        const { open, navItems } = this.state;
        return (
            <ThemeProvider theme={APP_THEME}>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton
                            size="large"
                            edge="start"
                            color="white"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerToggle}
                            sx={{ ml: '0.4rem', mr: '1rem' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <YouTubeLogo />
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {navItems.map((item, index) => (
                            <ListItem
                                key={item.label}
                                component={Link}
                                to={item.route}
                                disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography type="body2" style={{ color: 'white' }}>
                                            {item.label}</Typography>}
                                        sx={{ color: 'white', opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
            </ThemeProvider>
        );
    }
}

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: APP_THEME.palette.primary.main
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: APP_THEME.palette.primary.main
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiSwipeableDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default SideNav;