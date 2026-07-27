# Booking And Contact

## Contact Channels

Initial contact channels:

- Instagram.
- Contact form.

The contact form should send an email through Resend.

A future automatic response email should also be sent through Resend to thank the client after a service or confirmed appointment.

Possible future contact channels:

- WhatsApp.
- Phone.

## Booking Approach

- First version: request appointment only.
- Do not implement full automatic booking in the first version.
- The request flow should collect enough information for Ruth to confirm manually:
  - Client name.
  - Email.
  - Preferred service.
  - Preferred date or time range.
  - Optional extras.
  - Message or notes.

## Calendar Direction

- Outlook calendar integration is possible for a later version.
- Microsoft Graph can be used to read calendar availability and create calendar events.
- For work or school Microsoft 365 accounts, `calendar/getSchedule` can provide free/busy availability.
- For personal Microsoft accounts, `calendar/getSchedule` is not supported; use `calendarView` or another approach if personal Outlook calendar support is required.
- Do not build this integration until the project moves from "request appointment" to actual slot booking.

## Future Medical Intake Flow

- Add a private medical intake form for allergies, medication, and relevant medical information.
- Treat this as sensitive health data, not as a normal contact form.
- Do not include sensitive medical data in plain email bodies.
- See `.agents/context/privacy-medical-data.md` before implementation.

## Open Booking Questions

- Exact Outlook account type: Microsoft 365 work/school or personal Outlook/Microsoft account.
- Appointment confirmation workflow.
- Cancellation and rescheduling policy.
- Whether appointment requests should create tentative calendar events automatically in the future.
- Whether service extras change duration, price, or availability.
