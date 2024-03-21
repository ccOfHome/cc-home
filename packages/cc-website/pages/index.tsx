import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './components/header/header'
import ArticleList from './components/articleList/articleList'

export default function Home() {

  return (
    <>
      <Head>
        <title>CC码码的博客</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header></Header>
        <div className={styles.articleList}>
          <ArticleList></ArticleList>
        </div>
      </main>
    </>
  )
}