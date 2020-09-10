import {customElement, html, LitElement, property} from 'lit-element';
import {FlexContainerProperties, FlexJustifyContent} from '@domoskanonos/nidoca-core';
import {SpacerAlignment, SpacerSize, TypographyType} from '@domoskanonos/nidoca-core';
import {I18nService, BasicService} from '@domoskanonos/frontend-basis';
import {BorderProperties, BorderSize, ShadowType} from '@domoskanonos/nidoca-core/lib';

@customElement('nidoca-decision-dialog')
export class NidocaDecisionDialog extends LitElement {
  @property()
  showDialog: boolean = false;

  @property()
  title: string = '';

  @property()
  description: string = '';

  @property()
  textOkButton: string = I18nService.getUniqueInstance().getValue('yes');

  @property()
  textCancelButton: string = I18nService.getUniqueInstance().getValue('no');

  render() {
    return html`
      <nidoca-dialog .show="${this.showDialog}">
        <nidoca-border
          .borderProperties="${[BorderProperties.ALL]}"
          .borderSize="${BorderSize.MEDIUM}"
          .shadowType="${ShadowType.NONE}"
        >
          <nidoca-box style="background-color: var(--app-color-background);" width="350px" height="auto">
            <nidoca-spacer .spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.BOTH}">
              <nidoca-flex-container
                .flexContainerProperties="${[FlexContainerProperties.CONTAINER_WIDTH_100]}"
                flexItemBasisValue="100%"
              >
                <nidoca-typography .typographyType="${TypographyType.H6}" text="${this.title}"></nidoca-typography>
                <nidoca-spacer .spacerSize="${SpacerSize.SMALL}" spacerAlignment="${SpacerAlignment.VERTICAL}">
                </nidoca-spacer>
                <nidoca-typography
                  .typographyType="${TypographyType.BODY1}"
                  text="${this.description}"
                ></nidoca-typography>
                <nidoca-spacer .spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.VERTICAL}">
                </nidoca-spacer>
                <nidoca-flex-container
                  .flexContainerProperties="${[FlexContainerProperties.CONTAINER_WIDTH_100]}"
                  .flexJustifyContent="${FlexJustifyContent.FLEX_END}"
                  itemFlexBasisValue="auto"
                >
                  <nidoca-spacer .spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.HORIZONTAL}">
                    <nidoca-link
                      @click="${() => this.dispatchOkEvent()}"
                      text="${this.textOkButton}"
                    ></nidoca-link>
                  </nidoca-spacer>
                  <nidoca-spacer .spacerSize="${SpacerSize.MEDIUM}" spacerAlignment="${SpacerAlignment.HORIZONTAL}">
                    <nidoca-link
                      @click="${() => {
                        this.dispatchCancelEvent();
                      }}"
                      text="${this.textCancelButton}"
                    ></nidoca-link>
                  </nidoca-spacer>
                </nidoca-flex-container>
              </nidoca-flex-container>
            </nidoca-spacer>
          </nidoca-box>
        </nidoca-border>
      </nidoca-dialog>
    `;
  }

  private dispatchOkEvent() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, 'nidoca-event-decision-dialog-ok');
  }

  private dispatchCancelEvent() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, 'nidoca-event-decision-dialog-cancel');
  }
}
