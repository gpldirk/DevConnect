import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')  // use setAlert to show password not match
    } else {
      console.log(formData)
      register({
        name, email, password
      })
    }
  }

  if (isAuth) {
    return <Redirect to='/dashboard' />  // !!!
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Register</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required value={name} onChange={onChange}/>
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email" name="email" required value={email} onChange={onChange}/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
            value={password2}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register)
