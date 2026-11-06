import { render, screen, waitFor } from "@testing-library/react";
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
  await user.selectOptions(screen.getByLabelText(/^platform$/i), "Web");
  await user.selectOptions(screen.getByLabelText(/^product$/i), "Opsie HRIS");
  await user.selectOptions(screen.getByLabelText(/inquiry category/i), "Inquiry");
}

describe("contact inquiry form (Component B)", () => {
  beforeEach(() => {
    createTicketMock.mockReset();
  });

  it("labels every control and marks the required fields", () => {
    render(<ContactForm />);

    const expectedLabels = [
      "Full name",
      "Email address",
      "Phone number (optional)",
      "Address (optional)",
      "Project or inquiry details",
      "Platform",
      "Product",
      "Inquiry category",
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
    expect(screen.getByLabelText(/^platform$/i)).toBeRequired();
    expect(screen.getByLabelText(/^product$/i)).toBeRequired();
    expect(screen.getByLabelText(/inquiry category/i)).toBeRequired();
  });

  it("exposes autocomplete hints for the identity fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText(/phone number/i)).toHaveAttribute("autocomplete", "tel");
    expect(screen.getByLabelText("Address (optional)")).toHaveAttribute("autocomplete", "street-address");
  });

  it("uses contrast-safe placeholder and submit styles", () => {
    render(<ContactForm />);

    for (const label of [/full name/i, /email address/i, /phone number/i, "Address (optional)", /project or inquiry details/i]) {
      expect(screen.getByLabelText(label).className).toContain("placeholder-gray-500");
    }

    const submit = screen.getByRole("button", { name: /send message/i });
    expect(submit.className).toContain("bg-[#3CBDE6]");
    expect(submit.className).toContain("text-[#0A0F1D]");
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
});
