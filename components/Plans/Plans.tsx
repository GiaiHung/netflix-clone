/* eslint-disable @next/next/no-img-element */
import { Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineLoading } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import { loadCheckout } from '../../lib/stripe'
import Table from './Table'

interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  const { user, logout } = useAuth()
  const [currentPlan, setCurrentPlan] = useState<Product>(products[2])
  const [isBillLoading, setIsBillLoading] = useState<boolean>(false)

  const handleSubscribe = () => {
    if (!user || isBillLoading) return

    loadCheckout(currentPlan?.prices[0].id)
    setIsBillLoading(true)
  }

  return (
    <>
      <Head>
        <title>Netflix - Subscribe plans</title>
      </Head>

      <div>
        <header className="flex w-full items-center justify-between border-b border-gray-500 px-4 py-4 md:px-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            alt="logo"
            className="w-[150px] cursor-pointer object-contain"
          />
          <button className="text-lg hover:underline" onClick={logout}>
            Sign out
          </button>
        </header>

        <main className="mx-auto mt-10 max-w-5xl">
          <h1 className="mb-3 px-6 text-3xl font-medium md:px-0">
            Choose the plan {`that's`} right for you
          </h1>
          <ul className="px-6 md:px-0">
            <li className="flex items-center gap-x-3 text-xl">
              <AiOutlineCheck className="text-xl text-[#E50914]" />
              <span>Watch all you want. Ad-free.</span>
            </li>
            <li className="flex items-center gap-x-3 text-xl">
              <AiOutlineCheck className="text-xl text-[#E50914]" />
              <span>Recommendations just for you.</span>
            </li>
            <li className="flex items-center gap-x-3 text-xl">
              <AiOutlineCheck className="text-xl text-[#E50914]" />
              <span>Change or cancel your plan anytime.</span>
            </li>
          </ul>

          <div className="mt-8">
            <div className="ml-0 flex items-center md:ml-auto md:w-3/5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`planBox ${
                    currentPlan?.id === product.id ? 'opacity-100' : 'opacity-70'
                  }`}
                  onClick={() => setCurrentPlan(product)}
                >
                  {product.name}
                </div>
              ))}
            </div>

            <Table products={products} currentPlan={currentPlan} />

            <div className="my-4 space-y-2 text-sm text-gray-500 px-4 md:px-0">
              <p>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your
                internet service and device capabilities. Not all content is available in all
                resolutions. See our{' '}
                <span className="text-blue-500 hover:cursor-pointer hover:underline">
                  Terms of Use
                </span>{' '}
                for more details.
              </p>
              <p>
                Only people who live with you may use your account. Watch on 4 different devices at
                the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
              </p>
            </div>

            <button
              className="mx-auto mb-10 mt-4 flex w-2/5 max-w-[400px] items-center justify-center rounded-md bg-[#E50914] px-4 py-3 text-xl transition-all duration-150 ease-in hover:opacity-80"
              onClick={handleSubscribe}
            >
              {isBillLoading ? <AiOutlineLoading className="animate-spin text-2xl" /> : 'Subscribe'}
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Plans
