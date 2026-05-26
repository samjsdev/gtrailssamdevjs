import { readSourceConfig } from "@/lib/dataBuilder";
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ReviewItem = {
  author?: string;
  rating?: number | string;
  text?: string;
};

function normalizeRating(value: number | string | undefined): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 5;
  return Math.max(0, Math.min(5, Math.round(parsed)));
}

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, business, doctor, media, reviews } = data;
  const heroImage =
    media?.clinicImages?.[0] ||
    media?.treatmentImages?.[0] ||
    media?.otherImages?.[0] ||
    INTERIOR_HERO_IMAGES.home;
  const doctorImage =
    doctor?.images?.[0] ||
    media?.otherImages?.[0] ||
    media?.clinicImages?.[1] ||
    INTERIOR_HERO_IMAGES.designer;

  const allImages = [
    ...(media?.clinicImages || []),
    ...(media?.treatmentImages || []),
    ...(media?.otherImages || []),
  ].filter(Boolean).slice(0, 10);

  const services = business?.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const highlights = business?.highlights?.length
    ? business.highlights.slice(0, 4)
    : DEFAULT_INTERIOR_HIGHLIGHTS;

  const defaultReviews: ReviewItem[] = DEFAULT_INTERIOR_REVIEWS;
  const displayReviews: ReviewItem[] =
    reviews && reviews.length > 0 ? reviews.slice(0, 3) : defaultReviews;

  const tagline = clinic.tagline || "Thoughtful interiors for everyday living.";
  const words = tagline.split(" ");
  const title1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const title2 = words.slice(Math.ceil(words.length / 2)).join(" ");

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-clean">
        <div className="container">
          <div className="hero-left">
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "3px",
                color: "#888",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {clinic.name?.toUpperCase() || ""}
            </p>
            <h1
              className="massive-text"
              style={{
                fontSize: "5.5rem",
                lineHeight: "0.9",
                paddingBottom: "20px",
              }}
            >
              {title1}
              <br />
              {title2}
            </h1>
            <p className="hero-subtext">{clinic.description || ""}</p>
            <div
              className="hero-actions"
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href={walink}
                target="_blank"
                rel="noreferrer"
                className="btn-dark"
              >
                BOOK CONSULTATION
              </a>
              <Link href="#services" className="btn-outline">
                VIEW SERVICES
              </Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img
                src={heroImage}
                alt={clinic.name || "Interior design studio"}
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="section-block" id="about">
        <div className="container block-grid">
          <div className="block-visual slide-up">
            <img src={doctorImage} alt="Lead designer" className="editorial-img" />
          </div>
          <div
            className="block-content slide-up"
            style={{ transitionDelay: "200ms" }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "700",
                letterSpacing: "3px",
                color: "#888",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Meet The Team
            </p>
            <h2 className="block-title" style={{ fontSize: "3.5rem" }}>
              {doctor?.name?.toUpperCase() || "THE DESIGN TEAM"}
            </h2>
            <p className="block-desc">
              {clinic.description ||
                "We create interiors built on trust, clarity, and thoughtful details."}
            </p>
            <p className="block-desc" style={{ marginBottom: 0 }}>
              {doctor?.specialization ||
                "Interior design, material planning, and turnkey execution."}
            </p>
            {doctor?.experience && (
              <p className="block-desc" style={{ marginTop: "10px", fontWeight: "bold" }}>
                Experience: {doctor.experience}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-block bg-light" id="highlights">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">WHY CHOOSE US.</h2>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.25rem",
                color: "#555",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              We combine design expertise, practical planning, and client-first
              communication in every consultation.
            </p>
          </div>

          <div className="vault-grid slide-up">
            {highlights.map((highlight: string, index: number) => (
              <div className="vault-item" key={index}>
                <p
                  className="mini-label"
                  style={{ marginBottom: "18px", color: "#222" }}
                >
                  0{index + 1}
                </p>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {highlight}
                </h3>
                <p style={{ color: "#555", lineHeight: 1.6 }}>
                  Structured planning, clear expectations, and quality-focused
                  execution from start to finish.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section-block" id="services">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">OUR SERVICES.</h2>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.25rem",
                color: "#555",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Explore how each service is planned around daily comfort,
              function, finish quality, and confidence.
            </p>
          </div>

          <div className="programs-grid" style={{ marginBottom: "40px" }}>
            {services.map((service: string, index: number) => {
              const svcData = getInteriorServiceData(service);
              return (
                <div
                  key={index}
                  className="program-card slide-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={
                      index % 2 === 0 ? "program-header" : "program-header dark"
                    }
                  >
                    <h3>{service.toUpperCase()}</h3>
                    <span
                      className={
                        index % 2 === 0
                          ? "program-badge"
                          : "program-badge dark-badge"
                      }
                    >
                      DESIGN PLAN
                    </span>
                  </div>
                  <div style={{ padding: "40px" }}>
                    <p style={{ color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
                      {svcData?.description || getInteriorServiceSummary(service)}
                    </p>
                    {svcData?.benefits && (
                      <ul style={{ paddingLeft: "20px", listStyleType: "square", color: "#666", fontSize: "0.9rem" }}>
                        {svcData.benefits.slice(0, 3).map((benefit, bidx) => (
                          <li key={bidx} style={{ marginBottom: "5px" }}>{benefit}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="section-block bg-light" id="gallery">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">VISUAL GALLERY.</h2>
            <p
              className="section-subtitle"
              style={{ fontSize: "1.25rem", color: "#555" }}
            >
              A quick look at our interiors, material details, and styling
              standards.
            </p>
          </div>

          <div className="vault-grid slide-up" style={{ marginBottom: "50px" }}>
            {allImages.length > 0 ? (
              allImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className="vault-item"
                  style={{ padding: 0, overflow: "hidden" }}
                >
                  <img
                    src={image}
                    alt={`Gallery item ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))
            ) : (
              [heroImage, doctorImage].map((image: string, index: number) => (
                <div
                  key={index}
                  className="vault-item"
                  style={{ padding: 0, overflow: "hidden" }}
                >
                  <img
                    src={image}
                    alt={`Gallery preview ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* REVIEWS SECTION */}
      <section className="section-block bg-light" id="reviews">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">CLIENT STORIES.</h2>
            <p
              className="section-subtitle"
              style={{ fontSize: "1.25rem", color: "#555" }}
            >
              Don&apos;t just take our word for it. Read real experiences from
              our valued community.
            </p>
          </div>

          <div className="vault-grid slide-up">
            {displayReviews.map((review: ReviewItem, index: number) => (
              <div className="vault-item" key={index}>
                <div
                  className="v-icon"
                  style={{
                    fontSize: "2rem",
                    marginBottom: "20px",
                    color: "var(--black)",
                    letterSpacing: "2px",
                  }}
                >
                  {"★".repeat(normalizeRating(review.rating || 5))}
                  {"☆".repeat(5 - normalizeRating(review.rating || 5))}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "900",
                    marginBottom: "15px",
                    textTransform: "uppercase",
                  }}
                >
                  {review.author || "Client"}
                </h3>
                <p
                  style={{
                    color: "#444",
                    lineHeight: "1.6",
                    fontStyle: "italic",
                  }}
                >
                  &quot;{review.text || "Beautiful planning and a smooth project experience."}
                  &quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* WHATSAPP CTA SECTION */}
      <section
        className="section-block"
        id="contact-section"
        style={{ backgroundColor: "var(--black)", color: "var(--white)", borderTop: "1px solid #222" }}
      >
        <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", padding: "80px 20px" }}>
          <div style={{ width: "96px", height: "96px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 48px rgba(37,211,102,0.35)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: "48px", height: "48px" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <h2 className="massive-text" style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "0", color: "var(--white)" }}>
            LET&apos;S PLAN YOUR<br/><span style={{ color: "#25D366" }}>DREAM SPACE.</span>
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#bdbdbd", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5 }}>
            Chat with our team on WhatsApp. Share photos, discuss your budget, and book a free consultation — instantly.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%", maxWidth: "400px" }}>
            <a
              href={walink}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", background: "#25D366", color: "#fff", fontWeight: "bold", padding: "18px 40px", borderRadius: "50px", fontSize: "1.1rem", textDecoration: "none", transition: "transform 0.2s", width: "100%" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: "24px", height: "24px" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              CHAT ON WHATSAPP
            </a>
            <a href={`tel:${clinic.contact?.phone || ''}`} style={{ color: "#888", fontSize: "0.9rem", textDecoration: "none" }}>
              Or call: {clinic.contact?.phone || 'Contact us'}
            </a>
          </div>
          <p style={{ color: "#555", fontSize: "0.85rem" }}>Free consultation &bull; Quick response &bull; No commitment</p>
        </div>
      </section>
    </>
  );
}