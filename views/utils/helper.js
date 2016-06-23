import React from 'react'

import styles from './styles'

export const highlight = q => e => {
  const idx = e.indexOf(q)
  return (
    <span>
      { e.slice(0, idx) }
      <span className={styles.highlighten}>
        { e.slice(idx, idx + q.length) }
      </span>
      { e.slice(idx + q.length) }
    </span>
  )
}
