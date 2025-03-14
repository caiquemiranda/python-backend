/**
 * Componente de formulário de registro.
 * 
 * Permite que o usuário crie uma nova conta no sistema.
 */
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';

// Esquema de validação com Yup
const RegisterSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Nome muito curto')
        .max(50, 'Nome muito longo')
        .required('Nome é obrigatório'),
    last_name: Yup.string()
        .min(2, 'Sobrenome muito curto')
        .max(50, 'Sobrenome muito longo')
        .required('Sobrenome é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: Yup.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        )
        .required('Senha é obrigatória'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória')
});

const RegisterForm = () => {
    const { register, error } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState(null);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setRegisterError(null);
        setRegisterSuccess(false);

        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            password2: values.password2
        };

        const success = await register(userData);

        if (success) {
            setRegisterSuccess(true);
            resetForm();
            // Redireciona para a página de login após 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setRegisterError(error);
        }

        setSubmitting(false);
    };

    return (
        <div className="auth-container">
            <h2 className="title">Criar Conta</h2>

            {registerError && (
                <div className="alert alert-danger">
                    {typeof registerError === 'object'
                        ? Object.entries(registerError).map(([key, value]) => (
                            <div key={key}><strong>{key}:</strong> {value}</div>
                        ))
                        : registerError}
                </div>
            )}

            {registerSuccess && (
                <div className="alert alert-success">
                    Conta criada com sucesso! Você será redirecionado para a página de login em instantes.
                </div>
            )}

            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password2: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="first_name">Nome</label>
                            <Field
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="form-control"
                                placeholder="Seu nome"
                            />
                            <ErrorMessage name="first_name" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Sobrenome</label>
                            <Field
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-control"
                                placeholder="Seu sobrenome"
                            />
                            <ErrorMessage name="last_name" component="div" className="error-message" />
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="password2">Confirmar Senha</label>
                            <Field
                                type="password"
                                name="password2"
                                id="password2"
                                className="form-control"
                                placeholder="Confirme sua senha"
                            />
                            <ErrorMessage name="password2" component="div" className="error-message" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting || registerSuccess}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="form-footer mt-2">
                <p>Já tem uma conta? <Link to="/login">Entrar</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm; 