import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { Server } from 'socket.io'

@WebSocketGateway(80)
export class WaiterGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('waiter')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    console.log('Event accessed')
    return 'Hello world!';
  }
}
