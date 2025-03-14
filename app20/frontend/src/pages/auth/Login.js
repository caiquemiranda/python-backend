/**
 * Página de login que permite aos usuários entrarem no sistema.
 * Inclui formulário de login e links para registro e recuperação de senha.
 */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

// Schema de validação para o formulário de login
const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Nome de usuário é obrigatório'),
    password: Yup.string()
        .required('Senha é obrigatória')
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtém o local para redirecionar após o login
    const from = location.state?.from?.pathname || "/dashboard";

    /**
     * Função para alternar a visibilidade da senha
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Manipula o envio do formulário de login
     * @param {Object} values - Valores do formulário
     */
    const handleSubmit = async (values) => {
        setError('');
        setIsSubmitting(true);

        try {
            // Tenta fazer login com as credenciais fornecidas
            await login(values);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Erro ao fazer login:', err);

            // Define mensagem de erro com base na resposta
            if (err.response && err.response.status === 401) {
                setError('Nome de usuário ou senha incorretos.');
            } else {
                setError('Erro ao fazer login. Por favor, tente novamente.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-content">
                    <h1 className="auth-title">Entrar</h1>
                    <p className="auth-description">
                        Acesse sua conta para gerenciar seus projetos e tarefas.
                    </p>

                    {/* Exibe mensagem de erro, se houver */}
                    {error && (
                        <div className="auth-error-message">
                            {error}
                        </div>
                    )}

                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="username">Nome de Usuário</label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Digite seu nome de usuário"
                                        autoComplete="username"
                                    />
                                    <ErrorMessage name="username" component="div" className="form-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="password-field">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Digite sua senha"
                                            autoComplete="current-password"
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

                                <div className="form-links">
                                    <Link to="/forgot-password" className="forgot-password-link">
                                        Esqueceu a senha?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="auth-button"
                                    disabled={!(isValid && dirty) || isSubmitting}
                                >
                                    {isSubmitting ? 'Entrando...' : (
                                        <>
                                            <FaSignInAlt /> Entrar
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="auth-separator">
                        <span>Não tem uma conta?</span>
                    </div>

                    <Link to="/register" className="auth-alternate-link">
                        Criar uma conta
                    </Link>
                </div>

                <div className="auth-image">
                    <div className="auth-overlay">
                        <h2>Bem-vindo de volta ao TaskForge</h2>
                        <p>
                            Gerencie seus projetos e tarefas com facilidade, colabore com sua equipe
                            e acompanhe o progresso em tempo real.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 