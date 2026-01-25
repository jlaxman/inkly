import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from '@/app/products/page';
import { productsApi } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  productsApi: {
    getAll: jest.fn(),
    getCategories: jest.fn(),
  },
}));

describe('ProductsPage', () => {
  beforeEach(() => {
    (productsApi.getAll as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        meta: { total: 0, page: 1, limit: 12, totalPages: 0 },
      },
    });
    (productsApi.getCategories as jest.Mock).mockResolvedValue({
      data: { data: ['tshirts', 'hoodies'] },
    });
  });

  it('renders page title', () => {
    render(<ProductsPage />);
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<ProductsPage />);
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
  });

  it('renders category filter', () => {
    render(<ProductsPage />);
    expect(screen.getByText(/All Categories/i)).toBeInTheDocument();
  });

  it('fetches products on mount', async () => {
    render(<ProductsPage />);
    await waitFor(() => {
      expect(productsApi.getAll).toHaveBeenCalled();
    });
  });

  it('fetches categories on mount', async () => {
    render(<ProductsPage />);
    await waitFor(() => {
      expect(productsApi.getCategories).toHaveBeenCalled();
    });
  });
});
