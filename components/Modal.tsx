/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalAtom, movieAtom } from '../atoms/states'
import { FaPlay, FaTimes, FaVolumeUp, FaVolumeMute, FaDivide, FaPlus } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalAtom)
  const [movie, setMovie] = useRecoilState(movieAtom)
  const [movies, setMovies] = useState<Movie[] | DocumentData[]>([])
  const { user } = useAuth()
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)
  const [addedToList, setAddedToList] = useState<boolean>(false)
  const [liked,setLiked] = useState<boolean>(false)
  const [likedMovies, setLikedMovies] = useState<Movie[] | DocumentData[]>([])

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          movie?.id
        }?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error.message))

      if (data?.videos) {
        const trailerIndex = data.videos.results.findIndex(
          (video: Element) => video.type === 'Trailer'
        )
        setTrailer(data.videos.results[trailerIndex]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  useEffect(() => {
    if (user) {
      return onSnapshot(collection(db, 'customers', user?.uid!, 'myList'), (snapshot) =>
        setMovies(snapshot.docs)
      )
    }
  }, [user, db, movie?.id])

  useEffect(() => {
    if (user) {
      return onSnapshot(collection(db, 'customers', user?.uid!, 'likes'), (snapshot) =>
        setLikedMovies(snapshot.docs)
      )
    }
  }, [user, db, movie?.id])

  useEffect(
    () => setAddedToList(movies.findIndex((currentMovie) => currentMovie.data().id === movie?.id) !== -1),
    [movies]
  )
  useEffect(
    () =>
      setLiked(
        likedMovies.findIndex((currentMovie) => currentMovie.data().id === movie?.id) !== -1
      ),
    [likedMovies]
  )

  const handleClose = () => {
    setShowModal(false)
  }
  const handleList = async () => {
    if (addedToList) {
      try {
        await deleteDoc(doc(db, 'customers', user?.uid!, 'myList', movie?.id.toString()!))
        toast.success(`${movie?.title || movie?.original_name} has been remove from your list`)
      } catch (error: any) {
        toast.error(error.message)
      }
    } else {
      try {
        await setDoc(doc(db, 'customers', user?.uid!, 'myList', movie?.id.toString()!), {
          ...movie,
        })
        toast.success(`${movie?.title} has been added to your list`)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }
  const handleLike = async () => {
    if(liked) {
      try {
        await deleteDoc(doc(db, 'customers', user?.uid!, 'likes', movie?.id.toString()!))
        toast.success(`${movie?.title || movie?.original_name} not really my type`)
      } catch (error: any) {
        toast.error(error.message)
      }
    } else {
      try {
        await setDoc(doc(db, 'customers', user?.uid!, 'likes', movie?.id.toString()!), {
          ...movie,
        })
        toast.success(`Great! I love ${movie?.title}`)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed top-10 left-0 right-0 z-50 mx-auto w-full max-w-4xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <div
          className="absolute right-4 top-14 !z-40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-900/70 hover:bg-gray-900/80"
          onClick={() => setShowModal(false)}
        >
          <FaTimes className="text-2xl" />
        </div>

        <div className="relative top-10 pt-[56.25%]">
          <ReactPlayer
            url={`https://youtube.com/watch?v=${trailer ? trailer : 'nPQ4BpTfK1Q'}`}
            muted={muted}
            playing
            width="100%"
            height="100%"
            // controls
            style={{ position: 'absolute', top: '0', left: '0' }}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-6 md:bottom-14">
            <div className="flex items-center gap-x-6">
              <button className="flex items-center gap-x-2 rounded-md bg-white px-5 py-2 text-xl text-black hover:bg-white/80">
                <FaPlay className="h-5 w-5" />
                <span>Play</span>
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? <AiOutlineCheck /> : <FaPlus />}
              </button>
              <button className="modalButton" onClick={handleLike}>
                {liked ? < BsFillHandThumbsUpFill className='text-gray-300'/> : <BsHandThumbsUp />}
              </button>
            </div>
            <div className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
          </div>
        </div>

        <div className="absolute mt-10 space-y-4 bg-[#181818] px-10 py-8">
          <div className="flex items-center gap-x-4">
            <p className="font-semibold text-green-400">
              {Math.floor(movie!.vote_average * 10)}% Match
            </p>
            <p>{movie?.release_date || movie?.first_air_date}</p>
            <div className="border border-white p-1">HD</div>
          </div>

          <div className="flex flex-col gap-x-10 md:flex-row md:items-start md:justify-between">
            <p className="w-5/6">{movie?.overview}</p>
            <div>
              <div className="flex flex-shrink-0 gap-x-2">
                <p className="text-[gray]">Genres:</p>
                {genres.map((genre) => genre.name).join(', ')}
              </div>
              <div>
                <span className="text-[gray]">Original language:</span> {movie?.original_language}
              </div>
              <div>
                <span className="text-[gray]">Total votes:</span> {movie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
