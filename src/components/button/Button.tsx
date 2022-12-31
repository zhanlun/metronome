import React, { useMemo, useState } from 'react'
import styles from './Button.module.css'

type Props = {
  [k: string]: any;
}

const Button = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }: Props, ref) => {

    return (
      <button className={styles.playButton} {...props}>
        {children}
      </button>
    )
  }
)

export default Button
