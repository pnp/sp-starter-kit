import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";

import { PeopleDirectory, IPeopleDirectoryProps } from './components/PeopleDirectory/';

export interface IPeopleDirectoryWebPartProps {
	title: string;
}

export default class PeopleDirectoryWebPart extends BaseClientSideWebPart<IPeopleDirectoryWebPartProps> {

	protected onInit(): Promise<void> {
		document.documentElement.style
			.setProperty('--maxPersonaWidth', this.width > 640 ? "50%" : "100");
		return Promise.resolve();
	}
	protected onAfterResize(newWidth: number) {
		console.log("New web part width: " + newWidth);
		document.documentElement.style
			.setProperty('--maxPersonaWidth', newWidth > 640 ? "50%" : "100");
	}
	public render(): void {
		const element: React.ReactElement<IPeopleDirectoryProps> = React.createElement(
			PeopleDirectory,
			{
				webUrl: this.context.pageContext.web.absoluteUrl,
				spHttpClient: this.context.spHttpClient,
				title: this.properties.title,
				displayMode: this.displayMode,
				locale: this.getLocaleId(),
				onTitleUpdate: (newTitle: string) => {
					// after updating the web part title in the component
					// persist it in web part properties
					this.properties.title = newTitle;
				}
			}
		);

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getLocaleId(): string {
		return this.context.pageContext.cultureInfo.currentUICultureName;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: []
		};
	}
}
