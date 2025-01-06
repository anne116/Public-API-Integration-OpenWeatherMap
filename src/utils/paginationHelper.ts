export const getPaginationIndexes = (
    page: number,
    pageSize: number
): { startIndex: number; endIndex: number } => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return { startIndex, endIndex };
}