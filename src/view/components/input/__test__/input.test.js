import React from 'react';
import Input from '../input';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('renders correctly', async () => {
    const { getByTestId } = render(
        <Input
            className='testClassName'
            label='testLabel'
            value='testValue'
            placeholder='testPlaceholder'
            error='testError'
        />,
    );
    const wrapper = getByTestId('input-wrapper');
    const container = getByTestId('input-container');
    const label = getByTestId('input-label');
    const input = getByTestId('input-field');
    const error = getByTestId('input-error');

    expect(wrapper).toHaveClass('met-input', 'testClassName');
    expect(container).toHaveClass('met-input__container', 'met-input--outline', 'met-input--error');
    expect(label).toHaveClass('met-input__label--focused');
    expect(label.textContent).toBe('testLabel');
    expect(error.textContent).toBe('testError');
    expect(input).toHaveValue('testValue');

    await fireEvent.change(input, { target: { value: '' } });

    expect(label).not.toHaveClass('met-input__label--focused');

    await fireEvent.change(input, { target: { value: 'testValue2' } });

    expect(label).toHaveClass('met-input__label--focused');
    expect(input).toHaveValue('testValue2');
});
