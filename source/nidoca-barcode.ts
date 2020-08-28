import {customElement, html, query, TemplateResult, LitElement, property} from 'lit-element';
import {BrowserMultiFormatReader, Result} from '@zxing/library';

import {BasicService, I18nService} from '@domoskanonos/frontend-basis';
import {
  BorderSize,
  BorderProperties,
  ShadowType,
  FlexContainerProperties,
  FlexAlignContent,
  SpacerSize,
  SpacerAlignment,
} from '@domoskanonos/nidoca-core';

export class BarcodeService {
  private barcodeReader = new BrowserMultiFormatReader();
  private selectedDeviceId: string = '';

  public async decodeOnceFromVideoDevice(htmlVideoElement: HTMLVideoElement): Promise<Result> {
    let result = await this.barcodeReader.decodeOnceFromVideoDevice(this.selectedDeviceId, htmlVideoElement);
    if (result != undefined) {
      this.stop();
    }
    return result;
  }

  public stop() {
    this.barcodeReader.reset();
  }
}

@customElement('nidoca-barcode')
export class Barcode extends LitElement {
  private barcodeService: BarcodeService = new BarcodeService();

  @property()
  width: string = '100%';

  @property()
  height: string = '100%';

  @query('#video')
  videoElement: HTMLVideoElement | undefined;

  render(): TemplateResult {
    return html`
      <nidoca-border
        .borderProperties="${[BorderProperties.ALL, BorderProperties.FULL_WIDTH]}"
        .borderSize="${BorderSize.THIN}"
        .shadowType="${ShadowType.NONE}"
      >
        <nidoca-flex-container
          .flexContainerProperties="${[
            FlexContainerProperties.CONTAINER_WIDTH_100,
            FlexContainerProperties.CONTAINER_HEIGHT_100,
          ]}"
          .flexAlignContent="${FlexAlignContent.CENTER}"
          flexItemBasisValue="100%"
        >
          <nidoca-spacer spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.HORIZONTAL}">
            <nidoca-spacer
              spacerSize="${SpacerSize.MEDIUM}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            ></nidoca-spacer>

            <video id="video" width="${this.width}" height="${this.height}"></video>

            <nidoca-spacer
              spacerSize="${SpacerSize.MEDIUM}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            ></nidoca-spacer>

            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue('nidoca-barcode-start-scanning')}"
              @nidoca-event-button-clicked="${() => this.scanBarcode()}"
            ></nidoca-button>

            <nidoca-spacer
              spacerSize="${SpacerSize.MEDIUM}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            ></nidoca-spacer>

            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue('nidoca-barcode-stop-scanning')}"
              @nidoca-event-button-clicked="${() => this.stopScanning()}"
            ></nidoca-button>

            <nidoca-spacer
              spacerSize="${SpacerSize.MEDIUM}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            ></nidoca-spacer>
          </nidoca-spacer>
        </nidoca-flex-container>
      </nidoca-border>
    `;
  }

  private scanBarcode() {
    if (this.videoElement != undefined) {
      console.log('scan barcode...');
      this.barcodeService.decodeOnceFromVideoDevice(this.videoElement).then((value) => {
        console.log('barcode scanned: ' + value.getText());
        BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, 'nidoca-event-barcode', value.getText());
        this.stopScanning();
      });
    }
  }

  private stopScanning() {
    console.log('stop scanning barcode...');
    this.barcodeService.stop();
  }
}
