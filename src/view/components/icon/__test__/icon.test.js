import React from 'react';
import Icon from '../icon';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from 'Stores';

afterEach(cleanup);

it('renders correctly', async () => {
    const { getByTestId } = render(
        <Providers>
            <Icon
                className='testClassName'
                name='arrow-down'
                onClick={() => console.log('testConsole')}
            />
        </Providers>,
    );
    const icon = getByTestId('icon-img');

    expect(icon).toHaveClass('testClassName');

    await fireEvent.click(icon);

    expect(global.console.log).toHaveBeenCalledWith('testConsole');
});
