export default function mapStatusHTTP(status: string): number {
  const statusMap: Record<string, number> = {
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE_CONTENT: 422,
  };

  return statusMap[status] ?? 500;
}