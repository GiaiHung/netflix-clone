import { Product } from '@stripe/firestore-stripe-payments'
import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

interface Props {
  products: Product[]
  currentPlan: Product
}

function Table({ products, currentPlan }: Props) {
  return (
    <table className="mt-4 w-full font-semibold text-gray-400">
      <tbody className="w-full space-y-2 divide-y divide-gray-600">
        {/* Monthly price */}
        <tr className="flex w-full items-center py-3">
          <td className="hidden flex-1 md:inline-flex">Monthly price</td>
          <td className="ml-0 flex w-full items-center justify-between text-center md:ml-auto md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`mx-auto flex w-[calc(100%/3)] flex-1 items-center justify-center gap-x-1 text-center md:w-[calc(60%/3)] ${
                  currentPlan.id === product.id && 'font-bold text-white'
                }`}
              >
                {product.prices[0].unit_amount} <span className="underline">đ</span>
              </div>
            ))}
          </td>
        </tr>
        {/* Video quality */}
        <tr className="flex w-full items-center py-3">
          <td className="hidden flex-1 md:inline-flex">Video quality</td>
          <td className="ml-0 flex w-full items-center justify-between text-center md:ml-auto md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`mx-auto flex w-[calc(100%/3)] flex-1 items-center justify-center gap-x-1 text-center md:w-[calc(60%/3)] ${
                  currentPlan.id === product.id && 'font-bold text-white'
                }`}
              >
                {product.stripe_metadata_videoQuality}
              </div>
            ))}
          </td>
        </tr>
        {/* Resolution */}
        <tr className="flex w-full items-center py-3">
          <td className="hidden flex-1 md:inline-flex">Resolution</td>
          <td className="ml-0 flex w-full items-center justify-between text-center md:ml-auto md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`mx-auto flex w-[calc(100%/3)] flex-1 items-center justify-center gap-x-1 text-center md:w-[calc(60%/3)] ${
                  currentPlan.id === product.id && 'font-bold text-white'
                }`}
              >
                {product.stripe_metadata_resolution}
              </div>
            ))}
          </td>
        </tr>
        {/* Portability */}
        <tr className="flex w-full items-center py-3">
          <td className="hidden flex-1 md:inline-flex">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          <td className="ml-0 flex w-full items-center justify-between text-center md:ml-auto md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`mx-auto flex w-[calc(100%/3)] flex-1 items-center justify-center gap-x-1 text-center md:w-[calc(60%/3)] ${
                  currentPlan.id === product.id && 'font-bold text-white'
                }`}
              >
                {product.stripe_metadata_portability === 'true' && (
                  <AiOutlineCheck
                    className={`text-2xl text-[#E50914] ${
                      currentPlan.id === product.id && 'font-bold !text-white'
                    }`}
                  />
                )}
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
