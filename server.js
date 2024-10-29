const gateway = require('fast-gateway');
const path = require('path');
const express = require('express');

// Usa el puerto de Render o el puerto 9005 en caso de no estar definido
const port = process.env.PORT || 9005;

// Configura el gateway con tus rutas
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

// Inicia el gateway y sirve archivos estáticos en el mismo servidor
server.start(port).then((gatewayServer) => {
    console.log(`API Gateway ejecutándose en el puerto: ${port}`);

    // Configura el uso de archivos estáticos en la raíz del servidor
    gatewayServer.app.use(express.static(path.join(__dirname, 'public')));

    // Define la ruta raíz para servir un archivo index.html, si existe
    gatewayServer.app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}).catch(console.error);
