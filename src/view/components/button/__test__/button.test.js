import React from 'react';
import Button from '../button';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('renders correctly', async () => {
    const { getByTestId } = render(
        <Button className='testClassName' onClick={() => console.log('testConsole')} primary>
            TestLabel
        </Button>,
    );
    const container = getByTestId('button-container');
    const text = getByTestId('button-text');

    expect(text.textContent).toBe('TESTLABEL');
    expect(container).toHaveClass('met-button', 'met-button--primary', 'testClassName');

    await fireEvent.click(container);

    expect(global.console.log).toHaveBeenCalledWith('testConsole');
});
