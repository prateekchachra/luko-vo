import React from 'react';
import renderer from 'react-test-renderer';

import { render, act, fireEvent } from '@testing-library/react-native';

import AddObject from '..';

describe('AddObject', () => {
    describe('InitTest', () => {
        const tree = renderer.create(<AddObject />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    describe('ValidationTest', () => {

        it('disables the save button with initial values', () => {
            const {getByTestId} = render(<AddObject />);

              const submitButton = getByTestId('save-button');
              expect(submitButton.props.disabled).toBeFalsy();
        });
    })
})