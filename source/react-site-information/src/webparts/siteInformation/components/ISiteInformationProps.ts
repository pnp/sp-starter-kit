export interface ISiteInformationProps {
  // used to represent the site's title
  siteTitle: string;
  // used to represent the site's contact login name
  siteContactLogin: string;
  // used to represent the site's contact email
  siteContactEmail?: string;
  // used to represent the site's contact fullname
  siteContactFullName?: string;
  // used to represent the site's contact image URL
  siteContactImageUrl?: string;
  // used to represent the site's organization, based on a taxonomy termset
  siteOrganization: {};
  // used to declare if the web part still needs to be configured
  needsConfiguration: boolean;
  // handler to process the request to configure the web part
  configureHandler: () => void;
  // handler to process any exception
  errorHandler: (errorMessage: string) => void;
}
