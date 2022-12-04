/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/constants'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { modalAtom, movieAtom } from '../../atoms/states'
import { useRecoilState } from 'recoil'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalAtom)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieAtom)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  return (
    <div>
      <img
        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        alt=""
        className="absolute top-0 left-0 z-10 h-[60vh] w-screen object-cover md:h-screen"
      />

      <div className="relative z-20 flex h-[60vh] max-w-4xl flex-col justify-center space-y-6 py-16 px-6 md:h-[100vh]  md:px-10">
        <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h2>
        <p className="max-w-md text-sm md:max-w-lg md:text-base lg:text-xl">{movie?.overview}</p>
        <div className="flex items-center space-x-5">
          <div
            className="bannerBtn bg-white text-black"
            onClick={() => {
              setShowModal(true)
              setCurrentMovie(movie)
            }}
          >
            <span className="text-lg font-semibold">
              <FaPlay />
            </span>
            <span className="text-lg md:text-2xl">Play</span>
          </div>
          <div
            className="bannerBtn bg-[gray]/70 text-white"
            onClick={() => {
              setShowModal(true)
              setCurrentMovie(movie)
            }}
          >
            <span className="text-2xl font-semibold">
              <AiOutlineInfoCircle />
            </span>
            <span className="text-lg md:text-2xl">Info</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
