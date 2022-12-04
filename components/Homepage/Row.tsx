import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Thumbnail from './Thumbnail'

interface Props {
  movies: Movie[] | DocumentData[]
  title: string
}

function Row({ movies, title }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  const handleSlide = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      let scrollTo = 0
      if (direction === 'left') {
        scrollTo = scrollLeft - clientWidth
      } else if (direction === 'right') {
        scrollTo = scrollLeft + clientWidth
      }

      if(scrollTo <= 0) {
        setIsMoved(false)
      }

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="mb-4 mt-8 h-56 space-y-4 px-4 md:px-6 overflow-hidden">
      <h2 className="cursor-pointer text-lg font-semibold text-[#e5e5e5] transition duration-200 ease-in hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative">
        {isMoved && (
          <FaChevronLeft
            className="absolute top-0 bottom-0 left-0 z-40 my-auto cursor-pointer text-2xl opacity-0 transition duration-200 ease-out group-hover:opacity-100 hover:scale-110"
            onClick={() => handleSlide('left')}
          />
        )}

        <div className="flex items-center space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide" ref={rowRef}>
          {movies.map((movie) => (
            <Thumbnail movie={movie} key={movie.id} />
          ))}
        </div>

        <FaChevronRight
          className="absolute top-0 bottom-0 right-0 z-40 my-auto cursor-pointer text-2xl opacity-0 transition duration-200 ease-out group-hover:opacity-100 hover:scale-110"
          onClick={() => handleSlide('right')}
        />
      </div>
    </div>
  )
}

export default Row
