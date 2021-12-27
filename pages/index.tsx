import type { NextPage } from 'next'
import {useCallback, useEffect, useState} from 'react';
import Search from "../components/Search";
import FarmList from "../components/FarmList";
import {IPairInfo} from '../shared/interfaces';


const tokenMatch = (search: string) => (pairInfo: IPairInfo) => 
  pairInfo.pair[0].includes(search) || pairInfo.pair[1].includes(search);

const Home: NextPage = () => {
  const [term, setTerm ] = useState("");
  const [result, setResult ] = useState<IPairInfo[]>([])
  const [filteredResults, setFilteredResults ] = useState<IPairInfo[]>([])

  const search = useCallback((val: string) => {
    setTerm(val)
    setFilteredResults(result.filter(tokenMatch(val)))
  }, [result]);

  // init
  useEffect(() => {
    const fetchData = async () => {
      // I'd usually put all API call logic in a separate folder and file(s) but seems overkill here
      const res = await fetch(`/api/pairs/soul`)
      const fetchedResults = await res.json()
      setResult(fetchedResults)
      setFilteredResults(fetchedResults)
    }
    fetchData();
  }, [])

  return (
    <div className="grid h-full w-full">
      <div className="max-w-screen-lg w-full justify-self-center" style={{position: "relative"}}>
	<div style={{filter: "blur(150px) opacity(0.6)", zIndex: -1}} className="absolute top-1/4 -left-1 bg-purple bottom-4 w-3/5 rounded-full z-0 hidden sm:block"></div>
	<div style={ {filter: "blur(150px) opacity(0.6)", zIndex: -1 } } className="absolute bottom-1/4 -right-1 bg-purple top-4 w-3/5 rounded-full z-0 hidden sm:block"></div>
        <Search
          search={search}
          term={term}
          inputProps={{
            className:
              'relative w-full bg-transparent border border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary font-bold text-base px-6 py-3.5',
          }}
        />
        <div className="flex items-center text-xl font-bold text-high-emphesis whitespace-nowrap mb-4">
          Farms{' '}
          <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
        </div>

        <FarmList farms={filteredResults} term={term} />
      </div>
    </div>
  )
}

export default Home
