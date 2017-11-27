/* global $ io */

$(document).ready(function() {

  var socket = io.connect('45.63.14.251:8200');
  
  socket.on('progress', function (data) {
    var percent = (data.received / data.expected) * 100
    //$('#progressBar').animate({ width: percent + '%' })
    //if(percent == 100) percent = 0 

  });
  
  socket.on('successful-upload', function(data) {
    console.log(data)
    var lastUpload = $('#upload:last'), clone = lastUpload.clone()
    
    clone.attr('data-id', data.ID)
    clone.find('img').attr('src', 'data:image/jpeg;base64,' + data.base64img)
    clone.find('#description h5').text(data.description)
    clone.find('#edit input').val(data.description)
    
    $('#uploads').append(clone)
  })

})