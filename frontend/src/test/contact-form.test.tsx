import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTicket } from "@/api/createTicket";
import ContactForm from "@/components/cards/ContactForm";

vi.mock("@/api/createTicket", () => ({
  createTicket: vi.fn(),
}));

vi.mock("@/data/productsData", () => ({
  products: [{ name: "Opsie Core" }, { name: "Opsie HRIS" }],
}));

const createTicketMock = vi.mocked(createTicket);

const axiosError = (status: number) => ({
  isAxiosError: true,
  response: { status },
  message: `Request failed with status code ${status}`,
});

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Test User");
  await user.type(screen.getByLabelText(/email address/i), "test@example.com");
  await user.type(
    screen.getByLabelText(/project or inquiry details/i),
    "Please contact me about Opsie Core.",
  );
  await user.selectOptions(screen.getByLabelText(/^platform/i), "Web");
  await user.selectOptions(screen.getByLabelText(/^product/i), "Opsie HRIS");
  await user.selectOptions(screen.getByLabelText(/inquiry category/i), "Inquiry");
}

describe("contact inquiry form (Component B)", () => {
  beforeEach(() => {
    createTicketMock.mockReset();
  });

  it("labels every control and marks the required fields", () => {
    render(<ContactForm />);

    const expectedLabels = [
      /^full name/i,
      /^email address/i,
      /^phone number/i,
      /^address/i,
      /^project or inquiry details/i,
      /^platform/i,
      /^product/i,
      /^inquiry category/i,
    ];

    for (const label of expectedLabels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }

    const form = screen.getByRole("form", { name: /not sure where to start/i });
    expect(form).toBeInTheDocument();
    expect((form as HTMLFormElement).checkValidity()).toBe(false);
    expect(screen.getByLabelText(/full name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/project or inquiry details/i)).toBeRequired();
    expect(screen.getByLabelText(/^platform/i)).toBeRequired();
    expect(screen.getByLabelText(/^product/i)).toBeRequired();
    expect(screen.getByLabelText(/inquiry category/i)).toBeRequired();

    // B2-CF-2: required state is exposed programmatically as well as natively.
    for (const label of [
      /^full name/i,
      /^email address/i,
      /^project or inquiry details/i,
      /^platform/i,
      /^product/i,
      /inquiry category/i,
    ]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("aria-required", "true");
    }

    for (const label of [/^phone number/i, /^address/i]) {
      expect(screen.getByLabelText(label)).not.toHaveAttribute("aria-required");
    }
  });

  it("stacks the field rows on phones and pairs them from the md breakpoint", () => {
    render(<ContactForm />);

    const grid = screen.getByLabelText(/^full name/i).closest("div.grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(screen.getByLabelText(/^full name/i).closest(".space-y-2")).toHaveClass("min-w-0");
  });

  it("exposes autocomplete hints for the identity fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText(/phone number/i)).toHaveAttribute("autocomplete", "tel");
    expect(screen.getByLabelText(/^address/i)).toHaveAttribute("autocomplete", "street-address");
  });

  it("uses contrast-safe placeholder and submit styles", () => {
    render(<ContactForm />);

    for (const label of [/^full name/i, /^email address/i, /^phone number/i, /^address/i, /^project or inquiry details/i]) {
      expect(screen.getByLabelText(label).className).toContain("placeholder:text-[#5B6B7A]");
    }

    const submit = screen.getByRole("button", { name: /send message/i });
    expect(submit.className).toContain("bg-[#3CBDE6]");
    expect(submit.className).toContain("text-[#06212E]");
    expect(submit.className).toContain("rounded-full");
    expect(submit.className).toContain("shadow-[0_14px_34px_-14px_rgba(60,189,230,0.9)]");
    // Navy text on teal = 7.6:1; hover/active teal keep it above 4.5:1.
    expect(submit.className).toContain("hover:bg-[#29A6CC]");
    expect(submit.className).toContain("active:bg-[#1F93B5]");
  });

  it("applies the shared card lift and keeps the success action tappable", async () => {
    const user = userEvent.setup();
    createTicketMock.mockResolvedValue({ message: "Ticket created successfully" });

    render(<ContactForm />);

    const card = screen.getByRole("form").parentElement;
    expect(card?.className).toContain("hover:-translate-y-1");
    expect(card?.className).toContain("hover:border-[#3CBDE6]/60");

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const sendAnother = await screen.findByRole("button", { name: /send another inquiry/i });
    expect(sendAnother.className).toContain("min-h-11");
    expect(sendAnother.className).toContain("rounded-full");
    expect(sendAnother.className).toContain("active:opacity-70");
  });

  it("keeps submit focusable while sending and ignores duplicate submits", async () => {
    const user = userEvent.setup();
    let resolveTicket: ((value: { message: string }) => void) | undefined;
    createTicketMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveTicket = resolve;
        }),
    );

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const sending = await screen.findByRole("button", { name: /sending/i });
    expect(sending).toHaveAttribute("aria-disabled", "true");
    expect(sending).toHaveAttribute("aria-busy", "true");
    expect((sending as HTMLButtonElement).disabled).toBe(false);

    fireEvent.submit(screen.getByRole("form", { name: /not sure where to start/i }));
    expect(createTicketMock).toHaveBeenCalledTimes(1);

    resolveTicket?.({ message: "Ticket created successfully" });
    expect(await screen.findByRole("status")).toHaveTextContent(/thank you/i);
  });

  it("submits a valid inquiry, shows the confirmation, and moves focus to it", async () => {
    const user = userEvent.setup();
    createTicketMock.mockResolvedValue({ message: "Ticket created successfully" });

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const confirmation = await screen.findByRole("status");
    expect(confirmation).toHaveTextContent(/thank you/i);
    expect(confirmation).toHaveAttribute("aria-live", "polite");
    await waitFor(() => expect(confirmation).toHaveFocus());
    expect(screen.queryByRole("button", { name: /send message/i })).not.toBeInTheDocument();

    expect(createTicketMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test User",
        email: "test@example.com",
        platform: "Web",
        product: "Opsie HRIS",
        category: "Inquiry",
      }),
    );
  });

  it("shows and announces a server error without permanently disabling submit", async () => {
    const user = userEvent.setup();
    createTicketMock.mockRejectedValueOnce(axiosError(500));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/something went wrong/i);
    expect(alert).not.toHaveTextContent(/too many requests/i);

    const submit = screen.getByRole("button", { name: /send message/i });
    expect(submit).toBeEnabled();
  });

  it("reports a rate-limit response distinctly from a server error", async () => {
    const user = userEvent.setup();
    createTicketMock.mockRejectedValueOnce(axiosError(429));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/too many requests/i);
  });

  it("retries successfully after a failed submission without reloading", async () => {
    const user = userEvent.setup();
    createTicketMock.mockRejectedValueOnce(axiosError(500));
    createTicketMock.mockResolvedValueOnce({ message: "Ticket created successfully" });

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await screen.findByRole("alert");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/thank you/i);
    expect(createTicketMock).toHaveBeenCalledTimes(2);
  });

  it("clears the error announcement when the user edits the form", async () => {
    const user = userEvent.setup();
    createTicketMock.mockRejectedValueOnce(axiosError(500));

    render(<ContactForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), " Jr");

    await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
  });

  it("shows per-field errors, announces the summary, and focuses the first invalid field", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(createTicketMock).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/correct the highlighted fields/i);

    const name = screen.getByLabelText(/^full name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAttribute("aria-describedby", "inquiry-name-error");
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please tell us about your project or inquiry.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a platform.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a product.")).toBeInTheDocument();
    expect(screen.getByText("Please choose an inquiry category.")).toBeInTheDocument();

    await waitFor(() => expect(name).toHaveFocus());
  });

  it("shows a format error for an invalid email address", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.type(screen.getByLabelText(/^full name/i), "Test User");
    await user.type(screen.getByLabelText(/^email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^project or inquiry details/i), "Testing an inquiry.");
    await user.selectOptions(screen.getByLabelText(/^platform/i), "Web");
    await user.selectOptions(screen.getByLabelText(/^product/i), "Opsie HRIS");
    await user.selectOptions(screen.getByLabelText(/inquiry category/i), "Inquiry");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(createTicketMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/^email address/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/^email address/i)).toHaveFocus());
  });

  it("re-validates a corrected field when it loses focus after a failed submit", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const name = screen.getByLabelText(/^full name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");

    await user.type(name, "Test User");
    await user.tab();

    expect(name).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });

  it("keeps the error when an invalid field is blurred again", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const name = screen.getByLabelText(/^full name/i);
    await user.click(name);
    await user.tab();

    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
  });

  it("does not validate on blur before the first submit attempt", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByLabelText(/^full name/i));
    await user.tab();

    expect(screen.getByLabelText(/^full name/i)).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });

  it("clears a field error as soon as the user edits that field", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByLabelText(/^full name/i)).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText(/^full name/i), "Test User");

    expect(screen.getByLabelText(/^full name/i)).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });
});
