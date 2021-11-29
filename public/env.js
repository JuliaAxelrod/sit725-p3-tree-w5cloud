let socket = io();

socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
})


function projectCard(project) {
  return `
  <div class="col s6 m4 l3 xl2">
    <div class="card">
      <div class="card-image">
        <img src="${project.img ? project.img : 'assets/ale.jpg'}">
        <span class="card-title">${project.title}</span>
      </div>
      <div class="card-content">
        <p>${project.info}</p>
      </div>
      <div class="card-action">
        <a href="project.html?pid=${project.projectID}">This is a link</a>
      </div>
    </div>
  </div>`;
}



//init logic goes here!!
$(document).ready(function () {
  $('.sidenav').sidenav();

  $('.modal').modal();

  $('#save-project').click((e) => {
    //validation
    const data = {
      projectID: $('#project-id').val(),
      title: $('#project-title').val(),
      info: $('#project-description').val(),
      img: null
    };



    var settings = {
      "url": "/projects",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      $('#projects-list').append(projectCard(data));
      $('.modal').modal('close');
      $('#project-id').val('');
      $('#project-title').val('');
      $('#project-description').val('');
    });

  });

  //test get call
  $.get('/projects', (result) => {
    for (let p of result) {
      $('#projects-list').append(projectCard(p))
    }

    console.log(result)
  })
})