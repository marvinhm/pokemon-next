"use client";
/* eslint-disable @next/next/no-img-element */ 

import Image from 'next/image'
import Link from 'next/link';
import React,  { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'

export interface PokemonType {
  id: number,
  name: string,
  image: string,
  type: [],
  stats: []
}

export default function Home() {

  const [pokemon, setPokemon] = useState<PokemonType[]>([]);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"); 
      setPokemon(await resp.json());
    }

    getPokemon();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pokemon App</h1>
      <div className="grid grid-cols-4 gap-2.5" >
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
              <a>
                <img 
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
} 
