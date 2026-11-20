import { Body, Controller, Inject, Post, ValidationPipe } from "@nestjs/common";
import { AssessDto } from "./assess.dto";
import { ClaimsService } from "./claims.service";

@Controller("api/claims")
export class ClaimsController {
  constructor(@Inject(ClaimsService) private readonly claims: ClaimsService) {}

  @Post("assess")
  assess(@Body(new ValidationPipe({ expectedType: AssessDto, whitelist: true, forbidNonWhitelisted: true })) input: AssessDto) {
    return this.claims.assess(input);
  }
}
