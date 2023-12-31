"use client"
/* eslint-disable @next/next/no-img-element */ 

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React,  { useState, useEffect } from 'react'

import styles from '../../../styles/Details.module.css';
import { PokemonType } from '@/app/page';

export interface PokemonSingleType {
  id: number,
  name: {
    english: string
  },
  image: string
}

export default function Details({
  params,
  // searchParams,
}: {
  params: { id: string },
  // searchParams?: { [key: string]: string | string[] | undefined },
}) {

  const { id } = params;

  const [pokemon, setPokemon] = useState<PokemonType | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`); 
      setPokemon(await resp.json());
    }

    if(id) {
      getPokemon();
    }

  }, [id])  

  if(!pokemon) {
    return null
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link legacyBehavior href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div className={styles.name}>{pokemon.name}</div>
        <div className={styles.type}>{pokemon.type.join(", ") }</div>
        <table>
          <thead className={styles.header}>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats.map(({name, value}) => (
              <tr key={name}>
                <td className={styles.attribute}>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}