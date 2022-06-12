import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const style = {
  wrapper: "h-screen max-h-screen h-min-screen w-screen flex flex-col justify-between",
}

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <h1>Hello, World!</h1>
      <h1>This is something else</h1>
    </div>
  )
}

export default Home
