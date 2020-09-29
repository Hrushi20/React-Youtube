import { useState } from 'react';
import { InputBase,Input,Drawer,Button,AppBar,Toolbar,CircularProgress } from '@material-ui/core'
import styles from './navbar.module.css';
import { Search } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

const navbar = (props) =>{
    return(
        <nav className={styles.Navbar}>
            <ul>
                <li className={styles.SearchBarContainer}>
                    <Input 
                    inputRef={props.searchRef}
                    className={styles.SearchBar} 
                    inputProps={{style:{fontSize:'1rem'}}} 
                    color='primary' 
                    type='text' 
                    placeholder='Search' 
                    label='Search' onChange={props.onChange}
                    onKeyPress={e=>e.charCode===13?props.getVideos(e,false):null}/>
                    <Search fontSize='default' onClick={e=>props.getVideos(e,true)} className={styles.MagnifyingGlass} color='primary'/>
                </li>
                {props.isLoadingOauth?<li className={styles.Auth}><CircularProgress color='primary' /></li>: <li className={styles.Auth}>
                    {props.isAuth?<Button color='primary' onClick={props.clicked} style={{marginLeft:20}}>Logout</Button>:<Button style={{marginLeft:20}} onClick={props.clicked} color='primary'>Sign In</Button>}
                    <MenuIcon onClick={props.onSideBarClick} color='primary' fontSize={'default'} className={styles.MenuIcon}/>
                </li>}
            </ul>
</nav>
    )
}

export default navbar;
{/* <nav className={styles.Navbar}>
<ul>
    <li className={styles.SearchBarContainer}>
        <Input 
        className={styles.SearchBar} 
        inputProps={{style:{fontSize:'1rem'}}} 
        color='primary' 
        type='text' 
        placeholder='Search' 
        label='Search' onChange={props.onChange}/>
        <i className='fa fa-search' aria-hidden='true'></i>
    </li>
    <li className={styles.Auth}>
        <i className='fa fa-bars' aria-hidden='true'></i>
        <Button>Sign In</Button>
    </li>
</ul>
</nav> */}