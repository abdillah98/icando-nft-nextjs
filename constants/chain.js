export const initialForm = {
	"name": "",
	"chain": "",
	"contract": "",
	"abi": [],
}

export const initialForm2 = {
	"name" : "",
    "description" : "",
    "contract_address": "",
    "chain_type": 1,
    "chain_name": "",
    "contract_abi": []
}

export const typeOptions = [
	{id: 1, name: "Mainnet"},
	{id: 2, name: "Testnet"}
]

export const nameOptions = [
	{id: 0, name: "Ethereum Mainnet"},
	{id: 1, name: "Mumbai Testnet"},
	{id: 2, name: "Kovan Testnet"},	
	{id: 3, name: "Ropsten Testnet"},	
	{id: 4, name: "Ringkeby Testnet"},	
	{id: 5, name: "Goerli Testnet"}
]