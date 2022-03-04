import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClaimModel } from './claim.model';
import { FindClaim } from './dto/find-claim.dto';

@Controller('claim')
export class ClaimController {
    constructor(private readonly configService: ConfigService) {

    }

    @Post()
    async create(@Body() dto: Pick<ClaimModel, 'text'>) {

    }

    @Get(':id')
    async get(@Param('id') id:string){

    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: ClaimModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindClaim) {

    }
}
