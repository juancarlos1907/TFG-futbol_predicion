import React from 'react';
import { useTranslation } from 'react-i18next';


const Dropdown = ({ country, teams, selectedTeams, onSelect }) => {
    const { t } = useTranslation();

    const handleChange = (event) => {
        const selectedTeamName = event.target.value;
        const selectedTeam = teams.find(team => team.name === selectedTeamName);
        if (selectedTeam) {
            onSelect(selectedTeam);
        }
    };

    return (
        <div className="dropdown">
            <label htmlFor={`dropdown-${country}`}>{country}</label>
            <select
                id={`dropdown-${country}`}
                onChange={handleChange}
                disabled={selectedTeams.length >= 2}
            >
                <option value="">{t('selectTeam')}</option>
                {teams.map(team => (
                    <option
                        key={team.name}
                        value={team.name}
                        disabled={selectedTeams.some(t => t.name === team.name)}
                    >
                        {team.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
