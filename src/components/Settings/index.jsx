import React from 'react';
import 'flag-icons/css/flag-icons.min.css';
import SlideSelect from '../SlideSelect';

function Settings({langs, setLang, lang, langID}) {
    return ( <>
        <div style={{margin: ".5em"}}>
            <span>{lang("settings.lang")} : </span>
            <SlideSelect buttons={langs.map(lang => ({
                text: <>{lang.icon}<span>{" "+lang.name}</span></>,
                onChange: () => setLang(lang.id)
            }))} defaultIndex={langs.findIndex(l => l.id == langID)} id="lang-select"/>
        </div>
    </> );
}

export default Settings;