import { IStorageEntity } from '.';
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class TenantPropertyHelper {
  /**
   * Fetches the storage entity value for the provided property name
   * @param context
   * @param propName
   */
  public static async getPropertyValue(context: WebPartContext, propName: string) {
    const restApiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/GetStorageEntity('${propName}')`;
    return await context.spHttpClient.get(restApiUrl, SPHttpClient.configurations.v1)
      .then(data => data.json())
      .then((data: IStorageEntity) => {
        if (data && data.Value) {
          return data.Value;
        }

        return null;
      });
  }
}
