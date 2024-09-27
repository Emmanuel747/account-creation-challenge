import React from 'react';
import { render, screen } from '@testing-library/react';
import RequirementIndicator from './RequirementIndicator';
import './RequirementIndicator.css';
import { describe, expect, it } from '@jest/globals';

describe('RequirementIndicator', () => {
  it('renders the label correctly', () => {
    render(<RequirementIndicator met={false} label="Test Requirement" />);
    expect(screen.getByText('Test Requirement')).toBeTruthy();
  });

  it('displays a checkmark when requirement is met', () => {
    render(<RequirementIndicator met={true} label="Met Requirement" />);
    expect(screen.getByText('✓')).toBeTruthy();
  });

  it('displays an X when requirement is not met', () => {
    render(<RequirementIndicator met={false} label="Unmet Requirement" />);
    expect(screen.getByText('×')).toBeTruthy();
  });

  it('applies correct classes when requirement is met', () => {
    const { container } = render(<RequirementIndicator met={true} label="Met Requirement" />);
    expect(container.querySelector('.requirement-checkbox.met')).toBeTruthy();
    expect(container.querySelector('.requirement-label.met')).toBeTruthy();
  });

  it('applies correct classes when requirement is not met', () => {
    const { container } = render(<RequirementIndicator met={false} label="Unmet Requirement" />);
    expect(container.querySelector('.requirement-checkbox:not(.met)')).toBeTruthy();
    expect(container.querySelector('.requirement-label:not(.met)')).toBeTruthy();
  });

  it('renders correctly with different prop combinations', () => {
    const { rerender } = render(<RequirementIndicator met={true} label="Test 1" />);
    expect(screen.getByText('Test 1')).toBeTruthy();
    expect(screen.getByText('✓')).toBeTruthy();

    rerender(<RequirementIndicator met={false} label="Test 2" />);
    expect(screen.getByText('Test 2')).toBeTruthy();
    expect(screen.getByText('×')).toBeTruthy();
  });
});
