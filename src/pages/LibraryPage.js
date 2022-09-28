import React, { Component } from 'react';
import VideoCard from '../components/Videos/VideoCard';
import Grid from '@mui/material/Grid';

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
            
            <Grid container  spacing={2} sx={{paddingLeft: 10, paddingTop: 10}}>
                    {
                        savedVideos &&
                        savedVideos.map((video) => 
                            <Grid item>
                                <VideoCard key={video.id} video={video}  showVideoMenu={false}/>
                            </Grid>
                        )
                    }
            </Grid>
        );
    }
}

export default LibraryPage;