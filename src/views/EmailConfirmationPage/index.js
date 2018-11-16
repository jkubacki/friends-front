import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { parse } from 'query-string';
import { confirmEmail } from 'actions/auth'

class EmailConfirmationPage extends React.Component {
  state = {
    loading: false,
    error: '',
  };

  componentDidMount() {
    const { confirmationToken } = this.props;

    this.setLoading(true);
    this.props.confirmEmail({ confirmationToken }).catch((error) => {
      this.setLoading(false);
      this.setState({error: 'Not confirmed'});
    });
  }

  setLoading = isLoading => {
    this.setState({ loading: isLoading });
  };

  render() {
    const { loading, error } = this.state;

    let loadingString;

    if (loading) {
      loadingString = "Loading..."
    } else {
      loadingString = "";
    }


    return (
      <div>
        {loadingString}
        {error}
      </div>
    );
  }
}

const mapStateToProps = (state, { location }) => {
  const { confirmation_token: confirmationToken } = parse(location.search);

  return { confirmationToken };
};

export default compose(
  connect(
    mapStateToProps,
    { confirmEmail },
  ),
  withRouter,
)(EmailConfirmationPage);
