import { Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core'
import styles from './tiles.module.css';

const tiles = (props) => {
    return(
        <Card ref ={props.reference} raised={true} className={styles.Tile}>
            <CardActionArea style={{width:'100%',height:'12.33rem'}}>
                <CardMedia image={props.result.snippet.thumbnails.high.url} className={styles.TileImage}/>
            </CardActionArea>
            <CardContent style={{marginBottom:'50px'}}>
                <Typography style={{fontSize:'1rem'}} align='left' display='block' variant='h6'>
                    {props.result.snippet.title}
                </Typography>
            </CardContent>
            <CardActions className={styles.ButtonContainer}>
                <Button color='primary' onClick={()=>props.openVideoPlayer(props.videoId)}>{props.searchType==='video'?'Play Now':'View'}</Button>
            </CardActions>
        </Card>
        
    )
}
export default tiles;