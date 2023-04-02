import { 
  usePrepareContractWrite, 
  useContractWrite, 
  useSigner, 
  useContract, 
  useProvider, 
  useContractRead, 
  useAccount,
  useWaitForTransaction 
} from 'wagmi'
import * as mainAbi from '../contract/ts/mainAbi'
import { contractAddress } from '../constants/ContractConfig'
import { useState } from 'react'




export function GetPledgeInfo() {

  const { address, isConnecting, isDisconnected, connector } = useAccount()
  

     // 使用useState钩子来管理输入框的状态
 const [acc, setAcc] = useState('')
 const [tokenAddr, setTokenAddr] = useState('')
 const [tokenId, setTokenId] = useState(0)


  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi.getPledgeInfoAbi,
    functionName: 'getPledgeInfo',
    args: [address, '0x77294988Be744e15E4B2Efa0442B48B1624C7911', 1],
  })

  const handleClick = async () => {
    if (!connector) return;
    await connector.connect();

    console.log('connector name: ' + connector?.name);

    console.log('data : ' + data);
    console.log('isLoading : ' + isLoading);
    console.log('isError : ' + isError);

    console.log('address : ' + address);
    console.log('isConnecting : ' + isConnecting);
    console.log('isDisconnected : ' + isDisconnected);
  };

    return (
    <div>
    <label htmlFor="acc">用户地址</label>
    <input id="acc" name="acc" type="text" value={acc} onChange={(e) => setAcc(e.target.value)}  />
    <label htmlFor="tokenAddr">代币地址：</label>
    <input id="tokenAddr" name="tokenAddr" type="text" value={tokenAddr} onChange={(e) => setTokenAddr(e.target.value)}  />
    <label htmlFor="tokenId">tokenId：</label>
    <input id="tokenId" name="tokenId" type="number" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))}/>
    <button onClick={() => handleClick()}>
    getPledgeInfo
    </button>
  
  </div>
    )
}


export function GetPledgeReturnAbi() {
  const [tokenAddr, setTokenAddr] = useState('');
  const [pledgeDays, setPledgeDays] = useState(0);

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi.getPledgeReturnAbi,
    functionName: 'getPledgeReturnAbi',
    args: [tokenAddr, pledgeDays],
  });

  return (
    <div>
      <label>
        Token Address:
        <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
      </label>
      <label>
        Pledge Days:
        <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
      </label>
      <button onClick={() => console.log(data)}>
        Get Pledge Return
      </button>
    </div>
  );
}

export function GetPledgeReqireAbi() {
  const [plgToken, setPlgToken] = useState('');

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi.getPledgeReqireAbi,
    functionName: 'getPledgeReqireAbi',
    args: [plgToken],
  });

  return (
    <div>
      <label>
        Plg Token:
        <input type="text" value={plgToken} onChange={e => setPlgToken(e.target.value)} />
      </label>
      <button onClick={() => console.log(data)}>
        Get Pledge Reqire
      </button>
    </div>
  );
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

      // const { address, isConnecting, isDisconnected } = useAccount()
      const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
          console.log('Connected', { address, connector, isReconnected })
        },
      })
      
       // 使用useState钩子来管理输入框的状态
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
    args: [account.address, 1, 2, 1, 1, '0x4977f63b15984e8a98228Df7876a50080aca1143', 0, 0.001, '0x1704b99a38f8381B7A1Cd2f93fc11346a28c8e8D', 0, 0.002, 0]
  })
  const { data, error, isError, write } = useContractWrite(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

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
      <button onClick={() => {
        
                console.log("data : " + data)
                console.log("error : " + error)
                console.log("is : " + error)
                console.log("write : " + write)
                console.log("isLoading : " + isLoading)
                console.log("isSuccess : " + isSuccess)
                console.log("address : " + account.address)
                console.log("isConnecting : " + account.isConnecting)
                console.log("isDisconnected : " + account.isDisconnected)
      }}>
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

      <label htmlFor="nType">nft类型，普通，正常，点票N Type:</label>
      <input
        id="nType"
        type="number"
        value={nType}
        onChange={(e) => setNType(Number(e.target.value))}
      />

      <label htmlFor="nLevel">点票级才有等级，level0-2三级N Level:</label>
      <input
        id="nLevel"
        type="number"
        value={nLevel}
        onChange={(e) => setNLevel(Number(e.target.value))}
      />

      <label htmlFor="payToken">支付铸造的token, 0表示ETHPay Token:</label>
      <input
        id="payToken"
        type="text"
        value={payToken}
        onChange={(e) => setPayToken(e.target.value)}
      />

      <label htmlFor="payValue">支付数量Pay Value:</label>
      <input
        id="payValue"
        type="number"
        value={payValue}
        onChange={(e) => setPayValue(Number(e.target.value))}
      />

      <label htmlFor="aDropToken">空投TokenA Drop Token:</label>
      <input
        id="aDropToken"
        type="text"
        value={aDropToken}
        onChange={(e) => setADropToken(e.target.value)}
      />

      <label htmlFor="aDropValue">空投数量A Drop Value:</label>
      <input
        id="aDropValue"
        type="number"
        value={aDropValue}
        onChange={(e) => setADropValue(Number(e.target.value))}
      />
      <button onClick={() => {
        console.log("data : " + data)
        console.log("isLoading : " + isLoading)
        console.log("isSuccess : " + isSuccess)
        console.log("write : " + write)
      }}>
      SetMintCfg
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

export function Mint() {
  const [tokenAddr, setTokenAddr] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [cid, setCid] = useState('');

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.mintAbi,
    functionName: 'mint',
    args: [tokenAddr, tokenId, tokenAmount, cid],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      />
      <label htmlFor="tokenId">Token ID:</label>
      <input
        id="tokenId"
        type="number"
        value={tokenId}
        onChange={(e) => setTokenId(Number(e.target.value))}
      />
      <label htmlFor="tokenAmount">Token Amount:</label>
      <input
        id="tokenAmount"
        type="number"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(Number(e.target.value))}
      />
      <label htmlFor="cid">CID:</label>
      <input
        id="cid"
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={() => console.log(data)}>mint</button>
    </div>
  );
}

