import CustomSelect from "..";
import React from 'react';
import './style.css'

function AgentsSelect({agents, onChange, id, defaultId}) {
    agents = agents.sort((a, b) => {
        if (a.displayName < b.displayName) {
            return -1;
        }
        if (a.displayName > b.displayName) {
            return 1;
        }
        return 0;
    })

    let agentsOptions = agents.map((agent, i) => (<div className='agent-select' key={i}>
        <img draggable={false} src={agent.displayIcon} alt="" />
        <span>{agent.displayName}</span>
    </div>))

    return ( 
        <CustomSelect 
            id={id}
            options={agentsOptions}
            hover="zoom"
            onChange={(i) => onChange(agents[i])}
            defaultIndex={agents.findIndex(agent => agent.uuid == defaultId)}
        />
    );
}

export default AgentsSelect;