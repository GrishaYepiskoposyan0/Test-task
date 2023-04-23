import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new HttpException(
        {
          success: false,
          error: 'User not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isValidPassword = await bcrypt.compare(
      user.password,
      signInDto.password,
    );
    if (isValidPassword) {
      throw new HttpException(
        {
          success: false,
          error: 'Wrong password!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = {
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };
    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (user) {
      throw new HttpException(
        {
          success: false,
          error: 'User with this email already exists!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

    await this.usersRepository.save({
      ...signUpDto,
      password: hashedPassword,
    });

    return {
      success: true,
    };
  }
}
