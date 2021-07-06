
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth: {isAuth, loading}, ...rest}) => (
  <Route 
    {...rest} 
    render={props =>
      !isAuth && !loading ? 
        (<Redirect to='/login' />):
        (<Component {...props} />)
  } />
)

const mapStateToProps = (state) => ({
  auth: state.auth,
})

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute)
