import * as strings from 'SpStarterKitSharedLibraryStrings';

export class SpStarterKitSharedLibrary {

  public static getLocale(localeKey: string): string {

    return strings[localeKey] || `Locale key not defined`;
  }

}
