import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) { }


	async findOne(username: string): Promise<any | undefined> {
		return this.userRepository.findOne({ username: username });

	}

	findSingleUserById(userId: number): Promise<User | undefined> {
		return this.userRepository.findOne(userId);
	}

	async createOne(newUser: User): Promise<any | undefined> {
		return this.userRepository.save(newUser)
			.catch((exception) => {

				if (exception.code === 'ER_DUP_ENTRY') {
					throw new HttpException({
						status: HttpStatus.CONFLICT,
						error: 'The provided email and/or username is already in use.',
					}, HttpStatus.CONFLICT);
				}


			})
	}

	getMetrics(): Promise<any | undefined> {

		return;
	}

}
