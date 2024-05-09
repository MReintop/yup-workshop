import React, { act } from 'react';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import FormExample from './FormExample';

describe('Render test', () => {
  beforeEach(() => {
    render(<FormExample />);
  });

  it('Should render formexample', () => {
    const linkElement = screen.getByTestId('form-example-container');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Given no values are set', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    act(() => {
      wrapper = render(<FormExample />);
    });
  });

  describe('When save is clicked', () => {
    beforeEach(async () => {
      act(() => {
        fireEvent.click(screen.getByText('Salvesta'));
      });
    });

    it('Should show error for firstName field', async () => {
      let personFirstNameHelper: HTMLElement | null = null;
      await waitFor(() => {
        personFirstNameHelper = document.getElementById(
          'person-first-name-helper-text',
        );

        expect(personFirstNameHelper).toBeInTheDocument();
      });

      if (personFirstNameHelper) {
        await waitFor(() => {
          const { getByText } = within(personFirstNameHelper as HTMLElement);

          const linkElement = getByText('Nõutud väli.');
          expect(linkElement).toBeInTheDocument();
        });
      }
    });

    it('Should show error for lastName field', async () => {
      let personLastNameHelper: HTMLElement | null = null;
      await waitFor(() => {
        personLastNameHelper = document.getElementById(
          'person-last-name-helper-text',
        );

        expect(personLastNameHelper).toBeInTheDocument();
      });

      if (personLastNameHelper) {
        await waitFor(() => {
          const { getByText } = within(personLastNameHelper as HTMLElement);

          const linkElement = getByText('Nõutud väli.');
          expect(linkElement).toBeInTheDocument();
        });
      }
    });
  });
});
