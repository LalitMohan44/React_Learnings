import { createTheme } from '@mui/material/styles';

export const VIDEOS_PER_REQUEST = 20;
export const YOUTUBE_API_KEY = 'AIzaSyAlsnzpRkprQe86VNlR6t1iz8RVugtBjxM';


export const APP_THEME = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#212121',
      dark: '#181818',
      darker: '#000000',
      light:  '#3d3d3d'
    },
    blue: {
      main: '#2196f3'
    },
    red: {
        main: '#FF0000',
    },
    white: {
        main: '#FFFFFF'
    }
  },
});

