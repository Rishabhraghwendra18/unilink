'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const materialUiTheme = createTheme({
  palette: {
    mode: 'dark',
    background:{
      default:'#12132A'
    }
  },
  typography:{
    fontFamily:[
      "Outfit",
      "sans-serif"
    ].join(',')
  }
});

export default function Home() {
  return (
    <ThemeProvider theme={materialUiTheme}>
      <CssBaseline />
    <main className={styles.main}>
      hello
    </main>

    </ThemeProvider>
  )
}
