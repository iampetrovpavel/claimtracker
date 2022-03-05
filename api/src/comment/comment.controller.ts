import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CommentModel } from './comment.model';
import { FindComment } from './dto/find-comment.dto';

@Controller('comment')
export class CommentController {

    @Post()
    async create(@Body() dto: Pick<CommentModel, 'text'>) {

    }

    @Get(':id')
    async get(@Param('id') id:string){

    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: CommentModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindComment) {

    }

    // @HttpCode(200)
    // @Post('bySystem/:systemId')
    // async getBySystem(@Body('systemId') systemId: string) {

    // }
}
