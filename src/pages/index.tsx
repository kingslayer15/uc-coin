import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher, SetPledgeReqireFrom} from '../components'


function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js</h1>

      <Connect />
      
      <SetPledgeReqireFrom/>
      

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}

export default Page
