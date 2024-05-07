import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MapController from "../components/map-controller";
import Authorization from "@app/shared/components/authorization";
import { getCurrentUser } from "aws-amplify/auth";

describe("tests map controller only", () => {
  const { getByTestId } = render(<MapController />);

  const parentElement = getByTestId("controller");

  test("should load controllers with 3 button controllers", async () => {
    expect(parentElement.children.length).toBe(3);
  });

  test("should change class as active when hovered", async () => {
    const buttonOne = parentElement.children[0];

    await userEvent.hover(buttonOne);

    expect(buttonOne.className).toContain("bg-slate-200");
    expect(buttonOne.className).toContain("text-slate-600");
  });

  test("should change class as active when clicked", async () => {
    const buttonOne = parentElement.children[1];

    await userEvent.click(buttonOne);

    expect(buttonOne.className).toContain("bg-slate-600");
    expect(buttonOne.className).toContain("text-white");
  });
});

jest.mock("aws-amplify/auth", () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ username: "mock-user" }),
}));

describe("tests map controller with authorization", () => {
  test("should display the map controller for authorized user", async () => {
    const { getByTestId } = render(
      <Authorization>
        <MapController />
      </Authorization>,
    );

    const parentElement = await waitFor(() => getByTestId("controller"));

    expect(parentElement.children.length).toBe(3);
  });

  test("should display nothing for unauthorized user", async () => {
    (getCurrentUser as jest.Mock).mockImplementation(() => Promise.reject(new Error("invalid session")));

    const { container } = render(
      <Authorization>
        <MapController />
      </Authorization>,
    );

    expect(container.childElementCount).toBe(0);
  });
});
