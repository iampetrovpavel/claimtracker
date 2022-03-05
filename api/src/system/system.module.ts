import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SystemController } from './system.controller';
import { SystemModel } from './system.model';
import { SystemService } from './system.service';

@Module({
	controllers: [SystemController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: SystemModel,
				schemaOptions: {
					collection: 'System'
				}
			}
		])
	],
	providers: [SystemService]
})
export class SystemModule { }