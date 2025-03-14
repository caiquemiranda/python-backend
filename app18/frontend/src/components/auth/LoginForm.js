/**
 * Componente de formulário de login.
 * 
 * Permite que o usuário faça login na aplicação usando email e senha.
 */
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';

// Esquema de validação com Yup
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: Yup.string()
        .required('Senha é obrigatória')
});

const LoginForm = () => {
    const { login, error } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoginError(null);
        const success = await login(values.email, values.password);
        if (success) {
            navigate('/dashboard');
        } else {
            setLoginError(error);
        }
        setSubmitting(false);
    };

    return (
        <div className="auth-container">
            <h2 className="title">Entrar no Sistema</h2>

            {loginError && (
                <div className="alert alert-danger">
                    {loginError}
                </div>
            )}

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Seu email"
                            />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Sua senha"
                            />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="form-footer mt-2">
                <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
            </div>
        </div>
    );
};

export default LoginForm; 