import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/constants'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
  useEffect(() => {
    setCurrentMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  return (
    <div>
      <div className="absolute top-0 left-0 h-[50vh] -z-10 md:h-screen w-screen">
        <Image
          src={`${baseUrl}${currentMovie?.backdrop_path || currentMovie?.poster_path}`}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="z-10 flex md:h-[100vh] h-[50vh] max-w-4xl flex-col justify-center space-y-6 py-16 px-6  md:px-10">
        <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          {currentMovie?.title || currentMovie?.name || currentMovie?.original_name}
        </h2>
        <p className="max-w-md text-sm md:max-w-lg md:text-base lg:text-xl">
          {currentMovie?.overview}
        </p>
        <div className="flex items-center space-x-5">
          <div className="bannerBtn bg-white text-black">
            <span className="text-lg font-semibold">
              <FaPlay />
            </span>
            <span className="text-lg md:text-2xl">Play</span>
          </div>
          <div className="bannerBtn bg-[gray]/70 text-white">
            <span className="text-lg font-semibold">
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
