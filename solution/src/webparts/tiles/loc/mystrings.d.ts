declare interface ITilesWebPartStrings {
  PropertyPaneDescription: string;
  TilesListDescription: string;
  TileHeight: string;

  // Component
  NoListConnection: string;
  NoTilesFound: string;
  Loading: string;
  Error: string;
}

declare module 'TilesWebPartStrings' {
  const strings: ITilesWebPartStrings;
  export = strings;
}
