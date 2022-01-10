let socket = io();

socket.on('project:update', (project) => {
  $('#projects-list').append(projectCard(project));
})

socket.on('chat:broadcast', (msg) => {
  $("#chat-msg-list").append(createMessage(msg, true));
})



function projectCard(project) {
  return `
  <div class="col s6 m4 l3 xl2" id="project-id-${project.projectID}">
    <div class="card">
      <div class="card-image">
        <img src="${project.img ? project.img : 'assets/ale.jpg'}">
        <span class="card-title">${project.title}</span>
      </div>
      <div class="card-content">
        <p>${project.info}</p>
      </div>
      <div class="card-action">
        <a class="waves-effect waves-light btn" href="project.html?pid=${project.projectID}">Open</a>
        <a class="waves-effect waves-light red btn" onClick="deleteProject(${project.projectID})"><i class="material-icons">delete</i></a>
      </div>
    </div>
  </div>`;
}


function deleteProject(id) {
  var settings = {
    "url": `/api/projects/${id}`,
    "method": "DELETE",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    $(`#project-id-${id}`).remove();
  });
}


function getBase64(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);

  });

}


function createProject() {
  let img = document.querySelector('#project-file').files[0];;
  if (img) {
    getBase64(img).then(
      d => {
        const project = {
          "projectID": $('#project-id').val(),
          "title": $('#project-title').val(),
          "info": $('#project-info').val(),
          "img": d
        };
        var settings = {
          "url": "/api/projects",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify(project),
        };

        $.ajax(settings).done(function (response) {
          // $('#projects-list').append(projectCard(project))
          $('#project-id').val('');
          $('#project-title').val('');
          $('#project-info').val('');
          $('#project-file').val('');
          $('.modal').modal('close');
          console.log(response);
        });
      }
    )
  }

}

function createMessage(msg, isRight = false) {
  return `<p class="${isRight ? 'msg-right' : 'msg-left'}">
    ${msg}
  </p><br style="clear:both"/>`
}


$(document).ready(function () {
  console.log('Ready')

  $('.sidenav').sidenav();

  $('.modal').modal();

  $('#insert-project').click(() => {
    createProject();
  });


  //only works once when the page is fully loaded
  $.get('/api/projects', (result) => {
    for (let p of result) {
      $('#projects-list').append(projectCard(p))
    }
    console.log(result)
  })

  $("#chat-send-btn").click(() => {
    //send this message to the back-end server
    socket.emit("chat:msg", $("#chat-msg").val());
    //add this message to the chat msg list on the left side of screen
    $("#chat-msg-list").append(createMessage($("#chat-msg").val()));
    //clear the message input text
    $("#chat-msg").val("");
  });

  //every half a second fetch the data and re-render the project list
  // setInterval(() => {
  //   $.get('/api/projects', (result) => {
  //     $('#projects-list').empty();
  //     for (let p of result) {
  //       $('#projects-list').append(projectCard(p))
  //     }
  //     console.log(result)
  //   })
  // }, 500);

})