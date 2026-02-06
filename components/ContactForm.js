"use client";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    if (!value?.trim()) return "";
    return EMAIL_REGEX.test(value.trim()) ? "" : "Please enter a valid email address.";
  };

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4 gx-5">
          <div
            className="col-lg-8 offset-lg-2 wow fadeInUp"
            data-wow-delay=".3s"
          >
            <p>
              Whether you have a question, a suggestion, or just want to say
              hello, this is the place to do it. Please fill out the form below
              with your details and message, and we'll get back to you as soon
              as possible.
            </p>
            <form
              name="contactForm"
              id="contact_form"
              className="position-relative z1000"
              method="post"
              action="#"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const name = form.Name?.value?.trim();
                const email = form.Email?.value?.trim();
                const phone = form.phone?.value?.trim();
                const message = form.message?.value?.trim();
                const err = validateEmail(email);
                setEmailError(err);
                if (!name || !email || !message) return;
                if (err) return;
                setStatus("sending");
                setErrorDetail("");
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, phone, message }),
                  });
                  const data = await res.json().catch(() => ({}));
                  if (res.ok) {
                    setStatus("success");
                    form.reset();
                    setEmailError("");
                  } else {
                    setStatus("error");
                    setErrorDetail(data.error || "Sorry there was an error sending your form.");
                  }
                } catch {
                  setStatus("error");
                  setErrorDetail("Sorry there was an error sending your form.");
                }
              }}
            >
              <div className="row gx-4">
                <div className="col-lg-6 col-md-6 mb10">
                  <div className="field-set">
                    <span className="d-label fw-bold">Name</span>
                    <input
                      type="text"
                      name="Name"
                      id="name"
                      className="form-control no-border"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="field-set">
                    <span className="d-label fw-bold">Email</span>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      className={`form-control no-border ${emailError ? "border-danger" : ""}`}
                      placeholder="Your Email"
                      required
                      onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                      onChange={() => emailError && setEmailError(validateEmail(document.getElementById("email")?.value))}
                    />
                    {emailError && (
                      <span className="d-block mt-1 small text-danger">{emailError}</span>
                    )}
                  </div>
                  <div className="field-set">
                    <span className="d-label fw-bold">Phone</span>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control no-border"
                      placeholder="Your Phone"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="field-set mb20">
                    <span className="d-label fw-bold">Message</span>
                    <textarea
                      name="message"
                      id="message"
                      className="form-control no-border"
                      placeholder="Your Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div
                className="g-recaptcha"
                data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
              />
              <div id="submit" className="mt20">
                <input
                  type="submit"
                  id="send_message"
                  value={status === "sending" ? "Sending…" : "Send Message"}
                  className="btn-main btn-line"
                  disabled={status === "sending"}
                />
              </div>
              {status === "success" && (
                <div
                  id="success_message"
                  className="mt20 p-3 rounded"
                  style={{ borderLeft: "4px solid #198754", background: "rgba(25, 135, 84, 0.1)", color: "#0f5132" }}
                  role="alert"
                >
                  <strong>Sent</strong> — Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
                </div>
              )}
              {status === "error" && (
                <div
                  id="error_message"
                  className="mt20 p-3 rounded"
                  style={{ borderLeft: "4px solid #dc3545", background: "rgba(220, 53, 69, 0.1)", color: "#842029" }}
                  role="alert"
                >
                  <strong>Error</strong> — {errorDetail}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactForm;

export const ContactForm1 = () => {
  return (
    <form
      name="contactForm"
      id="contact_form"
      className="position-relative z1000"
      method="post"
      action="#"
    >
      <div className="row gx-4">
        <div className="col-lg-6 col-md-6 mb10">
          <div className="field-set">
            <span className="d-label fw-bold">Name</span>
            <input
              type="text"
              name="Name"
              id="name"
              className="form-control no-border"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="field-set">
            <span className="d-label fw-bold">Email</span>
            <input
              type="text"
              name="Email"
              id="email"
              className="form-control no-border"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="field-set">
            <span className="d-label fw-bold">Phone</span>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control no-border"
              placeholder="Your Phone"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="field-set mb20">
            <span className="d-label fw-bold">Message</span>
            <textarea
              name="message"
              id="message"
              className="form-control no-border"
              placeholder="Your Message"
              required
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div
        className="g-recaptcha"
        data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
      />
      <div id="submit" className="mt20">
        <input
          type="submit"
          id="send_message"
          defaultValue="Send Message"
          className="btn-main btn-line"
        />
      </div>
      <div id="success_message" className="success">
        Your message has been sent successfully. Refresh this page if you want
        to send more messages.
      </div>
      <div id="error_message" className="error">
        Sorry there was an error sending your form.
      </div>
    </form>
  );
};
