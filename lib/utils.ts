export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
