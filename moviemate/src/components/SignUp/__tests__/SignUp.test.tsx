import SignUp from '../SignUp';
import React from 'react';
import { render, screen, } from '@testing-library/react';

test('should render signup component', () => {
    render(<SignUp />);
    const signupElement = screen.getAllByTestId('test');
    expect(signupElement.length).toBeGreaterThan(0);


});