import { IsString, IsNotEmpty } from 'class-validator';

export class SchemaInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    version: string;

    @IsString()
    @IsNotEmpty()
    attributes: string[];
}
