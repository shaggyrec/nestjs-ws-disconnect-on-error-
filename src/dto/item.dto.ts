import { IsNotEmpty } from 'class-validator';

export class ItemDto {
    id: number;
    @IsNotEmpty()
    name: string;
}