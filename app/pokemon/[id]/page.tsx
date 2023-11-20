"use client"
/* eslint-disable @next/next/no-img-element */ 
import Image from 'next/image'
import Link from 'next/link';
import React,  { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'
import { PokemonType } from '@/app/page';

export default function Details({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams?: { [key: string]: string | string[] | undefined },
}) {

  const { id } = params;

  const [pokemon, setPokemon] = useState(null);

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
    <div>{JSON.stringify(pokemon)}</div>
  )
}