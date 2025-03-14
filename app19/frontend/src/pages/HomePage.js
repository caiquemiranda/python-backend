/**
 * Página inicial da aplicação
 * Apresenta a plataforma, seus recursos e chamadas para ação
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaImages, FaFileAlt, FaShareAlt, FaLock, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Gerencie seus arquivos com facilidade e segurança</h1>
                            <p>
                                Uma plataforma moderna para upload, visualização e compartilhamento
                                de imagens e documentos com recursos avançados de preview.
                            </p>
                            <div className="hero-buttons">
                                {isAuthenticated ? (
                                    <Link to="/upload" className="btn btn-primary btn-lg">
                                        <FaCloudUploadAlt /> Fazer Upload
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register" className="btn btn-primary btn-lg">
                                            Criar Conta
                                        </Link>
                                        <Link to="/login" className="btn btn-outline btn-lg">
                                            Entrar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="/images/hero-image.svg"
                                alt="Ilustração de gerenciamento de arquivos"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/500x400?text=FileShare';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Recursos Principais</h2>
                        <p>Descubra o que nossa plataforma pode fazer por você</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaCloudUploadAlt />
                            </div>
                            <h3>Upload Fácil</h3>
                            <p>
                                Arraste e solte seus arquivos ou selecione-os do seu dispositivo.
                                Suporte para múltiplos formatos de imagem e documento.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaImages />
                            </div>
                            <h3>Visualização de Imagens</h3>
                            <p>
                                Visualize suas imagens diretamente no navegador com zoom,
                                rotação e outras ferramentas de visualização.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaFileAlt />
                            </div>
                            <h3>Preview de Documentos</h3>
                            <p>
                                Visualize documentos PDF e outros formatos sem precisar
                                baixá-los ou abrir em aplicativos externos.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaShareAlt />
                            </div>
                            <h3>Compartilhamento</h3>
                            <p>
                                Compartilhe seus arquivos facilmente com links diretos
                                ou integre em suas aplicações e sites.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaLock />
                            </div>
                            <h3>Segurança</h3>
                            <p>
                                Seus arquivos são armazenados com segurança e você
                                controla quem pode acessá-los.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaSearch />
                            </div>
                            <h3>Organização</h3>
                            <p>
                                Organize seus arquivos com tags, categorias e busca
                                avançada para encontrar rapidamente o que precisa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Comece a usar agora mesmo</h2>
                        <p>
                            Junte-se a milhares de usuários que já estão gerenciando seus arquivos
                            de forma mais eficiente e segura.
                        </p>
                        <div className="cta-buttons">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="btn btn-primary btn-lg">
                                    Acessar Dashboard
                                </Link>
                            ) : (
                                <Link to="/register" className="btn btn-primary btn-lg">
                                    Criar Conta Gratuita
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2>Como Funciona</h2>
                        <p>Três passos simples para começar a usar</p>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Crie sua conta</h3>
                            <p>
                                Registre-se gratuitamente em nossa plataforma
                                para começar a gerenciar seus arquivos.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Faça upload de arquivos</h3>
                            <p>
                                Envie suas imagens e documentos com facilidade
                                e organize-os como preferir.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Visualize e compartilhe</h3>
                            <p>
                                Acesse seus arquivos de qualquer lugar e
                                compartilhe-os com quem quiser.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage; 