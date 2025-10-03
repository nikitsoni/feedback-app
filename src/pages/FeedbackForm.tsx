import React, { useState } from "react"
import {
    Box, Button, TextField, Typography, Card, CardContent,
    Grid, Rating, Stack
} from "@mui/material"
import { uploadImage, postFeedback } from "../amplifyLike"

export default function FeedbackForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [rating, setRating] = useState<number | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [previewSrc, setPreviewSrc] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null
        setImage(file)
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setPreviewSrc(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setPreviewSrc(null)
        }
    }

    async function handleSubmit() {
        if (!email || !message) {
            alert("Email and message are required")
            return
        }
        setSubmitting(true)
        try {
            let imageUrl: string | null = null
            if (image) {
                const res = await uploadImage(image)
                imageUrl = res.url
            }
            await postFeedback({ name, email, message, rating, imageUrl })
            alert("Feedback submitted!")
            setName(""); setEmail(""); setMessage(""); setRating(null); setImage(null); setPreviewSrc(null)
        } catch (err: any) {
            console.error(err)
            alert(err?.message || "Submission failed")
        }
        setSubmitting(false)
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
            <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                    Submit Feedback
                </Typography>
                <Stack spacing={2}>
                    <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth required />
                    <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                    <TextField label="Message" value={message} onChange={e => setMessage(e.target.value)} fullWidth multiline rows={4} required />
                    <Box>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                        />
                    </Box>
                    <Box>
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </Button>
                        {previewSrc && (
                            <Box mt={2}>
                                <img src={previewSrc} alt="Preview" style={{ maxWidth: "100%", borderRadius: 8 }} />
                            </Box>
                        )}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}
