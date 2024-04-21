import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/app/auth';

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
  StyledLink,
} from './LoginForm.styled';
import { PasswordEyeButton } from 'components/Buttons';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email.')
        .min(3, 'Minimum 3 characters.')
        .max(254, 'Maximum 254 characters.')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters.')
        .max(100, 'Maximum 100 characters.')
        .matches(
          /[A-z0-9]/,
          'The password must contain letters and numbers, without special characters.'
        )
        .required('Required'),
    }),
    onSubmit: values => {
      const { email, password } = values;
      dispatch(authOperations.actionLogin({ email, password }));
    },
  });

  return (
    <Thumb>
      <Title>Log in</Title>

      <Form onSubmit={formik.handleSubmit}>
        <FormList>
          <FormItem>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              password
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
          <Button type="submit">Log in</Button>
          <StyledLink to="/register">Registration</StyledLink>
        </ButtonsContainer>
      </Form>
    </Thumb>
  );
};
