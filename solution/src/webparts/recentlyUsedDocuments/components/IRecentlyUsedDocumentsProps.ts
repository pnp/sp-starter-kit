import { IRecentlyUsedDocumentsWebPartProps } from '../RecentlyUsedDocumentsWebPart';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IRecentlyUsedDocumentsProps extends IRecentlyUsedDocumentsWebPartProps {
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}

export interface IRecentlyUsedDocumentsState {
  recentDocs: any[];
  loading: boolean;
}

/**
 * Microsoft Graph Insights Interface
 */
export interface IRecentDocuments {
  '@odata.context': string;
  value: IRecentDocument[];
}

export interface IRecentDocument {
  id: string;
  lastUsed: LastUsed;
  resourceVisualization: ResourceVisualization;
  resourceReference: ResourceReference;
}

export interface ResourceReference {
  webUrl: string;
  id: string;
  type: string;
}

export interface ResourceVisualization {
  title: string;
  type: string;
  mediaType: string;
  previewImageUrl: string;
  previewText: string;
  containerWebUrl: string;
  containerDisplayName: string;
  containerType: string;
}

export interface LastUsed {
  lastAccessedDateTime: string;
  lastModifiedDateTime: string;
}

/**
 * Icons enum
 */
export enum BrandIcons {
  Word = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/docx.png",
  PowerPoint = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/pptx.png",
  Excel = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/xlsx.png",
  Pdf = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/pdf.png",
  OneNote = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/onetoc.png",
  OneNotePage = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/one.png",
  InfoPath = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/xsn.png",
  Visio = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/vsdx.png",
  Publisher = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/pub.png",
  Project = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/mpp.png",
  Access = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/accdb.png",
  Mail = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/email.png",
  Csv = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/xlsx.png",
  Archive = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/zip.png",
  Xps = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/genericfile.png",
  Audio = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/audio.png",
  Video = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/video.png",
  Image = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/photo.png",
  Text = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/txt.png",
  Xml = "https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/32/xml.png"
}
