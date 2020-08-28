import {customElement, html, LitElement, property, query} from 'lit-element';
import {NidocaForm, InputfieldType} from '@domoskanonos/nidoca-core';
import {BasicService, I18nService} from '@domoskanonos/frontend-basis';
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
  VisibleType,
} from '@domoskanonos/nidoca-core/lib';

@customElement('nidoca-reset-password')
export class NidocaResetPassword extends LitElement {
  @property()
  errorMessage: string = '';

  @query('#reset-password-form')
  formComponent: NidocaForm | undefined;

  render() {
    return html` <nidoca-grid-container
      .gridJustifyItems="${GridJustifyItems.CENTER}"
      .gridAlignItems="${GridAlignItems.START}"
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
          icon="vpn_key"
          .withIconSpace="${false}"
        ></nidoca-icon>
        <nidoca-spacer
          style="text-align:center;"
          spacerSize="${SpacerSize.MEDIUM}"
          .spacerAlignment="${SpacerAlignment.VERTICAL}"
        >
          <nidoca-typography .typographyType="${TypographyType.H4}"
            >${I18nService.getUniqueInstance().getValue('nidoca-reset-password-header')}</nidoca-typography
          >
        </nidoca-spacer>
        <nidoca-form id="reset-password-form">
          <nidoca-inputfield
            .inputfieldType="${InputfieldType.EMAIL}"
            label="${I18nService.getUniqueInstance().getValue('nidoca-reset-password-email-label')}"
            trailingIcon="email"
            minlength="8"
            required="true"
            name="email"
          ></nidoca-inputfield>
          <nidoca-button
            text="${I18nService.getUniqueInstance().getValue('nidoca-reset-password-submit')}"
            @click="${() => this.resetPassword()}"
          ></nidoca-button>
          <nidoca-visible
            slot="errorMessages"
            visibleType="${BasicService.getUniqueInstance().isNotBlank(this.errorMessage)
              ? VisibleType.NORMAL
              : VisibleType.HIDE}"
          >
            <nidoca-spacer spacerSize="${SpacerSize.MEDIUM}" .spacerAlignment="${SpacerAlignment.VERTICAL}">
              <nidoca-typography
                .typographyType="${TypographyType.OVERLINE}"
                text="${this.errorMessage}"
              ></nidoca-typography>
            </nidoca-spacer>
          </nidoca-visible>
        </nidoca-form> </nidoca-flex-container
    ></nidoca-grid-container>`;
  }

  private resetPassword() {
    if (this.formComponent?.validate()) {
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
        this,
        'nidoca-event-reset-password',
        this.formComponent.getOutputData()
      );
    }
  }
}
