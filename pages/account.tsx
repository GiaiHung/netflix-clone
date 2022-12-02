/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function Account() {
  return (
    <>
      <Head>
        <title>Account - Settings</title>
      </Head>

      <div>
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
      </div>
    </>
  )
}

export default Account
