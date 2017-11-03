import React from 'react'
import {RouteHandler, Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import './style.scss'

class SiteNav extends React.Component {
    render() {
        const {location} = this.props
        return (
            <nav className='blog-nav'>
              <ul>
                <li>
                  <Link to={prefixLink('/')}
                    activeClassName="current"
                    onlyActiveOnIndex>
                      Blog Posts
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/hacks/')}
                    activeClassName="current">
                      Daily Hacks
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/about/')}
                    activeClassName="current">
                      About me
                  </Link>
                </li>
                <li>
                  <Link to={prefixLink('/contact/')}
                    activeClassName="current">
                      Contact me
                  </Link>
                </li>
              </ul>
            </nav>
            );
    }
}

SiteNav.propTypes = {
    location: React.PropTypes.object,
}

export default SiteNav
