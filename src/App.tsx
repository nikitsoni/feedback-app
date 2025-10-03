import React, { useState, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const FeedbackSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters').max(100, 'Name should be at most 100 characters').optional().or(z.literal('')),
  email: z.email('Invalid email address'),
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional()
    .or(z.nan())
    .transform((v) => (Number.isNaN(v) ? undefined : v)),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  image: z.file().min(0).max(5 * 1024 * 1024).optional()
})

type FeedbackForm = z.infer<typeof FeedbackSchema>

export default function App(): JSX.Element {

  return (
    <div>Hello, world!</div>
  )
}
