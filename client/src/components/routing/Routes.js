import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import ProfileForm from '../forms/ProfileForm'
import ExperienceForm from '../forms/ExperienceForm'
import EducationForm from '../forms/EducationForm'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'


const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:userId' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile-form' component={ProfileForm} />
        <PrivateRoute exact path='/experience-form' component={ExperienceForm} />
        <PrivateRoute exact path='/education-form' component={EducationForm} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:postId' component={Post} />

        <Route exact path='*' component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
