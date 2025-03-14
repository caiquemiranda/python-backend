/**
 * Componente de cartão reutilizável
 * Fornece um contêiner estilizado para conteúdo com cabeçalho, corpo e rodapé opcionais
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Componente de card reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {string} props.title - Título do card
 * @param {React.ReactNode} props.header - Conteúdo do cabeçalho do card
 * @param {React.ReactNode} props.footer - Conteúdo do rodapé do card
 * @param {string} props.className - Classes CSS adicionais
 */
const Card = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`card ${className}`} {...props}>
            {/* Cabeçalho do card */}
            {(props.header || props.title) && (
                <div className="card-header">
                    {props.header || (props.title && <h3 className="card-title">{props.title}</h3>)}
                </div>
            )}

            {/* Corpo do card */}
            <div className="card-body">
                {children}
            </div>

            {/* Rodapé do card */}
            {props.footer && (
                <div className="card-footer">
                    {props.footer}
                </div>
            )}
        </div>
    );
};

const CardHeader = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`card-header ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardBody = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`card-body ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`card-footer ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardTitle = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <h5 className={`card-title ${className}`} {...props}>
            {children}
        </h5>
    );
};

const CardSubtitle = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <h6 className={`card-subtitle ${className}`} {...props}>
            {children}
        </h6>
    );
};

const CardText = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <p className={`card-text ${className}`} {...props}>
            {children}
        </p>
    );
};

const CardImage = ({
    src,
    alt = '',
    className = '',
    position = 'top',
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`card-img-${position} ${className}`}
            {...props}
        />
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Text = CardText;
Card.Image = CardImage;

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardBody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardFooter.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardTitle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardSubtitle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardText.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom'])
};

export default Card; 