import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateSystemDto } from './dto/create-system.dto';
import { SYSTEM_NOT_FOUND } from './system.constants';
import { SystemModel } from './system.model';

@Injectable()
export class SystemService {
    constructor(@InjectModel(SystemModel) private readonly systemModel: ModelType<SystemModel>) { }

    async get(): Promise<DocumentType<SystemModel>[]> {
        return this.systemModel.find({}).exec()
    }

    async create(dto: CreateSystemDto): Promise<DocumentType<SystemModel>> {
        return this.systemModel.create(dto)
    }

    async delete(id: string):Promise<DocumentType<SystemModel | null>> {
        return this.systemModel.findByIdAndDelete(id)
    }

    async clear(): Promise<number> {
        const res = await this.systemModel.deleteMany({})
        return res.deletedCount;
    }

    async patch(id: string, dto: CreateSystemDto): Promise<DocumentType<SystemModel | null>> {
        const system = await this.systemModel.findById(id)
        if(!system) return null;
        system.name = dto.name;
        system.description = dto.description;
        await system.save()
        return system;
    }
}
