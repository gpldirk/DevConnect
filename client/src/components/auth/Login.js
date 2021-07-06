
import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/auth'
import PropTypes from 'prop-types'


const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuth) {
    return <Redirect to='/dashboard' />
  }
  

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Login Your Account</p>

      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email" name="email" required value={email} onChange={onChange}/>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            value={password}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(
  mapStateToProps,
  { login }
)(Login)
