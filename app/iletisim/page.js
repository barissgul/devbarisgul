"use client";
import { useState } from "react";
import FitParentTitle from "@/components/FitParentTitle";
import Header from "@/layouts/Header";
import NathanLayout from "@/layouts/NathanLayout";
import { menus, rootElements } from "@/utility/data";
import { useLanguage } from "@/contexts/LanguageContext";

const page = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const content = {
    en: {
      title: "Hire Me",
      description: "Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please fill out the form below with your details and message, and I'll get back to you as soon as possible.",
      nameLabel: "Name",
      namePlaceholder: "Your Name",
      emailLabel: "Email",
      emailPlaceholder: "Your Email",
      phoneLabel: "Phone",
      phonePlaceholder: "Your Phone",
      messageLabel: "Message",
      messagePlaceholder: "Your Message",
      submitButton: "Send Message",
      successMessage: "Your message has been sent successfully. Refresh this page if you want to send more messages.",
      errorMessage: "Sorry there was an error sending your form.",
    },
    tr: {
      title: "İletişim",
      description: "Bir sorunuz, öneriniz varsa veya sadece merhaba demek istiyorsanız, burası doğru yer. Lütfen aşağıdaki formu doldurun, en kısa sürede size dönüş yapacağım.",
      nameLabel: "İsim",
      namePlaceholder: "Adınız",
      emailLabel: "E-posta",
      emailPlaceholder: "E-posta Adresiniz",
      phoneLabel: "Telefon",
      phonePlaceholder: "Telefon Numaranız",
      messageLabel: "Mesaj",
      messagePlaceholder: "Mesajınız",
      submitButton: "Mesaj Gönder",
      successMessage: "Mesajınız başarıyla gönderildi. Daha fazla mesaj göndermek isterseniz bu sayfayı yenileyin.",
      errorMessage: "Üzgünüm, formunuzu gönderirken bir hata oluştu.",
    },
  };

  const texts = content[language] || content.en;

  return (
    <NathanLayout
      rootElements={rootElements.home2}
      bodyClass="light"
      darkMode={false}
    >
      <div className="section-dark no-bottom no-top" id="content">
        <div id="top" />
        <section className="no-top">
          <div className="text-fit-wrapper">
            <FitParentTitle title={texts.title} innitialFontSize={513.2} />
            <Header menus={menus.home2} activePage="6" />
          </div>
        </section>
        <section className="no-top">
          <div className="container">
            <div className="row g-4 gx-5">
              <div
                className="col-lg-8 offset-lg-2 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <p>
                  {texts.description}
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
                    if (!name || !email || !message) return;
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
                      } else {
                        setStatus("error");
                        setErrorDetail(data.error || texts.errorMessage);
                      }
                    } catch {
                      setStatus("error");
                      setErrorDetail(texts.errorMessage);
                    }
                  }}
                >
                  <div className="row gx-4">
                    <div className="col-lg-6 col-md-6 mb10">
                      <div className="field-set">
                        <span className="d-label fw-bold">{texts.nameLabel}</span>
                        <input
                          type="text"
                          name="Name"
                          id="name"
                          className="form-control no-border"
                          placeholder={texts.namePlaceholder}
                          required
                        />
                      </div>
                      <div className="field-set">
                        <span className="d-label fw-bold">{texts.emailLabel}</span>
                        <input
                          type="text"
                          name="Email"
                          id="email"
                          className="form-control no-border"
                          placeholder={texts.emailPlaceholder}
                          required
                        />
                      </div>
                      <div className="field-set">
                        <span className="d-label fw-bold">{texts.phoneLabel}</span>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="form-control no-border"
                          placeholder={texts.phonePlaceholder}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="field-set mb20">
                        <span className="d-label fw-bold">{texts.messageLabel}</span>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control no-border"
                          placeholder={texts.messagePlaceholder}
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
                      value={status === "sending" ? (language === "tr" ? "Gönderiliyor…" : "Sending…") : texts.submitButton}
                      className="btn-main btn-line"
                      disabled={status === "sending"}
                    />
                  </div>
                  {status === "success" && (
                    <div id="success_message" className="success mt20">
                      {texts.successMessage}
                    </div>
                  )}
                  {status === "error" && (
                    <div id="error_message" className="error mt20">
                      {errorDetail || texts.errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </NathanLayout>
  );
};
export default page;
