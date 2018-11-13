import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { login } from 'actions/auth';

class LoginForm extends React.Component {

  handleSubmit = values =>
    this.props.login({
      username: values.email,
      password: values.password,
      rememberMe: values.remember,
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
        </div>
        <div>
          <Field
            label="Remember me"
            type="checkbox"
            name="remember"
            component="input"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default compose(
  connect(
    null,
    { login },
  ),
  withRouter,
  reduxForm({
    form: 'login',
    initialValues: {
      remember: true,
    },
  }),
)(LoginForm)
