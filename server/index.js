const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const e = require('express')
const { error } = require('console')

const app = express()
app.use(cors())
app.use(express.json())

const DB_FILE = path.join(__dirname, 'feedbacks.json')
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, '[]', 'utf8')
}

const UPLOAD_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = path.basename(file.originalname, ext).replace(/\s+/g, '-')
        cb(null, `${Date.now()}-${filename}${ext}`)
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// ROUTES

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const fileUrl = `/uploads/${req.file.filename}`
    return res.json({ url: fileUrl, key: req.file.filename })
})

app.use('/uploads', express.static(UPLOAD_DIR))

app.post('/feedback', (req, res) => {
    const { name, email, rating, message, imageUrl } = req.body
    if (!email || !message) return res.status(400).json({ error: 'Email and message are required' })
    const feedback = {
        id: Date.now().toString(),
        name: name || 'Anonymous',
        email,
        rating: rating || null,
        message,
        imageUrl: imageUrl || null,
        createdAt: new Date().toISOString()
    }
    const feedbacks = readDB()
    feedbacks.push(feedback)
    writeDB(feedbacks)
    res.status(201).json({ message: 'Feedback submitted successfully', feedback })
})

app.get('/feedbacks', (req, res) => {
    const feedbacks = readDB()
    res.json({ feedbacks: feedbacks })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))