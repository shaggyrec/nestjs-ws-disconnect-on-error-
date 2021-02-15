import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter{
    catch(exception: WsException, host: ArgumentsHost) {
        // @ts-ignore
        host.getClient().send(JSON.stringify({ event: 'error', data: exception.message }));
    }
}