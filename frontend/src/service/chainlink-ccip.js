// https://ccip.chain.link/api/query?query=TRANSACTION_SEARCH_QUERY&variables=%7B%22msgIdOrTxnHash%22%3A%220x8189938b03c6d327d6f770384402ec3e4d90c73e20c1577c4a4089e60877da7b%22%7D
import axios from 'axios';

export async function getCCIPMessageId(transcationHash) {
    let payload={
        msgIdOrTxnHash:transcationHash
    };
    return await axios.get(`https://ccip.chain.link/api/query?query=TRANSACTION_SEARCH_QUERY&variables=${encodeURIComponent(JSON.stringify(payload))}`)
}