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


$(document).ready(function() {
    console.log('Ready')

    $('.sidenav').sidenav();


    //test get call
    $.get('/projects', (result) => {
        for (let p of result) {
            $('#projects-list').append(projectCard(p))
        }

        console.log(result)
    })
})