import Head from 'next/head'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { useRecoilValue } from 'recoil'
import { modalAtom } from '../atoms/states'
import Banner from '../components/Homepage/Banner'
import Header from '../components/Homepage/Header'
import Row from '../components/Homepage/Row'
import Modal from '../components/Modal'
import Plans from '../components/Plans/Plans'
import useAuth from '../hooks/useAuth'
import requests from '../utils/requests'
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'
import useList from '../hooks/useList'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) {
  const showModal = useRecoilValue(modalAtom)
  const { loading, user } = useAuth()
  const subscription = useSubscription(user)
  const myList = useList(user?.uid)
  // console.log(myList)

  if (loading || subscription === null) return null

  if (!subscription) {
    return <Plans products={products} />
  }

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative mb-10 bg-gradient-to-b from-gray-900/10 to-[#010511]">
        <Header />
        <main className="space-y-18 relative">
          <Banner netflixOriginals={netflixOriginals} />
          <section>
            {myList.length > 0 && <Row title="My list" movies={myList} />}
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
        {showModal && <Modal />}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products: products,
    },
  }
}
