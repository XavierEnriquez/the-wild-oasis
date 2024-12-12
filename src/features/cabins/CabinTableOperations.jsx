import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterParam="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price 🔺" },
          { value: "regularPrice-desc", label: "Sort by price 🔻" },
          { value: "maxCapacity-asc", label: "Sort by capacity 🔺" },
          { value: "maxCapacity-desc", label: "Sort by capacity 🔻" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
