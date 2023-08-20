import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SlideSelect from '../../SlideSelect';
import AgentsSelect from '../../CustomSelect/Agents';
import MapsSelect from '../../CustomSelect/Maps';

/**
 * 
 * @param {{
 *      maps: any[]
 *      agents: any[]
 * }} param0 
 * @returns 
 */

export function LineupFilter({ agents, maps, search, lang, settings }) {
    return (
        <div id='lineups-filter'>
            <div id='lineups-filter-search'>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input placeholder={lang("lineupList.filter.search")+'...'} type="text" id="lineups-filter-search-input" onChange={e => search(e.target.value)}/>
            </div>
            
            <MapsSelect maps={maps} id="map-filter" defaultId={settings.preferences?.map}/>
            <AgentsSelect id="agent-filter" agents={agents} defaultId={settings.preferences?.agent}/>
            
            <SlideSelect 
                id="side-select"
                defaultIndex={2}
                buttons={[
                    {
                        text: lang("valorant.sides.attack")
                    },
                    {
                        text: lang("valorant.sides.defense")
                    },
                    {
                        text: lang("lineupList.filter.bothSides")
                    },
                ]}
            />
        </div>
    );
}
export default LineupFilter;
