import { render, screen } from '@testing-library/react';
import Logo from '@/components/Logo';

describe('Logo Component', () => {
  it('renders the Inkly logo', () => {
    render(<Logo />);
    expect(screen.getByText(/In/i)).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<Logo />);
    const logoElement = container.querySelector('.font-bold');
    expect(logoElement).toBeInTheDocument();
  });
});
