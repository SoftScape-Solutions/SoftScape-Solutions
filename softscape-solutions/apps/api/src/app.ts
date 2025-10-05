import express from 'express';
import bodyParser from 'body-parser';
import { router as apiRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});