import moment from "moment";
import { FilterType } from "../const";

const DefaultDate = {
  START: moment(0),
  END: moment(),
};

const filterByDate = (data, startValue, endValue) => {
  const startDate = startValue ? moment(startValue) : DefaultDate.START;
  const endDate = endValue ? moment(endValue) : DefaultDate.END;

  return data.reduce(
    (accum, currentItem) => {
      const { value, date } = currentItem;
      const currentItemDate = moment(date);

      if (
        currentItemDate.isBetween(startDate.utc(), endDate.utc(), "year", "[]")
      ) {
        accum.values.push(value);
        accum.dates.push(currentItemDate.format("YYYY"));
      }

      return accum;
    },
    { values: [], dates: [] }
  );
};

const filterData = (data, filter) => {
  if (data.length) {
    let updatedData = filterByDate(
      data,
      filter[FilterType.DATE_START],
      filter[FilterType.DATE_END]
    );

    return updatedData;
  }

  return { values: [], dates: [] };
};

export { filterData };
