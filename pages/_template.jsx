import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import '../static/scss/reset.scss'
import '../static/scss/base.scss'
import '../static/scss/typography.scss'
import '../static/scss/colors.scss'

class Template extends React.Component {
    render() {
        const {location, children} = this.props
        const isHome = location.pathname === prefixLink('/') || location.pathname === prefixLink('/hacks/')
        const bodyColor = isHome ? '#f4f4f4' : 'white'

        return (
            <div style={{backgroundColor: bodyColor}}>
                <div className='wrapper'>
                  { children }
                </div>
            </div>
            );
    }
}

Template.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template