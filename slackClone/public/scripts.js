const userName = 'Jim'
const password = 'X'

const socket = io('http://localhost:9000');

const nameSpaceSockets = [];
const listeners = {
  nsChange: [],
}

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on('nsChange', (data) => {
      console.log('Namespace changed');
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  }
}

socket.on('connect', () => {
  console.log('Conneceted!!');
  socket.emit('clientConnect');
})

socket.on('nsList', (nsData) => {
  // const lastNs = localStorage.getItem('lastNs');
  console.log(nsData);

  const nameSpacesDiv = document.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = '';
  nsData.forEach(ns => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    if (!nameSpaceSockets[ns.id]) {
      nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
    }
    addListeners(ns.id);

  });

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      joinNs(element, nsData);
    });
  });

  joinNs(document.getElementsByClassName('namespace')[0], nsData);
 
});
