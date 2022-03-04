import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { SystemModel } from './system.model';

@Controller('system')
export class SystemController {
    @Post()
    async create(@Body() dto: Pick<SystemModel, 'name'>) {

    }

    @Get(':id')
    async get(@Param('id') id:string){

    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: SystemModel) {

    }

    @HttpCode(200)
    @Post()
    async find() {

    }
}
