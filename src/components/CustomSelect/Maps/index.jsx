import CustomSelect from "..";
import './style.css'
import React from 'react';

function MapsSelect({maps, onChange, id, defaultId}) {
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
        <CustomSelect 
            id={id}
            options={mapsOptions}
            hover="zoom"
            defaultIndex={maps.findIndex(map => map.uuid == defaultId)}
            onChange={(index) => onChange(maps[index])}
        />
    );
}

export default MapsSelect;