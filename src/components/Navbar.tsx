import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          FeedbackApp
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Submit
          </Button>
          <Button color="inherit" component={RouterLink} to="/list">
            Feedbacks
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
