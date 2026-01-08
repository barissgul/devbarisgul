"use client";
import Counter from "./Counter";
import { useLanguage } from "@/contexts/LanguageContext";

const CounterSection = ({ color = "color" }) => {
  const { language } = useLanguage();

  const counterData = {
    en: [
      { end: 8240, text: "Hours of Coding" },
      { end: 315, text: "Projects Completed" },
      { end: 250, text: "Satisfied Clients" },
      { end: 32, text: "GitHub Repositories" },
    ],
    tr: [
      { end: 8240, text: "Kodlama Saati" },
      { end: 315, text: "Tamamlanan Proje" },
      { end: 250, text: "Memnun Müşteri" },
      { end: 32, text: "GitHub Depoları" },
    ],
  };

  const data = counterData[language] || counterData.en;

  return (
    <div className="row g-4">
      {data.map((item, index) => (
        <div key={index} className="col-md-3 col-sm-6 mb-sm-30">
          <div
            className={`de_count text-center fs-15 wow fadeInRight`}
            data-wow-delay={`${index * 0.2}s`}
          >
            <h3 className={`fs-48 mb-1 ${color}`}>
              <Counter end={item.end} />
            </h3>
            <div className="fs-15">{item.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;
