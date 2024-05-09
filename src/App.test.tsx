import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Should render formexample', () => {
    const linkElement = screen.getByTestId('form-example-container');
    expect(linkElement).toBeInTheDocument();
  });
});
