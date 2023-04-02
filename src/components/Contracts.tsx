import { usePrepareContractWrite, useContractWrite, useSigner, useContract, useProvider, useContractRead, useAccount } from 'wagmi'
import * as mainAbi from '../../contract/ts/mainAbi'
import { contractAddress } from '../constants/ContractConfig'
import { useState } from 'react'




export function GetPledgeInfo() {
     // 使用useState钩子来管理输入框的状态
 const [acc, setAcc] = useState('')
 const [tokenAddr, setTokenAddr] = useState('')
 const [tokenId, setTokenId] = useState(0)


  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi.getPledgeInfoAbi,
    functionName: 'getPledgeInfo',
    args: [acc, tokenAddr, tokenId],
  })

    return (
    <div>
    <label htmlFor="acc">用户地址</label>
    <input id="acc" name="acc" type="text" value={acc} onChange={(e) => setAcc(e.target.value)}  />
    <label htmlFor="tokenAddr">代币地址：</label>
    <input id="tokenAddr" name="tokenAddr" type="text" value={tokenAddr} onChange={(e) => setTokenAddr(e.target.value)}  />
    <label htmlFor="tokenId">tokenId：</label>
    <input id="tokenId" name="tokenId" type="number" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))}/>
    <button onClick={() => console.log(data)}>
    getPledgeInfo
    </button>
  
  </div>
    )
}

export function UpdateMintCfg() {
  // "aDropERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "aDropToken": "空投Token",
  // "aDropValue": "空投数量",
  // "adAsProfit": "是否将空投token作为质押收益Token",
  // "erc": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "nLevel": "点票级才有等级，level0-2三级",
  // "nType": "nft类型，普通，正常，点票",
  // "payERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "payToken": "支付铸造的token, 0表示ETH",
  // "payValue": "支付数量",
  // "pledgeDays": "质押周期",
  // "tokenAddr": "nft支付地址"

  
      const { address, isConnecting, isDisconnected } = useAccount()

       // 使用useState钩子来管理输入框的状态
      //  const [tokenAddr, setTokenAddr] = useState('');
       const [erc, setErc] = useState(0);
       const [nType, setNType] = useState(0);
       const [nLevel, setNLevel] = useState(0);
       const [pledgeDays, setPledgeDays] = useState(0);
       const [payToken, setPayToken] = useState('');
       const [payERC, setPayERC] = useState(0);
       const [payValue, setPayValue] = useState(0);
       const [aDropToken, setADropToken] = useState('');
       const [aDropERC, setADropERC] = useState(0);
       const [aDropValue, setADropValue] = useState(0);
       const [adAsProfit, setAdAsProfit] = useState(false);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.updateMintCfgAbi,
    functionName: 'updateMintCfg',
    args: [address, erc, nType, nLevel, pledgeDays, payToken, payERC, payValue, aDropToken, aDropERC, aDropValue, adAsProfit]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return (
    <div>
    {/* <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      /> */}
      
      <label htmlFor="erc">ERC:</label>
      <input
        id="erc"
        type="number"
        value={erc}
        onChange={(e) => setErc(Number(e.target.value))}
      />
      
      <label htmlFor="nType">nType:</label>
      <input
        id="nType"
        type="number"
        value={nType}
        onChange={(e) => setNType(Number(e.target.value))}
      />
      
      <label htmlFor="nLevel">nLevel:</label>
      <input
        id="nLevel"
        type="number"
        value={nLevel}
        onChange={(e) => setNLevel(Number(e.target.value))}
      />
      
      <label htmlFor="pledgeDays">Pledge Days:</label>
      <input
        id="pledgeDays"
        type="number"
        value={pledgeDays}
        onChange={(e) => setPledgeDays(Number(e.target.value))}
      />
      
      <label htmlFor="payToken">Pay Token:</label>
      <input
        id="payToken"
        type="text"
        value={payToken}
        onChange={(e) => setPayToken(e.target.value)}
      />
      
      <label htmlFor="payERC">Pay ERC:</label>
      <input
        id="payERC"
        type="number"
        value={payERC}
        onChange={(e) => setPayERC(Number(e.target.value))}
      />
      
      <label htmlFor="payValue">Pay Value:</label>
      <input
        id="payValue"
        type="number"
        value={payValue}
        onChange={(e) => setPayValue(Number(e.target.value))}
      />
      
      <label htmlFor="aDropToken">A Drop Token:</label>
      <input
        id="aDropToken"
        type="text"
        value={aDropToken}
        onChange={(e) => setADropToken(e.target.value)}
      />
      
      <label htmlFor="aDropERC">A Drop ERC:</label>
      <input
        id="aDropERC"
        type="number"
        value={aDropERC}
        onChange={(e) => setADropERC(Number(e.target.value))}
      />

      <label htmlFor="aDropValue">A Drop Value:</label>
      <input
        id="aDropValue"
        type="number"
        value={aDropValue}
        onChange={(e) => setADropValue(Number(e.target.value))}
      />

      <label htmlFor="adAsProfit">Ad As Profit:</label>
      <input
        id="adAsProfit"
        type="checkbox"
        checked={adAsProfit}
        onChange={(e) => setAdAsProfit(e.target.checked)}
      />
      <button onClick={() => console.log(data)}>
    updateMintCfg
    </button>
  
  </div>
    )
}

