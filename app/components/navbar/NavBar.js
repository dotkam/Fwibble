var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  

  // render: function() {

  //   return (
  //     <div className='navbar navbar-default navbar-static-top'>
  //       <div className='container-fluid'>
  //         <div className='navbar-header'>
  //           <Link to='/' className='navbar-brand' >Fwibble</Link>
  //         </div>
  //           <ul className="nav navbar-nav navbar-right">
  //             <li>
  //               { this.props.loggedIn ? (<Link to='/signout'>SIGN OUT</Link>) : (<Link to='/signin'>SIGN IN</Link>)}
  //             </li>
  //             <li><Link to={`/gameview/${this.props.active_game}`} className="menuOptions">MY GAME</Link></li>
  //           </ul>
  //         </div>
  //       </div>
  //   )
  // }

  render: function() {

   return (
     <div className='navbar navbar-default navbar-static-top'>
       <div className='container-fluid'>
         <div className='navbar-header'>
           <div><img src={'./images/Fwibble-logo-cropped.png'} width='125px' height='20px' alt="Fwibble" className="img-responsive"/></div>
         </div>
           <ul className="nav navbar-nav navbar-right">
             <li>
               { this.props.loggedIn ? (<Link to='/signout'>SIGN OUT</Link>) : (<Link to='/signin'>SIGN IN</Link>)}
             </li>
             <li><Link to={`/gameview/${this.props.active_game}`} className="menuOptions">MY GAME</Link></li>
           </ul>
         </div>
       </div>
   )
 }

});




/*

<svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xmlSpace="preserve"><path fill="#000000" d="M82.145,49.047c0-17.752-14.393-32.144-32.144-32.144c-17.753,0-32.145,14.392-32.145,32.144  c0,6.814,2.126,13.129,5.743,18.328c0.001,0.002,2.328,9.318-5.743,13.816c0,0,22.415,5.006,40.855-1.209  c6.6-1.853,12.336-5.76,16.482-10.986c0.088-0.107,0.172-0.221,0.256-0.331c0.484-0.628,0.953-1.271,1.393-1.935  c0.004-0.007,0.01-0.014,0.016-0.021l-0.004,0.002C80.197,61.644,82.145,55.573,82.145,49.047z M54.781,72.373  c-2.641,0-4.781-2.2-4.781-4.914c0-2.715,2.14-4.914,4.781-4.914s4.779,2.199,4.779,4.914  C59.561,70.173,57.422,72.373,54.781,72.373z M71.926,57.155c0,0-4.279,4.889-7.609,0c-3.674-5.397,7.24-5.589-3.273-23.013  c0,0-1.742-3.373-0.064-4.435c0-0.001-0.008-0.012-0.008-0.012s3.986-4.365,10.303,7.757c0.002,0.002,0-0.001,0,0  C74.072,42.373,75.434,49.505,71.926,57.155z"></path></svg>



var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Fwibble</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="menuOptions" href="/signin">Sign In</a></li>
              <li><a className="menuOptions" href="/gameview">Game</a></li>
            </ul>
          </div>
        </div>
    )
  }
});

*/