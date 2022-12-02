/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import useAuth from '../hooks/useAuth'
import Cookies from 'js-cookie'

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState<boolean>(true)
  const { signIn, signUp, loading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
      Cookies.set('loggedin', 'true')
    } else {
      await signUp(email, password)
    }
  }

  return (
    <>
      <Head>
        <title>Netflix login</title>
      </Head>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <Image src="/login.jpg" alt="" fill priority className="z-0 object-cover opacity-60" />
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            alt="logo"
            className="absolute top-6 left-6 w-[150px] cursor-pointer object-contain md:w-[200px]"
          />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-10 flex w-[350px] flex-col items-center justify-center space-y-6 rounded-md bg-[rgba(0,0,0,0.7)] p-6 md:w-[450px]"
        >
          <h2 className="text-2xl font-semibold md:text-4xl">{login ? 'Sign in' : 'Subscribe'}</h2>
          <label className="mx-auto inline-block w-full max-w-[315px]">
            <input
              type="text"
              placeholder="Your email"
              className="loginInput"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="mt-2 text-sm font-semibold text-red-500">Email is required!</div>
            )}
          </label>
          <label className="inline-block w-full max-w-[315px]">
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="mt-2 text-sm font-semibold text-red-500">Password is required!</div>
            )}
          </label>
          <button
            className="inline-block w-full max-w-[315px] rounded-md bg-[#E50914] py-3 text-white"
            onClick={() => setLogin(true)}
          >
            {loading ? <AiOutlineLoading3Quarters className='mx-auto text-2xl animate-spin'/> : 'Sign in'}
          </button>
          <div className="space-x-3 text-lg">
            <span className="text-gray-500">New to Netflix?</span>
            <button
              className="cursor-pointer font-semibold text-white hover:underline"
              onClick={() => setLogin(false)}
              type="submit"
            >
              Sign up now!
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
