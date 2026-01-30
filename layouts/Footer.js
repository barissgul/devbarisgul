"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const Footer = ({ footerShape = false }) => {
  const { language } = useLanguage();

  const footerTexts = {
    en: {
      allRightsReserved: "All Right Reserved",
      templateBy: "BARIS GUL",
      letsTalk: "Contact",
    },
    tr: {
      allRightsReserved: "Tüm Hakları Saklıdır",
      templateBy: "BARIS GUL",
      letsTalk: "İLETİŞİM",
    },
  };

  const texts = footerTexts[language] || footerTexts.en;

  return (
    <footer>
      {footerShape && (
        <img
          src="images/misc/scratches-3.webp"
          className="w-20 me-5 abs bottom-0 abs-center"
          alt
        />
      )}
      <div className="container-fluid">
        <div className="px-2">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="d-menu-1 wow" data-wow-delay=".3s">
                <ul>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                </ul>
                <p className="no-bottom">
                  {texts.allRightsReserved}
                  <br />
                  {texts.templateBy}
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <Link href="/iletisim">
                <h2
                  className="fs-84 fw-800 pe-3 shuffle wow fadeInLeft"
                  data-wow-delay=".3s"
                  data-text={texts.letsTalk}
                >
                  {texts.letsTalk}
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
