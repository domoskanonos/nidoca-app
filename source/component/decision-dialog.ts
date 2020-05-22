import { customElement, html, LitElement, property } from "lit-element";
import {
  FlexContainerProperties,
  FlexJustifyContent
} from "@domoskanonos/nidoca-core/source/flex-container/component";
import {
  SpacerAlignment,
  SpacerSize,
  TypographyType
} from "@domoskanonos/nidoca-core";
import { I18nService, BasicService } from "@domoskanonos/frontend-basis";

@customElement("nidoca-decision-dialog")
export class NidocaDecisionDialog extends LitElement {
  static EVENT_OK = "nidoca-decision-dialog-ok-event";

  static EVENT_CANCEL = "nidoca-decision-dialog-cancel-event";

  @property()
  showDialog: boolean = false;

  @property()
  title: string = "";

  @property()
  description: string = "";

  render() {
    return html`
      <nidoca-dialog .show="${this.showDialog}">
        <nidoca-spacer
          .spacerSize="${SpacerSize.MEDIUM}"
          spacerAlignment="${SpacerAlignment.BOTH}"
        >
          <nidoca-flex-container
            .flexContainerProperties="${[
              FlexContainerProperties.CONTAINER_WIDTH_100
            ]}"
            itemFlexBasisValue="100%"
          >
            <nidoca-typography
              .typographyType="${TypographyType.H6}"
              text="${this.title}"
            ></nidoca-typography>
            <nidoca-spacer
              .spacerSize="${SpacerSize.SMALL}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            >
            </nidoca-spacer>
            <nidoca-typography
              .typographyType="${TypographyType.BODY1}"
              text="${this.description}"
            ></nidoca-typography>
            <nidoca-spacer
              .spacerSize="${SpacerSize.MEDIUM}"
              spacerAlignment="${SpacerAlignment.VERTICAL}"
            >
            </nidoca-spacer>
            <nidoca-flex-container
              .flexContainerProperties="${[
                FlexContainerProperties.CONTAINER_WIDTH_100
              ]}"
              .flexJustifyContent="${FlexJustifyContent.FLEX_END}"
              itemFlexBasisValue="auto"
            >
              <nidoca-link
                @click="${() => this.dispatchDeleteEvent()}"
                text="${I18nService.getUniqueInstance().getValue("yes")}"
              ></nidoca-link>
              <nidoca-link
                @click="${() => {
                  this.dispatchCancelEvent();
                }}"
                text="${I18nService.getUniqueInstance().getValue("no")}"
              ></nidoca-link>
            </nidoca-flex-container>
          </nidoca-flex-container>
        </nidoca-spacer>
      </nidoca-dialog>
    `;
  }

  private dispatchDeleteEvent() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
      this,
      NidocaDecisionDialog.EVENT_OK
    );
  }

  private dispatchCancelEvent() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
      this,
      NidocaDecisionDialog.EVENT_CANCEL
    );
  }
}
