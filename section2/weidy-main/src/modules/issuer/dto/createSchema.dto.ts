import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSchemaDto {
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
