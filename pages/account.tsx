/* eslint-disable @next/next/no-img-element */
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Membership from '../components/Account/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'

interface Props {
  products: Product[]
}

function Account({ products }: Props) {
  const { user, logout } = useAuth()
  const subscription = useSubscription(user)
  const currentProduct = products.filter((product) => product.id === subscription?.product)[0]?.name
  return (
    <>
      <Head>
        <title>Account - Settings</title>
      </Head>

      <header className="flex w-full items-center justify-between py-4 px-4 md:px-8">
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            alt="logo"
            className="w-[100px] cursor-pointer object-contain"
          />
        </Link>

        <img src="/account.png" alt="" className="cursor-pointer rounded-md" />
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-4 md:px-0">
        {/* Intro */}
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <h1 className="text-3xl lg:text-4xl">Account</h1>
          <div className="flex items-center gap-x-1">
            <img src="/membersince.svg" alt="" />
            <span>Member since</span>
            <span>{subscription?.created}</span>
          </div>
        </div>

        <Membership />

        {/* Plan details */}
        <div className="mt-6 grid grid-cols-1 space-y-4 border p-4 md:grid-cols-4 md:space-y-0 md:border-x-0 md:border-b-0 md:px-0 md:py-3">
          <h2 className="font-thin text-gray-400 text-lg">Plan details</h2>
          <div className="col-span-2">
            <h2>{currentProduct}</h2>
          </div>
          <div className="">
            <h2 className="w-fit cursor-pointer text-blue-500 hover:underline">Change plan</h2>
          </div>
        </div>

        {/* Log out */}
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-gray-400 font-thin">Settings</h4>
          <p className="col-span-3 cursor-pointer text-blue-500 hover:underline" onClick={logout}>
            Sign out of all devices
          </p>
        </div>
      </main>
    </>
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}
