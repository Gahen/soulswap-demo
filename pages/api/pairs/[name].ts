// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {IPairInfo} from '../../../shared/interfaces';

const tokens = ['seance', 'soul'];
const pairTokens = ['lux', 'ftm', 'eth', 'btc', 'usdc', 'unidx'];

type Data = Array<IPairInfo>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { name },
    method,
  } = req;

  if (method === 'GET' && typeof name === 'string' && tokens.includes(name)) {
    res.status(200).json(getPairs(name));
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function getPairs(name: string) {
  const finalTokens = pairTokens.concat(tokens.filter(t => t !== name));
  return finalTokens.map(token => makePair(name, token)); // Array<string> => Array<[string, string])>
}

function makePair(tokenA: string, tokenB: string): PairInfo {
  return {
    pair: [tokenA, tokenB],
    apr: Math.random() * 2000,
    earned: Math.random() * 10000,
    ownership: Math.random() * 100,
    tvl: Math.random() * 1000000,
  }
}
