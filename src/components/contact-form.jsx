import { useState } from 'react';
import { validateContactPayload } from '../../lib/contact.js';

const INITIAL_FORM = {
  name: '',
  email: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus('submitting');
    setFieldErrors({});
    setSuccessMessage('');

    const validation = validateContactPayload(form);

    if (!validation.valid) {
      setFieldErrors(validation.fields);
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setFieldErrors(data.fields ?? {});
        setStatus('error');
        return;
      }

      setForm(INITIAL_FORM);
      setSuccessMessage(data.message);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
          required
        />
        {fieldErrors.name ? (
          <p className="field-error" id="name-error">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
          required
        />
        {fieldErrors.email ? (
          <p className="field-error" id="email-error">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
          placeholder="What are you building, and how can I help?"
          required
        />
        {fieldErrors.message ? (
          <p className="field-error" id="message-error">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>

      {status === 'success' ? (
        <p className="form-success" role="status">
          {successMessage}
        </p>
      ) : null}

      {status === 'error' && Object.keys(fieldErrors).length === 0 ? (
        <p className="form-error" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
