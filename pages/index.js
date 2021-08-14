// Main entry point of your app
import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => {
  // State
  const [favoriteChannels, setFavoriteChannels] = useState([])

  // Actions
  const addStreamChannel = async event => {
    event.preventDefault()

    const { value } = event.target.elements.name

    if (value) {
      console.log(`value: ${value}`)

      // Call Twitch APIt
      const path = `https://${window.location.hostname}`

      const response = await fetch(`${path}/api/twitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: value })

      })

      const json = await response.json()

      console.log(`From the server: ${json.data}`)

      setFavoriteChannels(prevState => [...prevState, value])

      event.target.elements.name.value = ""
    }
  }

  // Render Method
  const renderForm = () => (
    <div className={styles.formContainer}>
      <form onSubmit={addStreamChannel}>
        <input id="name" placeholder="Twitch Channel Name" type="text" required />
        <button type="submit">Add Streamer</button>
      </form>
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
        <div>{favoriteChannels.join(",")}</div>
      </div>
    </div>
  )
}

export default Home