import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  it('should initialize with no user', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login user', async () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
    const mockToken = 'jwt-token';

    (authApi.login as jest.Mock).mockResolvedValue({
      data: { user: mockUser, token: mockToken },
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
