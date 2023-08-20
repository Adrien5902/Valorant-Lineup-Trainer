import React from 'react';
import { LineupFilter } from './LineupFilter';

function Lineups({ maps, agents, lang, settings }) {
    return (
        <>
            <LineupFilter maps={maps} agents={agents} lang={lang} settings={settings}/>
        </>
    );
}
export default Lineups;
