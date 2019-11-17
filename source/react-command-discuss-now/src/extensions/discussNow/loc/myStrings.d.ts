declare interface IDiscussNowCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'DiscussNowCommandSetStrings' {
  const strings: IDiscussNowCommandSetStrings;
  export = strings;
}
