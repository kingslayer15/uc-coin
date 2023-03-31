// import { useContractWrite } from 'wagmi'

// // setPledgeReqire()方法可能是用于设置质押要求的函数，它可能需要传入一个质押代币地址、一个质押代币类型、一个收益代币地址和一个收益代币类型作为参数。
// function SetPledgeReqireForm() {
//   const { reset } = useContractWrite({
//     address: '0x314BD43a969b70BA2c7d7195E7aF723B9A875D2D', // 智能合约地址
//     abi: [
//       // 智能合约接口
//       {
//         inputs: [
//           {
//             internalType: 'address',
//             name: 'plgToken',
//             type: 'address',
//           },
//           {
//             internalType: 'enum Store.ERCType',
//             name: 'pledgeTokenErc',
//             type: 'uint8',
//           },
//           {
//             internalType: 'address',
//             name: 'profitToken',
//             type: 'address',
//           },
//           {
//             internalType: 'enum Store.ERCType',
//             name: 'profitTokenErc',
//             type: 'uint8',
//           },
//         ],
//         name: 'setPledgeReqire',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//       },
//     ] as const, // 添加const断言
//     functionName: 'setPledgeReqire', // 方法名
//     args: ['0x...', 0, '0x...', 0], // 参数，质押代币地址、质押代币类型、收益代币地址和收益代币类型
//   })

//   return <button onClick={() => reset()}>Set Pledge Reqire</button>
// }