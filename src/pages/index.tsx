import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher} from '../components'
import { Contracts } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      {/* <h1>wagmi + Next.js</h1> */}

      <Connect />
      
      

      {isConnected && (
        <>
          {/* <Contracts.GetPledgeInfo/>
          <Contracts.UpdateMintCfg/>
          <Contracts.SetMintCfg/>
          <Contracts.SetPledgeReqire/>
          <Contracts.SetPledgeReturn/>
          <Account />
          <NetworkSwitcher /> */}
          <Contracts.GetPledgeInfo/>
          <Contracts.UpdateMintCfg/>
        </>
      )}
    </>
  )
}

export default Page
