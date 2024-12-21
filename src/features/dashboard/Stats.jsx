/* eslint-disable react/prop-types */

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // Bookings
  const numBookings = bookings?.length;

  // Sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Check ins
  const checkins = confirmedStays?.length;

  // This formula is for this demo app and may NOT be accuarte for a true occupancy rate.
  // Occupancy Rate = (Number of booked nights) / (Total Number of daily Available cabins * period of (7, 30, or 90 days)) × 100
  const ocupancyRate = Math.round(
    (confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
      (cabinCount * numDays)) *
      100
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={ocupancyRate + "%"}
      />
    </>
  );
}

export default Stats;
