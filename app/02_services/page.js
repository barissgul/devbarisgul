"use client";
import FitParentTitle from "@/components/FitParentTitle";
import Header from "@/layouts/Header";
import NathanLayout from "@/layouts/NathanLayout";
import { menus, rootElements } from "@/utility/data";
import { useLanguage } from "@/contexts/LanguageContext";

const page = () => {
  const { language } = useLanguage();

  const services = {
    en: [
      {
        title: "Backend Development",
        description:
          "Building scalable REST APIs and microservices using Node.js and Nest.js with clean architecture.",
      },
      {
        title: "Frontend Development",
        description:
          "Creating dynamic, responsive web applications with React and Next.js, focusing on performance.",
      },
      {
        title: "Mobile App Development",
        description:
          "Developing cross-platform mobile applications using React Native for iOS and Android.",
      },
      {
        title: "Full Stack Solutions",
        description:
          "End-to-end application development from database design to deployment.",
      },
      {
        title: "API Development & Integration",
        description:
          "Designing and implementing RESTful APIs, GraphQL endpoints, and third-party integrations.",
      },
      {
        title: "Database Design & Optimization",
        description:
          "Creating efficient database schemas, optimizing queries, and implementing caching strategies.",
      },
      {
        title: "Performance Optimization",
        description:
          "Enhancing application performance, speed, and scalability through best practices.",
      },
      {
        title: "Code Review & Refactoring",
        description:
          "Conducting code reviews to identify areas for improvement and maintainability.",
      },
      {
        title: "Technical Consulting",
        description:
          "Providing expert advice on architecture, technology stack, and development strategies.",
      },
      {
        title: "DevOps & Deployment",
        description: "Setting up CI/CD pipelines and deploying applications to cloud platforms.",
      },
    ],
    tr: [
      {
        title: "Backend Geliştirme",
        description:
          "Node.js ve Nest.js kullanarak temiz mimari ile ölçeklenebilir REST API'leri ve mikroservisler geliştirme.",
      },
      {
        title: "Frontend Geliştirme",
        description:
          "Performansa odaklanarak React ve Next.js ile dinamik, responsive web uygulamaları oluşturma.",
      },
      {
        title: "Mobil Uygulama Geliştirme",
        description:
          "iOS ve Android için React Native kullanarak platformlar arası mobil uygulamalar geliştirme.",
      },
      {
        title: "Full Stack Çözümler",
        description:
          "Veritabanı tasarımından deployment'a kadar uçtan uca uygulama geliştirme.",
      },
      {
        title: "API Geliştirme & Entegrasyon",
        description:
          "RESTful API'ler, GraphQL endpoint'leri ve üçüncü taraf entegrasyonları tasarlama ve uygulama.",
      },
      {
        title: "Veritabanı Tasarımı & Optimizasyon",
        description:
          "Verimli veritabanı şemaları oluşturma, sorguları optimize etme ve önbellekleme stratejileri uygulama.",
      },
      {
        title: "Performans Optimizasyonu",
        description:
          "En iyi uygulamalar aracılığıyla uygulama performansı, hızı ve ölçeklenebilirliğini artırma.",
      },
      {
        title: "Kod İnceleme & Refactoring",
        description:
          "İyileştirme ve bakım alanlarını belirlemek için kod incelemeleri yapma.",
      },
      {
        title: "Teknik Danışmanlık",
        description:
          "Mimari, teknoloji stack'i ve geliştirme stratejileri hakkında uzman tavsiyesi sağlama.",
      },
      {
        title: "DevOps & Deployment",
        description: "CI/CD pipeline'ları kurma ve uygulamaları bulut platformlarına deploy etme.",
      },
    ],
  };

  const servicesList = services[language] || services.en;
  return (
    <NathanLayout
      rootElements={rootElements.home2}
      darkMode={false}
      bodyClass="light"
    >
      <div className="section-dark no-bottom no-top" id="content">
        <div id="top" />
        <section className="no-top">
          <div className="text-fit-wrapper">
            <FitParentTitle title={language === "tr" ? "Ne Yapıyorum" : "What I Do"} innitialFontSize={393.1} />
            <Header menus={menus.home2} activePage="3" />
          </div>
        </section>
        <section className="no-top">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8 offset-lg-2">
                <div className="row g-4">
                  {servicesList.map((service, index) => (
                    <div
                      key={index}
                      className="col-lg-6 col-sm-6 wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <div className="relative">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </NathanLayout>
  );
};
export default page;
