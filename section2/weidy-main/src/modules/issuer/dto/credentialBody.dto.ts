import { IsString, IsNotEmpty } from 'class-validator';

export class CredentialBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
