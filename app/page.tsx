"use client";

import Image from 'next/image'
import React,  { useState, useEffect } from 'react'

export default function Home() {

  const [pokemon, setPokemon] = useState();

  useEffect(() => {
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pokemon App</h1>
    </main>
  )
}
