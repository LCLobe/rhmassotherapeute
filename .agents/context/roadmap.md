# Roadmap

## Current Milestones

1. Landing view
   - Create the public homepage for the massage therapy service.
   - Communicate trust, care, professionalism, and the value of the service quickly.
   - Include a persistent semi-transparent navbar.
   - Use a clear, light hero image and practical access/booking information.
   - Use `Tarjeta Presentacion.jpeg` as the initial hero image.
   - Include Yverdon-les-Bains and surroundings as location/service area.

2. Services view
   - Present available therapeutic massage services.
   - Keep the structure flexible so services can later become dedicated pages.
   - Use the initial service catalog from `.agents/context/services.md`.
   - Present service cards with rounded, organic shapes rather than rigid square cards.

3. Contact modal
   - Add an accessible modal for contacting the practitioner.
   - Keep the contact flow simple and non-disruptive.
   - Include Instagram and a contact form.
   - Contact form should send email through Resend.

4. Appointment booking service
   - First version should support appointment requests only.
   - Full calendar availability and slot booking are future work.
   - Future implementation may link availability to Outlook Calendar through Microsoft Graph.
   - Allow services to include optional extras such as home travel and aromatic essences.

## Future Expansion

5. Appointment payments
   - Add payment support for booked appointments.
   - Stripe is a likely candidate, but the final provider is not decided yet.

6. Natural products shop
   - Add ecommerce functionality for natural products.
   - Keep the architecture flexible enough to support a shop later without rebuilding the project.

7. Client feedback section
   - Add a way for clients to leave comments or feedback.
   - May later become a testimonials/reviews section with approved public content.

8. Medical intake form
   - Add a private web form for medical information, allergies, and medication.
   - Treat submitted health data as sensitive personal data.
   - Do not persist medical data until privacy/compliance requirements are designed.

9. Automatic thank-you email
   - Send an automatic response email through Resend after a service or confirmed appointment.
   - The email should thank the client for the service and keep tone aligned with the brand.
   - Avoid including sensitive medical information in the email body.

10. Privacy-compliant database
   - Add a database for future medical forms, appointment data, and operational records.
   - Database design must follow Swiss FADP/nFADP requirements for sensitive personal data.
   - See `.agents/context/privacy-medical-data.md`.
