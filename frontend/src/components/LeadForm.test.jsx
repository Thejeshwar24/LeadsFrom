import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LeadForm from './LeadForm';

describe('LeadForm Component', () => {
  it('renders form fields correctly', () => {
    render(<LeadForm />);

    // Check if form fields are rendered
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select a lead owner')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('displays validation errors when required fields are empty', async () => {
    render(<LeadForm />);

    // Simulate form submission
    fireEvent.click(screen.getByText('Save'));

    // Check if validation errors are displayed
    expect(await screen.findByText('First name is required')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });
});
