var Session = require(__app + '/actions/sessions');
var User = require(__app + '/actions/users');

var loggedIn = function(){
  
  return !!localStorage.fwibbleToken;

};
var login = function(username){
  var attrs.username = username
  Session.create(attrs) 
  .then(function(res) {
    localStorage.fwibbleToken = res.token;
  })
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