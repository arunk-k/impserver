require('dotenv').config()
const express = require('express')

const server = express()

const cors = require('cors')

const authRoutes = require('./routes/authRoutes')

const careerRoutes = require('./routes/careerRoutes')

const roadmapRoutes = require('./routes/roadmapRoutes');

const connectDB=require('./connect/dbConnect')

connectDB()

server.use(cors())

server.use(express.json())

server.use('/api/auth', authRoutes)

server.use('/api/admin/careers', careerRoutes)

server.use('/api/admin/roadmap', roadmapRoutes);

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log("Server running at http://localhost:" + PORT))

