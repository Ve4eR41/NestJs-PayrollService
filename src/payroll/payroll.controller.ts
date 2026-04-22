import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestCustom from 'src/types/request.t';
import { CalcPayrollDto } from './dto/CalcPayroll.dto';
import { PayrollService } from './payroll.service';

@UseGuards(JwtAuthGuard)
@Controller('payroll')
export class PayrollController {
    constructor(private payrollService: PayrollService) { }

    @Post('/calc')
    calc(@Request() req: Request, @Body() dto: CalcPayrollDto) {
        const { user } = req as RequestCustom;
        return this.payrollService.calcPayroll(user.id, dto);
    }
}

