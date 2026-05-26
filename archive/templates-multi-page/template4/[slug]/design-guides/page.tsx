import { readSourceConfig } from "@/lib/dataBuilder";
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_GUIDES,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";

type Guide = {
  title: string;
  summary: string;
  tips: string[];
};

function getGuideByService(service: string): Guide {
  const lower = service.toLowerCase();

  if (lower.includes("kitchen")) {
    return {
      title: `${service} Planning`,
      summary:
        "A strong kitchen plan starts with workflow, storage zones, appliance positions, and durable surface decisions.",
      tips: [
        "List appliances and storage needs before layout work",
        "Plan task lighting near counters and cooking zones",
        "Review shutter, countertop, and hardware durability",
      ],
    };
  }

  if (lower.includes("bedroom")) {
    return {
      title: `${service} Checklist`,
      summary:
        "Bedroom design works best when comfort, storage, lighting, and daily routines are planned together.",
      tips: [
        "Define wardrobe and bedside storage needs",
        "Choose softer lighting for rest and reading",
        "Keep the palette calm and easy to maintain",
      ],
    };
  }

  if (lower.includes("space") || lower.includes("planning")) {
    return {
      title: `${service} Guide`,
      summary:
        "Space planning is the foundation for better movement, furniture scale, room zoning, and storage.",
      tips: [
        "Measure every wall, opening, and fixed point",
        "Separate must-have functions from nice-to-haves",
        "Leave clear circulation paths before buying furniture",
      ],
    };
  }

  if (lower.includes("furniture")) {
    return {
      title: `${service} Notes`,
      summary:
        "Custom furniture should be planned around exact dimensions, storage habits, hardware quality, and long-term maintenance.",
      tips: [
        "Confirm internal dimensions before fabrication",
        "Choose finishes that match daily wear and cleaning",
        "Review handles, channels, hinges, and access points",
      ],
    };
  }

  return {
    title: `${service} Guidance`,
    summary:
      "Understand planning steps, material decisions, execution expectations, and styling priorities before the project begins.",
    tips: [
      "Share room photos, measurements, and inspiration references",
      "Discuss budget bands before selecting materials",
      "Ask questions about execution timeline and maintenance",
    ],
  };
}

export default async function DesignGuidesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { business } = data;

  const services = business?.services?.length
    ? business.services.slice(0, 6)
    : DEFAULT_INTERIOR_SERVICES;

  const guidesData =
    business?.services?.length
      ? services.map((service: string) => getGuideByService(service))
      : INTERIOR_GUIDES.slice(0, 4).map((guide) => ({
          title: guide.title,
          summary: guide.intro,
          tips: guide.tips,
        }));

  const quickRules = business?.highlights?.length
    ? business.highlights.slice(0, 3)
    : DEFAULT_INTERIOR_HIGHLIGHTS.slice(0, 3);

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
            GUIDES
          </p>
          <h1
            className="massive-text"
            style={{
              fontSize: "4.5rem",
              lineHeight: "0.9",
              paddingBottom: "20px",
            }}
          >
            DESIGN GUIDES
          </h1>
          <p className="hero-subtext">
            Clear, practical guidance before design and execution so you always
            know what to prepare.
          </p>
        </div>
      </section>

      <section className="section-block bg-light" id="guides">
        <div className="container">
          <div
            className="section-header-center slide-up"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 className="block-title">PROJECT GUIDANCE.</h2>
            <p
              className="section-subtitle"
              style={{
                fontSize: "1.25rem",
                color: "#555",
                maxWidth: "860px",
                margin: "0 auto",
              }}
            >
              Each project comes with specific guidance for planning, material
              selection, execution, and long-term upkeep.
            </p>
          </div>

          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            {guidesData.map((guide: Guide, index: number) => (
              <div
                className="program-card slide-up"
                key={index}
                style={{
                  transitionDelay: `${(index % 4) * 100}ms`,
                  marginBottom: "30px",
                  background: "var(--white)",
                }}
              >
                <div
                  className={
                    index % 2 === 0 ? "program-header" : "program-header dark"
                  }
                >
                  <h3 style={{ fontSize: "1.3rem" }}>
                    {guide.title.toUpperCase()}
                  </h3>
                  <span
                    className={
                      index % 2 === 0
                        ? "program-badge"
                        : "program-badge dark-badge"
                    }
                  >
                    GUIDE {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div style={{ padding: "30px" }}>
                  <p
                    style={{
                      color: "#555",
                      lineHeight: "1.7",
                      fontSize: "1.05rem",
                      marginBottom: "18px",
                    }}
                  >
                    {guide.summary}
                  </p>

                  <ul
                    className="program-features"
                    style={{ padding: "0 0 0 6px", margin: 0 }}
                  >
                    {guide.tips.map((tip: string, tipIndex: number) => (
                      <li
                        key={tipIndex}
                        style={{
                          marginBottom:
                            tipIndex === guide.tips.length - 1 ? 0 : "12px",
                        }}
                      >
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="vault-grid slide-up" style={{ marginTop: "30px" }}>
            {quickRules.map((rule: string, index: number) => (
              <div className="vault-item" key={index}>
                <p className="mini-label" style={{ marginBottom: "12px" }}>
                  RULE {String(index + 1).padStart(2, "0")}
                </p>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 900,
                    lineHeight: 1.4,
                  }}
                >
                  {rule}
                </h3>
              </div>
            ))}
          </div>

          <div
            className="center-btn-wrap slide-up"
            style={{
              textAlign: "center",
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link href={`${basePath}/contact-us`} className="btn-dark">
              CONTACT OUR TEAM
            </Link>
            <Link href={`${basePath}/services`} className="btn-outline">
              VIEW SERVICES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
