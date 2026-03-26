export function toCurrentColorSvg(svg: string) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
    .replace(/<svg\b([^>]*)>/i, (_, attrs: string) => {
      const normalizedAttrs = attrs.replace(/\s(width|height)="[^"]*"/gi, "").trim();
      return `<svg${normalizedAttrs ? ` ${normalizedAttrs}` : ""} width="100%" height="100%" fill="currentColor">`;
    })
    .replace(/fill:\s*#[0-9a-f]{3,8}\s*;/gi, "fill: currentColor;")
    .replace(/stroke:\s*#[0-9a-f]{3,8}\s*;/gi, "stroke: currentColor;")
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="currentColor"');
}
