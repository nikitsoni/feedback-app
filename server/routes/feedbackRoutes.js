import express from 'express'
import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { readDB, writeDB } from '../utils/db.js'
import { UPLOAD_DIR } from '../utils/config.js'

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

const router = Router()

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const fileUrl = `/uploads/${req.file.filename}`
    return res.json({ url: fileUrl, key: req.file.filename })
})

router.use('/uploads', express.static(UPLOAD_DIR))

router.post('/feedback', (req, res) => {
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

router.get('/feedbacks', (req, res) => {
    const feedbacks = readDB()
    res.json({ feedbacks: feedbacks })
})

export default router

