import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axe from "axe-core";
import { ContentContext } from "@/App";
import FAQAccordion from "@/components/FaqSection/Faq";

vi.mock("@/App", async () => {
  const React = await import("react");
  return { ContentContext: React.createContext(null) };
});

// DS-4 empty state: no FAQ items at all.
vi.mock("@/data/faqData", () => ({ faqs: [] }));

function renderEmptyFaq() {
  return render(
    <MemoryRouter>
      <ContentContext.Provider value={{ faqSection: { header: "Frequently asked questions" } }}>
        <FAQAccordion />
      </ContentContext.Provider>
    </MemoryRouter>,
  );
}

describe("FAQ accordion (Component C) — empty content state", () => {
  it("renders a text fallback instead of a blank column", () => {
    renderEmptyFaq();

    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByText(/Our FAQ is being updated/i)).toBeInTheDocument();
    expect(screen.getByText("Answers / 00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact the team/i })).toHaveAttribute(
      "href",
      "/contact-us",
    );
  });

  it("keeps the section heading in the empty state", () => {
    renderEmptyFaq();

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Frequently asked questions");
  });

  it("has no automated accessibility violations when empty", async () => {
    const { container } = renderEmptyFaq();

    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toEqual([]);
  });
});
