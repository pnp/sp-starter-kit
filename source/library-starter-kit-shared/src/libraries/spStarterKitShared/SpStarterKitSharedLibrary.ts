import * as strings from 'SpStarterKitSharedLibraryStrings';
import { LocaleKeys } from './loc/LocaleKeys';

export class SpStarterKitSharedLibrary {

  /**
   * Retrieve the locale label for the specified key
   *
   * @param localeKey
   */
  public static getLocale(localeKey: LocaleKeys | string, returnNull: boolean = false): string {
    if (!returnNull) {
      return strings[localeKey] || `Locale key not defined`;
    } else {
      return strings[localeKey] || null;
    }
  }

}
