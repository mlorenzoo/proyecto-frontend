import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Logger from '../../library/Logger';
import useServicesContext from '../../hooks/useServicesContext';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Table } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function BarbershopView() {
  Logger.debug("BarbershopView page");

  const { id } = useParams();
  const { bsService } = useServicesContext();
  const { authToken, profile } = useContext(UserContext);
  const navigate = useNavigate();

  const [barbershop, setBarbershop] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (!authToken) {
      navigate('/unauthorized');
      return;
    }

    (async () => {
      try {
        const barbershopData = await bsService.getBarbershopById(id);
        setBarbershop(barbershopData);

        const barbersData = await bsService.getBarbers();
        setBarbers(Array.isArray(barbersData.data) ? barbersData.data : []);
      } catch (error) {
        Logger.error(error.message);
        alert("ERROR cargando barbería... :-(");
      }
    })();
  }, [id, authToken, bsService, navigate]);

  const handleBarberSelection = async (barberId) => {
    setSelectedBarber(barberId);
    setShowCalendar(true);
  };

  const handleDateSelection = async (date) => {
    setSelectedDate(date);
  
    if (selectedBarber) {
      console.log(selectedDate)
      try {
        const response = await bsService.getAvailableAppointments(selectedBarber, date.toLocaleDateString('en-CA').replace(/-/g, '/'));
        console.log(response)
        setAvailableAppointments(Array.isArray(response) ? response : []);
      } catch (error) {
        Logger.error(error);
        alert("ERROR cargando citas disponibles... :-(");
      }
    }
  };  

  const handleAddBarber = async (barberId) => {
    try {
      await bsService.addBarberToBarbershop(barberId, barbershop.id);
      // Actualiza la lista de barberos después de añadir uno nuevo
      const updatedBarbers = await bsService.getBarbers();
      setBarbers(Array.isArray(updatedBarbers.data) ? updatedBarbers.data : []);
    } catch (error) {
      Logger.error(error.message);
      alert("ERROR añadiendo barbero... :-(");
    }
  };

  const handleDeleteBarber = async (barberId) => {
    try {
      await bsService.quitBarber(barberId);
      // Actualiza la lista de barberos después de eliminar uno
      const updatedBarbers = await bsService.getBarbers();
      setBarbers(Array.isArray(updatedBarbers.data) ? updatedBarbers.data : []);
    } catch (error) {
      Logger.error(error.message);
      alert("ERROR eliminando barbero... :-(");
    }
  };

  return (
    <Layout>
      <section id="barbershop" className="w-75 m-auto">
        {barbershop ? (
          <>
            <h2 className="mt-4 mb-5 text-center">{barbershop.name}</h2>
            <div className="row">
              {profile && (profile.role === "Cliente" || profile.role === "Admin") ? (
                <div className="col-md-6">
                  <h3>Seleccionar barbero</h3>
                  <p>Selecciona un barbero:</p>
                  {barbers
                    .filter(barber => barber.barbershop_id === barbershop.id)
                    .map((barber) => (
                      <Button
                        key={barber.id}
                        variant={selectedBarber === barber.id ? "primary" : "secondary"}
                        onClick={() => handleBarberSelection(barber.id)}
                        className="mr-2 mb-2"
                      >
                        {barber.user.name} {barber.user.surname}
                      </Button>
                    ))}
                </div>
              ) : profile && profile.role === "Barbero" ? (
                <div className="col-md-6">
                  <h3>Barberos</h3>
                  <p>Barberos en plantilla:</p>
                  <Table className='mb-5' striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {barbers.map((barber, index) => {
                        if (barber.barbershop_id === barbershop.id) {
                          return (
                            <tr key={index}>
                              <td>{barber.id}</td>
                              <td>{barber.user.name}</td>
                              <td>{barber.user.surname}</td>
                              <td>{barber.user.email}</td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <>
                  <div className="col-md-6">
                    <h3>Barberos</h3>
                    <p>Barberos en plantilla:</p>
                    <Table className='mb-5' striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {barbers.map((barber, index) => {
                          if (barber.barbershop_id === barbershop.id) {
                            return (
                              <tr key={index}>
                                <td>{barber.id}</td>
                                <td>{barber.user.name}</td>
                                <td>{barber.user.surname}</td>
                                <td>{barber.user.email}</td>
                                <td>
                                  <Button variant="danger" onClick={() => handleDeleteBarber(barber.id)}>Eliminar</Button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <div className="col-md-6">
                    <h3>Barberos disponibles</h3>
                    <p>Estos son los barberos que no están asignados a ninguna barbería:</p>
                    <Table className='mb-5' striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {barbers.map((barber, index) => {
                          if (barber.barbershop_id === null) {
                            return (
                              <tr key={index}>
                                <td>{barber.id}</td>
                                <td>{barber.user.name}</td>
                                <td>{barber.user.surname}</td>
                                <td>{barber.user.email}</td>
                                <td>
                                  <Button variant="success" onClick={() => handleAddBarber(barber.id)}>Asignar</Button>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
              {profile && profile.role === "Cliente" && showCalendar && (
                <div className="col-md-6">
                  <h3>Calendario</h3>
                  <p>Selecciona una fecha:</p>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => handleDateSelection(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              )}
              {profile && profile.role === "Cliente" && availableAppointments.length > 0 && (
                <div className="row mt-4">
                  <div className="col-md-12">
                    <h3>Citas disponibles</h3>
                    <div className="d-flex flex-wrap">
                      {availableAppointments.map((appointment, index) => (
                        <Button
                          key={index}
                          variant="primary"
                          className="mr-2 mb-2"
                          onClick={() => handleAppointmentSelection(appointment)}
                        >
                          {appointment}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h3>Dirección</h3>
                <p>{barbershop.ubication}</p>
                <MapContainer center={[barbershop.lat, barbershop.lon]} zoom={14} style={{ height: "400px", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[barbershop.lat, barbershop.lon]}>
                    <Popup>
                      {barbershop.name}<br />
                      {barbershop.ubication}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </>
        ) : (
          <p>Cargando barbería...</p>
        )}
      </section>
    </Layout>
  );
}
