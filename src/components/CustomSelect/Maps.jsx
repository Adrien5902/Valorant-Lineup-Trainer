import CustomSelect from ".";

function MapsSelect({agents, onChange, id}) {
    let agentsOptions = agents.map((agent, i) => (<div className='agent-select' key={i}>
        <img draggable={false} src={agent.displayIcon} alt="" />
        <span>{agent.displayName}</span>
    </div>))

    return ( 
        <CustomSelect 
            id={id}
            options={agentsOptions}
            hover="zoom"
            onChange={onChange}
        />
    );
}

export default MapsSelect;