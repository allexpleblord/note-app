import '../styles/components/Layout.scss'
import { FunctionComponent } from 'react'

const Layout: FunctionComponent = props => (
  <div className="layout">
    { props.children }
  </div>
)

export default Layout