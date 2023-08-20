import React, { useEffect, useState } from 'react';
import './style.css'
import { Header } from '../Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import UpdloadVideo from '../UpdloadVideo';
import Loading from '../Loading';
import Lineups from '../Lineups';
import Settings from '../Settings';

const {ipcRenderer} = window.require("electron")

import langfrFR from '/assets/lang/fr-FR.json';
import langenUS from '/assets/lang/en-US.json';

const langs = [
    {
        id: "fr-FR",
        name: "Français",
        icon: <i className='fi fi-fr'></i>,
        data: langfrFR,
    },
    {
        id: "en-US",
        name: "English",
        icon: <i className='fi fi-us'></i>,
        data: langenUS,
    }
]

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function fetchDataObject(requests) {
    const fetchData = async () => {
    const responsePromises = Object.values(requests).map(request => {
        if(Array.isArray(request)){
            return fetch(...request)
        }else{
            return fetch(request, {headers: {'Access-Control-Allow-Origin': '*'}})
        }
    });
      
        try {
            const responses = await Promise.all(responsePromises);
            const results = await Promise.all(responses.map(response => response.json()));
    
            const data = {};
            Object.keys(requests).forEach((key, index) => {
                data[key] = results[index];
            });
    
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
  
    return fetchData();
}

const defaultSettings = {
    lang: "fr-FR"
}

function App({}) {
    const [settings, setSettings] = useState(defaultSettings)
    /**
     * @param {string} setting 
     * @param {any} value 
     */
    function changeSetting(setting, value){
        let temp = JSON.parse(JSON.stringify(settings))
        temp[setting] = value
        setSettings(temp)
        ipcRenderer.sendSync("saveSettings", temp)
    }

    const [data, setData] = useState({})
    const [valorantStatus, setValorantStatus] = useState(null)
    const locale = langs.find(({id}) => id == settings.lang).data
    function lang(path){
        return Object.byString(locale, path)
    }

    ipcRenderer.on("valorantStatus", (e, status) => {
        if(status != valorantStatus) setValorantStatus(status)
    })

    useEffect(()=>{
        const sett = ipcRenderer.sendSync("readSettings")
        setSettings(sett ?? defaultSettings)

        const requests = {
            agents: "https://valorant-api.com/v1/agents?isPlayableCharacter=true&lang="+lang,
            maps: "https://valorant-api.com/v1/maps?lang="+lang
        }
        fetchDataObject(requests)
        .then(result => {
            if (result) {
                setData(result);
            }
        });
    }, []);

    return (
        <>
            {
            Object.values(data).length ? 

            <>
            <Header lang={lang}></Header>
            <div id='content'>
                <Routes>
                    <Route path='/index.html' element={<Navigate to={"/list"}/>}/>
                    <Route path='/list' element={<Lineups lang={lang} agents={data.agents.data} maps={data.maps.data}/>}/>
                    <Route path='/upload' element={<UpdloadVideo lang={lang}/>}/>
                    <Route path='/settings' element={<Settings settings={settings} changeSetting={changeSetting} langs={langs} lang={lang}/>}/>
                </Routes>
            </div>
            </>

            : <Loading></Loading>
            }
        </>
    );
}

export default App;
