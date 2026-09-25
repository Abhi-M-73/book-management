'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const BookDetails = () => {
  const { id } = useParams()

  return (
    <div>
      BookDetails { id }
    </div>
  )
}

export default BookDetails
