import { handleContactSubmission } from '../lib/contact.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { status, body } = await handleContactSubmission(req.body ?? {});

    return res.status(status).json(body);
  } catch {
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
