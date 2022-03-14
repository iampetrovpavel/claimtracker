import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { SYSTEM_NOT_FOUND } from './system.constants';
import { SystemModel } from './system.model';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
    constructor(private readonly systemService: SystemService) { }

    @Get()
    async get() {
        return this.systemService.get()
    }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateSystemDto) {
        return this.systemService.create(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        const deletedDoc = await this.systemService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(SYSTEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: SystemModel) {
        const updatedSystem = await this.systemService.patch(id, dto);
        if(!updatedSystem) {
            throw new HttpException(SYSTEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        return updatedSystem;
    }
}
