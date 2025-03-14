/**
 * Componente para alternar entre os temas claro e escuro
 */
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

/**
 * Botão de alternância de tema
 * Permite ao usuário alternar entre os temas claro e escuro
 */
const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
            {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
    );
};

export default ThemeToggle; 