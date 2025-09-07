import { render, screen } from '@testing-library/react';
import ListArticles from '../ListArticles';

const mockArticles = [
  {
    year: 2000,
    text: 'Test event',
    title: 'Test Title',
    extract: 'Test extract',
    pageId: 123,
  },
];

describe('ListArticles', () => {
  it('renders articles correctly', () => {
    render(<ListArticles articles={mockArticles} />);

    expect(screen.getByText('2000 — Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test event')).toBeInTheDocument();
    expect(screen.getByText('Test extract')).toBeInTheDocument();
  });

  it('renders empty state when no articles', () => {
    render(<ListArticles articles={[]} />);

    const list = screen.getByTestId('articles-list');
    expect(list.childElementCount).toBe(0);
  });
});
