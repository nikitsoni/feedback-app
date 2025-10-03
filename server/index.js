import express from 'express'
import cors from 'cors'
import feedbackRoutes from './routes/feedbackRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(feedbackRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))