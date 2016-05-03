var React = require('react');

module.exports = React.createClass({
  componentDidMount: function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.height = 300;
    canvas.width = 1000;

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
      console.log('mouseX Y ', mouseX, mouseY)
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
      document.getElementById(color).setAttribute("style", "background-color: " + color);
    });

    colors.forEach(function(color){ 
      return document.getElementById(color).addEventListener('click', function(e){
        currentColor = this.id;
        console.log('currentColor', currentColor)
        })
      }
    );

    function redraw(){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
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
  render:function(){
    return (
      <canvas id="canvas"></canvas>
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