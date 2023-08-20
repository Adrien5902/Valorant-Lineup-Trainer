import React from 'react';
import 'flag-icons/css/flag-icons.min.css';
import SlideSelect from '../SlideSelect';
import AgentsSelect from '../CustomSelect/Agents';
import MapsSelect from '../CustomSelect/Maps';
import './style.css'

function Settings({langs, changeSetting, settings, lang, agents, maps}) {
    function changePreferences(key, value){
        const preferences = settings.preferences ?? {}
        preferences[key] = value
        changeSetting("preferences", preferences)
    }

    return ( <>
        <div style={{margin: ".5em"}}>
            <span>{lang("settings.lang")} : </span>
            <SlideSelect buttons={langs.map(l => ({
                text: <>{l.icon}<span>{" "+l.name}</span></>,
                onChange: () => changeSetting("lang", l.id)
            }))} defaultIndex={langs.findIndex(l => l.id == settings.lang)} id="lang-select"/>
        </div>
        <div>
            <h3>{lang("settings.preferences")} :</h3>
            <div id='preferences'>
                <div>
                    <span>{lang("valorant.agent")} : </span>
                    <AgentsSelect
                        agents={agents} 
                        id="agent-preferences" 
                        defaultId={settings.preferences?.agent}
                        onChange={(agent) => changePreferences("agent", agent.uuid)}
                    />
                </div>
                <div>
                    <span>{lang("valorant.map")} : </span>
                    <MapsSelect 
                        maps={maps} 
                        id="map-preferences" 
                        defaultId={settings.preferences?.map}
                        onChange={(map) => changePreferences("map", map.uuid)}
                    />
                </div>
            </div>
        </div>
    </> );
}

export default Settings;