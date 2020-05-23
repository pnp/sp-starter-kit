declare interface IBannerWebPartStrings {
  BannerConfigName: string;
  BannerTextField: string;
  BannerImageUrlField: string;
  BannerLinkField: string;
  BannerNumberField: string;
  BannerParallaxField: string;
  BannerValidationNotImage: string;
  BannerPlaceholderIconText: string;
  BannerPlaceholderDescription: string;
  BannerPlaceholderBtnLabel: string;
}

declare module 'BannerWebPartStrings' {
  const strings: IBannerWebPartStrings;
  export = strings;
}
