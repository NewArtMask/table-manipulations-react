export interface TableData {
  company: string;
  name: string;
  contact: string;
  country: string;
}

export type TableTitles = "country" | "contact" | "company" | "name";

export enum SortOrder {
  none = "none",
  asc = "asc",
  desc = "desc"
}
