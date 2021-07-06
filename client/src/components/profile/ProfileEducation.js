

import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileEducation = ({ 
  education: {
    school,
    degree,
    field,
    current,
    from,
    to,
    description
  }
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment>
        - 
        {!to ? 'Now': <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>

      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field: </strong> {field}
      </p>
      <p>
        <strong>Description: {description}</strong>
      </p>
    </div>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
}

export default ProfileEducation
