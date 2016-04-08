var loggedIn = function(){
  return !!localStorage.fwibbleToken;
};
var login = function(){
  console.log('token set')
  if(!localStorage.fwibbleToken){
    localStorage.fwibbleToken = 'Token'; // For now - remove later
  }
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