export interface PeopleSearchResults {
  PrimaryQueryResult: {
    RelevantResults: {
      RowCount: number;
      Table: {
        Rows: {
          Cells: Cell[];
        }[];
      };
      TotalRows: number;
    };
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface Cell {
  Key: string;
  Value: string;
  ValueType: string;
}