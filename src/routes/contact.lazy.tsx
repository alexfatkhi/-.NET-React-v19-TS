import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

// w-full max-w-125: selebar ruang yang ada, maksimal 500px (dulu width: 500px
// tetap, yang membuat /contact overflow di HP).
const fieldClass =
  "my-3.75 w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message")
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input
            className={`${fieldClass} disabled:bg-[#999]`}
            name="name"
            placeholder="Name"
          />
          <input
            className={`${fieldClass} disabled:bg-[#999]`}
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className={`${fieldClass} min-h-50`}
            placeholder="Message"
            name="message"
          ></textarea>
          <button className="btn">Submit</button>
        </form>
      )}
    </div>
  );
}
