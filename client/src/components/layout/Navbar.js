import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/auth'


const Navbar = ({ auth: { isAuth, user, loading }, logout }) => {
  const onLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnect</Link>
      </h1>

      <ul>
        {
          !loading &&
          <li><Link to='/profiles'>Developers</Link></li>
        }
        { !isAuth && !loading &&
          <li><Link to='/register'>Register</Link></li>
        }
        {
          !isAuth && !loading &&
          <li><Link to='/login'>Login</Link></li>
        }

        {
          isAuth && !loading &&
          <li>
            <Link to='/posts'>
              <span className='hide-sm'> Posts</span> 
            </Link>
            </li>
        } 

        {
          isAuth && !loading &&
          <li>
            <Link to='/dashboard'>
              <i className='fas fa-user' /> 
              <span className='hide-sm'> Dashboard</span> 
            </Link>
            </li>
        } 

        {
          isAuth && !loading &&
          <li>
            <a onClick={onLogout} href='#!'>
              <i className='fas fa-sign-out-alt' />
              <span className='hide-sm'> Logout</span> 
            </a>
          </li>
        }

      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
