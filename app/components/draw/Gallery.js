var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        {
          this.props.drawings.map((d, i) => (<canvas key={i} >Hello world</canvas>))
        }
      </div>
    )
  }
})