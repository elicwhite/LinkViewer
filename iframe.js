"use strict";


window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  console.log("got url", event.data.url);
}
