import { IsDateString, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreatePublicationDto {
    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    mediaId: number

    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    postId: number

    @IsDateString()
    @IsNotEmpty()
    date: string
}
