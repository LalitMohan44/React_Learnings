import React, { Component } from 'react';
import VideoCard from '../components/Videos/VideoCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

class LibraryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storedValues: JSON.parse(localStorage.getItem('persist:root'))
            
        }
    }
    render() {
        const { storedValues } = this.state;
        let savedVideos;
        if (storedValues && storedValues.video) {
            let videos = JSON.parse(storedValues.video);
            savedVideos = videos.savedVideos
        }
        return (
            <>
            {
                savedVideos && savedVideos.length
                ? 
                    <Grid container  spacing={2} sx={{paddingLeft: 10, paddingTop: 10}}>
                    {
                        savedVideos.map((video) => 
                            <Grid item>
                                <VideoCard key={video.id} video={video}  showVideoMenu={false}/>
                            </Grid>
                        )
                    }
            </Grid>
                : <Typography variant="h5" sx={{paddingTop: 10 }}>Saved Videos will come up here.</Typography>
            }
            </>
        );
    }
}

export default LibraryPage;