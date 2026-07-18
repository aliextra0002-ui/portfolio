import { describe, expect, it } from 'vitest';
import { validateContactPayload } from './contact.js';

describe('validateContactPayload', () => {
  it('accepts valid input', () => {
    const result = validateContactPayload({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to book a call.',
    });

    expect(result.valid).toBe(true);
    expect(result.fields).toEqual({});
    expect(result.data).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to book a call.',
    });
  });

  it('rejects an invalid email', () => {
    const result = validateContactPayload({
      name: 'Jane Doe',
      email: 'not-an-email',
      message: 'Hello, I would like to book a call.',
    });

    expect(result.valid).toBe(false);
    expect(result.fields.email).toBe('A valid email is required.');
  });

  it('rejects empty fields', () => {
    const result = validateContactPayload({
      name: '',
      email: '',
      message: '',
    });

    expect(result.valid).toBe(false);
    expect(result.fields.name).toBe('Name is required (at least 2 characters).');
    expect(result.fields.email).toBe('A valid email is required.');
    expect(result.fields.message).toBe('Message must be at least 10 characters.');
  });

  it('rejects a name shorter than 2 characters', () => {
    const result = validateContactPayload({
      name: 'J',
      email: 'jane@example.com',
      message: 'Hello, I would like to book a call.',
    });

    expect(result.valid).toBe(false);
    expect(result.fields.name).toBe('Name is required (at least 2 characters).');
  });

  it('rejects a message shorter than 10 characters', () => {
    const result = validateContactPayload({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Too short',
    });

    expect(result.valid).toBe(false);
    expect(result.fields.message).toBe('Message must be at least 10 characters.');
  });
});
