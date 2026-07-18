import ContactForm from '../components/contact-form.jsx';

export default function ContactPage() {
  return (
    <section className="page contact-page">
      <div className="contact-page__intro">
        <p className="eyebrow">Contact</p>
        <h1>Book a call</h1>
        <p>
          Tell me about your product and support workflow. I will reply within
          one business day.
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
