import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 29.99,
  category: 'tshirts',
  images: ['/test-image.jpg'],
  isActive: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

describe('ProductCard Component', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('displays product image', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
  });

  it('shows add to cart button', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });
});
