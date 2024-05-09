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
    const formExampleContainer = screen.getByTestId('form-example-container');
    expect(formExampleContainer).toBeInTheDocument();
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

          const errorElement = getByText('Nõutud väli.');
          expect(errorElement).toBeInTheDocument();
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

          const errorElement = getByText('Nõutud väli.');
          expect(errorElement).toBeInTheDocument();
        });
      }
    });

    it('Should show error for email field', async () => {
      let personEmailHelper: HTMLElement | null = null;
      await waitFor(() => {
        personEmailHelper = document.getElementById('person-email-helper-text');

        expect(personEmailHelper).toBeInTheDocument();
      });

      if (personEmailHelper) {
        await waitFor(() => {
          const { getByText } = within(personEmailHelper as HTMLElement);

          const errorElement = getByText('Nõutud väli.');
          expect(errorElement).toBeInTheDocument();
        });
      }
    });

    it('Should show error for idCode field', async () => {
      let idCodeHelper: HTMLElement | null = null;
      await waitFor(() => {
        idCodeHelper = document.getElementById('person-id-code-helper-text');

        expect(idCodeHelper).toBeInTheDocument();
      });

      if (idCodeHelper) {
        await waitFor(() => {
          const { getByText } = within(idCodeHelper as HTMLElement);

          const errorElement = getByText('Nõutud väli.');
          expect(errorElement).toBeInTheDocument();
        });
      }
    });

    it('Should show error for phoneNr field', async () => {
      let phoneNrHelper: HTMLElement | null = null;
      await waitFor(() => {
        phoneNrHelper = document.getElementById('person-phone-nr-helper-text');

        expect(phoneNrHelper).toBeInTheDocument();
      });

      if (phoneNrHelper) {
        await waitFor(() => {
          const { getByText } = within(phoneNrHelper as HTMLElement);

          const errorElement = getByText('Nõutud väli.');
          expect(errorElement).toBeInTheDocument();
        });
      }
    });
  });
});
