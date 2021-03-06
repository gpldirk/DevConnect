

import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount } from '../../redux/actions/profile'


const Dashboard = ({ 
  getCurrentProfile, 
  auth: { user, }, 
  profile: { profile, loading }, 
  deleteAccount 
}) => {

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  if (loading && profile === null) {
    return <Spinner />
  }

  const onDelete = () => {
    deleteAccount()
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>
        Dashboard
      </h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome { user && user.name }
      </p>
      {
        profile !== null ?
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={onDelete}>
              <i className='fas fa-user-minus' />
              Delete Account
            </button>
          </div>
        </Fragment> :
        <Fragment>
          <p>You have not created profile yet, please add some info</p>
          <Link to='/profile-form' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      }
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(
  mapStateToProps, 
  { getCurrentProfile, deleteAccount }
)(Dashboard)
