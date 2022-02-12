import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';

export default class PlayersParamValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (!value) {
			throw new BadRequestException(`Parameter ${metadata.data} is required.`);
		}

		return value;
	}
}
