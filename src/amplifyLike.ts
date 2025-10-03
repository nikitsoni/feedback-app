import axios from 'axios'

export async function uploadImage(file: File): Promise<{ key: string; url: string }> {
  const fd = new FormData()
  fd.append('image', file)
  const res = await axios.post('http://localhost:4000/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return { key: res.data.key, url: `http://localhost:4000${res.data.url}` }
}

export async function postFeedback(payload: any) {
  const res = await axios.post('http://localhost:4000/feedback', payload)
  return res.data
}

export async function fetchFeedbacks() {
  const res = await axios.get('http://localhost:4000/feedbacks')
  return res.data.feedbacks

}
