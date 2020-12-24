import React, { useCallback, useContext } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from '../notification';
import Button from '../../button/button';
import { Providers, UiContext } from 'Stores';

afterEach(cleanup);

const ToggleToastButton = () => {
    const { toast } = useContext(UiContext);

    const toastTest = useCallback(() => {
        toast({
            message1: 'testMessage1',
            message2: 'testMessage2 {{here}}',
            link: '/',
            type: 'error',
            position: 'bottom-right',
            duration: 10000,
        });
    }, [toast]);

    return (
        <Button data-testid='toast-button' onClick={toastTest}>
            Toast
        </Button>
    );
};

it('renders correctly', async () => {
    const { getByTestId } = render(
        <Providers>
            <Notification className='testClassName' />
            <ToggleToastButton />
        </Providers>,
    );
    const container = getByTestId('notification-container');
    const icon = getByTestId('notification-icon');
    const message1 = getByTestId('notification-message1');
    const message2 = getByTestId('notification-message2');
    const close = getByTestId('notification-close');
    const button = getByTestId('toast-button');

    expect(container).toHaveClass(
        'met-notification',
        'met-notification--bottom-right',
        'met-notification--invisible',
        'testClassName',
    );

    await fireEvent.click(button);

    expect(container).toHaveClass(
        'met-notification',
        'met-notification--error',
        'met-notification--bottom-right',
        'met-notification__bottom',
        'met-notification--visible',
        'testClassName',
    );
    expect(icon).toHaveAttribute('alt', 'exclamation');
    expect(message1.textContent).toBe('testMessage1');
    expect(message2).toContainElement(getByTestId('notification-link'));
    expect(message2.textContent).not.toContain('{{');
    expect(message2.textContent).not.toContain('}}');

    await fireEvent.click(close);

    expect(container).toHaveClass(
        'met-notification',
        'met-notification--bottom-right',
        'met-notification--error',
        'met-notification--invisible',
        'testClassName',
    );
});
