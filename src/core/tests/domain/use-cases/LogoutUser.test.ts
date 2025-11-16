import { LogoutUser } from '../../../domain/use-cases/LogoutUser';

describe('LogoutUser', () => {
  it('should logout a user', async () => {
    const logoutUser = new LogoutUser();

    await expect(logoutUser.execute({ userId: '1' })).resolves.not.toThrow();
  });
});
