import React from 'react';
import { connect } from 'react-redux';
import { Route as StandardRoute, withRouter } from 'react-router-dom';

import { routerLocation as routerLocationPropType } from 'constants/propTypes';
import { getRouteLocation } from 'utils/navigation';

function Route({
  storedLocation,
  initialBackground,
  location: currentLocation,
  ...otherProps
}) {
  const location = getRouteLocation(
    currentLocation,
    storedLocation,
    initialBackground,
  );
  return <StandardRoute location={location} {...otherProps} />;
}

Route.propTypes = {
  storedLocation: routerLocationPropType,
  initialBackground: routerLocationPropType,
  location: routerLocationPropType.isRequired,
};

Route.defaultProps = {
  storedLocation: null,
  initialBackground: null,
};

export default connect((state, ownProps) => ({
  storedLocation: (state.location || {}).location,
  initialBackground: (state.location || {}).initialBackground,
  ...ownProps,
}))(withRouter(Route));
