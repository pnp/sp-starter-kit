declare interface ISpStarterKitSharedLibraryStrings {

  // general labels
  HeaderImageUrlField: string;
  HeaderLinkField: string;

  GeneralPlaceholderIconText: string;
  GeneralPlaceholderBtnLabel: string;

  // banner webpart
  BannerConfigName: string;
  BannerTextField: string;
  BannerPlaceholderDescription: string;

  BannerNumberField: string;
  BannerParallaxField: string;
  BannerValidationNotImage: string;
}

declare module 'SpStarterKitSharedLibraryStrings' {
  const strings: ISpStarterKitSharedLibraryStrings;
  export = strings;
}
