# Privacy And Medical Data

## Scope

Future versions should include a private web form for clients to complete medical, allergy, and medication information before a massage appointment.

This feature handles health-related information and must be treated as sensitive personal data.

## Swiss Data Protection Direction

- Follow Swiss data protection requirements under the Federal Act on Data Protection (FADP / nFADP; in French commonly LPD / nLPD).
- Health data is sensitive personal data under the Swiss FADP.
- Do not implement persistent storage for medical, allergy, or medication data until the data model, retention policy, access model, consent wording, and hosting/storage location are decided.
- Prefer privacy by design: collect only necessary data, restrict access, encrypt data in transit and at rest, log access carefully, and define deletion/retention rules.
- Provide clear information to clients about what is collected, why it is collected, who can access it, how long it is kept, and how they can request access/deletion.

## Medical Form Milestone

The medical form should collect, at minimum:

- Client identity and contact reference.
- Relevant medical conditions.
- Allergies.
- Current medication.
- Contraindications or areas to avoid.
- Consent/acknowledgement before submission.

## Database Milestone

A database may be needed for medical forms and future appointment history.

Initial database requirements:

- Design for Swiss FADP/nFADP compliance.
- Treat medical, allergy, and medication data as sensitive personal data.
- Role-based access for Ruth/admin only.
- Encryption at rest where supported by the provider.
- Secure transport with HTTPS.
- Explicit retention/deletion policy.
- Audit trail or operational logging for sensitive-data access, if feasible.
- Avoid storing sensitive data in plain email bodies.

## Open Questions

- Exact legal/compliance review process before launch.
- Database provider and hosting region.
- Whether medical forms should be linked to appointment requests or submitted through a separate private link.
- Whether clients can edit/update/delete submitted medical information.
- Retention duration for medical forms.
- Whether email notifications should include only a summary/link rather than sensitive data.