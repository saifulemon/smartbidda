/** Shared UI contracts that are not component Props (kept out of the components). */
export interface BulkAction { label: string; onClick?: () => void; onSelect?: () => void; destructive?: boolean; disabled?: boolean; variant?: 'default' | 'destructive'; }
export type TableFormat = 'text' | 'date' | 'currency' | 'number';
export interface TableColumnShape<T> { key: keyof T & string; header: string; label?: string; sortable?: boolean; width?: string | number; format?: TableFormat; render?: (row: T) => React.ReactNode; }
export interface PaginationState { page: number; pageSize: number; total: number; totalPages?: number; }
export interface FilterOption { value: string; label: string; count?: number; }
export interface PieDatum { name: string; value: number; fill?: string; }
export interface PieChartProps { data: PieDatum[]; height?: number; testId?: string; }
export interface DashboardQuery { entity: string; op: 'count'; where?: Array<{ field: string; op: string; value: unknown }>; group?: { field: string; timestampField?: string; window?: { days: number } }; }
export interface DashboardResult { value?: number; items?: Array<{ key: string | number | null; count: number }>; }
