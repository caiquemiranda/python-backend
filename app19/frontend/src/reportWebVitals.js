/**
 * Função para medir e reportar métricas de desempenho da web
 * Pode ser usada para enviar análises para serviços como Google Analytics
 * @param {Function} onPerfEntry - Callback para receber as métricas
 */
const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry); // Cumulative Layout Shift
            getFID(onPerfEntry); // First Input Delay
            getFCP(onPerfEntry); // First Contentful Paint
            getLCP(onPerfEntry); // Largest Contentful Paint
            getTTFB(onPerfEntry); // Time to First Byte
        });
    }
};

export default reportWebVitals; 