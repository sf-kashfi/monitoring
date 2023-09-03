import { DateTime } from "luxon";

export const convertISODateToJalali = (date: string) =>
  DateTime.fromISO(date)
    .setLocale("fa")
    .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

export const formatISODateToShortDate  = (date: string) =>
  DateTime.fromISO(date)
    .setLocale("fa")
    .toLocaleString(DateTime.DATE_SHORT);
