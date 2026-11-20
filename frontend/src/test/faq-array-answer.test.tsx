import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ContentContext } from "@/App";
import FAQAccordion from "@/components/FaqSection/Faq";

vi.mock("@/App", async () => {
  const React = await import("react");
  return { ContentContext: React.createContext(null) };
});

// Content state: `answer` is typed as `string | string[]`, so the list branch
// needs its own coverage — the shipped data only exercises the string branch.
vi.mock("@/data/faqData", () => ({
  faqs: [
    {
      question: "Which services can I combine?",
      answer: ["Web and mobile development", "Cloud systems", "Ongoing support"],
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we monitor and improve your systems after launch.",
    },
  ],
}));

function renderFaq() {
  return render(
    <MemoryRouter>
      <ContentContext.Provider value={{ faqSection: { header: "Frequently asked questions" } }}>
        <FAQAccordion />
      </ContentContext.Provider>
    </MemoryRouter>,
  );
}

describe("FAQ accordion (Component C) — answer content states", () => {
  it("renders an array answer as a list inside the disclosure region", async () => {
    const user = userEvent.setup();
    renderFaq();

    const [first] = screen.getAllByRole("button");
    await user.click(first);

    const panel = document.getElementById(first.getAttribute("aria-controls")!);
    expect(panel).not.toBeNull();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Web and mobile development");
    expect(items[2]).toHaveTextContent("Ongoing support");
    expect(panel!.querySelector("ul.list-disc")).not.toBeNull();
  });

  it("keeps a string answer as a paragraph, not a one-item list", async () => {
    const user = userEvent.setup();
    renderFaq();

    const [, second] = screen.getAllByRole("button");
    await user.click(second);

    const panel = document.getElementById(second.getAttribute("aria-controls")!);
    expect(panel).toHaveTextContent("Yes, we monitor and improve your systems after launch.");
    expect(panel!.querySelector("ul")).toBeNull();
  });
});
