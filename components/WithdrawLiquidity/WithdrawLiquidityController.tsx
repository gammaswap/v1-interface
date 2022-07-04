import * as React from 'react'
import { useState } from 'react'
import WithdrawLiquidityView from './WithdrawLiquidityView'

const WithdrawLiquidity = () => {
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)

  async function changeSliderPercentage(percentage: number) {
    let data: number = parseInt(percentage.toFixed(0))
    setsliderPercentage(data)
  }

  async function onDone(percent: number) {
    console.log(`I'm done. here's the percent: ${percent}%`);
  };

    return (
        <WithdrawLiquidityView
            sliderPercentage={sliderPercentage}
            changeSliderPercentage={changeSliderPercentage}
            onDone={onDone}
        />
    )
}

export default WithdrawLiquidity;