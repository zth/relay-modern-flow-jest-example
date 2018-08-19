// @flow

/**
 * These tests test input and mutations
 */

import * as React from 'react';
import { queryMock } from '../../__testUtils__/queryMock';
import type { AppQueryResponse } from '../__generated__/AppQuery.graphql';
import { App } from '../App';
import { render, wait, fireEvent } from 'react-testing-library';

describe('App', () => {
  let r;

  beforeEach(async () => {
    // We'll always need to mock the AppQuery and UserPetsQuery
    queryMock.mockQuery({
      name: 'AppQuery',
      data: {
        viewer: {
          id: '1',
          name: 'Some Name'
        }
      }
    });

    queryMock.mockQuery({
      name: 'UserPetsQuery',
      data: {
        User: {
          id: '1',
          name: 'Some Name',
          pets: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              endCursor: 'cursor-0',
              startCursor: ''
            },
            edges: [
              {
                cursor: 'cursor-0',
                node: {
                  __typename: 'Pet',
                  id: 'pet-1',
                  name: 'Cat the Pet',
                  grade: 'B'
                }
              }
            ]
          }
        }
      }
    });

    // We'll also navigate to the pets view automatically before each test, to reduce
    // boilerplate inside our actual tests.

    r = render(<App />);

    await wait(() => r.getByText('See my pets'));
    fireEvent.click(r.getByText('See my pets'));
    await wait(() => r.getByText(/Pets of Some Name/));
  });

  describe('Saving a new grade', () => {
    it('should only be possible to change to valid grades in input', async () => {
      /**
       * We want to make sure do not allow any invalid grades in our grade input.
       */

      const petGradeInput = r.getByPlaceholderText('Set new pet grade');

      // This should not be allowed
      fireEvent.change(petGradeInput, { target: { value: 'S' } });
      expect(petGradeInput.value).toBe('');

      // ...but this should be, as it's a valid grade according to our Grade enum in the server schema
      fireEvent.change(petGradeInput, { target: { value: 'A' } });
      expect(petGradeInput.value).toBe('A');
    });

    test('save button should be disabled before we have a valid grade to save', async () => {
      const petGradeInput = r.getByPlaceholderText('Set new pet grade');
      const savePetGradeButton = r.getByText('Save pet grade');

      // It should be disabled when the input is empty
      expect(savePetGradeButton.disabled).toBeTruthy();

      // It should be disabled when the input is the same as the currently saved grade B
      fireEvent.change(petGradeInput, { target: { value: 'B' } });
      expect(savePetGradeButton.disabled).toBeTruthy();

      // It should be ENABLED when the grade in the input is not the same as the one that is saved
      fireEvent.change(petGradeInput, { target: { value: 'A' } });
      expect(savePetGradeButton.disabled).toBeFalsy();
    });

    it('should be possible to save a new grade', async () => {
      const petGradeInput = r.getByPlaceholderText('Set new pet grade');
      const savePetGradeButton = r.getByText('Save pet grade');

      // Current grade from backend should show in the UI
      expect(r.getByText('Current pet grade: B')).toBeTruthy();

      // Set new grade in input
      fireEvent.change(petGradeInput, { target: { value: 'A' } });

      // Press the save button
      // Here, we want to make sure the save button is disabled once you've started saving, to avoid saving multiple
      // times. We'll do that through controlling when the mocked mutation/query resolves.
      const resolveMutation = queryMock.mockQueryWithControlledResolution({
        name: 'SetPetGradeMutation',
        variables: {
          // Make sure we provide the exact variables we want to match on so we ensure the correct input is sent.
          input: {
            petId: 'pet-1',
            grade: 'A'
          }
        },
        data: {
          setPetGrade: {
            pet: {
              id: 'pet-1',
              grade: 'A'
            }
          }
        }
      });

      // Trigger the mutation by clicking the Save button
      expect(savePetGradeButton.disabled).toBeFalsy();
      fireEvent.click(savePetGradeButton);

      // Now, before the mutation resolves and we're in a loading state, the save button should be disabled:
      expect(savePetGradeButton.disabled).toBeTruthy();

      // Resolve the mutation as we're done checking our intermediate states
      resolveMutation();

      // Now, wait for the newly saved grade to appear in the UI
      await wait(() => r.getByText('Current pet grade: A'));

      // There, grade updated, and we're all done!
    });
  });
});
