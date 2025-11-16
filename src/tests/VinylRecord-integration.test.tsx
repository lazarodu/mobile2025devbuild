import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../context/auth';
import { MockUserRepository } from '../core/infra/repositories/MockUserRepository';
import { MockVinylRecordRepository } from '../core/infra/repositories/MockVinylRecordRepository';
import { User } from '../core/domain/entities/User';
import { Name } from '../core/domain/value-objects/Name';
import { Email } from '../core/domain/value-objects/Email';
import { Password } from '../core/domain/value-objects/Password';
import { GeoCoordinates } from '../core/domain/value-objects/GeoCoordinates';
import { VinylRecordStackNavigation } from '../navigations/VinylRecordStackNavigation';
import * as AuthContext from '../context/auth';
import { Alert } from 'react-native';

describe('VinylRecord CRUD Integration', () => {
  beforeEach(() => {
    MockUserRepository.getInstance().reset();
    MockVinylRecordRepository.getInstance().reset();
    jest.restoreAllMocks(); // Restores all mocks
  });

  it('should perform a full CRUD cycle on a vinyl record', async () => {
    // 1. Mock the authenticated user
    const mockUser = User.create(
      'user-1',
      Name.create('Test User'),
      Email.create('test@example.com'),
      Password.create('password123'),
      GeoCoordinates.create(0, 0)
    );

    // Spy on useAuth and return the mock user
    jest.spyOn(AuthContext, 'useAuth').mockReturnValue({
      login: true,
      user: mockUser,
      handleLogin: jest.fn(),
      setLogin: jest.fn(),
      session: null,
    });

    // 2. Mock the Alert component
    const alertSpy = jest.spyOn(Alert, 'alert');

    const { getByText, getByPlaceholderText, queryByText } = render(
      <AuthProvider>
        <NavigationContainer>
          <VinylRecordStackNavigation />
        </NavigationContainer>
      </AuthProvider>
    );

    // 3. Create a new record
    await waitFor(() => fireEvent.press(getByText('Register New Vinyl Record')));

    fireEvent.changeText(getByPlaceholderText('Band'), 'Test Band');
    fireEvent.changeText(getByPlaceholderText('Album'), 'Test Album');
    fireEvent.changeText(getByPlaceholderText('Year'), '2023');
    fireEvent.changeText(getByPlaceholderText('Number of Tracks'), '10');
    fireEvent.changeText(getByPlaceholderText('Photo URL'), 'https://example.com/photo.jpg');
    fireEvent.press(getByText('Save'));

    // 4. Verify the new record is on the list
    await waitFor(() => {
      expect(queryByText('Test Band - Test Album')).not.toBeNull();
    });

    // 5. Navigate to details and edit the record
    fireEvent.press(getByText('detalhes'));

    await waitFor(() => fireEvent.press(getByText('Edit')));
    fireEvent.changeText(getByPlaceholderText('Album'), 'Test Album Updated');
    fireEvent.press(getByText('Update'));

    // 6. Verify the changes on the list screen
    await waitFor(() => {
      expect(queryByText('Test Band - Test Album Updated')).not.toBeNull();
    });

    // 7. Delete the record
    fireEvent.press(getByText('detalhes'));
    await waitFor(() => fireEvent.press(getByText('Delete')));

    // 8. Simulate pressing 'Delete' on the confirmation alert
    // The 'Delete' button is the second button in the array, its onPress is what we need to call.
    const alertArgs = alertSpy.mock.calls[0];
    const deleteButton = alertArgs[2] && alertArgs[2][1]; // [title, message, buttons]
    if (deleteButton && deleteButton.onPress) {
      await deleteButton.onPress();
    }

    // 9. Verify the record is no longer on the list
    // The app should navigate back automatically after successful deletion.
    await waitFor(() => {
      expect(queryByText('Test Band - Test Album Updated')).toBeNull();
    });
  });
});