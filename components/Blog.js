"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = ({ tagClass = "text-white" }) => {
  const { language } = useLanguage();

  const blogPosts = {
    en: [
      {
        id: 1,
        image: "images/blog/1.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "Building Scalable APIs with Nest.js: Best Practices and Patterns",
        link: "blog-single",
      },
      {
        id: 2,
        image: "images/blog/2.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "Next.js 14 Features: Server Components and App Router Deep Dive",
        link: "blog-single",
      },
      {
        id: 3,
        image: "images/blog/3.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "React Native Performance Optimization: Tips for Faster Apps",
        link: "blog-single",
      },
      {
        id: 4,
        image: "images/blog/4.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "Node.js Microservices Architecture: Design Patterns and Implementation",
        link: "blog-single",
      },
      {
        id: 5,
        image: "images/blog/5.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "Full Stack Development: From Database to Deployment",
        link: "blog-single",
      },
      {
        id: 6,
        image: "images/blog/6.webp",
        category: "Development",
        date: "18 Mar 2024",
        title: "Modern JavaScript: ES6+ Features Every Developer Should Know",
        link: "blog-single",
      },
    ],
    tr: [
      {
        id: 1,
        image: "images/blog/1.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "Nest.js ile Ölçeklenebilir API'ler: En İyi Uygulamalar ve Desenler",
        link: "blog-single",
      },
      {
        id: 2,
        image: "images/blog/2.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "Next.js 14 Özellikleri: Server Components ve App Router Derinlemesine",
        link: "blog-single",
      },
      {
        id: 3,
        image: "images/blog/3.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "React Native Performans Optimizasyonu: Daha Hızlı Uygulamalar İçin İpuçları",
        link: "blog-single",
      },
      {
        id: 4,
        image: "images/blog/4.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "Node.js Mikroservis Mimarisi: Tasarım Desenleri ve Uygulama",
        link: "blog-single",
      },
      {
        id: 5,
        image: "images/blog/5.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "Full Stack Geliştirme: Veritabanından Deployment'a",
        link: "blog-single",
      },
      {
        id: 6,
        image: "images/blog/6.webp",
        category: "Geliştirme",
        date: "18 Mar 2024",
        title: "Modern JavaScript: Her Geliştiricinin Bilmesi Gereken ES6+ Özellikleri",
        link: "blog-single",
      },
    ],
  };

  const posts = blogPosts[language] || blogPosts.en;
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-2">
            <div className="subtitle ms-3 wow fadeInUp" data-wow-delay=".3s">
              {language === "tr" ? "Blog'dan" : "From the Blog"}
            </div>
          </div>
          <div className="col-lg-10 wow fadeInUp" data-wow-delay=".4s">
            <div className="row g-4">
              {posts.map((post) => (
                <div key={post.id} className="col-lg-6">
                  <div className="relative">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm-3">
                        <div className="post-image">
                          <img alt="image" src={post.image} className="lazy" />
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="mb-2">
                          <div className="d-inline fs-14 fw-bold me-3">
                            <i className={`icofont-tag ${tagClass} me-2`} />
                            {post.category}
                          </div>
                          <div className="d-inline fs-14 fw-600">
                            <i
                              className={`icofont-ui-calendar ${tagClass} me-2`}
                            />
                            {post.date}
                          </div>
                        </div>
                        <h4>
                          <Link href={post.link}>{post.title}</Link>
                        </h4>
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
export default Blog;

export const Blog2 = () => {
  const blogPosts = [
    {
      title: "Mastering Modern Web Design: Trends and Techniques for 2024",
      date: "18 Mar 2024",
    },
    {
      title: "The Art of User Experience: Designing Websites That Delight",
      date: "18 Mar 2024",
    },
    {
      title:
        "Responsive Design Best Practices: Making Your Website Mobile-Friendly",
      date: "18 Mar 2024",
    },
    {
      title: "Typography in Web Design: Choosing Fonts That Make an Impact",
      date: "18 Mar 2024",
    },
    {
      title:
        "Web Design Mistakes to Avoid: Common Pitfalls and How to Fix Them",
      date: "18 Mar 2024",
    },
    {
      title: "Creating Accessible Websites: Why Inclusive Design Matters",
      date: "18 Mar 2024",
    },
  ];

  return (
    <section id="section-blog" className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="subtitle wow fadeInUp">Brandon Photography</div>
            <div className="d-flex justify-content-between">
              <h2 className="wow fadeInUp">Blog</h2>
              <h2 className="op-4">05</h2>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {blogPosts.map((post, index) => (
                <div key={index} className="col-lg-6 wow fadeInUp">
                  <div className="relative">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm-12">
                        <div className="mb-2">
                          <div className="d-inline fs-14 fw-bold me-3">
                            <i className="icofont-tag text-white me-2" />
                            Tips &amp; Tricks
                          </div>
                          <div className="d-inline fs-14 fw-600">
                            <i className="icofont-ui-calendar text-white me-2" />
                            {post.date}
                          </div>
                        </div>
                        <h4>
                          <Link className="text-light" href="04_blog-single">
                            {post.title}
                          </Link>
                        </h4>
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
