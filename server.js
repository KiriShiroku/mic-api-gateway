const gateway = require('fast-gateway');
const path = require('path');
const express = require('express');

const port = 9005;

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

// Iniciar el gateway y servir la interfaz después de su inicio
server.start(port).then((gatewayServer) => {
    console.log('API Gateway ejecutándose en el puerto: ' + port);
    
    // Servir archivos estáticos con Express
    gatewayServer.app.use(express.static(path.join(__dirname, 'public')));
}).catch(console.error);
