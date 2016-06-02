var React = require('react');
var Canvas = require('./Canvas');
var Gallery = require('./Gallery');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  getInitialState: function(){
    return {
      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: [],
      currentColor: '#999999',
      drawings: []
    }
  },

  saveDrawing: function(){
    var { drawings } = this.state;
    var data = {
      clickX: this.state.clickX,
      clickY: this.state.clickY,
      clickDrag: this.state.clickDrag,
      clickColor: this.state.clickColor
    };
    drawings.push(data);
    socket.emit('create:drawing', {drawings:drawings, game_hash: this.props.active_game})
    this.setState({
      drawings: drawings,
      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: []
    }, this.redrawActiveCanvas);
  },
  addClick: function(x, y, dragging, currentColor){
    console.log('IVE BEEN CLICKED');
    var { clickX, clickY, clickDrag, clickColor, currentColor } = this.state;
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(currentColor);
    this.setState({clickX: clickX, clickY: clickY, clickDrag: clickDrag, clickColor: clickColor});
  },
  clearCanvas: function(){
    this.setState({
      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: []
    }, this.redrawActiveCanvas);
  },
  setColor: function(color){
    this.setState({currentColor: color})
  },
  redrawActiveCanvas: function(){

    var canvas = document.getElementById('canvas-active');
    var ctx = canvas.getContext('2d');
    var { clickX, clickY, clickDrag, clickColor } = this.state;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    ctx.lineJoin = "round";
    ctx.lineWidth = 7;
    console.log('OUTER redraw Draw', clickX)
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
  },
  updateDrawings: function(data){
    console.log("GOT A PICTURE");
    this.setState({drawings: data}, this.redrawActiveCanvas);
  },
  componentDidMount: function(){

    socket.on('update:drawings', this.updateDrawings);

    var canvas = document.getElementById('canvas-active');
    var ctx = canvas.getContext('2d');

    var paint;
    var component = this;

    canvas.height = 400;
    canvas.width = 400;

    var { clickX, clickY, clickDrag, clickColor } = this.state;



    canvas.addEventListener('mousedown', function(e){
      var mouseX = e.pageX - this.offsetLeft - this.offsetParent.offsetLeft;
      var mouseY = e.pageY - this.offsetTop - this.offsetParent.offsetTop;
      paint = true;
      component.addClick(e.pageX - this.offsetLeft - this.offsetParent.offsetLeft, e.pageY - this.offsetTop - this.offsetParent.offsetTop);
      component.redrawActiveCanvas();
    });

    canvas.addEventListener('mousemove', function(e){
      if(paint){
        component.addClick(e.pageX - this.offsetLeft - this.offsetParent.offsetLeft, e.pageY - this.offsetTop - this.offsetParent.offsetTop, true);        component.redrawActiveCanvas();
      }
    });

    canvas.addEventListener('mouseup', function(e){
      paint = false;
    });

    canvas.addEventListener('mouseleave', function(e){
      paint = false;
    });

    var colors = ['#F9096E', '#24C9C9', '#FFCC00', '#999999']

    colors.forEach(function(color){
      document.getElementById(color).setAttribute("style", "background-color: " + color);
    });

    colors.forEach(function(color){
      return document.getElementById(color).addEventListener('click', function(e){
        component.setColor(this.id);
        })
      }
    );

    // document.getElementById('clear').addEventListener('click', function(e){
    //   console.log('clickX:', clickX, 'clickY:', clickY, 'clickDrag:', clickDrag, 'clickColor:', clickColor)
    //   clickX = [];
    //   clickY = [];
    //   clickDrag = [];
    //   clickColor = [];
    //   redraw();
    // });

    // function redraw(){
    //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    //   ctx.lineJoin = "round";
    //   ctx.lineWidth = 7;
    //   console.log('OUTER clickX', clickX)
    //   for(var i=0; i < clickX.length; i++){
    //     ctx.beginPath();
    //     if(clickDrag[i] && i){
    //       ctx.moveTo(clickX[i-1], clickY[i-1]);
    //     }
    //     else {
    //       ctx.moveTo(clickX[i]-1, clickY[i]);
    //     }
    //     ctx.lineTo(clickX[i], clickY[i]);
    //     ctx.closePath();
    //     ctx.strokeStyle = clickColor[i];
    //     ctx.stroke();
    //   }
    // };
  },
  render: function(){

    var buttonColors = ['#F9096E', '#24C9C9', '#FFCC00', '#999999'];
    return (
      <div className="canvas-container">
        <Canvas index={'active'} redraw={this.redraw} clickX={this.state.clickX} clickY={this.state.clickY} clickDrag={this.state.clickDrag} clickColor={this.state.clickColor} currentColor={this.state.currentColor} />
        <div className="button-container">
          <button className="save-canvas btn btn-success btn-md" onClick={this.saveDrawing}>Publish</button>
          <button className="clear-canvas btn btn-primary btn-md" onClick={this.clearCanvas}>Clear</button>
        </div>
        <div className="button-container">
          { buttonColors.map((color, i) => ( <button key={i} id={color} className="color-button" /> )) }
        </div>
        <Gallery drawings={this.state.drawings} redraw={this.redraw} />
      </div>
    )
  }
})
