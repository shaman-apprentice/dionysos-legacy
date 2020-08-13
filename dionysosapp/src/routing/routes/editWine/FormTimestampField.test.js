import 'react-native';
import React from 'React';
import renderer, { act } from 'react-test-renderer';

import { WineForm } from './WineForm';

let wine;
beforeEach(() => {
  wine = {
    PartitionKey: '1',
    RowKey: '-1',
    Timestamp: new Date('2020-01-02').getTime(),
    rating: -1,
    color: 'red',
    sweetness: 'medium dry',
  };
});

it('initial formats date correctly', () => {
  const form = renderer.create(<WineForm wine={wine} />);
  expect(form.root.findByProps({ label: 'Timestamp' }).props.value).toBe("02/01/2020"); 
});

it('has correct error message, if an invalid date is entered', () => {
  const form = renderer.create(<WineForm wine={wine} />);
  const dateField = form.root.findByProps({ label: 'Timestamp' });
  act(() => {
    dateField.props.onChangeText('0h/01/2020');
  });
  expect(dateField.props.errorMessage).toBe('date must have the form dd/mm/yyyy');
});

it('shows the entered value, even if it is not a valid date', () => {
  const form = renderer.create(<WineForm wine={wine} />);
  const dateField = form.root.findByProps({ label: 'Timestamp' });
  act(() => {
    dateField.props.onChangeText('0h/01/2020');
  });
  expect(dateField.props.value).toBe('0h/01/2020');
});
