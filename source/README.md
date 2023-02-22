# Individual solutions of the Starter Kit

Starting from SharePoint Starter Kit v2, each web part and be taken into use independently without requirement to deploy them all to your tenant. Those solutions which do not have cloud dependencies, and with V3, may only be used on SharePoint Online. On-premises SharePoint is no longer supported. Supportability of each solution is explicitly called out in the solution level.

Solution structure as as follows:

Solution |  Description  | Environment
----------- | ----------- | -----------
[js-application-redirect](js-application-redirect/README.md) | Can be used to perform automatic redirections of URLs in the site based on a custom list. | SPO
[library-starter-kit-shared](library-starter-kit-shared/README.md) | Shows the list of sites which particular user is following | SPO
[rest-application-alerts](rest-application-alerts/README.md) | Shows informational or important messages in the header section of pages based on a custom list information in the hub site. | SPO
[react-application-collab-footer](react-application-collab-footer/README.md) | Shows company wide links which are configured using Taxonomy service. Includes also personalized links which are stored in user profile property if set. | SPO
[react-application-portal-footer](react-application-portal-footer/README.md) | Expanding footer for communication site. Show standard company links and also supports personalized links for the current user which are stored in User Profile. | SPO
[react-banner](react-banner/README.md) | Creates a banner with an image and overlaid text. | SPO
[react-command-discuss-now](react-command-discuss-now/README.md) | Custom list view command set to add new custom dialog for document library to start discussion around the document in Microsoft Teams using Graph APIs | SPO
[react-followed-sites](react-followed-sites/README.md) | Shows the list of sites which particular user is following. | SPO
[react-links](react-links/README.md) | Link list web part which is using collection data editor and stores the links in web part properties. | SPO
[react-lob-integration](react-lob-integration/README.md) | Sample web part to surface LOB information from API hosted in Azure. | SPO
[react-people-directory](react-people-directory/README.md) | People directory web part uses the people search API to get list of people to show. | SPO
[react-personal-calendar](react-personal-calendar/README.md) | Shows upcoming calendar meetings for the particular user using Microsoft Graph. | SPO
[react-react-personal-contacts](react-react-personal-contacts/README.md) | Personal contacts for particular user using Microsoft Graph. | SPO
[react-personal-email](react-personal-email/README.md) | List latest personal emails for the current user using Microsoft Graph. | SPO
[react-personal-tasks](react-personal-tasks/README.md) | Show personal tasks for the current user using Microsoft Graph with Graph Tool Kit. | SPO
[react-recent-contacts](react-recent-contacts/README.md) | Show recent contacts for the current user using Microsoft Graph. | SPO
[react-recently-used-documents](react-recently-used-documents/README.md) | Show recently used documents for the current user using Microsoft Graph. | SPO
[react-recently-visited-sites](react-recently-visited-sites/README.md) | Show recently visited sites for current user using Microsoft Graph. | SPO
[react-site-information](react-site-information/README.md) | Intended to collect and present additional metadata for group associated or normal team sites. | SPO
[react-tiles](react-tiles/README.md) | Renders set of tiles. Icons are from Office UI Fabric and you can configure tiles using collection editor in web part properties. | SPO
[react-weather](react-weather/README.md) | Weather web part targeted for SP2019 as SPO has out-of-the-box one. | SPO
[react-tiles](react-world-clock/README.md) | World clock web part targeted for SP2019 as SPO has out-of-the-box one. | SPO

## Installation

In order to run the project locally, we make use of [lerna](https://github.com/lerna/lerna). This tool will automatically set the `npm` linking correctly for the SPFx library component. 

Follow the next steps when you want to run this project on your own machine:

- Clone the project: `git clone https://github.com/SharePoint/sp-starter-kit`
- Navigate with your terminal to the cloned repository
- Run: `npm i`
- Once the root project dependencies are installed, you can run `npm run initialize`
- Once all the packages are installed, you are ready to start developing

## Localization

All localization keys and labels are managed from one library project [library-starter-kit-shared](./library-starter-kit-shared). In order to add/update new keys, all you have to do is add them to the appropriate localization files like `en-us.js`.

Once added, run `gulp build` or run `npm run localization` on the root of the project. This ensures that the project updates the `LocaleKeys` enum.

> **Important**: The version of the localization project should always be in sync in the projects which make use of it.