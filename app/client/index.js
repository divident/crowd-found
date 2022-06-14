import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/541df11830474327beea6f4390209d81"));


import "./main.css"


const App = () => {

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
    });

    const [account, setAccount] = useState();
    const [amount, setAmount] = useState(0);


    const enableEtherum = () => {
        console.log("enable")
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                console.log(`accounts=${accounts.length}`)
                setAccount(accounts[0]);
            }
            ).catch((err) => {
                console.error(err)
            })


        ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }],
        }).then(() => {
            const jsonAbi = {type: 'function'}; // JSON ABI of the token contract
            const contractAddress = "0x952b1Ebc08F068faE698f09589D70786db3c05D1"; // address of the token contract
            const tokenAddress = "0x952b1ebc08f068fae698f09589d70786db3c05d1"; // address of which you want to get the token balance
    
            return web3.eth.getBalance("0x952b1ebc08f068fae698f09589d70786db3c05d1");
        }
        ).then((balance) => {
            setAmount(balance/10e17);

            console.log(`balance=${JSON.stringify(balance)}`)

        }).catch((err) => {
            console.error(err);
        })

        //18_7453_8168_4460_9977_47



    }

    return (

        <div className="bg-gradient-to-r from-indigo-500 h-full min-h-screen">
            <div className="flex flex-col items-center py-5">
                <div className="flex-auto text-center w-1/2">
                    <h1 className="text-xl uppercase">Your Wallet</h1>
                </div>
                <div className="flex-auto w-1/2 bg-indigo-500 h-64 rounded-md mt-4 shadow-xl">
                </div>
                <div>
                    <button className="rounded-none" onClick={enableEtherum}>Enable</button>
                    {account && <p>Account: {account}</p>}
                    {amount && <p>Amount: {amount}</p>}
                </div>
            </div>
        </div>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
