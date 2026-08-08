type SendTemplateArgs = {
  toPhone: string;
  name: string;
  date: string;
  time: string;
  partySize: number;
};

/**
 * Sends a booking-confirmation WhatsApp message via the Meta WhatsApp Cloud API.
 *
 * Requires WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, and WHATSAPP_TEMPLATE_NAME
 * (a template approved in Meta Business Manager, since this is a business-initiated
 * message outside any 24-hour customer service window). Returns { sent: false } and
 * never throws when unconfigured or on API failure, so a booking always saves even
 * if the WhatsApp send fails.
 */
export async function sendBookingConfirmation(
  args: SendTemplateArgs
): Promise<{ sent: boolean; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!token || !phoneNumberId || !templateName) {
    return {
      sent: false,
      error:
        "WhatsApp not configured (missing WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, or WHATSAPP_TEMPLATE_NAME).",
    };
  }

  const to = args.toPhone.replace(/[^\d]/g, "");

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: templateName,
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: args.name },
                  { type: "text", text: args.date },
                  { type: "text", text: args.time },
                  { type: "text", text: String(args.partySize) },
                ],
              },
            ],
          },
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      return { sent: false, error: `WhatsApp API ${res.status}: ${body}` };
    }
    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message : "Unknown WhatsApp send error",
    };
  }
}

/**
 * Notifies the restaurant's own WhatsApp of a new booking, using the same
 * template mechanism (a simple free-form text also works here if the
 * restaurant's number has messaged the business number within 24h, but the
 * template keeps this reliable regardless).
 */
export async function notifyRestaurantOfBooking(args: {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
}): Promise<{ sent: boolean; error?: string }> {
  const restaurantNumber = process.env.RESTAURANT_WHATSAPP_NUMBER;
  if (!restaurantNumber) {
    return { sent: false, error: "RESTAURANT_WHATSAPP_NUMBER not configured." };
  }
  return sendBookingConfirmation({
    toPhone: restaurantNumber,
    name: `New booking: ${args.name} (${args.phone})`,
    date: args.date,
    time: args.time,
    partySize: args.partySize,
  });
}
