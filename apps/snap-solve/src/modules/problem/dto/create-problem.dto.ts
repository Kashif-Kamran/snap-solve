import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  language: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
