import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { authOperations } from '../../redux/app/auth';

import { PasswordEyeButton } from 'components/Buttons';
import {
  Thumb,
  Title,
  Form,
  FormList,
  FormItem,
  Label,
  Input,
  Message,
  ButtonsContainer,
  Button,
  StyledNavLink,
} from './RegistrationForm.styled';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues,

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(254, 'Maximum 254 characters')
        .matches(/[A-z]/, 'Please select the English keyboard layout')
        .required('Required'),

      email: Yup.string()
        .email('Invalid email address')
        .max(254, 'Maximum 254 characters')
        .matches(
          /([a-z0-9_.-]{3,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
          'The email must contain a minimum of 3 characters'
        )
        .required('Required'),

      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .max(100, 'Maximum 100 characters')
        .matches(
          /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{8,}/,
          'The password must consist of Latin letters and numbers without special characters'
        )
        .required('Required'),
    }),

    onSubmit: values => {
      const { name, email, password } = values;
      dispatch(authOperations.actionRegister({ name, email, password })).then(
        ({ payload }) => {
          if (payload?.code === 201) {
            navigate('/login', { replace: true });
          }
        }
      );

      formik.resetForm();
    },
  });

  return (
    <Thumb>
      <Title>Registration</Title>

      <Form onSubmit={formik.handleSubmit}>
        <FormList>
          <FormItem>
            <Label htmlFor="name">Name *</Label>

            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <Message>{formik.errors.name}</Message>
            ) : null}
          </FormItem>
          <FormItem>
            <Label htmlFor="email">Email address *</Label>

            <Input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Message>{formik.errors.email}</Message>
            ) : null}
          </FormItem>

          <FormItem>
            <Label htmlFor="password">Password *</Label>

            <Input
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <PasswordEyeButton handleClick={handleClick} show={show} />

            {formik.touched.password && formik.errors.password ? (
              <Message>{formik.errors.password}</Message>
            ) : null}
          </FormItem>
        </FormList>

        <ButtonsContainer>
          <Button type="submit">Registration</Button>

          <StyledNavLink to="/login">Log in</StyledNavLink>
        </ButtonsContainer>
      </Form>
    </Thumb>
  );
};
