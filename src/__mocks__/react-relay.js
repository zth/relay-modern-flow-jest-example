const ReactRelay = require('react-relay');

module.exports = {
  ...ReactRelay,
  createFragmentContainer: Component => Component
};
