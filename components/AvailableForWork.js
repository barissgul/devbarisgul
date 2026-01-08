"use client";
import Link from "next/link";
import CounterSection from "./CounterSection";
import { useLanguage } from "@/contexts/LanguageContext";

const AvailableForWork = ({ variant = "default" }) => {
  const { language } = useLanguage();
  const isVariant2 = variant === "variant2";

  const content = {
    default: {
      en: {
        subtitle: "Available for Work",
        title: "Full Stack Developer",
        description:
          "I specialize in building scalable web and mobile applications using modern technologies. My expertise includes Node.js, Nest.js for robust backend development, React and Next.js for dynamic frontend experiences, and React Native for cross-platform mobile applications.",
        aboutButton: "About Me",
        aboutLink: "/02_about",
        imageSrc: "images/misc/profile.webp",
        counterColor: "color",
      },
      tr: {
        subtitle: "İş İçin Hazırım",
        title: "Full Stack Developer",
        description:
          "Modern teknolojiler kullanarak ölçeklenebilir web ve mobil uygulamalar geliştirme konusunda uzmanım. Node.js ve Nest.js ile sağlam backend geliştirme, React ve Next.js ile dinamik frontend deneyimleri, React Native ile platformlar arası mobil uygulamalar geliştiriyorum.",
        aboutButton: "Hakkımda",
        aboutLink: "/02_about",
        imageSrc: "images/misc/profile.webp",
        counterColor: "color",
      },
    },
    variant2: {
      en: {
        subtitle: "Available for Work",
        title: (
          <>
            <span className="color-1">Hair</span> and{" "}
            <span className="color-1">Makeup</span> Artist from New York
          </>
        ),
        description:
          "Hi, I'm Selena, a passionate makeup artist based in the heart of New York City. With over 12 years of experience in the beauty industry, I've had the privilege of working with a diverse clientele.",
        aboutButton: "About Me",
        aboutLink: "/03_about",
        imageSrc: "03_images/profile_pic_1.jpg",
        counterColor: "color-1",
      },
      tr: {
        subtitle: "İş İçin Hazırım",
        title: (
          <>
            <span className="color-1">Saç</span> ve{" "}
            <span className="color-1">Makyaj</span> Sanatçısı, New York
          </>
        ),
        description:
          "Merhaba, ben Selena, New York'un kalbinde bulunan tutkulu bir makyaj sanatçısıyım. Güzellik endüstrisinde 12 yılı aşkın deneyimle, çeşitli müşterilerle çalışma ayrıcalığına sahip oldum.",
        aboutButton: "Hakkımda",
        aboutLink: "/03_about",
        imageSrc: "03_images/profile_pic_1.jpg",
        counterColor: "color-1",
      },
    },
  };

  const selectedContent = isVariant2 ? content.variant2[language] : content.default[language];

  return (
    <div className="container">
      <div className="spacer-double d-lg-none d-sm-block" />
      <div className="row align-items-center g-4 gx-5">
        <div className="col-lg-6">
          <div className="relative">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
              {selectedContent.subtitle}
            </div>
            <h1 className="lh-1 wow fadeInUp" data-wow-delay=".4s">
              {selectedContent.title}
            </h1>
          </div>
          <p className="lead wow fadeInUp" data-wow-delay=".5s">
            {selectedContent.description}
          </p>
          <div className="spacer-10" />
          <Link
            className="w-150px btn-line wow fadeIn"
            data-wow-delay=".6s"
            href={selectedContent.aboutLink}
          >
            {selectedContent.aboutButton}
          </Link>
        </div>
        <div className="col-lg-6">
          <img
            src={selectedContent.imageSrc}
            className="w-100 wow fadeInUp"
            data-wow-delay=".6s"
            alt="image"
          />
        </div>
      </div>
      <div className="spacer-double" />
      <CounterSection color={selectedContent.counterColor} />
    </div>
  );
};

export default AvailableForWork;
