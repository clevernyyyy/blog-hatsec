import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SitePost from '../components/SitePost'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {

// <div>
//   hats

//   white hat - ethical computer hacking

//   grey hat - a computer hacker or computer security expert who may sometimes violate laws or typical ethical standards, but does not have the malicious intent typical of a black hat hacker

//   black hat - violates computer security for little reason beyond maliciousness or for personal gain

//   red hat - The term is now commonly used by security consultants who offer hacking/penetration testing as part of their services.  (similar to white)

//   green hat -  A Green Hat is a name for a New/Newb Hacker, who is just starting to practice hacking. These are the hacker “n00bz,” but unlike Script Kiddies, they care about hacking and strive to become full-blown hackers. They’re often flamed by the hacker community for asking many basic questions. When their questions are answered, they’ll listen with the intent and curiosity of a child listening to family stories.

//   blue hat - A blue hat hacker is someone outside computer security consulting firms who bug tests a system prior to its launch, looking for exploits so they can be closed.

//   yellow hat - Yellow hat hacking is the sole province of those motivated by MONEY
// while attempting to pass themselves off as something they're not.

// </div>

    render() {
        const pageLinks = []
        // Sort pages.
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()
        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post' && access(page, 'requirePath').indexOf('articles') === 0) {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const datePublished = access(page, 'data.date')
                const category = access(page, 'data.category')
                const readTime = access(page, 'data.readTime')

                pageLinks.push(
                    <div className='blog-post' key={ title }>
                      <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                        { moment(datePublished).format('MMMM YYYY') }
                      </time>
                      <span style={ {    padding: '5px'} }></span>
                      <span className='blog-category'>{ category }</span>
                      <span className='blog-read-time'>{readTime} MINUTE READ</span>
                      <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link className='readmore' to={ prefixLink(page.path) }> Read
                      </Link>
                    </div>
                )
            }
        })

        return (
            <div>
              <Helmet title={ config.siteTitle }/>
              <SiteSidebar {...this.props}/>
              <div className='content'>
                <div className='main'>
                  <div className='main-inner'>
                    { pageLinks }
                  </div>
                </div>
              </div>
            </div>
              )
    }
}





SiteIndex.propTypes = {
    route: React.PropTypes.object,
}

export default SiteIndex
