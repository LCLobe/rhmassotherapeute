<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RH Massotherapeute - Project Requirements

## Project Goal

Build a portfolio and booking website for a therapeutic massage service.

The first version should focus on a polished, trustworthy public presence and a simple path for potential clients to understand the service and request or schedule an appointment.

Public practitioner name/signature: Ruth Hernica.

Brand name: RH.MassothÃ©rapeute.

Location/service area: Yverdon-les-Bains and surroundings.

## Tech Stack

- Framework: Next.js with App Router.
- Language: JavaScript only. Do not introduce TypeScript unless explicitly requested.
- Styling: Tailwind CSS.
- UI approach: React components, with shadcn/ui acceptable for reusable UI primitives when it fits the project.
- Package manager: keep the existing lockfile/package setup unless the project owner asks to change it.
- Internationalization: support French, English, and Spanish, with English as the failsafe fallback language.

## Dependency And Security Constraints

- Respect the existing `overrides` section in `package.json`.
- Do not remove or weaken dependency overrides that were added to avoid vulnerabilities.
- If dependencies are added or upgraded, verify that the overrides remain present and compatible.

Current required overrides:

```json
{
  "brace-expansion": "^5.0.8",
  "postcss": "^8.5.23",
  "sharp": "^0.35.3"
}
```

## Product Milestones

1. Landing view
   - Public homepage for the massage therapy service.
   - Should communicate trust, care, professionalism, and the value of the service quickly.
   - Must support French, English, and Spanish content.

2. Services view
   - Page or section describing available therapeutic massage services.
   - Should be structured so individual services can later become dedicated pages if needed.
   - Must support French, English, and Spanish content.
   - Use the initial service catalog from `.agents/context/services.md`.

3. Contact modal
   - Accessible modal for users who want to contact the practitioner.
   - Should support a simple contact flow without distracting from the main pages.
   - Initial channels: Instagram and contact form.
   - Contact form should send email through Resend.

4. Appointment booking service
   - First version supports appointment requests only.
   - Full calendar availability and slot booking are future work.
   - Future Outlook Calendar integration is possible through Microsoft Graph.
   - Should support optional service extras such as home travel and aromatic essences.

5. Future expansion: appointment payments
   - Add payment flow for booked appointments.
   - Stripe is a likely candidate, but the final provider is not decided yet.

6. Future expansion: natural products shop
   - Add ecommerce functionality for natural products.
   - Keep the architecture flexible enough to support a shop later without rebuilding the project.

7. Future expansion: medical intake form
   - Add a private form for medical information, allergies, and medication.
   - Treat health data as sensitive personal data.
   - Check `.agents/context/privacy-medical-data.md` before implementation.

8. Future expansion: automatic thank-you email
   - Send an automatic thank-you email through Resend after a service or confirmed appointment.
   - Do not include sensitive medical data in the email body.

9. Future expansion: privacy-compliant database
   - Add a database for future medical forms and operational data.
   - Must follow Swiss FADP/nFADP privacy requirements for sensitive personal data.

## Implementation Notes

- Keep the first release simple and maintainable.
- Prefer App Router conventions for routes, layouts, metadata, and server/client boundaries.
- Build public-facing UI with internationalization in mind from the beginning.
- Check `.agents/context/brand.md` before making visual design decisions.
- Check `.agents/context/design-direction.md` before implementing layout, navigation, hero, service cards, or image choices.
- Initial typography decision: Cormorant Garamond for headings and Brawler for body text.
- Before implementing Next.js-specific behavior, check the local Next.js docs in `node_modules/next/dist/docs/` because this project uses a newer Next.js version with potential breaking changes.
- Avoid adding backend complexity until the booking/calendar requirements are clearer.
- Before implementing medical, allergy, medication, or database features, review `.agents/context/privacy-medical-data.md`.