export function MintPledgeAbi() {
  const [tokenAddr, setTokenAddr] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [cid, setCid] = useState('');

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.mintPledgeAbi,
    functionName: 'mintPledgeAbi',
    args: [tokenAddr, tokenId, tokenAmount, cid],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <label htmlFor="tokenAddr">Token Address:</label>
      <input
        id="tokenAddr"
        type="text"
        value={tokenAddr}
        onChange={(e) => setTokenAddr(e.target.value)}
      />
      <label htmlFor="tokenId">Token ID:</label>
      <input
        id="tokenId"
        type="number"
        value={tokenId}
        onChange={(e) => setTokenId(Number(e.target.value))}
      />
      <label htmlFor="tokenAmount">Token Amount:</label>
      <input
        id="tokenAmount"
        type="number"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(Number(e.target.value))}
      />
      <label htmlFor="cid">CID:</label>
      <input
        id="cid"
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={() => console.log(data)}>mintPledgeAbi</button>
    </div>
  );
}


export function PledgeTokenAbi() {
  const [tokenAddr, setTokenAddr] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [pledgeDays, setPledgeDays] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.pledgeTokenAbi,
    functionName: 'pledgeTokenAbi',
    args: [tokenAddr, tokenId, tokenAmount, pledgeDays]
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <label>
        Token Address:
        <input type="text" value={tokenAddr} onChange={e => setTokenAddr(e.target.value)} />
      </label>
      <label>
        Token ID:
        <input type="number" value={tokenId} onChange={e => setTokenId(Number(e.target.value))} />
      </label>
      <label>
        Token Amount:
        <input type="number" value={tokenAmount} onChange={e => setTokenAmount(Number(e.target.value))} />
      </label>
      <label>
        Pledge Days:
        <input type="number" value={pledgeDays} onChange={e => setPledgeDays(Number(e.target.value))} />
      </label>
      <button onClick={() => console.log(data)}>
        Pledge Token
      </button>
    </div>
  );
}

export function WithdrawProfitAbi() {
  const [pledgeToken, setPledgeToken] = useState('');
  const [tokenId, setTokenId] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.withdrawProfitAbi,
    functionName: 'withdrawProfitAbi',
    args: [pledgeToken, tokenId]
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <label>
        Pledge Token:
        <input type="text" value={pledgeToken} onChange={e => setPledgeToken(e.target.value)} />
      </label>
      <label>
        Token ID:
        <input type="number" value={tokenId} onChange={e => setTokenId(Number(e.target.value))} />
      </label>
      <button onClick={() => console.log(data)}>
        Withdraw Profit
      </button>
    </div>
  );
}


export function WithdrawPledgeAbi() {
  const [plgToken, setPlgToken] = useState('');
  const [tokenId, setTokenId] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi.withdrawPledgeAbi,
    functionName: 'withdrawPledgeAbi',
    args: [plgToken, tokenId]
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <label>
        PLG Token:
        <input type="text" value={plgToken} onChange={e => setPlgToken(e.target.value)} />
      </label>
      <label>
        Token ID:
        <input type="number" value={tokenId} onChange={e => setTokenId(Number(e.target.value))} />
      </label>
      <button onClick={() => console.log(data)}>
        Withdraw Pledge
      </button>
    </div>
  );
}


