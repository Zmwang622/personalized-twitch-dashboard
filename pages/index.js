// Main entry point of your app
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        <h1>Welcome to the Personalized Twitch Dashboard! 🎉</h1>
      </div>
    </div>
  )
}

export default Home