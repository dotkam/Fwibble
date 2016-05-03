var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: false
    }
  },
  componentDidMount: function(){
    var canvas = document.getElementById('canvasInAPerfectWorld');
    var ctx = canvas.getContext('2d');

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    var colors = ['red', 'yellow', 'blue', 'black']

    var colorRed = "red"
    var colorBlue = "blue"
    var colorYellow = "yellow"
    var colorBlack = "black"
    var currentColor = "black"
    var clickColor = new Array();


    canvas.addEventListener('mousedown', function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;

      paint = true;
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });

    canvas.addEventListener('mousemove', function(e){
      if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
      }
    });

    canvas.addEventListener('mouseup', function(e){
      paint = false;
    });

    canvas.addEventListener('mouseleave', function(e){
      paint = false;
    });

    // document.getElementById('clear').addEventListener('click', function(e){
    //   console.log('clickX:', clickX, 'clickY:', clickY, 'clickDrag:', clickDrag, 'clickColor:', clickColor)
    //   clickX = [];
    //   clickY = [];
    //   clickDrag = [];
    //   clickColor = [];
    //   redraw();
    // });

    colors.forEach(function(color){ 
      return document.getElementById(color).addEventListener('click', function(e){
        currentColor = this.className;
        console.log('currentColor', currentColor)
        })
      }
    )

    function redraw(){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
      // ctx.strokeStyle = 'red';
      ctx.lineJoin = "round";
      ctx.lineWidth = 7;

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
        console.log('color:', currentColor)
      }
    };

    function addClick(x, y, dragging){
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(currentColor);
    };

  },
  render: function(){
    return (
      <div>
        <canvas id="canvasInAPerfectWorld"></canvas>
        <button id="red" className="red">Red</button>
        <button id="blue" className="blue">Blue</button>
        <button id="yellow" className="yellow">Yellow</button>
        <button id="black" className="black">Black</button>
      </div>
    )
  }
})