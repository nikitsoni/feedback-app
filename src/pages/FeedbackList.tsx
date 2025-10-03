import React, { useEffect, useState } from "react"
import { Card, CardContent, Typography, Box, Rating, Grid } from "@mui/material"
import { fetchFeedbacks } from "../amplifyLike"

type Feedback = {
    id: string
    name: string
    email?: string
    rating?: number
    message: string
    imageUrl?: string
    createdAt: string
}

export default function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

    useEffect(() => {
        async function loadFeedbacks() {
            const feedbacks = await fetchFeedbacks()
            setFeedbacks(feedbacks)
        }
        loadFeedbacks()
    }, [])

    return (
        <Grid container spacing={2} sx={{ mt: 6, maxWidth: 900, mx: "auto" }}>
            {feedbacks.map(f => (
                <Grid item xs={12} sm={6} key={f.id}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{f.name}</Typography>
                                {f.rating && <Rating value={f.rating} readOnly size="small" />}
                            </Box>
                            {f.email && <Typography variant="body2" color="textSecondary">{f.email}</Typography>}
                            <Typography mt={1}>{f.message}</Typography>
                            {f.imageUrl && (
                                <Box mt={1} sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img
                                        src={`${f.imageUrl}`}
                                        alt="Feedback"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: 180,
                                            objectFit: "cover",
                                            borderRadius: 8,
                                            width: "100%",
                                            display: "block"
                                        }}
                                    />
                                </Box>
                            )}
                            <Typography variant="caption" color="textSecondary" mt={1}>
                                {new Date(f.createdAt).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
