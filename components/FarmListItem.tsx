import React from 'react'
import {IPairInfo} from "../shared/interfaces";

interface IProps {
  farm: IPairInfo,
}

const FarmListItem: React.FunctionComponent<IProps> = ({ farm }) => {
  const formatNumber = (num: number) => Math.round(num);

  return (
    <div className="grid grid-cols-5 text-xl bg-stone-900 rounded-lg">
      <div className="flex ml-4 my-4">
        <div className="flex flex-col text-center text-soul">
          <div>
            <span className="font-bold">{farm.pair[0]}</span>/
            {farm.pair[1]}
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center font-bold my-4">{formatNumber(farm.apr)}</div>
      <div className="flex flex-col text-center font-bold my-4">{formatNumber(farm.earned)}</div>
      <div className="flex flex-col text-center font-bold my-4">{formatNumber(farm.ownership)}</div>
      <div className="flex flex-col text-center font-bold my-4">{formatNumber(farm.tvl)}</div>
    </div>
  );
};

export default FarmListItem;
