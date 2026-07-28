# Design Direction

## Reference Websites

1. Clinica Estetica Cadiz
   - Reference value: page distribution and landing structure.
   - Desired pattern: persistent semi-transparent navbar, logo on the left, navigation/actions on the right, and a strong hero area.

2. Skin Heaven
   - Reference value: treatment/service catalog density and booking-oriented structure.
   - Note: this feels more like a larger company/clinic with many services, while RH Massotherapeute should feel more personal and practitioner-led.

3. Monchak Makeup
   - Reference value: sober portfolio feeling and progressive photo supply while scrolling.
   - Note: client photos are not appropriate for RH Massotherapeute due to privacy/intimacy concerns, but the calm portfolio rhythm is useful.

## Initial Layout Direction

- Use a persistent semi-transparent navbar.
- Navbar left side: start with the black logo image.
- Navbar right side:
  - Services dropdown.
  - About us.
  - Contact.
- The initial landing hero should use a clear, light image rather than a dark or overly dramatic image.
- Use `Tarjeta Presentacion.jpeg` as the initial hero image.
- The hero should also expose practical information:
  - How to reach the location/service area: Yverdon-les-Bains and surroundings.
  - How to request or book an appointment.
- On scroll, show service/design cards.
- Cards should not feel square or rigid.
- Use rounded corners and a more organic, soft presentation for cards and visual blocks.

## Photography And Privacy

- Do not rely on photos of clients receiving massage.
- Avoid intimate client imagery.
- Prefer:
  - Calm treatment-room details.
  - Hands/tools/materials without identifying clients.
  - Botanical or brand-aligned details.
  - Location/interior images.
  - Abstract wellness imagery only when it still feels concrete and useful.

## Future Feedback Section

- Add a future section where clients can leave comments or feedback.
- This can evolve into testimonials/reviews once the business has approved content.
- The design should reserve a natural place for this section after services or after the appointment call-to-action.

## Interaction Notes

- Services dropdown should be simple and readable.
- Contact can open the planned contact modal.
- Appointment request calls-to-action should remain visible and easy to reach.
- Keep the experience premium and personal rather than corporate.

## Prefereneces

- We save for the future the format of this rounded span for enumerations:
  ```js
  <span className="rounded-full border border-[#947e4c]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7f5614]"> 0</span>
  ```         