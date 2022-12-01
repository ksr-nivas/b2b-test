import { DataObject } from 'src/app/models/data-object.model';
import { WebSocketEvent } from '../../enums/socket.enum';

const socket = new WebSocket('wss://echo.websocket.org');
let interval: any;

addEventListener('message', ({ data }) => {
  // data model => { timer: 40, numObjs: 30 }

  // clear the interval if any
  clearInterval(interval);

  if (data.event === WebSocketEvent.OPEN) {
    console.log('----open------');
    connectWebsocket(data);
  }
  if (data.event === WebSocketEvent.CLOSE) {
    console.log('-------close-------');
    socket.close();
  }
  if (data.event === WebSocketEvent.MESSAGE) {
    console.log('-------message-------');
    interval = setInterval(() => {
      // const response = Array(data.numObjs).fill(new DataObject());
      const response: DataObject[] = [];
      for (let i = 0; i < data.numObjs; i++) {
        response.push(new DataObject(data.numObjs));
      }
      postMessage({ event: WebSocketEvent.MESSAGE, message: response });
    }, data.timer);
  }
});

function connectWebsocket(data: any) {
  socket.onmessage = (message: MessageEvent) => {
    postMessage({ event: WebSocketEvent.MESSAGE, message: message.data});
  };

  socket.onclose = (event) => {
    clearInterval(interval);
    postMessage({ event: WebSocketEvent.CLOSE });
  };

  socket.onopen = (event) => {
    postMessage({ event: WebSocketEvent.OPEN });
  };
}
