import { usePrepareContractWrite, useContractWrite, Unit } from 'wagmi'
import { useState } from 'react'

// setPledgeReqire()方法可能是用于设置质押要求的函数，它可能需要传入一个代币地址和一个质押数量作为参数。
const abi = [ // 智能合约接口
{
  inputs: [
    {
      "internalType": "address",
      "name": "plgToken",
      "type": "address"
    },
    {
      "internalType": "enum Store.ERCType",
      "name": "pledgeTokenErc",
      "type": "uint8"
    },
    {
      "internalType": "address",
      "name": "profitToken",
      "type": "address"
    },
    {
      "internalType": "enum Store.ERCType",
      "name": "profitTokenErc",
      "type": "uint8"
    }
  ],
  name: "setPledgeReqire",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}
];




export function SetPledgeReqireFrom() {
   // 使用useState钩子来管理输入框的状态
 const [plgToken, setPlgToken] = useState('')
 const [pledgeTokenErc, setPledgeTokenErc] = useState(0)
 const [profitToken, setProfitToken] = useState('')
 const [profitTokenErc, setProfitTokenErc] = useState(0)

 // 定义一个函数来处理输入框的变化，并更新相应的状态
 const handleChange = (event) => {
   const { name, value } = event.target
   switch (name) {
     case 'plgToken':
       setPlgToken(value)
       break
     case 'pledgeTokenErc':
       setPledgeTokenErc(Number(value))
       break
     case 'profitToken':
       setProfitToken(value)
       break
     case 'profitTokenErc':
       setProfitTokenErc(Number(value))
       break
     default:
       break
   }
 }
 
  
 const { config  } = usePrepareContractWrite({
  address: '0x314BD43a969b70BA2c7d7195E7aF723B9A875D2D', // 智能合约地址
  abi:abi , 
  functionName: 'setPledgeReqire', // 方法名
  args: [`0x${plgToken}`,pledgeTokenErc,`0x${profitToken}`,profitTokenErc] // 参数，代币地址和质押数量
})



// // 使用 useContractWrite 方法创建一个 writeAsync 函数，用于发送交易
// const { writeAsync } = useContractWrite(config);
// // 在调用 writeAsync 函数之前判断一下 writeAsync 是否存在
// if (writeAsync) {
// const txPromise = writeAsync();
// console.log(txPromise); // Promise<TransactionResponse>
// } else {
// console.log('WriteAsync function is not ready'); // 打印提示信息
// }
const { data, isLoading, isSuccess, write } = useContractWrite(config)
   
    return (
      <div>
        <label htmlFor="plgToken">质押代币地址：</label>
        <input id="plgToken" name="plgToken" type="text" value={plgToken} onChange={handleChange} />
        <label htmlFor="pledgeTokenErc">质押代币类型：</label>
        <input id="pledgeTokenErc" name="pledgeTokenErc" type="number" value={pledgeTokenErc} onChange={handleChange} />
        <label htmlFor="profitToken">收益代币地址：</label>
        <input id="profitToken" name="profitToken" type="text" value={profitToken} onChange={handleChange} />
        <label htmlFor="profitTokenErc">收益代币类型：</label>
        <input id="profitTokenErc" name="profitTokenErc" type="number" value={profitTokenErc} onChange={handleChange} />
        <button onClick={() => write?.()}>
          Set Pledge Reqire
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    )

}



// setPledgeReturn()方法可能是用于设置质押收益的函数，它可能需要传入一个代币地址、一个质押天数、