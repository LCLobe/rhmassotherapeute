# Project Decisions

## Technical Decisions

- Use Next.js with App Router.
- Use JavaScript only. Do not introduce TypeScript unless explicitly requested.
- Use Tailwind CSS for styling.
- shadcn/ui is acceptable for reusable UI primitives when useful.
- Keep the existing package manager and lockfile setup unless explicitly changed.
- Implement internationalization for French, English, and Spanish.
- Use English as the failsafe fallback language.

## Internationalization Decisions

- Supported locales: `fr`, `en`, and `es`.
- Fallback locale: `en`.
- Public routes, metadata, navigation labels, form labels, validation messages, and service content should be designed with translation support.
- Use route-based localization: `/fr`, `/en`, and `/es`.
- Redirect `/` to `/fr` as the default public language route.
- Keep one shared page view that reads localized copy from JSON based on `locale`.
- Add a navbar language selector between About and Contact with current language text, flag, and dropdown arrow.
- Store flag SVGs as project constants/components, not remote assets.

## Brand Decisions

- Use the initial extracted brand palette documented in `.agents/context/brand.md`.
- Use the layout/design direction documented in `.agents/context/design-direction.md`.
- Public practitioner name/signature: Ruth Hernica.
- Brand name: RH.MassothÃƒÂ©rapeute.
- Main website background starts from `#f9ece3`.
- Black logo background reference is `#0a0a0a`.
- Primary dark website text starts from `#443a28`.
- Gold accents should account for both central fill colors and blended raster border colors from the source images.
- Use Cormorant Garamond for headings and brand-style display text.
- Do not use Playfair Display as the primary heading font because it feels too wide and visually saturated for this brand.
- Use Brawler as the initial body text font.
- Start navigation, forms, and small UI text with Brawler, then review readability at small sizes.
- During visual QA, verify French and Spanish accents render cleanly with the chosen font setup.

## Layout Decisions

- Start with a persistent semi-transparent navbar.
- Navbar layout: logo on the left, Services dropdown, About us, and Contact on the right.
- Contact should connect to the planned contact modal.
- Hero should use `Tarjeta Presentacion.jpeg` initially and include how to reach the location and request/book an appointment.
- Avoid client massage photos because of privacy/intimacy concerns.
- Service cards should use rounded, organic shapes rather than rigid square cards.

## Location And Contact Decisions

- Location/service area: Yverdon-les-Bains and surroundings.
- Initial contact channels: Instagram and contact form.
- Contact form should send email through Resend.
- WhatsApp and phone are possible future channels, not part of the initial contact scope.

## Booking Decisions

- First version supports appointment requests only.
- Do not implement full automatic slot booking in the first version.
- Outlook Calendar integration is possible later through Microsoft Graph.
- Future Outlook implementation depends on account type and requirements.


## Privacy And Medical Data Decisions

- Future medical, allergy, and medication forms must follow the privacy direction in `.agents/context/privacy-medical-data.md`.
- Treat health-related form data as sensitive personal data under Swiss FADP/nFADP.
- Do not store sensitive medical data in a database until consent, retention, deletion, access control, hosting region, and security requirements are defined.
- Do not send sensitive medical data in plain email bodies.
- Use Resend for future automatic thank-you emails, but keep those emails free of sensitive medical details.
## Dependency And Security Decisions

- Respect the existing `overrides` section in `package.json`.
- Do not remove or weaken overrides added to avoid vulnerabilities.
- If dependencies are added or upgraded, verify the overrides remain present and compatible.

Current required overrides:

```json
{
  "brace-expansion": "^5.0.8",
  "postcss": "^8.5.23",
  "sharp": "^0.35.3"
}
```

## Next.js Version Note

This project uses a newer Next.js version. Before implementing Next.js-specific behavior, check the relevant local docs in 
ode_modules/next/dist/docs/`.
