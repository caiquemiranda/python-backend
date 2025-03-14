/**
 * Contexto de tema
 * Gerencia o tema da aplicação (claro/escuro) e fornece métodos para alterá-lo
 */
import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto
const ThemeContext = createContext({});

/**
 * Provider do contexto de tema
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export const ThemeProvider = ({ children }) => {
    // Estado para armazenar o tema atual
    const [darkMode, setDarkMode] = useState(false);

    // Efeito para carregar o tema do localStorage ao iniciar
    useEffect(() => {
        const savedTheme = localStorage.getItem('@FileShare:theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            // Verifica se o usuário prefere o tema escuro no sistema
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDarkMode);
        }
    }, []);

    // Efeito para aplicar o tema ao documento HTML
    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // Salva a preferência no localStorage
        localStorage.setItem('@FileShare:theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    /**
     * Alterna entre os temas claro e escuro
     */
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    /**
     * Define o tema para claro
     */
    const setLightTheme = () => {
        setDarkMode(false);
    };

    /**
     * Define o tema para escuro
     */
    const setDarkTheme = () => {
        setDarkMode(true);
    };

    // Valor do contexto
    const value = {
        darkMode,
        toggleTheme,
        setLightTheme,
        setDarkTheme
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Hook para usar o contexto de tema
 * @returns {Object} Contexto de tema
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }

    return context;
};

export default ThemeContext; 