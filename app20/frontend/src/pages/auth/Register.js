/**
 * Página de registro que permite aos novos usuários criarem uma conta.
 * Inclui formulário de registro e links para a página de login.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

// Schema de validação para o formulário de registro
const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .required('Nome de usuário é obrigatório')
        .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
        .max(20, 'Nome de usuário deve ter no máximo 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Nome de usuário pode conter apenas letras, números e underscore'),
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    first_name: Yup.string()
        .required('Nome é obrigatório'),
    last_name: Yup.string()
        .required('Sobrenome é obrigatório'),
    password: Yup.string()
        .required('Senha é obrigatória')
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
            'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        ),
    password_confirm: Yup.string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
});

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Função para alternar a visibilidade da senha
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Função para alternar a visibilidade da confirmação de senha
     */
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    /**
     * Manipula o envio do formulário de registro
     * @param {Object} values - Valores do formulário
     */
    const handleSubmit = async (values) => {
        setError('');
        setIsSubmitting(true);

        try {
            // Tenta registrar o novo usuário
            await register(values);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            console.error('Erro ao registrar:', err);

            // Define mensagem de erro com base na resposta
            if (err.response && err.response.data) {
                if (err.response.data.username) {
                    setError(`Usuário: ${err.response.data.username.join(' ')}`);
                } else if (err.response.data.email) {
                    setError(`Email: ${err.response.data.email.join(' ')}`);
                } else if (err.response.data.password) {
                    setError(`Senha: ${err.response.data.password.join(' ')}`);
                } else if (err.response.data.non_field_errors) {
                    setError(err.response.data.non_field_errors.join(' '));
                } else {
                    setError('Erro ao registrar. Por favor, verifique os dados e tente novamente.');
                }
            } else {
                setError('Erro ao registrar. Por favor, tente novamente mais tarde.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-content">
                    <h1 className="auth-title">Criar Conta</h1>
                    <p className="auth-description">
                        Registre-se para começar a gerenciar seus projetos e tarefas.
                    </p>

                    {/* Exibe mensagem de erro, se houver */}
                    {error && (
                        <div className="auth-error-message">
                            {error}
                        </div>
                    )}

                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            first_name: '',
                            last_name: '',
                            password: '',
                            password_confirm: ''
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="auth-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="first_name">Nome</label>
                                        <Field
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            placeholder="Seu nome"
                                            autoComplete="given-name"
                                        />
                                        <ErrorMessage name="first_name" component="div" className="form-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="last_name">Sobrenome</label>
                                        <Field
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Seu sobrenome"
                                            autoComplete="family-name"
                                        />
                                        <ErrorMessage name="last_name" component="div" className="form-error" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Nome de Usuário</label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Escolha um nome de usuário"
                                        autoComplete="username"
                                    />
                                    <ErrorMessage name="username" component="div" className="form-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Seu email"
                                        autoComplete="email"
                                    />
                                    <ErrorMessage name="email" component="div" className="form-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="password-field">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Crie uma senha forte"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={togglePasswordVisibility}
                                            tabIndex="-1"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="form-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_confirm">Confirmar Senha</label>
                                    <div className="password-field">
                                        <Field
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="password_confirm"
                                            name="password_confirm"
                                            placeholder="Confirme sua senha"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={toggleConfirmPasswordVisibility}
                                            tabIndex="-1"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password_confirm" component="div" className="form-error" />
                                </div>

                                <div className="form-terms">
                                    <p>
                                        Ao se registrar, você concorda com nossos{' '}
                                        <Link to="/terms">Termos de Serviço</Link> e{' '}
                                        <Link to="/privacy">Política de Privacidade</Link>.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="auth-button"
                                    disabled={!(isValid && dirty) || isSubmitting}
                                >
                                    {isSubmitting ? 'Registrando...' : (
                                        <>
                                            <FaUserPlus /> Criar Conta
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="auth-separator">
                        <span>Já tem uma conta?</span>
                    </div>

                    <Link to="/login" className="auth-alternate-link">
                        Entrar
                    </Link>
                </div>

                <div className="auth-image register-image">
                    <div className="auth-overlay">
                        <h2>Junte-se ao TaskForge</h2>
                        <p>
                            Organize seus projetos, acompanhe o progresso e colabore
                            com sua equipe de forma eficiente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 