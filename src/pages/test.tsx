import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher} from '../components'
import { Contracts } from '../components'




function Test() {
    const { isConnected } = useAccount()
  
    return (
      <>
        {/* <h1>wagmi + Next.js</h1> */}
  
        <Connect />
        
        
  
        {isConnected && (
          <>
            <Contracts.GetPledgeInfo/>
            
            <Contracts.GetPledgeReqire/>
            
            <Contracts.GetPledgeReturn/>
            
            <Contracts.Mint/>
            
            <Contracts.MintPledge/>
            
            <Contracts.PledgeToken/>
            
            <Contracts.SetMintCfg/>
            
            <Contracts.SetPledgeReqire/>
            
            <Contracts.SetPledgeReturn/>
            
            <Contracts.UpdateMintCfg/>
            
            <Contracts.WithdrawPledge/>
            
            <Contracts.WithdrawProfit/>
          

            <Account />
            <NetworkSwitcher />
          </>
        )}
      </>
    )
  }


  export default Test