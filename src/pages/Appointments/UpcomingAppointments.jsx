import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useServicesContext from '../../hooks/useServicesContext';

export const UpcomingAppointments = () => {
  const { authToken, profile } = useContext(UserContext);
  const { userService, bsService } = useServicesContext();
  const [clientId, setClientId] = useState(null);
  const [barberId, setBarberId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/unauthorized');
      return;
    }

    (async () => {
      try {
        const clientData = await userService.getClient(profile.id);
        setClientId(clientData);

        const appointmentsData = await bsService.showAppointments(clientData);
        setSuccess(appointmentsData.success);

        if (profile.role === 'Cliente') {
          if (appointmentsData.success) {
            setAppointments(appointmentsData.appointments);
          }
        } else if (profile.role === 'Barbero') {
          const barberData = await userService.getOneById(profile.id);
          if (barberData && barberData.barber && barberData.barber.id) {
            setBarberId(barberData.barber.id);
            const barberAppointments = await bsService.showBarberApp(barberId);
            setSuccess(barberAppointments.success);
            if (barberAppointments.success) {
              setAppointments(barberAppointments.appointments);
            }
          }
        }
      } catch (error) {
        console.error(error.message);
        alert("ERROR cargando barbería... :-(");
      }
    })();
  }, [authToken, profile.id, profile.role, userService, bsService, navigate, barberId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const handleCancel = (appointmentId) => {
    const cancelar = bsService.cancelarApp(appointmentId);
    alert("Cita cancelada con éxito")
    console.log(`Cancel appointment with id: ${appointmentId}`);
  };

  const handleConfirm = (appointmentId) => {
    const completar = bsService.completarApp(appointmentId);
    alert("Cita completada")
    console.log(`Confirm appointment with id: ${appointmentId}`);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2>Reservas programadas</h2>
      {success === false && (
        <Alert variant="info" className="w-75 mt-3">
          No tienes citas pendientes.
        </Alert>
      )}
      {success === true && appointments.length === 0 ? (
        <Alert variant="info" className="w-75 mt-3">
          No tienes reservas programadas.
        </Alert>
      ) : (
        success === true && (
          <Table className="w-75 mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {appointments.filter(appointment => appointment.state === 'programada').map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.hour}</td>
                  <td>
                    {profile.role === 'Cliente' ? (
                      <Button variant="danger" onClick={() => handleCancel(appointment.id)}>Cancelar</Button>
                    ) : (
                      <Button variant="success" onClick={() => handleConfirm(appointment.id)}>Completada</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
};
