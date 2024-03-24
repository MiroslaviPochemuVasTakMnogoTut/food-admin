import { OmitType } from '@nestjs/swagger';
import { ItemOrder } from '../entities/item_order';
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AddOrderItemDto {

    @ApiProperty({ default: 1, example: '1' })
    @IsInt()
    readonly itemId: number;

    @ApiProperty({ default: 1, example: '1' })
    @IsInt()
    readonly orderId: number;

    @ApiProperty({ default: 1, example: '1' })
    @IsInt()
    readonly amount: number;

    @ApiProperty({ default: '', example: 'More pepper' })
    @IsString()
    readonly note: string;
}