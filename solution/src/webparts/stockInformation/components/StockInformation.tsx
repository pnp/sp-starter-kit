import * as React from 'react';
import styles from './StockInformation.module.scss';
import { IStockInformationProps } from './IStockInformationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class StockInformation extends React.Component<IStockInformationProps, {}> {
  public render(): React.ReactElement<IStockInformationProps> {
    return (
      <div className={ styles.stockInformation }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>This will be 'Stock info' web part!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
