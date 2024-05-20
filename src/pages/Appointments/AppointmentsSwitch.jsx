import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { PastAppointments } from './PastAppointments';
import { UpcomingAppointments } from './UpcomingAppointments';

const AppointmentsSwitch = () => {
    const [selectedOption, setSelectedOption] = useState(1);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center mt-5 switch">
                <ToggleButtonGroup type="radio" name="options" value={selectedOption}>
                    <ToggleButton 
                        id="tbg-radio-1" 
                        value={1} 
                        onChange={() => handleOptionChange(1)}
                        variant="light"
                        className='switch'
                    >
                        Próximas reservas
                    </ToggleButton>
                    <ToggleButton 
                        id="tbg-radio-2" 
                        value={2} 
                        onChange={() => handleOptionChange(2)}
                        variant="light"
                        className='switch'
                    >
                        Reservas pasadas
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="text-center">
                {selectedOption === 1 ? <UpcomingAppointments /> : <PastAppointments />}
            </div>
        </Layout>
    );
};

export default AppointmentsSwitch;
