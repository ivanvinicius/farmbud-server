import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IShowProfileDTO from '@modules/users/dtos/IShowProfileDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async showProfile({
    user_id,
    is_provider,
  }: IShowProfileDTO): Promise<User | undefined> {
    let user;

    if (is_provider) {
      user = await this.ormRepository.findOne({
        where: { id: user_id },
        join: {
          alias: 'user',
          innerJoinAndSelect: {
            adress: 'user.adress',
          },
        },
      });
    } else {
      user = await this.ormRepository.findOne({ where: { id: user_id } });
    }

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async saveUpdate(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
