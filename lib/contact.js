const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(body = {}) {
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  const fields = {};

  if (name.length < 2) {
    fields.name = 'Name is required (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(email)) {
    fields.email = 'A valid email is required.';
  }

  if (message.length < 10) {
    fields.message = 'Message must be at least 10 characters.';
  }

  return {
    valid: Object.keys(fields).length === 0,
    fields,
    data: { name, email, message },
  };
}

export async function handleContactSubmission(body) {
  const result = validateContactPayload(body);

  if (!result.valid) {
    return {
      status: 400,
      body: {
        error: 'Validation failed',
        fields: result.fields,
      },
    };
  }

  // Hook up Resend or another provider here when ready.
  console.info('Contact submission received:', result.data);

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Thanks — your message was sent. I will get back to you soon.',
    },
  };
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
    });

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}
