import FarmListItem from './FarmListItem'
import React from 'react'
import useSortableData from '../hooks/useSortableData'
import {ChevronUp, ChevronDown} from 'react-feather'




interface IProps {
  farms: any,
  term: string
}

interface ITableHeaderProps { name: string, id: string, sortConfig: any, requestSort: any }

const TableHeader : React.FunctionComponent<ITableHeaderProps> = ({ name, id, sortConfig, requestSort }) => (
  <div
    className="flex items-center justify-center px-4 cursor-pointer hover:text-high-emphesis"
    onClick={() => requestSort(id)}
  >
    {name}
    {sortConfig &&
      sortConfig.key === id &&
      ((sortConfig.direction === 'ascending' && <ChevronUp width={12} height={12} />) ||
        (sortConfig.direction === 'descending' && <ChevronDown width={12} height={12} />))}
  </div>
);

const FarmList: React.FunctionComponent<IProps> = ({ farms, term }) => {
  const { items, requestSort, sortConfig } = useSortableData(farms, { key: 'apr' })

  return items ? (
    <>
      <div className="grid grid-cols-5 text-base font-bold text-primary bg-stone-900 rounded-lg mb-4">
        <div
          className="flex items-center cursor-pointer my-4 ml-4"
        >
          <div className="hover:text-high-emphesis">LP TOKEN PAIR</div>
        </div>
        <TableHeader name="Rewards" id="rewards" sortConfig={sortConfig} requestSort={requestSort} />
        <TableHeader name="Earned" id="earned" sortConfig={sortConfig} requestSort={requestSort} />
        <TableHeader name="Ownership" id="ownership" sortConfig={sortConfig} requestSort={requestSort} />
        <TableHeader name="Value (TVL)" id="tvl" sortConfig={sortConfig} requestSort={requestSort} />
      </div>
      <div className="space-y-4">
        {items.map((farm, index) => (
          <FarmListItem key={index} farm={farm} />
        ))}
      </div>
    </>
  ) : (
    <div className="w-full py-6 text-center">{term ? <span>No Results.</span> : "Loading"}</div>
  )
}

export default FarmList
