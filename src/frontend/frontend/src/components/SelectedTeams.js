import React from 'react';
import './SelectedTeams.css';

const SelectedTeams = ({ selectedTeams, onRemove }) => {
    return (
        <div className="selected-teams">
            {selectedTeams.length === 0 ? (
                <p>No hay equipos seleccionados.</p>
            ) : (
                selectedTeams.map((team) => (
                    <div key={team.name} className="team-card">
                        <img src={team.logo} alt={`${team.name} logo`} width={50} />
                        <div>
                            <p>{team.name} ({team.country})</p>
                            <button onClick={() => onRemove(team)}>Eliminar</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SelectedTeams;
