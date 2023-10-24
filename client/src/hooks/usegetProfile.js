import React from 'react'

const usegetProfile = async () => {
  const tutor = JSON.parse(localStorage.getItem('tutor'))
  try {
    const response = await fetch('http://localhost:8000/tutor/get-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tutorId: tutor._id }),
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('tutor', JSON.stringify(data))
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export default usegetProfile
