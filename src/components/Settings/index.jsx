import React from 'react';
import 'flag-icons/css/flag-icons.min.css';
import SlideSelect from '../SlideSelect';

function Settings({langs, changeSetting, settings, lang}) {
    return ( <>
        <div style={{margin: ".5em"}}>
            <span>{lang("settings.lang")} : </span>
            <SlideSelect buttons={langs.map(l => ({
                text: <>{l.icon}<span>{" "+l.name}</span></>,
                onChange: () => changeSetting("lang", l.id)
            }))} defaultIndex={langs.findIndex(l => l.id == settings.lang)} id="lang-select"/>
        </div>
        <div>
            <h3>Préférences :</h3>
            <div>
                
            </div>
        </div>
    </> );
}

export default Settings;