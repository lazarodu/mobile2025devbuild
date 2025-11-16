import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';
import { GeoCoordinates } from '../value-objects/GeoCoordinates';

export class UpdateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    id: string;
    name?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<User> {
    const { id, name, email, latitude, longitude } = params;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const newName = name ? Name.create(name) : user.name;
    const newEmail = email ? Email.create(email) : user.email;
    const newLocation = latitude && longitude ? GeoCoordinates.create(latitude, longitude) : user.location;

    const updatedUser = User.create(
      user.id,
      newName,
      newEmail,
      user.password, // Password is not updated here for security reasons
      newLocation
    );

    await this.userRepository.update(updatedUser);

    return updatedUser;
  }
}
