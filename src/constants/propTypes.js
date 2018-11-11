import PropTypes from 'prop-types';

// Content of the location object passed to routes by react-router
export const routerLocation = PropTypes.shape({
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  state: PropTypes.objectOf(PropTypes.any),
});
