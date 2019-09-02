import React from 'react'
import App from 'next/app'

// Global styles
import '../styles/global.scss'

class NoteApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default NoteApp
