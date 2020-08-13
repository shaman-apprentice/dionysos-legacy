import 'react-native';
import React from 'React';
import renderer, { act } from 'react-test-renderer';

import { WineForm } from './WineForm';

it('does not modify the original wine', () => {
  const wine = {
    PartitionKey: '1',
    RowKey: '-1',
    Timestamp: new Date('2020-01-02').getTime(),
    rating: -1,
    color: 'red',
    sweetness: 'medium dry',
  };
  const form = renderer.create(<WineForm wine={wine} />);

  const colorField = form.root.findByProps({ label: 'color' });
  act(() => {
    colorField.props.onChangeText('white');
  });

  expect(wine.color).toBe('red');
  expect(colorField.props.value).toBe('white');
});
