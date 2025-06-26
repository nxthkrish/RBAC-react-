import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { User } from "../../types/user";
import { Button, Table, Pagination } from "react-bootstrap";

interface UserTableProps {
  data: User[];
  columns: ColumnDef<User>[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onView: (userId: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const UserTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  canEdit = true,
  canDelete = true,
}: UserTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="d-flex flex-column gap-3">
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="d-flex gap-2">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onView(row.original.id)}
                  >
                    View
                  </Button>
                  {canEdit && (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onEdit(row.original)}
                    >
                      Edit
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(row.original.id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="me-2">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="ms-2">
            Showing{" "}
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="form-select form-select-sm d-inline-block w-auto"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>{" "}
            entries
          </span>
        </div>
        <Pagination>
          <Pagination.First
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          <Pagination.Prev
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Pagination.Next
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <Pagination.Last
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default UserTable;
