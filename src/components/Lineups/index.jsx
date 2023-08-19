import React from 'react';
import { LineupFilter } from './LineupFilter';

function Lineups({ maps, agents, lang}) {
    return (
        <>
            <LineupFilter maps={maps} agents={agents} lang={lang}/>
        </>
    );
}
export default Lineups;
