import express from 'express';
import 'dotenv/config';
import cors from 'cors';

// 1. Rename the User Routes Import and Add the Admin Routes Import
// Ensure these files exist in /backend/routes/
import userRoutes from './routes/userRoutes.js';    
import adminRoutes from './routes/adminRoutes.js';  

// 2. Initialize App & Middleware
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
 'http://localhost:3000', // Assuming User Frontend
 'http://localhost:3001', // Assuming Admin Frontend (or adjust port if they are the same)
];

app.use(cors({
 origin: allowedOrigins,
 methods: 'GET,POST,PUT,DELETE',
 credentials: true,
 allowedHeaders: ["Content-Type", "Authorization"],
}));

// 3. Routes: CRITICAL SEPARATION
// Traffic for standard users starts with /api/users (e.g., /api/users/auth/login)
app.use('/api/users', userRoutes); 

// Traffic for admin users starts with /api/admin (e.g., /api/admin/auth/login)
app.use('/api/admin', adminRoutes); 

// Basic root route for testing
app.get('/', (req, res) => {
 res.send(`API is running on port ${PORT}`);
});

// 4. Start Server
app.listen(PORT, () => {
 console.log(` Server running on port ${PORT}`);
 console.log(`Connect to database: ${process.env.DB_DATABASE}`);
});


