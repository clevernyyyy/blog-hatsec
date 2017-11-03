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
import '../static/scss/typography.scss'
import '../static/scss/tables.scss'
import '../static/scss/tiles.scss'

class DailyHacks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterTo: ''
      };
      this.handleTileFilter = this.handleTileFilter.bind(this);
    }
    render() {
        console.log('route', this.props.route);
        let pageLinks = []
        const oldLinks = []
        const one = []
        const pillBox = this.getPills();

        // Get hack pages only
        const hackPages = this.props.route.pages.filter((ele) => {
          //console.log('this.props.route.pages', this.props.route.pages);
          if (ele.requirePath.indexOf('daily-hacks') === 0 && ele.data.hide !== true) {
            return ele;
          }
        })

        // Shuffle up pages
        const pages = this.shuffle(hackPages);

        // Create tiles
        const tiles = []

        // // Instantiate Isotope
        // const elem = document.querySelector('.tiles');
        // var iso = new Isotope( elem, {
        //   // options
        //   itemSelector: '.tile',
        //   masonry: {
        //     columnWidth: 100
        //   }
        // });

        pages.forEach((page) => {
          const tileClass = page.data.tile + ' tile ' + page.data.color;
          const filteredClass = page.data.category.toLowerCase() === this.state.filterTo || this.state.filterTo === '' ? '' : 'filterTile';
          const previewPicture = page.data.previewPicture ? <span className='tool-wrapper'>
            <img className={`tile-picture ${filteredClass}`}
              src={`../images/${page.data.previewPicture}`}
              height='20px'/><span className={`tooltip ${page.data.color}`}>{page.data.previewPictureText}</span>
            </span> : <span className={`glyphicon glyphicon-chevron-up tile-arrow-up ${filteredClass}`}></span>;

          tiles.push(
            <Link className={`${tileClass} ${filteredClass}`}
              to={prefixLink(page.path)}>
              <div className={`tile-header ${filteredClass}`}>
                {page.data.title}
              </div>
              <div className={`tile-caption ${filteredClass}`}>
                <header className={`${filteredClass}`}>
                  Preview
                  {previewPicture}
                </header>
                <div className={`tile-preview ${filteredClass}`}>{page.data.description}</div>
              </div>
            </Link>
          )
        })

        // Sort pages.
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()
        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post' && access(page, 'requirePath').indexOf('daily-hacks') === 0) {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const datePublished = access(page, 'data.date')
                const category = access(page, 'data.category')
                const readTime = access(page, 'data.readTime')

                oldLinks.push(
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
                    <div className='daily-hacks-title-box'>
                      <div className='daily-hacks-title'>Daily Hacks</div>
                      <div className='daily-hacks-description'>When I speculated <a className='md-link' href='/interview-and-improvement/'>here</a> about some of the steps I could take to increase my infosec experience one of the things I came up with was trying to challenge myself almost everyday.  What follows is my attempt to track my progress and growth.</div>
                    </div>
                    {pillBox}
                    <div className="tiles">
                      <div className="tile-row">
                        { tiles }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }

    handleTileFilter(e) {
      const filterTo = this.state.filterTo;
      this.setState({'filterTo': filterTo === e.currentTarget.id.toLowerCase() ? '' : e.currentTarget.id.toLowerCase()});
    }

    getPills() {
      const filterTo = this.state.filterTo;
      const pills = [
        {
          id: 'hack.me',
          class: 'hackme',
          label: 'Hack.me'
        },
        {
          id: 'ctf',
          class: 'ctf',
          label: 'CTF'
        },
        {
          id: 'pentesterlab',
          class: 'pentesterlab',
          label: 'Pentesterlab'
        }
      ];

      const pillBox = pills.map((ele) => {
        const filtered = this.state.filterTo === ele.id ? 'X' : '';

        return (
          <div className='key-pill'
            id={ele.id}
            onClick={this.handleTileFilter}>
              <span className={`key-color ${ele.class}`}>{filtered}</span><label>{ele.label}</label>
          </div>
        );
      });


      return (
        <div className='key-box'>
          <span className='key-title'>filter:</span>
          {pillBox}
        </div>
      )
    }

    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
}

DailyHacks.propTypes = {
    route: React.PropTypes.object,
}

export default DailyHacks
