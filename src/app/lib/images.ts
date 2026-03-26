type ImageOptions = {
  width?: number;
  quality?: number;
};

export function buildResponsiveImageSet(
  src: string,
  widths: number[],
  options: Omit<ImageOptions, "width"> = {},
) {
  const normalizedWidths = Array.from(new Set(widths)).sort((a, b) => a - b);

  return {
    src: optimizeImageUrl(src, { ...options, width: normalizedWidths.at(-1) }),
    srcSet: normalizedWidths
      .map((width) => `${optimizeImageUrl(src, { ...options, width })} ${width}w`)
      .join(", "),
  };
}

export function optimizeImageUrl(src: string, options: ImageOptions = {}) {
  if (!src) {
    return src;
  }

  const { width, quality = 80 } = options;

  if (src.includes("res.cloudinary.com") && src.includes("/image/upload/")) {
    const transforms = ["f_auto", "q_auto", "dpr_auto"];

    if (width) {
      transforms.push("c_limit");
      transforms.push(`w_${Math.round(width)}`);
    }

    return src.replace("/image/upload/", `/image/upload/${transforms.join(",")}/`);
  }

  if (src.includes("images.unsplash.com/")) {
    const url = new URL(src);

    url.searchParams.set("auto", "format,compress");
    url.searchParams.set("q", String(quality));

    if (width) {
      url.searchParams.set("w", String(Math.round(width)));
    }

    if (!url.searchParams.get("fit")) {
      url.searchParams.set("fit", "max");
    }

    return url.toString();
  }

  return src;
}
