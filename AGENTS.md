<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture & Rules: Templates vs. Builds

The rules, amendments, and laws detailed below MUST be strictly followed by all agents working in this repository.

## Separation of Templates and Builds

- **Build Generation:** The `/build` directory and its contents are generated from templates (located in `app/designwebsite/`) combined with client data.
- **No Reverse Dependency:** Once a build is generated, the templates have absolutely **NO relation** to the build. 
- **Template Isolation:** Any updates made to a template **MUST NOT** affect any generated build.
- **Build Isolation:** Any updates made to a build **MUST NOT** affect any template.

Always adhere strictly to these isolation laws. Do not bleed changes between `/build` and `app/designwebsite/`.
