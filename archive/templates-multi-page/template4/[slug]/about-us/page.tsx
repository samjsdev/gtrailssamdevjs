import { readSourceConfig } from "@/lib/dataBuilder";
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  const doctorImage =
    doctor?.images?.[0] ||
    media?.otherImages?.[0] ||
    media?.clinicImages?.[1] ||
    INTERIOR_HERO_IMAGES.designer;
  const clinicImage =
    media?.clinicImages?.[0] ||
    media?.treatmentImages?.[0] ||
    media?.otherImages?.[0] ||
    INTERIOR_HERO_IMAGES.about;

  const highlights = business?.highlights?.length
    ? business.highlights.slice(0, 4)
    : DEFAULT_INTERIOR_HIGHLIGHTS;

  const focusAreas = business?.services?.length
    ? business.services.slice(0, 6)
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div style={{ paddingTop: "150px" }}>
      <section className="hero-clean">
        <div className="container">
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
            ABOUT US
          </p>
          <h1
            className="massive-text"
            style={{
              fontSize: "4.5rem",
              lineHeight: "0.9",
              paddingBottom: "20px",
            }}
          >
            OUR STORY
          </h1>
          <p className="hero-subtext">
            Learn what drives {clinic?.name || "our studio"}, how our team
            approaches design, and why clients trust us with spaces they live
            in every day.
          </p>
        </div>
      </section>

      <section className="section-block" id="about">
        <div className="container block-grid">
          <div
            className="block-visual slide-up"
            style={{ transitionDelay: "200ms" }}
          >
            <img
              src={clinicImage}
              alt="Interior design studio project"
              className="editorial-img"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className="block-content slide-up">
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
              Who We Are
            </p>
            <h2
              className="block-title"
              style={{ fontSize: "3rem", marginBottom: "30px" }}
            >
              BUILT ON TRUST
            </h2>
            <p className="block-desc">
              {clinic.description ||
                "Our mission is to create refined interiors with clear planning, curated materials, and calm execution."}
            </p>
            <p className="block-desc" style={{ marginTop: "20px" }}>
              We combine creative direction with practical planning so every
              client understands their options and feels confident with each
              design decision.
            </p>
            <p className="block-desc" style={{ marginBottom: 0 }}>
              From layouts and material palettes to custom furniture and final
              styling, we focus on rooms that feel polished, functional, and
              personal.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block bg-light" id="values">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">WHAT DEFINES US.</h2>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.25rem",
                color: "#555",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              These are the standards we apply to every consultation, layout,
              material decision, and handover review.
            </p>
          </div>

          <div className="vault-grid slide-up">
            {highlights.map((item: string, index: number) => (
              <div className="vault-item" key={index}>
                <p className="mini-label" style={{ marginBottom: "12px" }}>
                  0{index + 1}
                </p>
                <h3
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: "900",
                    marginBottom: "10px",
                    lineHeight: "1.3",
                    textTransform: "uppercase",
                  }}
                >
                  {item}
                </h3>
                <p style={{ color: "#555", lineHeight: "1.6" }}>
                  Practical design guidance that prioritizes comfort, clarity,
                  durability, and a finished space that feels genuinely yours.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="specialist">
        <div className="container block-grid">
          <div className="block-visual slide-up">
            <img
              src={doctorImage}
              alt={doctor?.name || "Lead Designer"}
              className="editorial-img"
              style={{ borderRadius: "4px" }}
            />
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
              Design Leadership
            </p>
            <h2
              className="block-title"
              style={{ fontSize: "3rem", marginBottom: "15px" }}
            >
              {doctor?.name?.toUpperCase() || "LEAD DESIGNER"}
            </h2>
            <p
              className="block-desc"
              style={{
                fontWeight: "700",
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "25px",
                letterSpacing: "1px",
              }}
            >
              {doctor?.specialization || "Interior Design & Turnkey Execution"} •{" "}
              {doctor?.experience || "10+ years"}
            </p>
            <p className="block-desc" style={{ lineHeight: "1.8" }}>
              {doctor?.about ||
                "A dedicated designer focused on thoughtful planning, refined material choices, clear client guidance, and consistent project outcomes."}
            </p>
            <div style={{ marginTop: "50px" }}>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                }}
              >
                CORE FOCUS AREAS
              </h4>
              <ul
                className="highlight-list"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {focusAreas.map((sp: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>{sp}</span>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "30px",
                }}
              >
                <Link href={`${basePath}/services`} className="btn-dark">
                  VIEW SERVICES
                </Link>
                <Link href={`${basePath}/contact-us`} className="btn-outline">
                  CONTACT TEAM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
