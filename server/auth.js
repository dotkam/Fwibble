module.exports = {
  loggedIn: function(){
    return !!localStorage.fwibbleToken;
  },
  logout: function(){
    delete localStorage.fwibbleToken; 
  }
}