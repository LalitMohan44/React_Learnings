import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPopularVideos } from '../redux';
import { styled } from '@mui/material/styles';
import VideoCard from '../components/Videos/VideoCard';
import Grid from '@mui/material/Grid';

function HomePage({popularVideos, fetchPopularVideos}) {
    useEffect(() => {
        fetchPopularVideos()
    }, [])
    return (
        <HomePageContainer>{
            popularVideos && popularVideos.loading ? (
                <h2>Loading...</h2>
            ) : popularVideos && popularVideos.error ? (
                <h2>Something went wrong</h2>
            ) : (
                <Grid container  spacing={2}>
                    {
                        popularVideos &&
                        popularVideos.videos &&
                        popularVideos.videos.items &&
                        popularVideos.videos.items.map((video) => 
                            <Grid item>
                                <VideoCard key={video.id} video={video} showVideoMenu={true}/>
                            </Grid>
                        )
                    }
                </Grid>
            )
        }</HomePageContainer>
    );
}

const HomePageContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(10),
    marginRight: theme.spacing(2)
}));

const mapStateToProps = state => {
    return {
        popularVideos: state.video
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPopularVideos: () => dispatch(fetchPopularVideos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

