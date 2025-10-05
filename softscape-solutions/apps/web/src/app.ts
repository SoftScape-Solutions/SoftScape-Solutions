// Entry point of the web application
import express from 'express';
import { createServer } from 'http';
import { setupRoutes } from './routes'; // Assuming routes are defined in a separate file

const app = express();
const server = createServer(app);

// Middleware and other configurations can be set up here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
setupRoutes(app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Web application is running on http://localhost:${PORT}`);
});