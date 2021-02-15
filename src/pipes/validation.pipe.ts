import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        ValidationPipe.assertIsNotEmpty(value);
        const { metatype } = metadata;

        const object = plainToClass(metatype, value);

        const errors = await validate(object);

        if (errors.length > 0) {
            throw new WsException('Bad payload');
        }
    }

    private static assertIsNotEmpty(value: any) {
        if (Object.keys(value).length < 1) {
            throw new WsException('No payload provided');
        }
    }
}