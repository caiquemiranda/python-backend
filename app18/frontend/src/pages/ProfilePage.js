/**
 * Página de perfil do usuário.
 * 
 * Permite ao usuário visualizar e editar suas informações pessoais.
 */
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import './ProfilePage.css';

// Esquema de validação para o formulário de perfil
const ProfileSchema = Yup.object().shape({
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
        .required('Email é obrigatório')
});

// Esquema de validação para o formulário de alteração de senha
const PasswordSchema = Yup.object().shape({
    current_password: Yup.string()
        .required('Senha atual é obrigatória'),
    new_password: Yup.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        )
        .required('Nova senha é obrigatória'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória')
});

const ProfilePage = () => {
    const { user, updateProfile, changePassword, error } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [profileError, setProfileError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // Função para lidar com o envio do formulário de perfil
    const handleProfileSubmit = async (values, { setSubmitting }) => {
        setProfileError(null);
        setProfileSuccess(false);

        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email
        };

        const success = await updateProfile(userData);

        if (success) {
            setProfileSuccess(true);
        } else {
            setProfileError(error);
        }

        setSubmitting(false);
    };

    // Função para lidar com o envio do formulário de alteração de senha
    const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
        setPasswordError(null);
        setPasswordSuccess(false);

        const passwordData = {
            current_password: values.current_password,
            new_password: values.new_password
        };

        const success = await changePassword(passwordData);

        if (success) {
            setPasswordSuccess(true);
            resetForm();
        } else {
            setPasswordError(error);
        }

        setSubmitting(false);
    };

    if (!user) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando informações do usuário...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                <h1 className="page-title">Meu Perfil</h1>

                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <i className="fas fa-user"></i> Informações Pessoais
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        <i className="fas fa-key"></i> Alterar Senha
                    </button>
                </div>

                <div className="profile-content">
                    {activeTab === 'profile' && (
                        <div className="profile-form-container">
                            <h2>Editar Informações</h2>

                            {profileSuccess && (
                                <div className="alert alert-success">
                                    Perfil atualizado com sucesso!
                                </div>
                            )}

                            {profileError && (
                                <div className="alert alert-danger">
                                    {typeof profileError === 'object'
                                        ? Object.entries(profileError).map(([key, value]) => (
                                            <div key={key}><strong>{key}:</strong> {value}</div>
                                        ))
                                        : profileError}
                                </div>
                            )}

                            <Formik
                                initialValues={{
                                    first_name: user.first_name || '',
                                    last_name: user.last_name || '',
                                    email: user.email || ''
                                }}
                                validationSchema={ProfileSchema}
                                onSubmit={handleProfileSubmit}
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
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="password-form-container">
                            <h2>Alterar Senha</h2>

                            {passwordSuccess && (
                                <div className="alert alert-success">
                                    Senha alterada com sucesso!
                                </div>
                            )}

                            {passwordError && (
                                <div className="alert alert-danger">
                                    {typeof passwordError === 'object'
                                        ? Object.entries(passwordError).map(([key, value]) => (
                                            <div key={key}><strong>{key}:</strong> {value}</div>
                                        ))
                                        : passwordError}
                                </div>
                            )}

                            <Formik
                                initialValues={{
                                    current_password: '',
                                    new_password: '',
                                    confirm_password: ''
                                }}
                                validationSchema={PasswordSchema}
                                onSubmit={handlePasswordSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="current_password">Senha Atual</label>
                                            <Field
                                                type="password"
                                                name="current_password"
                                                id="current_password"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="current_password" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="new_password">Nova Senha</label>
                                            <Field
                                                type="password"
                                                name="new_password"
                                                id="new_password"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="new_password" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirm_password">Confirmar Nova Senha</label>
                                            <Field
                                                type="password"
                                                name="confirm_password"
                                                id="confirm_password"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="confirm_password" component="div" className="error-message" />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 