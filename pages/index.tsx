import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalAtom } from '../atoms/states'
import Banner from '../components/Homepage/Banner'
import Header from '../components/Homepage/Header'
import Row from '../components/Homepage/Row'
import Modal from '../components/Modal'
import requests from '../utils/requests'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
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
}: Props) {
  const showModal = useRecoilValue(modalAtom)
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
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            {/* My List */}
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
    },
  }
}
