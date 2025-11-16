import { DeleteUser } from '../../../domain/use-cases/DeleteUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';

describe('DeleteUser', () => {
  beforeEach(() => {
    MockUserRepository.getInstance().reset();
  });
  it('should delete a user', async () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const deleteUser = new DeleteUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      latitude: 40.7128,
      longitude: -74.0060,
    });

    await deleteUser.execute({ id: user.id });

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser).toBeNull();
  });

  it('should throw an error if the user is not found', async () => {
    const userRepository = MockUserRepository.getInstance();
    const deleteUser = new DeleteUser(userRepository);

    await expect(deleteUser.execute({ id: '1' })).rejects.toThrow('User not found');
  });
});
