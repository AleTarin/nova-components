
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function range(start, end) {
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}