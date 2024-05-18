import React, { useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../components/Layout';
import useServicesContext from '../../hooks/useServicesContext';
import Logger from '../../library/Logger';
import UserContext from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';

const NewPlan = () => {
  const navigate = useNavigate();
  const { subsService } = useServicesContext();
  const { authToken, user, profile, setProfile  } = useContext(UserContext)

  useEffect(() => {
    if (!authToken || profile.role !== 'Gestor' && profile.role !== 'Admin') {
      navigate('/unauthorized');
    }
  }, [])
  console.log(profile)


  async function onSubmit(data) {
    Logger.debug("Register form submitted")
    console.log(data)
    // Auth 
    try {
      await subsService.addSubs(data.plan, data.price, data.description, data.duration)
      navigate("/subscriptions")
      alert("Plan añadido!")
    } catch (error) {
      Logger.error(error.message)
      alert("ERROR durant el registre... :_(")
    }
  }

  const validationSchema = Yup.object().shape({
    plan: Yup.string().required('El plan es obligatorio'),
    price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser un número positivo'),
    description: Yup.string().required('La descripción es obligatoria'),
    duration: Yup.string().required('La duración es obligatoria'),
  });

  return (
    <Layout>
      <section id="nuevo-plan" className="w-75 m-auto">
        <h2>Nuevo Plan</h2>
        <Formik
          initialValues={{
            plan: '',
            price: '',
            description: '',
            duration: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formPlan">
                <Form.Label>Plan</Form.Label>
                <Form.Control
                  type="text"
                  name="plan"
                  placeholder="Ingrese el nombre del plan"
                  value={values.plan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.plan && !!errors.plan}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.plan}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Precio (€/mes)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Ingrese el precio"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Ingrese la descripción"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDuration">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  placeholder="Ingrese la duración"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.duration && !!errors.duration}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
              {profile && profile.role === 'Gestor' && (
                <Button variant="primary" type="submit">
                  CREAR PLAN
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );
};

export default NewPlan;
