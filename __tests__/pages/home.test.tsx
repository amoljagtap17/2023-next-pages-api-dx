import HomePage from "@/pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");

  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: null, status: "unauthenticated" };
    }),
  };
});

describe("Home Page", () => {
  it("renders the home page", () => {
    // ARRANGE
    render(<HomePage />);

    // ACT
    const signInButton = screen.getByRole("button", {
      name: /Sign in/i,
    });

    expect(signInButton).toBeInTheDocument();
  });
});
