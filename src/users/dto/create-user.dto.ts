import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    
@ApiProperty({
    description: 'The name of The user',
    example: 'Ziad'
})
@IsNotEmpty()
@IsString()
name: string;
 
@ApiProperty({
    description: 'The username of the user',
    example: 'Ziad_1'
})
@IsNotEmpty()
username: string;

@ApiProperty({
    description: 'The email of user',
    example: 'Ziad@gamil.com'
})
@IsEmail()
@IsNotEmpty()
email: string;

@ApiProperty({
    description: 'The password of user',
    example: 'it should look like hard to expect'
})
@IsNotEmpty()
password: string;
}
