const { registerHandler, loginHandler, editProfileHandler } = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'PUT',
    path: '/profile',
    handler: editProfileHandler,
  }
];

module.exports = routes;