
import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../redux/actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getProfileById(match.params.userId)
  }, [getProfileById, match.params.userId])
  
  return (

    <Fragment>
      { profile === null || loading ? <Spinner />:
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
          { auth.isAuth && !auth.loading && auth.user._id === profile.user._id && 
            <Link to='/profile-form' className='btn btn-dark'>Edit Profile</Link>
          }
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {
                console.log(profile.experience)
              }
              { profile.experience.length > 0 ? 
                <Fragment>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment> : 
                (<h4>No Experience</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              { profile.education.length > 0 ? 
                (<Fragment>
                  {profile.education.map(e => (
                    <ProfileEducation key={e._id} education={e} />
                  ))}
                </Fragment>) : 
                (<h4>No Education</h4>
              )}
            </div>
          </div>

          {profile.github && (
              <ProfileGithub username={profile.github} />
          )}
        </Fragment>
      }
      
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile)
