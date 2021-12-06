let socket = io();

socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
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
          $('#projects-list').append(projectCard(project))
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


$(document).ready(function () {
  console.log('Ready')

  $('.sidenav').sidenav();

  $('.modal').modal();

  $('#insert-project').click(() => {
    createProject();
  });


  //test get call
  $.get('/api/projects', (result) => {
    for (let p of result) {
      $('#projects-list').append(projectCard(p))
    }

    console.log(result)
  })
})