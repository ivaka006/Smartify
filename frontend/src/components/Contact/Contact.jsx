import "./Contact.css";

function Contact() {
  return (
    <section className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-text">
        Got questions, suggestions, or feedback about <strong>Smartify</strong>?  
        We’d love to hear from you! You can reach us through the details below.
      </p>

      <div className="contact-info">
        <p><strong>Email:</strong> smartify@gmail.com</p>
        <p><strong>Phone:</strong> +358 45 678 9123</p>
        <p><strong>Location:</strong> Lahti, Finland</p>
      </div>
    </section>
  );
}

export default Contact;
