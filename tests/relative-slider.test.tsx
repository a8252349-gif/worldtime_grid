import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { RelativeSlider } from "@/components/RelativeSlider";

describe("RelativeSlider React rendering", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders a controlled numeric input without React warnings", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const html = renderToString(
      <RelativeSlider id="test-slider" label="Meeting start" min={0} max={48} step={1} value={12} onChange={() => undefined} />,
    );
    expect(html).toContain('role="slider"');
    expect(html).toContain('type="number"');
    expect(error).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });
});
