# Agent Guide

The rules, amendments, and laws detailed below MUST be strictly followed by all agents working in this repository.

## Separation of Templates and Builds

- **Build Generation:** The `/build` directory and its contents are generated from templates (in `app/designwebsite/`) combined with client data.
- **No Reverse Dependency:** Once a build is generated, the templates have absolutely **NO relation** to the build. 
- **Template Isolation:** Any updates made to a template **MUST NOT** affect any generated build.
- **Build Isolation:** Any updates made to a build **MUST NOT** affect any template.
