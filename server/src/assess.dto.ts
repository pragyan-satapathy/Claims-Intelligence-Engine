import { IsString, MaxLength, MinLength } from "class-validator";

export class AssessDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  claim!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  formula!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20000)
  evidence!: string;
}
