export const whatsappConfig = {
  enabled: false,
  provider: "Meta WhatsApp Cloud API / Evolution API",
  envRequired: ["WHATSAPP_TOKEN", "WHATSAPP_PHONE_NUMBER_ID"],
};

export async function sendReminder(message) {
  return {
    ok: true,
    provider: whatsappConfig.provider,
    message,
    status: "pending_integration",
  };
}
