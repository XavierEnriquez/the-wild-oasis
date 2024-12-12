import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterParam="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Booking date (newest)" },
          { value: "startDate-asc", label: "Booking date (oldest)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (highest)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (lowest)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
