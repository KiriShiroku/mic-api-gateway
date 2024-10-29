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

// Usar express para servir la interfaz
server.getServer().use(express.static(path.join(__dirname, 'public')));

// Iniciar el gateway en el puerto 9005
server.start(port).then(server => {
    console.log('API Gateway ejecutándose en el puerto: ' + port);
});
