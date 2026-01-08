"use client";
import FitParentTitle from "@/components/FitParentTitle";
import Header from "@/layouts/Header";
import NathanLayout from "@/layouts/NathanLayout";
import { menus, rootElements } from "@/utility/data";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const worksData = {
  en: [
    { title: "E-Commerce Platform", image: "1.webp", tag: "FULL STACK APPLICATION", year: "2024" },
    { title: "SaaS Dashboard", image: "2.webp", tag: "REACT & NEST.JS", year: "2023" },
    {
      title: "Mobile App",
      image: "3.webp",
      tag: "REACT NATIVE",
      year: "2022",
    },
    {
      title: "API Gateway",
      image: "4.webp",
      tag: "NODE.JS MICROSERVICES",
      year: "2021",
    },
    {
      title: "Admin Panel",
      image: "5.webp",
      tag: "NEXT.JS & TYPESCRIPT",
      year: "2020",
    },
    {
      title: "Real-time Chat",
      image: "6.webp",
      tag: "WEBSOCKET & NEST.JS",
      year: "2019",
    },
  ],
  tr: [
    { title: "E-Ticaret Platformu", image: "1.webp", tag: "FULL STACK UYGULAMA", year: "2024" },
    { title: "SaaS Dashboard", image: "2.webp", tag: "REACT & NEST.JS", year: "2023" },
    {
      title: "Mobil Uygulama",
      image: "3.webp",
      tag: "REACT NATIVE",
      year: "2022",
    },
    {
      title: "API Gateway",
      image: "4.webp",
      tag: "NODE.JS MİKROSERVİSLER",
      year: "2021",
    },
    {
      title: "Admin Paneli",
      image: "5.webp",
      tag: "NEXT.JS & TYPESCRIPT",
      year: "2020",
    },
    {
      title: "Gerçek Zamanlı Chat",
      image: "6.webp",
      tag: "WEBSOCKET & NEST.JS",
      year: "2019",
    },
  ],
};

const WorkItem = ({ title, image, tag, year }) => (
  <div className="col-lg-4">
    <div className="hover relative overflow-hidden text-light">
      <Link href="/work-single" className="overflow-hidden d-block relative">
        <h2 className="fs-40 abs-centered z-index-1 hover-op-0">{title}</h2>
        <img
          src={`images/works/${image}`}
          className="img-fluid hover-scale-1-2"
          alt="image"
        />
        <div className="absolute bottom-0 w-100 p-4 d-flex text-white justify-content-between">
          <div className="d-tag-s2">{tag}</div>
          <div className="fw-bold">{year}</div>
        </div>
      </Link>
    </div>
  </div>
);

const page = () => {
  const { language } = useLanguage();
  const works = worksData[language] || worksData.en;

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
            <FitParentTitle title={language === "tr" ? "Projelerim" : "My Works"} innitialFontSize={363} />
            <Header menus={menus.home2} activePage="4" />
          </div>
        </section>
        <section className="no-top">
          <div className="container">
            <div className="row g-4 wow fadeInUp" data-wow-delay=".3s">
              {works.map((work, index) => (
                <WorkItem key={index} {...work} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </NathanLayout>
  );
};

export default page;
