import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form';

import { signUp } from 'actions/auth';

class SignupForm extends React.Component {

  handleSubmit = values =>
    this.props.signUp({
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <Field
            label="email"
            placeholder="email"
            name="email"
            type="email"
            component="input"
          />
          <Field
            label="password"
            name="password"
            type="password"
            component="input"
          />
          <Field
            label="confirm password"
            name="password_confirmation"
            type="password"
            component="input"
          />
        </div>
        <div>
          <Field
            label="Remember me"
            type="checkbox"
            name="remember"
            component="input"
          />
          <button type="submit">Sign up</button>
        </div>
      </form>
    )
  }
}

export default compose(
  connect(
    null,
    { signUp },
  ),
  withRouter,
  reduxForm({
    form: 'signup',
  }),
)(SignupForm)
