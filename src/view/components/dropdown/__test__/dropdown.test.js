import React from 'react';
import Dropdown from '../dropdown';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from 'Stores';

afterEach(cleanup);

it('renders correctly', async () => {
    const DUMMY = [
        {
            label: 'testLabel1',
            value: 'testValue1',
        },
        {
            label: 'testLabel2',
            value: 'testValue2',
        },
    ];
    const { getByText, getByTestId } = render(
        <Providers>
            <Dropdown
                items={DUMMY}
                className='testClassName'
                label='testLabel'
                value='testValue1'
                onChange={() => console.log('testConsole')}
                error='testError'
            />
        </Providers>,
    );
    const container = getByTestId('dropdown-container');
    const label = getByTestId('dropdown-label');
    const icon = getByTestId('dropdown-icon');
    const list = getByTestId('dropdown-list');
    const input = getByTestId('dropdown-input');
    const error = getByTestId('dropdown-error');

    expect(container).toHaveClass('met-dropdown', 'met-dropdown--outline', 'testClassName');
    expect(error.textContent).toBe('testError');
    expect(label.textContent).toBe('testLabel');
    expect(input).toHaveValue('testLabel1');

    await fireEvent.click(icon);

    expect(list).toHaveClass('met-dropdown__list--opened');

    await fireEvent.click(getByText('testLabel2'));

    expect(list).not.toHaveClass('met-dropdown__list--opened');
    expect(input).toHaveValue('testLabel2');
    expect(global.console.log).toHaveBeenCalledWith('testConsole');
});
