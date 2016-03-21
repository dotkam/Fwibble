var loggedIn = function(){
  return !!localStorage.fwibbleToken;
};
var login = function(username, password){
  console.log('token set')
  localStorage.fwibbleToken = 'Token'; // For now - remove later
    // console.log("username:", this.state.username, "\npassword:", this.state.password)
    var postData = JSON.stringify({
      "username": username,
      "password": password
    })
    console.log('postData:',postData)

    $.ajax({
      type: 'POST',
      url: '/user/signin',
      data: postData,
      contentType: 'application/json',
      success: function(data) {

        //        {
        //          userStatus: false,
        //          passStatus: false,
        //          activeUser: null,
        //          activeGame: null,
        //          errMessage: null
        //        }
        
        console.log('Signin response object:', data)

        // Handle login err message
        if (data.errMessage!==null) {
          this.setState({loginMsg: data.errMessage})
          // clear input fields (if username is good, only clear password)
          if (data.userStatus===false) {
            this.setState({username: ""})
            this.setState({password: ""})
          } else {
              this.setState({password: ""})
          }
          // trigger on-page display of error message
          this.setState({loginErr: true})

        // Or set active user and route to game
        } else {
          this.setState({loginErr: false})
          this.setUser({username: data.activeUser, active_game: data.activeGame}) // was data.activeUser
          localStorage.fwibbleToken = data.sessToken;
        }

        console.log('props:',this.props)


      }.bind(this),
      error: function(data) {
        console.error("Connection error:", data)
      }.bind(this)
  });
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