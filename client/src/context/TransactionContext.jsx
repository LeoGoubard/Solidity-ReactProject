import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (evt, name) => {
    console.log('name', name);
    setFormData((prevState) => ({ ...prevState, [name]: evt.target.value }));
  }

  const getAllTransactions = async () => {
    try {
      if(!ethereum) return alert("please install metamask");
      const transactionContract = getEthereumContract();

      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transactionItem) => ({
        addressTo: transactionItem.receiver,
        addressFrom: transactionItem.sender,
        timestamp: new Date(transactionItem.timestamp.toNumber() * 1000).toLocaleString(),
        message: transactionItem.message,
        keyword: transactionItem.keyword,
        amount: parseInt(transactionItem.amount._hex) / (10 ** 18)
      }))
      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error)
    }
  }
  const checkIfWalletIsConnected = async () => {
    try {
      if(!ethereum) return alert("please install metamask");
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log('No accounts found');
      }
      console.log(accounts)
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
    
  }

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");    
    }
  }
  const connectWallet = async () => {
    try {
      if(!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({ method:'eth_requestAccounts' });
    
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  const sendTransaction = async () => {
    console.log(formData);
    try {
      if(!ethereum) return alert("please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex,
        }]
      })

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");     
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange, formData, sendTransaction, transactions, isLoading }} >
        {children}
    </TransactionContext.Provider>
  )
}