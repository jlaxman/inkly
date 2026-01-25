import { formatPrice, truncate } from '@/lib/utils';

describe('Utils', () => {
  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(formatPrice(29.99)).toBe('$29.99');
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(0)).toBe('$0.00');
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      const longString = 'a'.repeat(100);
      expect(truncate(longString, 50).length).toBeLessThanOrEqual(53); // 50 + '...'
    });

    it('does not truncate short strings', () => {
      const shortString = 'Short text';
      expect(truncate(shortString, 50)).toBe('Short text');
    });

    it('handles empty strings', () => {
      expect(truncate('', 50)).toBe('');
    });
  });
});
