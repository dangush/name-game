import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    requestName();
  }, [])

  const requestName = () => {
    fetch('http://localhost:3000/request')
    .then(response => response.json())
    .then(data => setName(data.name));
  }

  const locateName = async () => {
    console.log("Web app locating ", name)
    const response = await axios({
      method: 'get',
      url: `https://ono.4b.rs/v1/jur?key=${process.env.API_KEY}&name=${name}&type=surname`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    })
    
    console.log(response.data[0]['jurisdiction'])
  }
  
  
  const reset = () => {
    requestName();
    setLocation('');
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`flex flex-col place-content-center w-screen h-screen bg-back`}>
        <p className="lg:text-4xl text-2xl font-bold text-accent pb-4 text-center">Name Game</p>
        <div className={`flex flex-col justify-center gap-y-8 items-center self-center border-4 rounded-2xl border-accent shadow-xl bg-card lg:w-1/2 w-5/6 lg:h-2/3 h-5/6`}>
          <p className={`text-lg font-bold text-textColor`}>{name}</p>
          <button onClick={() => locateName()} className={`bg-button hover:bg-accent text-white font-bold py-2 px-4 rounded w-auto`}>
            Reveal Nationality
          </button>
          <p className={`text-lg font-bold text-textColor`}>{location == "" ? "???" : location}</p>
          <button onClick={() => reset()} className={`bg-button hover:bg-accent text-white font-bold py-2 px-4 rounded w-auto`}>
            Reset
          </button>
        </div>
      </main>
    </>
  )
}