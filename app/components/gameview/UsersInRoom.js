var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {userColors: {}};
  },

  componentWillReceiveProps: function(newProps) {
    var options = ['DeepPink','DarkSlateBlue','Orange', 'Green','RedWine'], curr=0;

    for (var i=0; i<this.props.users.length; i++) {
      this.state.userColors[this.props.users[i]] = options[curr]
      if (curr<options.length-1) {curr++} else {curr=0}
    }
  },
  
  render: function (){
    return (
      <div className="panel panel-info">
        <h4 className="panel-heading"> Users in Room </h4>
        <ul className="panel-body">
          {
            this.props.users.map((user, i) => {
              var color = this.state.userColors[user], font=null;
              if (this.props.users[this.props.turn]===user) {font = 'bold'}
              else {font = null}  // style={{color}} style={{font}}
              //   console.log('usersinroom font', font, '\nbold',bold)
            // console.log('colorrr', color, '\nthis.props.users',this.props.users, '\nthis.props.turn',this.props.turn, '\nbfonnnt',font)

            var style = {color: color, font: font}
                        console.log('style',style)
              return (
                <li className="list-unstyled" key={i} style={style}>
                  {user}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});