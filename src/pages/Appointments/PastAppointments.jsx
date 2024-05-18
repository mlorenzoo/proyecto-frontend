import React, { useContext, useEffect, useState } from 'react';
import { Table, Alert, Container } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import useServicesContext from '../../hooks/useServicesContext';

export const PastAppointments = () => {
  const { authToken, profile } = useContext(UserContext);
  const { userService, bsService } = useServicesContext();
  const [appointments, setAppointments] = useState([]);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!authToken) return;

    const fetchData = async () => {
      try {
        const clientData = await userService.getClient(profile.id);
        const appointmentsData = await bsService.showAppointments(clientData);
        setSuccess(appointmentsData.success);

        if (appointmentsData.success) {
          setAppointments(appointmentsData.appointments.filter(appointment => appointment.state !== 'programada'));
        }
      } catch (error) {
        console.error(error.message);
        alert("ERROR cargando reservas pasadas... :-(");
      }
    };

    fetchData();

  }, [authToken, profile.id, userService, bsService]);

  useEffect(() => {
    if (profile.role === 'Barbero') {
      fetchBarberAppointments();
    }
  }, [profile.role]);

  const fetchBarberAppointments = async () => {
    try {
      const barberData = await userService.getOneById(profile.id);
      if (barberData && barberData.barber && barberData.barber.id) {
        const barberAppointmentsData = await bsService.showBarberApp(barberData.barber.id);
        setSuccess(barberAppointmentsData.success);

        if (barberAppointmentsData.success) {
          setAppointments(barberAppointmentsData.appointments.filter(appointment => appointment.state !== 'programada'));
        }
      }
    } catch (error) {
      console.error(error.message);
      alert("ERROR cargando reservas pasadas del barbero... :-(");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  const formatState = (state) => {
    return state.charAt(0).toUpperCase() + state.slice(1);
  };

  return (
    <Container className='mt-5 d-flex justify-content-center'>
      <div>
        <h2>Reservas pasadas</h2>
        {success === false && (
          <Alert variant="info" className="w-75 mt-3">
            No tienes reservas pasadas.
          </Alert>
        )}
        {success === true && appointments.length === 0 ? (
          <Alert variant="info" className="w-75 mt-3">
            No tienes reservas pasadas.
          </Alert>
        ) : (
          success === true && (
            <Table className="w-75 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.hour}</td>
                    <td>{formatState(appointment.state)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </div>
    </Container>
  );
};
