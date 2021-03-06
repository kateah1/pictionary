var pictionary = function () {
  var canvas, context;

  var draw = function (position) {
    context.beginPath();
    context.arc(position.x, position.y,
      6, 0, 2 * Math.PI);
    context.fill();
  };

  // create manager obj by calling io function
  var socket = io();
  var drawing;

  canvas = $('canvas');
  context = canvas[0].getContext('2d');
  canvas[0].width = canvas[0].offsetWidth;
  canvas[0].height = canvas[0].offsetHeight;
  canvas.on('mousedown', function (event) {
    drawing = true;
  });
  canvas.on('mouseup', function (event) {
    drawing = false;
  });
  canvas.on('mousemove', function (event) {
    if (drawing) {
      var offset = canvas.offset();
      var position = {x: event.pageX - offset.left,
      y: event.pageY - offset.top};
      draw(position);

      // sends message to socket.io server, first arg is a name for data, second arg is some data to attach to it (drawing)
      socket.emit('mousemove', position);
    }
  });

  socket.on('mousemove', draw);
};

$(document).ready(function () {
  pictionary();
});
