import { Inter } from 'next/font/google'
import Head from 'next/head'
import { getCookie } from 'cookies-next'
import { validToken } from '@/services/user'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head >
      <title>Login - Nextjs</title>
      <meta name="descricao" content="Created by Luan Kisaki" />
      <link rel="icon" href="/favicon.ico"/>
      </Head>
    <div>

      Você acessou uma página segura - Perfil do usuário
    </div>
    </>
  )
}

// exigir token válido para acessar página
export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', {req, res})
    
    if(!token) throw new Error('Token inválido')

    validToken(token)
    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin'
      },
      props: {}
    }
  }
}