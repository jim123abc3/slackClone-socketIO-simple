const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');

  const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
  const rooms = clickedNs.rooms;

  let roomList = document.querySelector('.room-list');

  roomList.innerHTML = '';

  rooms.forEach(room => {
    roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
  });

  localStorage.setItem('lastNs', nsData)
}