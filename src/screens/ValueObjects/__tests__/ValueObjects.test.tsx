import React from 'react';
import renderer from 'react-test-renderer';

import ValueObjects from '..';

describe('ValueObjects', () => {
    describe('ValidationTest', () => {

        it('renders successfully in the UI tree', () => {
                const tree = renderer.create(<ValueObjects />).toJSON();
                expect(tree).toMatchSnapshot();
        });
    })
})