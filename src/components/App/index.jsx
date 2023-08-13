import React from 'react';
import './style.css'
import { Header } from '../Header';
import { Route, Routes } from 'react-router-dom';
import UpdloadVideo from '../UpdloadVideo';
import LineupList from '../LineupList';

function App({}) {
    return (
        <div>
            <Header></Header>
            <div id='content'>
                <Routes>
                    <Route path='/index.html' element={<LineupList/>}/>
                    <Route path='/list' element={<LineupList/>}/>
                    <Route path='/upload' element={<UpdloadVideo/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
