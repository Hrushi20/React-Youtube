import { ThemeProvider } from '@material-ui/core';
import theme from '../MUI/MUI';
import Head from 'next/head';
import '../globalStyles.css';

export default function MyApp(props){
    const { Component,pageProps } = props;
    return(
        <React.Fragment>
            <Head>
                <script src='https://apis.google.com/js/client.js'></script>
                <script src="https://use.fontawesome.com/62d7a25455.js"></script>
                <script src='https://www.youtube.com/iframe_api'></script>
            </Head>
            <ThemeProvider theme={theme}> 
                <Component {...pageProps}/>
            </ThemeProvider>
        </React.Fragment>
    )
}