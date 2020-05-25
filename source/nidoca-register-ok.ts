import {customElement, html, LitElement, property} from 'lit-element';
import {I18nService} from '@domoskanonos/frontend-basis';
import {BasicService} from '@domoskanonos/frontend-basis';
import {KeyValueData, InputfieldType} from '@domoskanonos/nidoca-core';
import {RouterService} from '@domoskanonos/frontend-basis/lib';
import {
  FlexAlignItems,
  FlexContainerProperties,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap,
  GridAlignItems,
  GridJustifyItems,
  SpacerAlignment,
  SpacerSize,
  TransitionType,
  TypographyType,
} from '@domoskanonos/nidoca-core/lib';

@customElement('nidoca-register-ok')
export class NidocaRegisterOK extends LitElement {
  render() {
    return html`
      <nidoca-transition .transitionType="${TransitionType.CENTER}">
        <nidoca-grid-container
          .gridJustifyItems="${GridJustifyItems.CENTER}"
          .gridAlignItems="${GridAlignItems.CENTER}"
          .gridTemplateRows="${['1fr']}"
          .gridTemplateColumns="${['1fr']}"
          height="100vh"
        >
          <nidoca-flex-container
            style="width: 400px;"
            .flexContainerProperties="${[
              FlexContainerProperties.CONTAINER_WIDTH_100,
              FlexContainerProperties.SMARTPHONE_MAX_WIDTH,
              FlexContainerProperties.SMARTPHONE_HORIZONTAL_PADDING,
            ]}"
            flexItemBasisValue="auto"
            .flexDirection="${FlexDirection.COLUMN}"
            .flexWrap="${FlexWrap.NO_WRAP}"
            .flexJustifyContent="${FlexJustifyContent.SPACE_AROUND}"
            .flexAlignItems="${FlexAlignItems.STRETCH}"
          >
            <nidoca-icon
              color="var(--app-color-primary-background)"
              size="128"
              icon="how_to_reg"
              .withIconSpace="${false}"
            ></nidoca-icon>
            <nidoca-spacer
              style="text-align:center;"
              spacerSize="${SpacerSize.MEDIUM}"
              .spacerAlignment="${SpacerAlignment.VERTICAL}"
            >
              <nidoca-typography .typographyType="${TypographyType.H4}"
                >${I18nService.getUniqueInstance().getValue('nidoca-register-ok-header')}</nidoca-typography
              >

              <nidoca-typography .typographyType="${TypographyType.BODY1}"
                >${I18nService.getUniqueInstance().getValue('nidoca-register-ok-description')}</nidoca-typography
              >
            </nidoca-spacer>

            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue('nidoca-register-ok-back-to-main-page-button')}"
              @click="${() => RouterService.getUniqueInstance().navigate('')}"
            ></nidoca-button>
          </nidoca-flex-container>
        </nidoca-grid-container>
      </nidoca-transition>
    `;
  }
}
