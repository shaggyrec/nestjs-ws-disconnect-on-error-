import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger, UseFilters, UsePipes } from '@nestjs/common';
import WebSocket, { Server } from 'ws';
import { ValidationPipe } from './pipes/validation.pipe';
import { WsExceptionFilter } from './exceptionFilters/wsException.filter';
import { ItemDto } from './dto/item.dto';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('WebsocketGateway');

    constructor(
    ) {}

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('testCmd')
    @UsePipes(new ValidationPipe())
    async onCreateBot(client: WebSocket, payload: ItemDto): Promise<void> {
        client.send('ok')
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: WebSocket) {
        this.logger.log(`Client disconnected`);
    }

    handleConnection(client: WebSocket, ...args: any[]) {
        this.logger.log(`Client connected`);
    }
}