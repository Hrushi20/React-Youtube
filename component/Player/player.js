import { useState,useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring,animated,config } from 'react-spring';
import styles from './player.module.css';
const player = prop =>{
    const [previosId,setPreviosId] = useState('');
    const [ closeGesture,setCloseGesture ] = useState(false);
    const [ props,set ] = useSpring(()=>({
        y:[0,0],
        config: closeGesture?config.stiff:config.gentle
    }));
   
    useEffect(()=>{
        setPreviosId(prop.videoId);
    },[])
    useEffect(()=>{
        setCloseGesture(false);
    },[prop.videoId]);
    const bind = useDrag(state=>{
        console.log(state.movement[1]);
        if(state.velocity>2.4){
            setCloseGesture(true);
            prop.clearVideoId()
        }else if(state.velocity<3.5 && state.dragging && state.movement[1]>0){
            set({y:[state.movement[1]]});
        }else if(state.velocity<3.5 && !state.dragging){
            set({y:[0]});
        }
    });
    console.log(props.y)
    return(            
        <animated.div {...bind()} className={styles.Box} style={{...props.config,transform:!closeGesture?props.y.interpolate(y=>`translateY(${y}px)`):'translateY(100vh)'}}>
            {prop.searchType?<iframe {...bind()} className={styles.Iframe} allowFullScreen={true} src={`https://www.youtube.com/embed/${prop.videoId}`}></iframe>:
            <div>
            </div>}
        </animated.div>
    )
}

export default player;