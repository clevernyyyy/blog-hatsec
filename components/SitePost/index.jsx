import React from 'react'
import moment from 'moment'
import {RouteHandler, Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import access from 'safe-access'
import {config} from 'config'
import ReadNext from '../ReadNext'
import ReactDisqusThread from 'react-disqus-thread'
import ReactDisqus from 'react-disqus';
import './style.scss'
import '../../static/scss/highlight.scss'

class SitePost extends React.Component {
    render() {
        const {route} = this.props
        const url = `https://blog.hatsec.io${route.path}`
        const post = route.page.data
        const isHack = route.page.requirePath.indexOf('daily-hacks') === 0;
        const home = isHack ? (
          <div>
            <Link className='gohome'
              to={prefixLink('/hacks/')}>
              Hacks
            </Link>
          </div>) : 
          (<div>
            <Link className='gohome'
              to={prefixLink('/')}>
              Home
            </Link>
          </div>
        )
        const disqusTitle = post.title.replace(/[^A-Z0-9]+/ig, '-');
        console.log('title', disqusTitle);
        console.log('url', url);
        return (
            <div>
              {home}
              <div className='blog-single'>
                <div className='text'>
                  <h1>{post.title}</h1>
                  <div dangerouslySetInnerHTML={{__html: post.body}}/>
                  <div className='date-published blog-post-date'>
                    Published {moment(post.date).format('D MMM YYYY')}
                  </div>
                </div>
                <div className='footer'>
                  <ReadNext post={post} {...this.props}/>
                  <hr></hr>
                  <p>
                    <div className='blog-tag-line'>{config.siteDescr}</div>
                    <a href={config.siteTwitterUrl}>
                      <span className='blog-author'>{config.siteAuthor}</span> on Twitter
                    </a>
                  </p>
                    <ReactDisqus shortname='blog-hatsec-io'
                        identifier='123'/> 
                </div>
              </div>
            </div>
            );
    }

    /**
                      <ReactDisqusThread
                    shortname='blog-hatsec-io'
                    title={disqusTitle}
                    identifier={disqusTitle}
                    url={url}
                    category_id='123456'
                    onNewComment={this.handleNewComment}/>
     * `shortname` tells the Disqus service your forum's shortname,
     * which is the unique identifier for your website as registered
     * on Disqus. If undefined , the Disqus embed will not load.
     */
    // shortname: React.PropTypes.string.isRequired,

    /**
     * `identifier` tells the Disqus service how to identify the
     * current page. When the Disqus embed is loaded, the identifier
     * is used to look up the correct thread. If disqus_identifier
     * is undefined, the page's URL will be used. The URL can be
     * unreliable, such as when renaming an article slug or changing
     * domains, so we recommend using your own unique way of
     * identifying a thread.
     */
    // identifier: React.PropTypes.string,

    /**
     * `title` tells the Disqus service the title of the current page.
     * This is used when creating the thread on Disqus for the first time.
     * If undefined, Disqus will use the <title> attribute of the page.
     * If that attribute could not be used, Disqus will use the URL of the page.
     */
    // title: React.PropTypes.string,

    /**
     * `url` tells the Disqus service the URL of the current page.
     * If undefined, Disqus will take the window.location.href.
     * This URL is used to look up or create a thread if disqus_identifier
     * is undefined. In addition, this URL is always saved when a thread is
     * being created so that Disqus knows what page a thread belongs to.
     */
    // url: React.PropTypes.string,

    /**
     * `category_id` tells the Disqus service the category to be used for
     * the current page. This is used when creating the thread on Disqus
     * for the first time.
     */
    // category_id: React.PropTypes.string,

    /**
     * `onNewComment` function accepts one parameter `comment` which is a
     * JavaScript object with comment `id` and `text`. This allows you to track
     * user comments and replies and run a script after a comment is posted.
     */
    // onNewComment: React.PropTypes.func


    handleNewComment(comment) {
        console.log(comment.text);
    }
}


SitePost.propTypes = {
    route: React.PropTypes.object.isRequired,
}

export default SitePost
