import React, { useMemo, useState } from 'react'
import './Metronome.css'

type Props = {
  bpm: number
}

let lastUpdatedAt: number | null = null

const Metronome = React.forwardRef<HTMLDivElement, Props>(
  ({ bpm }: Props, ref) => {
    const numberOfSecondsPerCycle = useMemo(() => {
      return 120 / bpm
    }, [bpm])

    const width = 300
    const height = 300
    const midX = width / 2
    const midY = height / 2

    return (
      <div ref={ref} style={{ width, height, position: 'relative' }}>
        <svg
          height={height}
          width={width}
          style={{ backgroundColor: 'lightcyan', position: 'relative' }}
        >
          <polyline
            points={`
            ${midX - 40},${height - 5}
            40,${height - 5}
            ${midX - 30},${5}
            ${midX + 30},${5}
            ${width - 40},${height - 5}
            ${midX + 40},${height - 5}
          `}
            style={{
              fill: 'lightyellow',
              stroke: 'black',
              strokeWidth: 10,
              strokeLinecap: 'round',
            }}
          />
          <polyline
            points={`
            ${midX - 40},${height - 5}
            40,${height - 5}
            ${midX - 90},${(height * 3) / 4}
            ${midX + 90},${(height * 3) / 4}
            ${width - 40},${height - 5}
            ${midX + 40},${height - 5}
          `}
            style={{
              fill: 'lightcoral',
              stroke: 'black',
              strokeWidth: 10,
              strokeLinecap: 'round',
            }}
          />
          <line
            x1={midX - 10}
            y1={30}
            x2={midX + 10}
            y2={30}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            x1={midX - 10}
            y1={60}
            x2={midX + 10}
            y2={60}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            x1={midX - 10}
            y1={90}
            x2={midX + 10}
            y2={90}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            x1={midX - 12}
            y1={120}
            x2={midX + 12}
            y2={120}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            x1={midX - 15}
            y1={150}
            x2={midX + 15}
            y2={150}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            x1={midX - 18}
            y1={180}
            x2={midX + 18}
            y2={180}
            style={{ strokeWidth: 10, stroke: 'black', strokeLinecap: 'round' }}
          />
          <line
            {...{
              x1: midX,
              y1: height - 80,
              x2: midX,
              y2: 50,
            }}
            style={{
              animation: `metronome-cycle-rotation ${numberOfSecondsPerCycle}s infinite linear`,
              strokeWidth: 10,
              stroke: '#666',
              strokeLinecap: 'round',
              transform: 'rotate(-45deg)',
              transformOrigin: '50% 70%',
            }}
          />
          <rect
            {...{
              x: midX - 10,
              y: 65,
              width: 20,
              height: 20,
              rx: 2,
              ry: 2,
            }}
            style={{
              animation: `metronome-cycle-rotation ${numberOfSecondsPerCycle}s infinite linear`,
              strokeWidth: 10,
              fill: 'lightseagreen',
              stroke: 'black',
              strokeLinecap: 'round',
              transform: 'rotate(-45deg)',
              transformOrigin: '50% 70%',
            }}
          />
          <circle
            cx={midX}
            cy={(height * 3) / 4 - 12}
            r={12}
            stroke="black"
            strokeWidth={10}
            fill="sandybrown"
          />
          <circle
            cx={midX}
            cy={(height * 7) / 8}
            r={15}
            stroke="black"
            strokeWidth={10}
            fill="sandybrown"
          />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>
    )
  }
)

export default Metronome
