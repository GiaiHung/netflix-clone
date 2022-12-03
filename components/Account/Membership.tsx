import React, { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import useSubscription from '../../hooks/useSubscription'
import { redirectManagePlan } from '../../lib/stripe'

function Membership() {
  const { user } = useAuth()
  const subscription = useSubscription(user)
  const [isBillLoading, setIsBillLoading] = useState<boolean>(false)

  const handleChangePlan = () => {
    if (subscription) {
      setIsBillLoading(true)
      redirectManagePlan()
    }
  }
  return (
    <div className="mt-6 grid grid-cols-1 space-y-4 border p-4 md:grid-cols-4 md:space-y-0 md:border-x-0 md:border-b-0 md:px-0 md:py-3">
      <div className="space-y-4">
        <h2 className="text-lg font-thin text-gray-400">Membership & Billing</h2>
        <button
          disabled={isBillLoading || !subscription}
          className="jusitfy-center flex w-fit min-w-[200px] items-center whitespace-nowrap rounded-md bg-gray-200 px-6 py-2 font-semibold text-black hover:opacity-80"
          onClick={handleChangePlan}
        >
          {isBillLoading ? (
            <AiOutlineLoading className="mx-auto animate-spin text-2xl" />
          ) : (
            'Cancle/Change Memebership'
          )}
        </button>
      </div>

      <div className="col-span-3 mt-4 space-y-4 divide-y divide-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p>{user?.email}</p>
            <p className="font-medium text-gray-500">Password: ********</p>
          </div>
          <div>
            <p className="changePlanLink">Change email</p>
            <p className="changePlanLink">Change password</p>
          </div>
        </div>

        <div className="flex flex-col pt-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-x-1">
            <p>
              {subscription?.cancel_at_period_end
                ? 'Your membership will end on: '
                : 'Your next billing is: '}
            </p>
            <p className="font-semibold">{subscription?.current_period_end}</p>
          </div>
          <div>
            <p className="changePlanLink">Manage payment info</p>
            <p className="changePlanLink">Add backup payment method</p>
            <p className="changePlanLink">Billing Details</p>
            <p className="changePlanLink">Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership
