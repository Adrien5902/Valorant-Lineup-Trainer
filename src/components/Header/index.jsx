import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGear, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export function Header({ lang }) {
    return (
        <header>
            <span className='app-title'>Valorant Lineup Trainer</span>
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
