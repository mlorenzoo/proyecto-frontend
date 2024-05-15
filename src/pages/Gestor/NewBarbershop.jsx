import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../components/Layout';
import useServicesContext from '../../hooks/useServicesContext';
import Logger from '../../library/Logger';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import UserContext from "../../contexts/UserContext";


const NewBarbershop = () => {
  const navigate = useNavigate();
  const { userService, bsService } = useServicesContext();
  const { authToken, user, profile, setProfile } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!authToken || profile.role !== 'Gestor') {
          navigate('/unauthorized');
        }

        const userData = await userService.getOne(authToken);
        setProfile(userData.user);

      } catch (error) {
        Logger.error(error.message);
        navigate('/unauthorized');
      }
    };

    fetchProfile();
  }, [userService, authToken, setProfile, navigate]);

  const onSubmit = async (data) => {
    Logger.debug("Register form submitted");
    console.log(data);

    const q = data.address;
    const url = `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(q)}&limit=1&format=jsonv2`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
      const jsonData = await response.json();
      console.log(jsonData);

      const { lat, lon } = jsonData[0];
      console.log(lat, lon)

      console.log(profile.id);
      await bsService.addBarbershop(data.barbershopName, data.address, lat, lon, profile.id);
      navigate("/barbershops");
      alert("Barbería añadida correctamente");
    } catch (error) {
      Logger.error(error.message);
      alert("Error al registrar la barbería :_(");
    }
  };

  const validationSchema = Yup.object().shape({
    barbershopName: Yup.string().required('El nombre de la barbería es obligatorio'),
    address: Yup.string().required('La dirección es obligatoria'),
  });

  return (
    <Layout>
      <section id="nueva-barberia" className="w-75 m-auto">
        <h2>Nueva Barbería</h2>
        <Formik
          initialValues={{
            barbershopName: '',
            address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBarbershopName">
                <Form.Label>Nombre de la Barbería</Form.Label>
                <Form.Control
                  type="text"
                  name="barbershopName"
                  placeholder="Ingrese el nombre de la barbería"
                  value={values.barbershopName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.barbershopName && !!errors.barbershopName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.barbershopName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Ingrese la dirección (Ejemplo: Calle de Ejemplo, 123, 08008 Barcelona)"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.address && !!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                CREAR BARBERÍA
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );
};

export default NewBarbershop;
