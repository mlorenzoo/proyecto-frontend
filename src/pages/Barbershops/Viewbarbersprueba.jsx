import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import Logger from '../../library/Logger';
import useServicesContext from '../../hooks/useServicesContext';
import { useState, useEffect } from 'react';
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
  const { bsService, userService } = useServicesContext();
  const [barbershop, setBarbershop] = useState(null);
  const [barbers, setBarbers] = useState(null);
	const navigate = useNavigate()
  const { authToken, user, profile, setProfile  } = useContext(UserContext)
  const [selectedDay, setSelectedDay] = useState(new Date()); 


  useEffect(() => {
    if (!authToken) {
      navigate('/unauthorized');
    }
    
    (async () => {
      try {
        const barbershopData = await bsService.getBarbershopById(id);
        setBarbershop(barbershopData);

        const barbersData = await bsService.getBarbers();
        setBarbers(barbersData.data);

        const userData = await userService.getOne(authToken);
        setProfile(userData.user);
      } catch (error) {
        Logger.error(error.message);
        alert("ERROR cargando barbería... :-(");
      }
    })();
  }, [id]);

  const handleDeleteBarber = async (barberId) => {
    try {
      await bsService.quitBarber(barberId);
      window.location.reload();
    } catch (error) {
      Logger.error(error.message);
      alert(error);
      console.log(error);
    }
  };

  const handleAddBarber = async (barberId) => {
    try {
      await bsService.addBarberToBarbershop(barberId, barbershop.id);
      window.location.reload();
    } catch (error) {
      Logger.error(error.message);
    }
  };

  const handleDayChange = (date) => {
    setSelectedDay(date);
  };
  
const isDayAvailable = () => {
  if (selectedDay && barbershop && barbers) {
    const barber = barbers.find(b => b.barbershop_id === barbershop.id);
    if (barber && barber.schedules) {
      // Obtener el día de la semana en el formato de barber_schedules (1 para Lunes, 7 para Domingo)
      const dayOfWeek = selectedDay.getDay() === 0 ? 7 : selectedDay.getDay(); // Convertir Domingo (0) a 7
      
      // Verificar si hay algún horario para el día seleccionado
      return barber.schedules.some(schedule => schedule.day_of_week === dayOfWeek);
    }
  }
  return false;
};

 
  return (
    <Layout>
      <section id="barbershop" className="w-75 m-auto">
        {barbershop ? (
          <>
            <h2 className="mt-4 mb-5 text-center">{barbershop.name}</h2>
            <div className="row">
              {profile && profile.role === "Gestor" ? (
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
                      {barbers && barbers.map((barber, index) => {
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
                  <p>Barberos disponibles:</p>
                  <Table striped bordered hover>
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
                      {barbers && barbers.map((barber, index) => {
                        if (barber.barbershop_id === null) {
                          return (
                            <tr key={index}>
                              <td>{barber.id}</td>
                              <td>{barber.user.name}</td>
                              <td>{barber.user.surname}</td>
                              <td>{barber.user.email}</td>
                              <td>
                                <Button variant="success" onClick={() => handleAddBarber(barber.id)}>Añadir</Button>
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
              ) : (
                <div className="col-md-6">
                  <h3>Calendario</h3>
                  <DatePicker selected={selectedDay} onChange={handleDayChange} />
                  {isDayAvailable() && <div className="availability-box">Puedes seleccionar este día</div>}
                  <h3 className="mt-4">Barberos</h3>
                  <div>
                    {barbers && barbers.map((barber, index) => {
                      if (barber.barbershop_id === barbershop.id) {
                        return (
                          <Button key={index} variant="primary" className="m-2">
                            {barber.user.name} {barber.user.surname}
                          </Button>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              )}

              <div className="col-md-6">
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