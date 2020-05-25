import {customElement, html, LitElement, query} from 'lit-element';
import {NidocaForm, InputfieldType} from '@domoskanonos/nidoca-core';
import {BasicService, I18nService} from '@domoskanonos/frontend-basis';

@customElement('nidoca-reset-password')
export class NidocaResetPassword extends LitElement {
  @query('#reset-password-form')
  formComponent: NidocaForm | undefined;

  render() {
    return html`
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
      </nidoca-form>
    `;
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
