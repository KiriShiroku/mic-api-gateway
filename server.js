const gateway = require('fast-gateway');
const path = require('path');
const express = require('express');

const port = 9005;

// Configura el gateway
const server = gateway({
    routes: [
        {
            prefix: '/seguimiento',
            target: 'http://localhost:8093/',
            hooks: {}
        },
        {
            prefix: '/alimentacion',
            target: 'http://localhost:8091/',
            hooks: {}
        },
        {
            prefix: '/salud',
            target: 'http://localhost:8092/',
            hooks: {}
        }
    ]
});

// Inicia el gateway
server.start(port).then(() => {
    console.log('API Gateway ejecutándose en el puerto: ' + port);

    // Configura un servidor Express para servir archivos estáticos
    const app = express();
    app.use(express.static(path.join(__dirname, 'public')));

    // Inicia el servidor de Express en otro puerto
    app.listen(port + 1, () => {
        console.log(`Servidor de archivos estáticos ejecutándose en el puerto: ${port + 1}`);
    });
}).catch(console.error);
