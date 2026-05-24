export function buildPagination({ page = 1, pageSize = 20 }) {
  const limit = Math.min(Math.max(parseInt(pageSize, 10) || 20, 1), 100);
  const offset = (Math.max(parseInt(page, 10) || 1, 1) - 1) * limit;
  return { limit, offset };
}

export function buildSort(defaultSort = 'created_at', defaultOrder = 'DESC', sortField, sortOrder) {
  const orderBy = sortField || defaultSort;
  const direction = sortOrder && sortOrder.toUpperCase() === 'ASC' ? 'ASC' : defaultOrder;
  return { orderBy, direction };
}
