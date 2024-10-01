import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export function handleExceptions(error: any) {
    if (error.code === 11000) {
        throw new BadRequestException(`El usuario ya esta registrado ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
}