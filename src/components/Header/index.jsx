import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export function Header({ }) {
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
                    <span><FontAwesomeIcon icon={faListUl}/> Lineups</span>
                </Link>
                <Link
                    to='/upload'
                    className={useLocation().pathname == "" ? "selected" : ""}
                >
                    <span><FontAwesomeIcon icon={faPlus}/> Upload Video</span>
                </Link>
            </div>
        </header>
    );
}
export default Header;
