/** Shared table column contract (columns are plain data, not component props). */
export interface TableColumn<T> {
  key: keyof T & string;
  header: string;
  render?: (row: T) => string;
}
