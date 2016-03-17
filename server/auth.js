var loggedIn = function(){
  return !!localStorage.fwibbleToken;
};
var login = function(){
  localStorage.fwibbleToken = 'Token';
};
var logout = function(){
  delete localStorage.fwibbleToken;
};
var getToken = function(){
  return localStorage.fwibbleToken;
};
var requireAuth = function(nextState, replace){
  if(!loggedIn()){
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
};

module.exports = {
  loggedIn: loggedIn,
  login: login,
  logout: logout,
  getToken: getToken,
  requireAuth: requireAuth
}

// replace({
// pathname: '/signin',
// state: { nextPathname: nextState.location.pathname }
// })