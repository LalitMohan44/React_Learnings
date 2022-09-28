import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

class YouTubeLogo extends Component {
    render() {
        return (
            <Logo>
                <YouTubeIcon fontSize='large' color='red' />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color={'white'}
                    sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}
                >
                    YouTube
                </Typography>
            </Logo>
        );
    }
}

const Logo = styled('div')(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white'
}));

export default YouTubeLogo;