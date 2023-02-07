import * as strings from 'SpStarterKitSharedLibraryStrings';
import { LocaleKeys } from './loc/LocaleKeys';

export class SpStarterKitSharedLibrary {

  /**
   * Retrieve the locale label for the specified key
   *
   * @param localeKey
   */
  public static getLocale(localeKey: LocaleKeys | string, returnNull = false): string {
    if (!returnNull) {
      return strings[localeKey as keyof ISpStarterKitSharedLibraryStrings] || `Locale key not defined`;
    } else {
      return strings[localeKey as keyof ISpStarterKitSharedLibraryStrings] || null;
    }
  }

}
