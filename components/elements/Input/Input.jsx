import styles from './Input.module.scss'

import React from 'react'
import TextField from '@mui/material/TextField'

// Кастомный Input

const Input = React.forwardRef(({ ...props }, ref) => {
  return (
    <TextField className={styles.field} {...props} ref={ref} color='neutral' />
  )
})

export default Input
