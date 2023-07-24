import { render, screen } from '@testing-library/react';
import PostDetail from './PostDetail';

test('renders PostDetail component', () => {
  render(<PostDetail />);
  // Add your test assertions here
  // For example, you can check if certain elements are rendered correctly
  expect(screen.getByText('Post Title')).toBeInTheDocument();
});