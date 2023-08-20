import React, { useEffect } from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGear, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export function Header({ lang }) {
    useEffect(() => {
        const appTitleContainer = document.getElementById('app-title-container');
        const appTitle = document.getElementById('app-title');
        const appTitleReduced = document.getElementById('app-title-reduced');
    
        function checkOverflow() {
            console.log(appTitle.offsetWidth > appTitleContainer.offsetWidth)
            if (appTitle.offsetWidth > appTitleContainer.offsetWidth) {
                appTitleReduced.style.visibility = "visible"
                appTitle.style.visibility = "hidden"
            } else {
                appTitleReduced.style.visibility = "hidden"
                appTitle.style.visibility = "visible"
            }
        }
    
        window.addEventListener('resize', checkOverflow);
        checkOverflow();
  
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);

    return (
        <header>
            <div id='app-title-container'>
                <span id='app-title'>Valorant Lineup Trainer</span>
                <span id='app-title-reduced'>VLT</span>
            </div>
            <div style={{
                display: "flex",
                height: "inherit",
            }}>
                <Link
                    to='/list'
                    className={useLocation().pathname == "" ? "selected" : ""}
                >
                    <span><FontAwesomeIcon icon={faListUl}/> {lang("header.lineups")}</span>
                </Link>
                <Link
                    to='/learn'
                    className={useLocation().pathname == "" ? "selected" : ""}
                >
                    <span><FontAwesomeIcon icon={faBook} /> {lang("header.learn")}</span>
                </Link>
                <Link
                    to='/upload'
                    className={useLocation().pathname == "" ? "selected" : ""}
                >
                    <span><FontAwesomeIcon icon={faPlus}/> {lang("header.uploadVideo")}</span>
                </Link>
                <Link
                    to='/settings'
                    className={useLocation().pathname == "" ? "selected" : ""}
                >
                    <span><FontAwesomeIcon icon={faGear}/> {lang("header.settings")}</span>
                </Link>
            </div>
        </header>
    );
}
export default Header;
