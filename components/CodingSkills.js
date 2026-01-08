"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const CodingSkills = ({
  title,
  skills: customSkills,
}) => {
  const { language } = useLanguage();

  const defaultSkills = [
    { name: "NODE.JS", value: "90%" },
    { name: "REACT", value: "92%" },
    { name: "NEXT.JS", value: "88%" },
    { name: "NEST.JS", value: "85%" },
    { name: "REACT NATIVE", value: "87%" },
    { name: "TYPESCRIPT", value: "90%" },
  ];

  const skills = customSkills || defaultSkills;
  const displayTitle = title || (language === "tr" ? "Programlama Becerileri" : "Coding Skills");
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
              {displayTitle}
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4 gx-5">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="col-md-6 wow fadeInRight"
                  data-wow-delay={`.${index + 4}s`}
                >
                  <div className="d-skills-bar">
                    <div className="d-bar">
                      <div className="d-skill" data-value={skill.value}>
                        <div className="d-info">
                          <span>{skill.name}</span>
                        </div>
                        <div className="d-progress-line">
                          <span className="d-fill-line" />
                        </div>
                      </div>
                    </div>
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

export default CodingSkills;
