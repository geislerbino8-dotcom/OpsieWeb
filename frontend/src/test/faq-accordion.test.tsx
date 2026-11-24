import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axe from "axe-core";
import { ContentContext } from "@/App";
import FAQAccordion from "@/components/FaqSection/Faq";

vi.mock("@/App", async () => {
  const React = await import("react");
  return { ContentContext: React.createContext(null) };
});

function renderFaq(header = "Frequently asked questions") {
  return render(
    <MemoryRouter>
      <ContentContext.Provider value={{ faqSection: { header } }}>
        <FAQAccordion />
      </ContentContext.Provider>
    </MemoryRouter>,
  );
}

async function expectAccessible(container: HTMLElement) {
  const { violations } = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  expect(violations).toEqual([]);
}

describe("FAQ accordion (Component C)", () => {
  it("renders every question as a heading-wrapped disclosure trigger", () => {
    renderFaq();

    const triggers = screen.getAllByRole("button");
    expect(triggers).toHaveLength(5);

    for (const trigger of triggers) {
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger.closest("h3")).not.toBeNull();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-controls");
    }

    expect(screen.getByRole("link", { name: /reach out to us/i })).toHaveAttribute(
      "href",
      "/contact-us",
    );
  });

  it("keeps the disclosure state and the region wiring in sync", async () => {
    const user = userEvent.setup();
    renderFaq();

    const [first, second] = screen.getAllByRole("button");
    const firstPanel = document.getElementById(first.getAttribute("aria-controls")!);

    expect(firstPanel).toHaveAttribute("role", "region");
    expect(firstPanel).toHaveAttribute("aria-labelledby", first.id);
    expect(firstPanel).toHaveAttribute("aria-hidden", "true");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(firstPanel).toHaveAttribute("aria-hidden", "false");

    await user.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(firstPanel).toHaveAttribute("aria-hidden", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles with Enter and Space", async () => {
    const user = userEvent.setup();
    renderFaq();

    const first = screen.getAllByRole("button")[0];

    first.focus();
    await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true");
  });

  it("gives immediate pressed feedback instead of fading it in", () => {
    renderFaq();

    for (const trigger of screen.getAllByRole("button")) {
      // The fill must land on mousedown, so it cannot inherit the 300ms fade.
      expect(trigger.className).toContain("active:bg-[#F1F5F9]");
      expect(trigger.className).toContain("active:duration-0");
      expect(trigger.className).toContain("transition-colors");
      expect(trigger.className).toContain("duration-300");
    }
  });

  it("closes an open item when its trigger is activated again", async () => {
    const user = userEvent.setup();
    renderFaq();

    const first = screen.getAllByRole("button")[0];
    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("publishes complete question and answer copy", () => {
    renderFaq();

    const questions = screen.getAllByRole("button").map((button) => button.textContent?.trim() ?? "");
    for (const question of questions) {
      expect(question).toMatch(/\?$/);
    }

    expect(screen.getByText(/end-to-end solutions including web and mobile development/i)).toBeInTheDocument();
  });

  it("renders a fallback heading when CMS content is unavailable", () => {
    render(
      <MemoryRouter>
        <ContentContext.Provider value={null}>
          <FAQAccordion />
        </ContentContext.Provider>
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Frequently asked questions");
    expect(heading.textContent?.trim()).not.toBe("");
  });

  it("keeps optional heading emphasis contrast-safe on the light FAQ surface", () => {
    renderFaq("A *better* FAQ");

    const heading = screen.getByRole("heading", { level: 2 });
    const emphasis = heading.querySelector("span");

    expect(emphasis).toHaveTextContent("better");
    expect(emphasis).toHaveStyle({ color: "#0E7490" });
  });

  it("uses the contrast-safe intro colour on the light page", () => {
    renderFaq();

    const intro = screen.getByText(/Everything you need to know about Opsie/i);
    // #475569 on #ECEDF1 = 6.48:1; the previous text-gray-500 was 4.13:1.
    expect(intro.className).toContain("text-[#475569]");
  });

  it("renders the mono kicker and hides decorative index numbers from AT", () => {
    const { container } = renderFaq();

    expect(screen.getByText("Opsie Support // FAQ")).toBeInTheDocument();
    expect(screen.getByText("Answers / 05")).toBeInTheDocument();

    const indices = container.querySelectorAll("button > span > span[aria-hidden='true']");
    expect(indices).toHaveLength(5);
    for (const index of indices) {
      expect(index.textContent?.trim()).toMatch(/^0[1-5]$/);
    }
  });

  it("renders the contact link through the router", () => {
    renderFaq();

    const link = screen.getByRole("link", { name: /reach out to us/i });
    expect(link).toHaveAttribute("href", "/contact-us");
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("focus-visible:outline-2");
  });

  it("has no automated accessibility violations", async () => {
    const { container } = renderFaq();
    await expectAccessible(container);
  });
});
