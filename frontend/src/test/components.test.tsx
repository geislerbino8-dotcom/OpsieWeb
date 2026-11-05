import { useState, type ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axe from "axe-core";
import { createTicket } from "@/api/createTicket";
import { ContentContext } from "@/App";
import FAQAccordion from "@/components/FaqSection/Faq";
import MobileMenu from "@/components/MobileMenu";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/cards/ContactForm";
import ChatHelp from "@/components/ChatHelp";

vi.mock("@/App", async () => {
  const React = await import("react");
  return { ContentContext: React.createContext(null) };
});

vi.mock("@/data/productsData", () => ({
  products: [
    { name: "Opsie Core", description: "Operations management" },
    { name: "Opsie Flow", description: "Workflow automation" },
    {
      name: "OpsieEnterpriseWorkflowManagementPlatformWithAnUnusuallyLongProductNameThatMustWrapOnPhones",
      description: "A long product description used to verify that the mobile navigation remains scrollable and the label can wrap without clipping.",
    },
  ],
}));

vi.mock("@/api/createTicket", () => ({ createTicket: vi.fn() }));

function withRouter(element: ReactNode) {
  return render(<MemoryRouter>{element}</MemoryRouter>);
}

async function expectAccessible(container: HTMLElement) {
  const { violations } = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  expect(violations).toEqual([]);
}

function MobileMenuHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" data-testid="menu-trigger" onClick={() => setIsOpen(true)}>Open menu</button>
      {isOpen && (
        <MobileMenu
          closeMenu={() => setIsOpen(false)}
          theme="dark"
          onToggleTheme={() => undefined}
        />
      )}
    </>
  );
}

describe("responsive component behavior and accessibility", () => {
  beforeEach(() => {
    document.body.style.overflow = "auto";
  });

  it("moves focus into the mobile dialog, traps it, and restores focus on Escape", async () => {
    const user = userEvent.setup();
    const { container } = withRouter(<MobileMenuHarness />);
    const trigger = screen.getByTestId("menu-trigger");
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Mobile navigation" });
    const firstLink = screen.getByRole("link", { name: "Opsie home" });
    const closeButton = screen.getByRole("button", { name: "Close navigation menu" });
    const lastLink = screen.getByRole("link", { name: "Get started" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.activeElement).toBe(closeButton);
    expect(document.body.style.overflow).toBe("hidden");
    await expectAccessible(container);

    firstLink.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(lastLink);
    await user.tab();
    expect(document.activeElement).toBe(firstLink);

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("auto");
  });

  it("exposes mobile menu disclosure state and renders the selected links", async () => {
    const user = userEvent.setup();
    withRouter(<MobileMenuHarness />);
    await user.click(screen.getByTestId("menu-trigger"));

    const productsButton = screen.getByRole("button", { name: "Products" });
    expect(productsButton).toHaveAttribute("aria-expanded", "false");
    await user.click(productsButton);

    expect(productsButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Opsie Core/ })).toBeInTheDocument();
    const longName = screen.getByRole("link", { name: /OpsieEnterpriseWorkflow/ });
    expect(longName.querySelector("span")).toHaveClass("min-w-0", "break-words");
    expect(longName.textContent).toContain("UnusuallyLongProductNameThatMustWrapOnPhones");
    expect(
      screen.getByRole("dialog", { name: "Mobile navigation" }).querySelector("#mobile-navigation"),
    ).toHaveClass("overflow-y-auto");
    expect(screen.getByRole("link", { name: /Explore all products/ })).toBeInTheDocument();
  });

  it("closes the mobile menu when the viewport crosses into desktop navigation", async () => {
    const user = userEvent.setup();
    const previousMatchMedia = window.matchMedia;
    const changeListeners: Array<(event: MediaQueryListEvent) => void> = [];
    const queryState = { matches: false };
    const mediaQuery = {
      get matches() { return queryState.matches; },
      media: "(min-width: 1536px)",
      onchange: null,
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => changeListeners.push(listener),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => mediaQuery),
    });

    try {
      withRouter(<Navigation />);
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(screen.getByRole("dialog", { name: "Mobile navigation" })).toBeInTheDocument();
      expect(document.body.style.overflow).toBe("hidden");

      queryState.matches = true;
      changeListeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent));

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      expect(document.body.style.overflow).toBe("auto");
    } finally {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: previousMatchMedia,
      });
    }
  });

  it("keeps FAQ answer visibility and disclosure state in sync", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ContentContext.Provider value={{ faqSection: { header: "Frequently asked questions" } }}>
        <FAQAccordion />
      </ContentContext.Provider>,
    );

    const [firstQuestion, secondQuestion] = screen.getAllByRole("button");
    const firstAnswer = document.getElementById(firstQuestion.getAttribute("aria-controls")!);

    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(firstAnswer).toHaveAttribute("aria-hidden", "true");

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    expect(firstAnswer).toHaveAttribute("aria-hidden", "false");

    await user.click(secondQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(firstAnswer).toHaveAttribute("aria-hidden", "true");
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    await expectAccessible(container);
  });

  it("provides an accessible custom chat button that opens Botpress", async () => {
    const user = userEvent.setup();
    const previousBotpress = window.botpress;
    const open = vi.fn();
    window.botpress = { open };

    render(<ChatHelp />);
    const launcher = screen.getByRole("button", { name: "Open chat support" });
    expect(launcher).toHaveAttribute("id", "bp-toggle-chat");
    expect(launcher).toHaveAttribute("title", "Open chat support");
    await user.click(launcher);
    expect(open).toHaveBeenCalledOnce();

    window.botpress = previousBotpress;
  });

  it("labels every contact field and blocks duplicate submissions while sending", async () => {
    const user = userEvent.setup();
    let resolveRequest: (() => void) | undefined;
    vi.mocked(createTicket).mockImplementation(
      () => new Promise((resolve) => { resolveRequest = () => resolve({ ok: true }); }),
    );

    const { container } = render(<ContactForm />);

    const name = screen.getByRole("textbox", { name: "Full name" });
    const email = screen.getByRole("textbox", { name: "Email address" });
    const phone = screen.getByRole("textbox", { name: "Phone number (optional)" });
    const address = screen.getByRole("textbox", { name: "Address (optional)" });
    const details = screen.getByRole("textbox", { name: "Project or inquiry details" });
    const platform = screen.getByRole("combobox", { name: "Platform" });
    const product = screen.getByRole("combobox", { name: "Product" });
    const category = screen.getByRole("combobox", { name: "Inquiry category" });

    expect(phone).toHaveAttribute("type", "tel");
    expect(address).toBeInTheDocument();
    expect(details).toBeRequired();
    expect(platform).toBeRequired();
    expect(product).toBeRequired();
    expect(category).toBeRequired();
    const form = screen.getByRole("form", { name: "Not sure where to start?" });
    expect(form).not.toBeValid();
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    expect(createTicket).not.toHaveBeenCalled();
    await expectAccessible(container);

    await user.type(name, "Test User");
    await user.type(email, "test@example.com");
    await user.type(details, "Testing an inquiry.");
    await user.selectOptions(platform, "Web");
    await user.selectOptions(product, "Opsie Core");
    await user.selectOptions(category, "Inquiry");

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole("form", { name: "Not sure where to start?" })).toHaveAttribute("aria-busy", "true");

    await user.click(submitButton);
    expect(createTicket).toHaveBeenCalledTimes(1);
    resolveRequest?.();

    expect(await screen.findByRole("status")).toHaveTextContent("Thank You!");
  });
});
