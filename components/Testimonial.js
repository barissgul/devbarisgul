"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonial = () => {
  const { language } = useLanguage();

  const testimonials = {
    en: [
      {
        name: "John Reynolds",
        role: "CTO of Tech Startup",
        image: "images/testimonial/1.webp",
        text: "Our platform needed a complete overhaul, and the developer delivered beyond our expectations. The new architecture is scalable, maintainable, and incredibly performant.",
      },
      {
        name: "Sarah Chen",
        role: "Product Manager",
        image: "images/testimonial/2.webp",
        text: "The React Native app development was exceptional. The cross-platform solution works seamlessly on both iOS and Android, with native performance.",
      },
      {
        name: "Michael Rodriguez",
        role: "Founder of SaaS Company",
        image: "images/testimonial/3.webp",
        text: "The Nest.js backend API is not only well-structured but also highly scalable. The microservices architecture has been a game-changer for our business.",
      },
      {
        name: "Emily Watson",
        role: "CEO of E-commerce Platform",
        image: "images/testimonial/4.webp",
        text: "The Next.js application is fast, SEO-friendly, and user-friendly. We've received numerous compliments on the performance and user experience.",
      },
      {
        name: "David Kim",
        role: "Technical Lead",
        image: "images/testimonial/5.webp",
        text: "The code quality and architecture are outstanding. The developer follows best practices and delivers production-ready applications.",
      },
      {
        name: "Lisa Anderson",
        role: "Startup Founder",
        image: "images/testimonial/6.webp",
        text: "From database design to deployment, the full stack solution was delivered on time and exceeded our expectations. Highly recommended!",
      },
    ],
    tr: [
      {
        name: "John Reynolds",
        role: "Teknoloji Startup'ı CTO'su",
        image: "images/testimonial/1.webp",
        text: "Platformumuzun tamamen yenilenmesi gerekiyordu ve geliştirici beklentilerimizi aştı. Yeni mimari ölçeklenebilir, bakımı kolay ve inanılmaz performanslı.",
      },
      {
        name: "Sarah Chen",
        role: "Ürün Müdürü",
        image: "images/testimonial/2.webp",
        text: "React Native uygulama geliştirme mükemmeldi. Platformlar arası çözüm hem iOS hem Android'de sorunsuz çalışıyor, native performans sunuyor.",
      },
      {
        name: "Michael Rodriguez",
        role: "SaaS Şirketi Kurucusu",
        image: "images/testimonial/3.webp",
        text: "Nest.js backend API'si sadece iyi yapılandırılmış değil, aynı zamanda oldukça ölçeklenebilir. Mikroservis mimarisi işimiz için oyun değiştirici oldu.",
      },
      {
        name: "Emily Watson",
        role: "E-ticaret Platformu CEO'su",
        image: "images/testimonial/4.webp",
        text: "Next.js uygulaması hızlı, SEO dostu ve kullanıcı dostu. Performans ve kullanıcı deneyimi hakkında çok sayıda övgü aldık.",
      },
      {
        name: "David Kim",
        role: "Teknik Lider",
        image: "images/testimonial/5.webp",
        text: "Kod kalitesi ve mimari mükemmel. Geliştirici en iyi uygulamaları takip ediyor ve production-ready uygulamalar sunuyor.",
      },
      {
        name: "Lisa Anderson",
        role: "Startup Kurucusu",
        image: "images/testimonial/6.webp",
        text: "Veritabanı tasarımından deployment'a kadar, full stack çözüm zamanında teslim edildi ve beklentilerimizi aştı. Kesinlikle tavsiye ederim!",
      },
    ],
  };

  const testimonialList = testimonials[language] || testimonials.en;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
              {language === "tr" ? "Referanslar" : "What They Say"}
            </div>
          </div>
          <div className="col-lg-10">
            <div
              className="owl-3-cols-dots owl-carousel owl-theme wow fadeInUp"
              data-wow-delay=".4s"
            >
              {testimonialList.map((testimonial, index) => (
                <div key={index} className="item">
                  <div className="de_testi s2">
                    <blockquote>
                      <div className="de_testi_by">
                        <img
                          className="circle"
                          alt="image"
                          src={testimonial.image}
                        />{" "}
                        <div>
                          {testimonial.name}
                          <span>{testimonial.role}</span>
                        </div>
                      </div>
                      <p>"{testimonial.text}"</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonial;
