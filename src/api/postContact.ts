export default async function postContact(
  name: string,
  email: string,
  message: string,
): Promise<unknown> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });
  const data = (await response.json()) as unknown;
  return data;
}
