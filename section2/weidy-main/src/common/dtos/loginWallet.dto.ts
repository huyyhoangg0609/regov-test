import { IsString, IsNotEmpty } from 'class-validator';

export class LoginWalletDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  walletKey: string;

  @IsString()
  seed?: string;
}
