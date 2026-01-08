"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const Education = ({
  variant = 1,
  color = "color-1",
  educationData: customEducation,
}) => {
  const { language } = useLanguage();

  const defaultEducation = {
    en: [
      { year: "2024", degree: "Computer Programming", school: "Ataturk University" },
    ],
    tr: [
      { year: "2024", degree: "Bilgisayar Programcılığı", school: "Atatürk Üniversitesi" },
    ],
  };

  const educationData = customEducation || (defaultEducation[language] || defaultEducation.en);
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
              {language === "tr" ? "Eğitim" : "Education"}
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className="col-md-4 wow fadeInRight"
                  data-wow-delay={`.${index + 4}s`}
                >
                  {variant == 1 ? (
                    <h6>{item.year}</h6>
                  ) : (
                    <div className={`fw-600 fs-14 ${color} mb-2`}>
                      {item.year}
                    </div>
                  )}
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Education;
