import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CustomSelect from '../../CustomSelect';
import SlideSelect from '../../SlideSelect';

/**
 * 
 * @param {{
 *      maps: any[]
 *      agents: any[]
 * }} param0 
 * @returns 
 */

export function LineupFilter({ maps, search, lang}) {
    maps = maps.sort((a, b) => {
        if (a.displayName < b.displayName) {
            return -1;
        }
        if (a.displayName > b.displayName) {
            return 1;
        }
        return 0;
    })

    let mapsOptions = maps.map((map, i) => (<div className='map-select' key={i}>
        <img draggable={false} src={map.listViewIcon} alt="" />
        <span>{map.displayName}</span>
    </div>))

    return (
        <div id='lineups-filter'>
            <div id='lineups-filter-search'>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input placeholder={lang("lineupList.filter.search")+'...'} type="text" id="lineups-filter-search-input" onChange={e => search(e.target.value)}/>
            </div>
            
            <CustomSelect 
                id="map-filter"
                options={mapsOptions}
                hover="zoom"
            />
            
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
