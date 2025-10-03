import React, { type JSX } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import FeedbackForm from "./pages/FeedbackForm"
import FeedbackList from "./pages/FeedbackList"
import { Container } from "@mui/material"

export default function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/list" element={<FeedbackList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
