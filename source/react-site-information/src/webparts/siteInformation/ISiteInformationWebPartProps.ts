import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { IPickerTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';

export interface ISiteInformationWebPartProps {
    // used to represent the site's title
    siteTitle: string;
    // used to represent the site's contact
    siteContact: IPropertyFieldGroupOrPerson[];
    // used to represent the site's organization, based on a taxonomy termset
    siteOrganization: IPickerTerms;
}
