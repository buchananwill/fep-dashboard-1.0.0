function nameOfCopy(oldName: string) {
  return `${oldName} COPY2`;
}

export function mapToNewRows(
  rows: { name: string; parentNodeName?: string }[]
) {
  return rows.map((row) => {
    const replacement = { ...row };
    replacement.name = nameOfCopy(row.name);
    if (
      Object.hasOwn(replacement, 'parentNodeName') &&
      replacement.parentNodeName !== undefined
    ) {
      replacement.parentNodeName = nameOfCopy(replacement.parentNodeName);
    }
    return replacement;
  });
}

export function mapToOptionCopies(rows: { carouselGroupName: string }[]) {
  return rows.map((row) => {
    const replacement = { ...row };
    replacement.carouselGroupName = nameOfCopy(row.carouselGroupName);
    return replacement;
  });
}
