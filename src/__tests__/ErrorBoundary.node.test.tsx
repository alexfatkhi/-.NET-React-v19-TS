import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import ErrorBoundary from "../ErrorBoundary";


test("renders its children when there is no error", () => {
  const screen = render(
    <ErrorBoundary>
      <p>Konten aman</p> {/* children yang dikirim */}
    </ErrorBoundary>
  );

  expect(screen.getByText("Konten aman")).toBeDefined();
});
