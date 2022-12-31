import React, { useMemo, useState } from 'react'
import './Slider.css'

type Props = {
  value: string | number;
  onChange: (v: any) => void;
}

let lastUpdatedAt: number | null = null

const SliderInput = React.forwardRef<HTMLDivElement, Props>(
  ({ value, onChange }: Props, ref) => {

    return (
      <div ref={ref} className="slidecontainer">
        <p className='slider-text'>BPM: { value }</p>
        <input
          type="range"
          onChange={e => onChange(e.target.value)}
          min={10}
          max={240}
          value={value}
          className="slider"
          id="myRange"
        />
      </div>
    )
  }
)

export default SliderInput
