/**
 * Página de perfil do usuário
 * Permite visualizar e editar informações do perfil
 */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaUserCircle, FaKey, FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/profile.css';

// Schema de validação para o formulário de perfil
const ProfileSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('Nome é obrigatório')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    last_name: Yup.string()
        .required('Sobrenome é obrigatório')
        .max(100, 'Sobrenome deve ter no máximo 100 caracteres'),
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    phone: Yup.string()
        .nullable(),
    bio: Yup.string()
        .nullable()
        .max(500, 'Biografia deve ter no máximo 500 caracteres'),
});

// Schema de validação para alteração de senha
const PasswordSchema = Yup.object().shape({
    current_password: Yup.string()
        .required('Senha atual é obrigatória'),
    new_password: Yup.string()
        .required('Nova senha é obrigatória')
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
            'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        ),
    confirm_password: Yup.string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('new_password'), null], 'As senhas devem corresponder'),
});

const Profile = () => {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    // Carrega os dados do perfil ao montar o componente
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await userService.getProfile();
                setProfileData(response.data);
            } catch (err) {
                console.error('Erro ao carregar perfil:', err);
                setError('Não foi possível carregar os dados do perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    /**
     * Manipula o envio do formulário de perfil
     * @param {Object} values - Valores do formulário
     * @param {Object} actions - Ações do Formik
     */
    const handleProfileSubmit = async (values, { setSubmitting }) => {
        setError('');
        setSuccess('');
        setSubmitting(true);

        try {
            await userService.updateProfile(values);
            setSuccess('Perfil atualizado com sucesso!');
            setProfileData(values);
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);

            // Define a mensagem de erro com base na resposta
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const errorMessage = Object.keys(errors)
                    .map(key => `${key}: ${errors[key].join(' ')}`)
                    .join('; ');
                setError(errorMessage);
            } else {
                setError('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Manipula o envio do formulário de alteração de senha
     * @param {Object} values - Valores do formulário
     * @param {Object} actions - Ações do Formik
     */
    const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
        setError('');
        setSuccess('');
        setSubmitting(true);

        try {
            await userService.changePassword(values);
            setSuccess('Senha alterada com sucesso!');
            resetForm();
        } catch (err) {
            console.error('Erro ao alterar senha:', err);

            // Define a mensagem de erro com base na resposta
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const errorMessage = Object.keys(errors)
                    .map(key => `${key}: ${errors[key].join(' ')}`)
                    .join('; ');
                setError(errorMessage);
            } else {
                setError('Ocorreu um erro ao alterar a senha. Por favor, tente novamente.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner text="Carregando perfil..." />;
    }

    if (!profileData) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <p>Não foi possível carregar os dados do perfil. Por favor, tente novamente mais tarde.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {profileData.avatar ? (
                        <img
                            src={profileData.avatar}
                            alt={`Avatar de ${profileData.first_name}`}
                        />
                    ) : (
                        <FaUserCircle />
                    )}
                </div>
                <div className="profile-info">
                    <h1>{profileData.first_name} {profileData.last_name}</h1>
                    <p className="profile-username">@{profileData.username}</p>
                    <p className="profile-email">{profileData.email}</p>
                </div>
            </div>

            <div className="profile-tabs">
                <button
                    className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <FaUser /> Perfil
                </button>
                <button
                    className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                >
                    <FaKey /> Alterar Senha
                </button>
            </div>

            {error && (
                <div className="form-error-message">
                    {error}
                </div>
            )}

            {success && (
                <div className="form-success-message">
                    {success}
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="profile-form-container">
                    <Formik
                        initialValues={{
                            first_name: profileData.first_name || '',
                            last_name: profileData.last_name || '',
                            email: profileData.email || '',
                            phone: profileData.phone || '',
                            bio: profileData.bio || '',
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={handleProfileSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, isValid, dirty }) => (
                            <Form className="form">
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
                                        <ErrorMessage name="first_name" component="div" className="field-error" />
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
                                        <ErrorMessage name="last_name" component="div" className="field-error" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <div className="input-with-icon">
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Seu email"
                                                autoComplete="email"
                                            />
                                            <FaEnvelope className="input-icon" />
                                        </div>
                                        <ErrorMessage name="email" component="div" className="field-error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Telefone</label>
                                        <div className="input-with-icon">
                                            <Field
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Seu telefone"
                                                autoComplete="tel"
                                            />
                                            <FaPhone className="input-icon" />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="field-error" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bio">Biografia</label>
                                    <Field
                                        as="textarea"
                                        id="bio"
                                        name="bio"
                                        rows="4"
                                        placeholder="Conte um pouco sobre você"
                                    />
                                    <ErrorMessage name="bio" component="div" className="field-error" />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting || !(isValid && dirty)}
                                    >
                                        <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar Perfil'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            {activeTab === 'password' && (
                <div className="profile-form-container">
                    <Formik
                        initialValues={{
                            current_password: '',
                            new_password: '',
                            confirm_password: '',
                        }}
                        validationSchema={PasswordSchema}
                        onSubmit={handlePasswordSubmit}
                    >
                        {({ isSubmitting, isValid, dirty }) => (
                            <Form className="form">
                                <div className="form-group">
                                    <label htmlFor="current_password">Senha Atual</label>
                                    <Field
                                        type="password"
                                        id="current_password"
                                        name="current_password"
                                        placeholder="Digite sua senha atual"
                                        autoComplete="current-password"
                                    />
                                    <ErrorMessage name="current_password" component="div" className="field-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password">Nova Senha</label>
                                    <Field
                                        type="password"
                                        id="new_password"
                                        name="new_password"
                                        placeholder="Digite a nova senha"
                                        autoComplete="new-password"
                                    />
                                    <ErrorMessage name="new_password" component="div" className="field-error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm_password">Confirmar Nova Senha</label>
                                    <Field
                                        type="password"
                                        id="confirm_password"
                                        name="confirm_password"
                                        placeholder="Confirme a nova senha"
                                        autoComplete="new-password"
                                    />
                                    <ErrorMessage name="confirm_password" component="div" className="field-error" />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting || !(isValid && dirty)}
                                    >
                                        <FaKey /> {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
};

export default Profile; 