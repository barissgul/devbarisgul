"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const Experiences = ({
  variant = 1,
  color = "color-1",
  experiencesData: customExperiences,
}) => {
  const { language } = useLanguage();

  const defaultExperiences = {
    en: [
      {
        period: "2022 – Present",
        title: "Full Stack Developer",
        company: "Boryaz Kalıp Bilişim A.Ş",
      },
      {
        period: "2020 - 2022",
        title: "Software Developer",
        company: "Ircom Technology",
      },
      {
        period: "2014 - 2017",
        title: "IT Specialist",
        company: "Setur",
      },
    ],
    tr: [
      {
        period: "2022 – Günümüz",
        title: "Full Stack Developer",
        company: "Boryaz Kalıp Bilişim A.Ş",
      },
      {
        period: "2020 - 2022",
        title: "Yazılımcı",
        company: "Ircom Teknoloji",
      },
      {
        period: "2014 - 2017",
        title: "Bilgi İşlem",
        company: "Setur",
      },
    ],
  };

  const experiencesData = customExperiences || (defaultExperiences[language] || defaultExperiences.en);
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
              {language === "tr" ? "Deneyimler" : "Experiences"}
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {experiencesData.map((exp, index) => (
                <div
                  key={index}
                  className="col-md-4 wow fadeInRight"
                  data-wow-delay={`.${index + 4}s`}
                >
                  {variant == 1 ? (
                    <h6>{exp.period}</h6>
                  ) : (
                    <div className={`fw-600 fs-14 ${color} mb-2`}>
                      {exp.period}
                    </div>
                  )}

                  <h3>{exp.title}</h3>
                  <p>{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