export function SetMintCfg() {

  // "aDropERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "aDropToken": "空投Token",
  // "aDropValue": "空投数量",
  // "adAsProfit": "是否将空投token作为质押收益Token",
  // "erc": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "nLevel": "点票级才有等级，level0-2三级",
  // "nType": "nft类型，普通，正常，点票",
  // "payERC": "Token类型(0=>ERC20,1,ERC721,2,ERC1155)",
  // "payToken": "支付铸造的token, 0表示ETH",
  // "payValue": "支付数量",
  // "pledgeDays": "质押周期",
  // "tokenAddr": "nft支付地址"

  
  const { address, isConnecting, isDisconnected } = useAccount()

  // const [tokenAddr, setTokenAddr] = useState('');
  const [nType, setNType] = useState(0);
  const [nLevel, setNLevel] = useState(0);
  const [payToken, setPayToken] = useState('');
  const [payValue, setPayValue] = useState(0);
  const [aDropToken, setADropToken] = useState('');
  const [aDropValue, setADropValue] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.setMintCfgAbi,
    functionName: 'setMintCfg',
    args: [address, nType, nLevel, payToken, payValue, aDropToken, aDropValue]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  return (
    <div>
    {/* <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      /> */}

      <label htmlFor="nType">N Type:</label>
      <input
        id="nType"
        type="number"
        value={nType}
        onChange={(e) => setNType(Number(e.target.value))}
      />

      <label htmlFor="nLevel">N Level:</label>
      <input
        id="nLevel"
        type="number"
        value={nLevel}
        onChange={(e) => setNLevel(Number(e.target.value))}
      />

      <label htmlFor="payToken">Pay Token:</label>
      <input
        id="payToken"
        type="text"
        value={payToken}
        onChange={(e) => setPayToken(e.target.value)}
      />

      <label htmlFor="payValue">Pay Value:</label>
      <input
        id="payValue"
        type="number"
        value={payValue}
        onChange={(e) => setPayValue(Number(e.target.value))}
      />

      <label htmlFor="aDropToken">A Drop Token:</label>
      <input
        id="aDropToken"
        type="text"
        value={aDropToken}
        onChange={(e) => setADropToken(e.target.value)}
      />

      <label htmlFor="aDropValue">A Drop Value:</label>
      <input
        id="aDropValue"
        type="number"
        value={aDropValue}
        onChange={(e) => setADropValue(Number(e.target.value))}
      />
      <button onClick={() => console.log(data)}>
    updateMintCfg
    </button>
  
  </div>
    )
}

