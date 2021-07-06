
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../redux/actions/post'
import Moment from 'react-moment'

const CommentItem = ({ 
  comment: { _id, text, name, avatar, user, date },
  postId, 
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt="avatar"
          />
          <h4>{ name }</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">
          { text }
        </p>

        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        { !auth.loading && auth.isAuth && user === auth.user._id &&
          <button onClick={e => deleteComment(postId, _id)} className='btn btn-danger'>
            <i className='fas fa-times' /> Delete
          </button>
        }
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
