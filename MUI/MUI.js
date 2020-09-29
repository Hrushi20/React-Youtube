import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary:{
            light:'#f2361f',
            main:'#c2322b',
            dark:'#7d1f14',
            contrastText:'#f0dcda',
        },
        secondary:{
            light:'#db091f',
            main:'#e09824',
            dark:'#6b1922',
            contrastText:'#000000'
        },
        safe:{
            color:'#2ae320'
        },
        danger:{
            primary:'#f51d0f',
        }
    }
})

export default theme;