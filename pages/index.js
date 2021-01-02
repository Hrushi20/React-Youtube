import { Button, Typography } from '@material-ui/core';
import { ChildCare, ClosedCaption, LiveTv, Videocam } from '@material-ui/icons'
import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import Navbar from '../component/navbar';
import Player from '../component/Player/player';
import Tile from '../component/Video_Tiles/tiles';

const API_KEY = 'AIzaSyBw3HhnDGgOEpkys04Fs_6kH2PSgKZZULE';
const CLIENT_ID = '462968654783-hdk7r211vefr2id4sugfs3pk179aetpa.apps.googleusercontent.com';
export let GoogleAuth;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [auth, setAuth] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingOauth, setLoadingOauth] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [searchType, setSearchType] = useState('video');
  const [kidsMode, setKidsMode] = useState(false);
  const [closedCaption, setCloseCaption] = useState(false);
  const [paginationToken, setPaginationToken] = useState('CBQQAA');
  // const lastTileRef = useRef(null);
  // const lastTileRefCallback = useCallback(node => {
  //   if (lastTileRefCallback.current) lastTileRefCallback.current.disconnect();
  //   lastTileRefCallback.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting) {
  //       console.log("INTERSECTION OBSERVER", paginationToken)
  //       gapi.client.youtube.search.list({
  //         "part": [
  //           "snippet"
  //         ],
  //         "pageToken": paginationToken
  //       }).then(response => {
  //         // Handle the results here (response.result has the parsed body).
  //         console.log("Response", response.result);
  //         const prevArr = searchResult;
  //         const updatedArr = prevArr.concat(response.result.items);
  //         setSearchResult(updatedArr);
  //         setPaginationToken(response.result.nextPageToken);
  //         setSearch('');
  //       }).catch(err => console.log('Failed to fetch data', err))
  //       console.log('Visible')
  //     }
  //   })
  //   if (node) lastTileRefCallback.current.observe(node);
  // }, [])

  useEffect(() => {
    if (!GoogleAuth) {
      loadYoutubeApi();
    }
  }, []);

  const loadYoutubeApi = useCallback(() => {
    setLoadingOauth(true);
    let SCOPE = 'https://www.googleapis.com/auth/youtube';
    let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'discoveryDocs': [discoveryUrl],
      'scope': SCOPE
    }).then(() => {
      // GoogleAuth = gapi.auth2.getAuthInstance();
      setLoadingOauth(false);
      console.log(gapi.auth2.getAuthInstance());
      //Listen signIn in state change;
      gapi.auth2.getAuthInstance().isSignedIn.listen(updatedSignInStatus);
      //Handle initial sign in state;
      updatedSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
  }, [])

  const updatedSignInStatus = useCallback((signIn) => {
    setAuth(signIn);
  }, []);
  const authBtn = () => {
    if (auth) {
      gapi.auth2.getAuthInstance().signOut();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }
  const getVideos = useCallback((e, clicked) => {
    const prevResult = searchResult;
    if (e.charCode === 13 || clicked) {
      gapi.client.youtube.search.list({
        "part": [
          "snippet"
        ],
        "type": [
          searchType
        ],
        ...(searchType === 'video' && { "videoCaption": closedCaption ? "closedCaption" : "none" }),
        ...(searchType === "video" && { "order": "viewCount" }),
        ...(paginationToken && { "pageToken": paginationToken }),
        "maxResults": 20,
        "q": search,
        ...(searchType === 'video' && { "safeSearch": kidsMode ? 'strict' : 'none' })
      }).then(response => {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response.result);
        setSearchResult(searchResult.concat(response.result.items));
        setPaginationToken(response.result.nextPageToken);
        setSearch('');
      }).catch(err => console.log('Failed to fetch data', err))
    }
  }, [searchType, closedCaption, search, kidsMode])
  const openVideoPlayer = (vId) => {
    console.log(vId)
    setVideoId(vId);
  }
  const clearVideoId = () => {
    setVideoId('');
  }
  const openSideBar = () => {
    setSideBar(true)
  }
  const sideBarContent = () => (
    <div role='presentation' onClick={() => setSideBar(false)}>
      <List>
        {[{ name: 'Search by Video', icon: <Videocam />, type: 'video' }, { name: 'Search by Channel', icon: <LiveTv />, type: 'channel' }].map(option =>
          <Button color='primary' key={option.type} style={{ display: 'block', width: '100%' }} onClick={() => { setSearchType(option.type); setSearch(null); setSearchResult([]) }}>
            <ListItem style={{ cursor: 'pointer' }}><ListItemIcon>{option.icon}</ListItemIcon><ListItemText primary={option.name} /></ListItem>
          </Button>
        )}
      </List>
      <List>
        {[{ name: 'Search by captions', icon: <ClosedCaption />, type: 'caption' }, { name: 'Kids Mode', icon: <ChildCare />, type: 'safemode' }].map(option =>
          <Button color='primary' key={option.type} style={{ display: 'block', width: '100%' }} onClick={() => option.type !== 'caption' ? setKidsMode(!kidsMode) : setCloseCaption(!closedCaption)}>
            <ListItem style={{ cursor: 'pointer' }}><ListItemIcon>{option.icon}</ListItemIcon><ListItemText primary={option.name} /></ListItem>
          </Button>
        )}
      </List>
    </div>
  )
  const onSearchChangeHandler = e => {
    setSearch(e.target.value);
    setSearchResult([]);
  }
  console.log(paginationToken);
  return (
    <>
      <Head>
        <title>NeuTube</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div style={{ position: 'relative', height: '100vh', overflow: videoId ? 'hidden' : 'scroll' }}>
        <Navbar onSideBarClick={() => openSideBar()} isLoadingOauth={loadingOauth} getVideos={getVideos} clicked={authBtn} onChange={(e) => onSearchChangeHandler(e)} isAuth={auth} />
        <SwipeableDrawer color='primary' anchor='right' disableDiscovery={true} open={sideBar} onOpen={() => openSideBar()} onClose={() => setSideBar(false)}>
          {sideBarContent()}
        </SwipeableDrawer>
        {videoId ? <Player searchType={searchType} videoId={videoId} clearVideoId={clearVideoId} /> : null}
        <div style={{ marginTop: 55, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>{searchResult ? searchResult.map((result, i) => {
          // if (i < searchResult.length - 1) {
          return <Tile searchType={searchType} key={i} result={result} openVideoPlayer={openVideoPlayer} />
          // }
          // else {
          // return <div ref={lastTileRefCallback}><Tile reference={lastTileRef} searchType={searchType} key={i} result={result} openVideoPlayer={openVideoPlayer} /></div>
          // }
        })
          : <Typography style={{ marginTop: 65 }} color='primary' variant='h4'>Search to find {searchType ? 'videos' : 'channels'}</Typography>}</div>
      </div>
    </>
  )
};
