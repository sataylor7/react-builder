
import React from 'react';
import { translate } from 'react-i18next';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import getNavigation from 'next-navigation'
import { connect } from 'react-redux'

import { Link } from '../tools/routes'
import { getUser, logout } from '../tools/store/user'
import { getContextedFetch } from '../tools/fetch'
import Language from './molecules/Language'


class Header extends React.Component {

  handleLogout() {
    var { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    const { url, t, user } = this.props
    return (<div>
      <div className="nav-wrap">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <div>
                <Link route={'index'} prefetch><a>React Builder</a></Link>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
          <ul className="nav navbar-nav">
            <li role="presentation">
              <a href="/download-project" target="_blank" role="button">{t('Zip Project')}</a>
            </li>
            <li role="presentation">
              <Link route={'about'} prefetch><a href="#" role="button">{t('About')}</a></Link>
            </li>
          </ul>
          <Nav className="pull-right" style={{ marginRight: 15 }}>
            <Language />
          </Nav>
        </Navbar>
        <p>{JSON.stringify(user)}</p>
      </div>
    </div>)
  }

  static translateNS = ['common']
}

export default connect(state => state)(translate(Header.translateNS)(Header))
