import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import MuiCard from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import moment from 'moment'
import numeral from 'numeral'
import { Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { saveVideo } from '../../redux';


class VideoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoMenuAnchor: null,
            videoMenuOpen: false
        }
    }

    handleVideoMenuOpen = (event) => {
        this.setState({
            videoMenuAnchor: event.currentTarget,
            videoMenuOpen: true
        })
    };

    handleVideoMenuClose = () => {
        this.setState({
            videoMenuAnchor: null,
            videoMenuOpen: false
        })
    }

    saveThisVideo = () => {
        this.handleVideoMenuClose()
        this.props.saveVideo(this.props.video)
    }

    render() {
        const {
            contentDetails: { duration },
            snippet: { channelTitle, title, publishedAt, thumbnails },
            statistics: { viewCount },
        } = this.props.video;
        const { videoMenuAnchor, videoMenuOpen } = this.state
        return (
            <Card sx={{ maxWidth: 275, maxHeight: 300, border: 'none' }}>
                <CardMedia
                    component="img"
                    alt="youtube video"
                    image={thumbnails.medium.url}
                />
                <VideoLength variant="body2">{getFormattedDurationString(duration)}</VideoLength>
                <CardContent sx={{ padding: 0 }}>
                    <VideoContent>
                        <Avatar sx={{ bgcolor: 'red', width: 35, height: 35 }} aria-label="video">
                            L
                        </Avatar>
                        <Box>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'Bold' }}>{title}</Typography>
                            <Typography sx={{ fontSize: 12 }}>{channelTitle}</Typography>
                            <Box sx={{ display: 'flex', paddingLeft: '0' }}>
                                <Typography sx={{ fontSize: 12 }}>
                                    {numeral(viewCount).format('0.a')} views <span>•</span>
                                </Typography>
                                <Typography sx={{ fontSize: 12, paddingLeft: 1 }}>
                                    {moment(publishedAt).fromNow()}
                                </Typography>
                            </Box>
                        </Box>
                        {this.props.showVideoMenu ? <><IconButton 
                            id="video-options"
                            size="large"
                            edge="end"
                            aria-controls={videoMenuOpen ? 'video-menu' : undefined}
                            aria-label="account of current user"
                            aria-haspopup="true"
                            aria-expanded={videoMenuOpen ? 'true' : undefined}
                            onClick={this.handleVideoMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="video-menu"
                            anchorEl={videoMenuAnchor}
                            open={videoMenuOpen}
                            onClose={this.handleVideoMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'video-options',
                            }}
                        >
                            <MenuItem onClick={this.saveThisVideo}>Save Video</MenuItem>
                        </Menu></>
                        : <></>}
                    </VideoContent>
                </CardContent>
            </Card>
        );
    }
}

const getFormattedDurationString = (duration) => {
    let formattedDuration = moment.duration(duration).asSeconds()
    formattedDuration = moment.utc(formattedDuration * 1000).format('mm:ss')
    // remove leading '0'
    formattedDuration =
        formattedDuration[0] === '0'
            ? formattedDuration.slice(1)
            : formattedDuration
    return formattedDuration
}

const VideoLength = styled(Typography)(({ theme }) => ({
    width: 'fit-content',
    color: 'white',
    position: 'relative',
    top: '-25px',
    left: '85%',
    borderRadius: '2px',
    fontSize: '12px',
    padding: '1px 4px',
    backgroundColor: 'black'
}));

const Card = styled(MuiCard)(({ theme }) => ({
    border: 'none',
    boxShadow: 'none',
    borderRadius: 0,
    cursor: 'pointer'
}));

const VideoContent = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'start',
    paddingLeft: 0,
    '& >.MuiBox-root': {
        textAlign: 'left',
        paddingLeft: theme.spacing(1),
        height: '4rem',
        width: '80%'
    },
    '& h6': {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

const mapStateToProps = state => {
    return {
        videos: state.video
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveVideo: (video) => dispatch(saveVideo(video))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
