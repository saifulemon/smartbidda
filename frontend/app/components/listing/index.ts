// CONTRACT §1 listing registry — the shared components the design's
// data-component markers resolve to. Imported here once so every listing
// surface shares them instead of hand-drawing a table per screen.
import { DataTable } from '~/components/data-table/DataTable';
import { RowActions } from '~/components/listing/RowActions';
import { RowSelect } from '~/components/listing/RowSelect';
import { BulkActions } from '~/components/listing/BulkActions';
import { EntityFormModal } from '~/components/listing/EntityFormModal';
import { SearchInput } from '~/components/atoms/SearchInput';

export { DataTable, RowActions, RowSelect, BulkActions, EntityFormModal, SearchInput };
