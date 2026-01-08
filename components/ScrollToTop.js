"use client";
import { nathanUtility } from "@/utility";
import { Fragment, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollToTop = ({ darkMode = true }) => {
  const { language } = useLanguage();

  useEffect(() => {
    nathanUtility.backToTop();
  }, []);

  const scrollText = language === "tr" ? "Yukarı kaydır" : "Scroll to top";

  return (
    <Fragment>
      <div className={`float-text show-on-scroll ${darkMode ? "dark" : ""}`}>
        <span>
          <a href="#">{scrollText}</a>
        </span>
      </div>
      <div className={`scrollbar-v show-on-scroll ${darkMode ? "dark" : ""}`} />
    </Fragment>
  );
};
export default ScrollToTop;