export function SetPledgeReqire() {
  
  const [plgToken, setPlgToken] = useState('');
  const [pledgeTokenErc, setPledgeTokenErc] = useState(0);
  const [profitToken, setProfitToken] = useState('');
  const [profitTokenErc, setProfitTokenErc] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.setPledgeReqireAbi,
    functionName: 'setPledgeReqire',
    args: [plgToken, pledgeTokenErc, profitToken, profitTokenErc]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  return (
    <div>
  <label htmlFor="plgToken">Plg Token:</label>
      <input
        id="plgToken"
        type="text"
        value={plgToken}
        onChange={(e) => setPlgToken(e.target.value)}
      />

      <label htmlFor="pledgeTokenErc">Pledge Token ERC:</label>
      <input
        id="pledgeTokenErc"
        type="number"
        value={pledgeTokenErc}
        onChange={(e) => setPledgeTokenErc(parseInt(e.target.value))}
      />

      <label htmlFor="profitToken">Profit Token:</label>
      <input
        id="profitToken"
        type="text"
        value={profitToken}
        onChange={(e) => setProfitToken(e.target.value)}
      />

      <label htmlFor="profitTokenErc">Profit Token ERC:</label>
      <input
        id="profitTokenErc"
        type="number"
        value={profitTokenErc}
        onChange={(e) => setProfitTokenErc(parseInt(e.target.value))}
      />
      <button onClick={() => console.log(data)}>
    updateMintCfg
    </button>
  
  </div>
    )

}


export function SetPledgeReturn() {
  
  const [tokenAddr, setTokenAddr] = useState('');
  const [pledgeDays, setPledgeDays] = useState(0);
  const [pType, setPType] = useState(0);
  const [profit, setProfit] = useState(0);


  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.setPledgeReturnAbi,
    functionName: 'setPledgeReturn',
    args: [tokenAddr, pledgeDays, pType, profit]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div>
  <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        name="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      />

      <label htmlFor="pledgeDays">Pledge Days:</label>
      <input
        id="pledgeDays"
        name="pledgeDays"
        type="number"
        value={pledgeDays}
        onChange={(e) => setPledgeDays(parseInt(e.target.value, 10))}
      />

      <label htmlFor="pType">P Type:</label>
      <input
        id="pType"
        name="pType"
        type="number"
        value={pType}
        onChange={(e) => setPType(parseInt(e.target.value, 10))}
      />

      <label htmlFor="profit">Profit:</label>
      <input
        id="profit"
        name="profit"
        type="number"
        value={profit}
        onChange={(e) => setProfit(parseInt(e.target.value, 10))}
      />
      <button onClick={() => console.log(data)}>
    updateMintCfg
    </button>
  </div>
    )
}

export function mint() {


  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.mintAbi,
    functionName: 'mint',
    args: [tokenAddr, pledgeDays, pType, profit]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)


}


export function SetPledgeReturn() {
  
  constargsss


  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.setPledgeReturnAbi,
    functionName: 'setPledgeReturn',
    args: argsss
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div>
      inputsss
      <button onClick={() => console.log(data)}>
    updateMintCfg
    </button>
  </div>
    )
}


用react写几个输入框 分别赋值给tokenAddr: string, tokenId: number , tokenAmount: number , cid:string把这些参数组合成一个数组不要双引号，不要换行并用这个数组替换掉$argsss，并把useState放在以下方法开头，label和 input替换掉$inputsss。 用首字母小写的方法名替换掉$functionNamesss。用"mainAbi." + 首字母小写方法名 + Abi 替换掉$abisss，替换后的结果应该如此abi:mainAbi.mintAbi。方法名是Mint。

export function SetPledgeReturn() {
  
  


  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: $abisss,
    functionName: $functionNamesss,
    args: $argsss
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div>
      $inputsss
      <button onClick={() => console.log(data)}>
      $functionNamesss
    </button>
  </div>
    )
}