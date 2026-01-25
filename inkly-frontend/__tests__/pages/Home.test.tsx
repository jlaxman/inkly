import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { productsApi } from '@/lib/api';

// Mock the API
jest.mock('@/lib/api', () => ({
  productsApi: {
    getAll: jest.fn(),
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    (productsApi.getAll as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        meta: { total: 0, page: 1, limit: 6, totalPages: 0 },
      },
    });
  });

  it('renders hero section', () => {
    render(<Home />);
    expect(screen.getByText(/Create Something/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<Home />);
    expect(screen.getByText(/Explore Products/i)).toBeInTheDocument();
  });

  it('fetches featured products on mount', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(productsApi.getAll).toHaveBeenCalledWith({ limit: 6 });
    });
  });
});
