import * as React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import Header from '@components/header'

export default function Default() {
  return (
    <div>
      <Link to="/login">
        <div>login!</div>
      </Link>
    </div>
  )
}
