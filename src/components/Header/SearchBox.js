import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { APP_THEME } from '../../utils/Utils';

class SearchBox extends Component {
    render() {
        return (
            <Search>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <Tooltip title='Search'>
                    <SearchButtonWrapper>
                        <Button variant="contained" startIcon={<SearchIcon />} />
                    </SearchButtonWrapper>
                </Tooltip>
            </Search>
        );
    }
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'inline-flex',
    borderRadius: 1,
    backgroundColor: APP_THEME.palette.primary.darker,
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
    width: '40%',
    alignSelf: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '&:focus-within': {
        border: '1px solid ' + APP_THEME.palette.blue.main,
    },
    width: '100%',
    padding: theme.spacing(0.5)
    
}));

const SearchButtonWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& button': {
        height: '100%',
        backgroundColor: APP_THEME.palette.primary.light,
        borderRadius: 0,
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1
    }
}));

export default SearchBox;