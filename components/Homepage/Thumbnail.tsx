import Image from 'next/image'
import React from 'react'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="group/item relative h-44 min-w-[256px] cursor-pointer rounded-sm transition duration-150 ease-linear hover:scale-110">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="object-cover"
      />

      <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto flex items-center justify-center bg-[rgba(0,0,0,0.2)] text-center opacity-0 transition duration-200 ease-in-out group-hover/item:opacity-100">
        <h4 className="max-w-[200px] text-xl font-light">{movie.title || movie.name}</h4>
      </div>
    </div>
  )
}

export default Thumbnail
