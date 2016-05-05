var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: [],
      currentColor: 'black'
    }
  },
  addClick: function(x, y, dragging, currentColor){
    var { clickX, clickY, clickDrag, clickColor, currentColor } = this.state;
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(currentColor);
    this.setState({clickX: clickX, clickY: clickY, clickDrag: clickDrag, clickColor: clickColor})
  },
  setColor: function(color){
    this.setState({currentColor: color})
  },
  componentDidMount: function(){
//  May need to create new React Canvas component for saved drawings
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var paint;

    var colors = ['red', 'yellow', 'blue', 'black']

    var colorRed = "red"
    var colorBlue = "blue"
    var colorYellow = "yellow"
    var colorBlack = "black"
    var component = this;

    canvas.height = 300;
    canvas.width = 500;
    if(this.props.clickX){
      var { clickX, clickY, clickDrag, clickColor } = this.props;
      this.setState({ clickX:clickX, clickY: clickY, clickDrag: clickDrag, clickColor: clickColor });
      redraw();
    }
    else {

    var { clickX, clickY, clickDrag, clickColor } = this.state;



    canvas.addEventListener('mousedown', function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
      console.log('mouseX Y ', mouseX, mouseY)
      paint = true;
      component.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });

    canvas.addEventListener('mousemove', function(e){
      if(paint){
        component.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
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
        component.setColor(this.id);
        console.log('state currentColor', component.state.currentColor)
        })
      }
    );
    }



    function redraw(){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
      ctx.lineJoin = "round";
      ctx.lineWidth = 7;
      console.log('clickX', clickX)
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
    };

    // function addClick(x, y, dragging){
    //   clickX.push(x);
    //   clickY.push(y);
    //   clickDrag.push(dragging);
    //   clickColor.push(currentColor);
    //   this.setState({clickX: clickX, clickY: clickY, clickDrag: clickDrag, clickColor: clickColor})
    // };

  },
  render:function(){
    return (
      <div>
        <canvas id="canvas"></canvas>
        <div className="button-container">
          <button className="new-canvas" onClick={this.props.saveDrawing.bind(null, {clickX: this.state.clickX, clickY: this.state.clickY, clickDrag: this.state.clickDrag, clickColor: this.state.clickColor})}>New Canvas</button>
        </div>
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