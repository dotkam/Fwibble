var React = require('react');

// Grab correct component by ID

module.exports = React.createClass({
  componentDidMount: function(){

    console.log('canvas component index', this.props.index)
    this.redraw();

  },
  redraw: function(){
    var index = this.props.index;

    var canvas = document.getElementById('canvas-' + index);
    console.log('redraw canvas', index, canvas);

    canvas.height = 300;
    canvas.width = 500;

    if(canvas){    
      var ctx = canvas.getContext('2d');
      var { clickX, clickY, clickDrag, clickColor } = this.props;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
      ctx.lineJoin = "round";
      ctx.lineWidth = 7;
      console.log('OUTER redraw CANVAS', clickX)
      for(var i=0; i < clickX.length; i++){
        ctx.beginPath();
        if(clickDrag[i] && i){
          ctx.moveTo(clickX[i-1], clickY[i-1]);
        }
        else {
          ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.strokeStyle = clickColor[i];
        ctx.stroke();
      }
    }
  },
  render:function(){
    return (
      <div>
        <canvas id={"canvas-" + this.props.index} className="canvas" ></canvas>
      </div>
    )
  }
});


/* 

  Canvas height and width are set separetly from CSS style elements
  The two are represented as ratios of each other, e.g.

        canvas.width  = 400;
        canvas.height = 300; 
        canvas.style.width  = '800px';
        canvas.style.height = '600px';

  returns fuzzy pixels because the canvas is being stretched across a larger area 

*/