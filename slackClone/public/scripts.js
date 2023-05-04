const userName = 'Jim'
const password = 'X'

const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log('Conneceted!!');
  socket.emit('clientConnect');
})

socket.on('nsList', (nsData) => {
  // const lastNs = localStorage.getItem('lastNs');
  const nameSpacesDiv = document.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = '';
  nsData.forEach(ns => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      joinNs(element, nsData);
    });
  });

  joinNs(document.getElementsByClassName('namespace')[0], nsData);

});
