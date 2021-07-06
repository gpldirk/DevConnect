

import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'


const ProfileExperience = ({ 
  experience: {
    company,
    title,
    location,
    current,
    from,
    to,
    description
  }
}) => {
  
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>
        - 
        {!to ? 'Now': <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>

      <p>
        <strong>Position: </strong> {title}
      </p>

      <p>
        <strong>Description: {description}</strong>
      </p>
    </div>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
