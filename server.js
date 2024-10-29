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

// Configura el servidor Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Define la ruta raíz para servir un archivo index.html, si existe
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el gateway y Express en el mismo puerto
server.start(port).then(() => {
    console.log(`API Gateway ejecutándose en el puerto: ${port}`);

    // Inicia el servidor Express en el mismo puerto
    app.listen(port, () => {
        console.log(`Servidor de archivos estáticos ejecutándose en el puerto: ${port}`);
    });
}).catch(console.error);
