import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../slider';

afterEach(cleanup);

it('renders correctly', async () => {
    const { getByTestId } = render(
        <Slider
            className='testClassName'
            value={50}
            min={0}
            max={100}
            error='testError'
            unit='testUnit'
        />,
    );
    const container = getByTestId('slider-container');
    const value = getByTestId('slider-value');
    const handler = getByTestId('slider-handler');
    const min = getByTestId('slider-min');
    const max = getByTestId('slider-max');
    const error = getByTestId('slider-error');

    expect(container).toHaveClass('met-slider', 'testClassName');
    expect(value.textContent).toBe('50testUnit');
    expect(min.textContent).toBe('0testUnit');
    expect(max.textContent).toBe('100testUnit');
    expect(error.textContent).toBe('testError');

    await fireEvent.mouseDown(handler, { clienttX: 150 });
    expect(value.textContent).not.toBe('50testUnit');
});
