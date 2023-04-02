import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher} from '../components'
import { GetPledgeInfo, UpdateMintCfg, SetMintCfg, SetPledgeReqire, SetPledgeReturn} from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js</h1>

      <Connect />
      
      

      {isConnected && (
        <>
          {/* <GetPledgeInfo/>
          <UpdateMintCfg/>
          <SetMintCfg/>
          <SetPledgeReqire/>
          <SetPledgeReturn/>
          <Account />
          <NetworkSwitcher /> */}
        </>
      )}
    </>
  )
}

export default Page
