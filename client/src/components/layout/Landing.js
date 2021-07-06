import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Register</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(
  mapStateToProps,
  {},
)(Landing)