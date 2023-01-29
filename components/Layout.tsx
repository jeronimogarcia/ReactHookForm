import Head from 'next/head'
import { FC } from 'react'
import Header from './Header'

interface Props {
    pageDescription: string,
    title: string,
    children: React.ReactNode
}

const Layout: FC<Props> = ({pageDescription, title, children}) => {
  return (
    <>
    <Head>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
    </Head>

    <Header />

    <main className='mt-40 flex justify-center'>
        {children}
    </main>
    </>
  )
}

export default Layout