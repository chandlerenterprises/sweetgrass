/*global $ Cookies*/
$(document).ready(function() {

  $('#signin button').click(function() {
    
    var username = $('#signin input.username').val()
    
    $.ajax({
      type : 'POST',
      url : 'http://45.63.14.251:8800/auth/signin',
      data : {
        username : username,
        password : $('#signin input.password').val()
      },
      descriptionType: "application/json; charset=UTF-8",
      success: function(res) {

        console.log(res.data)
        Cookies.remove('JWT')
        Cookies.set('JWT', res.data.token, { expires: res.data.exp, path: '/' });
        window.location.replace('/upload')

      }
    
    })
    
  })

  $('#signup button').click(function() {
    
    $.ajax({
      type : 'POST',
      url : 'http://45.63.14.251:8800/auth/signup',
      data : {
        email: $('#signup input.email').val(),
        username : $('#signup input.username').val(),
        password : $('#signup input.password').val()
      },
      descriptionType: "application/json; charset=UTF-8",
      success: function(res) {
        console.log('yeeet')
      }
    
    })
    
  })
  
  $('#new button').click(function() {
    $('#upload').show()
    
  })
  

  $("#post form#fileUploadForm").submit(function(event){
   
    event.preventDefault()
    
    var formData = new FormData();

    var fileSelect = document.getElementById('fileSelect');
    var files = fileSelect.files
    
    // Loop through each of the selected files.
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
    
      // Check the file type.
      if (!file.type.match('image.*')) {
        continue;
      }
    
      // Add the file to the request.
      formData.append('photos[]', file, file.name);
    }
    var meta = { test: '' }
    meta = $.param(meta)
    console.log(formData)
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://45.63.14.251:8800/jewels/post/'+meta, true);
    // Set up a handler for when the request finishes.
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          
          var data = JSON.parse(xhr.responseText).data
          console.log(data)
          
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    

    
    // Send the Data.
    xhr.send(formData);
  });
  
  $(document).on('click', '#delete button', function() {

    var upload = $(this).closest('#upload')
    var fileID = upload.data().id
    console.log(fileID)
    
    $.ajax({
      type : 'POST',
      url : 'http://45.63.14.251:8800/upload/delete',
      data : {
        fileID: fileID
      },
      descriptionType: "application/json; charset=UTF-8",
      success: function(res) {
        if(res.error) return console.log(res.error)
        else {
          console.log('successfully delted')
          upload.remove()
        }
      }
    
    })
    
  })
  
  $(document).on('click', 'button.edit', function() {
    var $upload = $(this).closest('#upload')

    $upload.find('#description').hide()
    $upload.find('#edit').show()

  })
  
  $(document).on('click', '#edit button.cancel', function() {
    var $upload = $(this).closest('#upload')
    
    $upload.find('#description').show()
    $upload.find('#edit').hide()
  })
  
  $(document).on('click', '#edit button.update', function() {

    var $upload = $(this).closest('#upload')
    var newDescription = $upload.find('#edit input').val()

    $.ajax({
      type : 'POST',
      url : 'http://45.63.14.251:8800/upload/update',
      data : {
        fileID: $upload.data().id,
        newDescription: newDescription
      },
      descriptionType: "application/json; charset=UTF-8",
      success: function(res) {
        if(res.error) return console.log(res.error)
        else {
          console.log('successfully updated description')
          $upload.find('#description h5').text(newDescription)
          $upload.find('#edit').hide()          
        }
      }
    
    })
  
  })
})