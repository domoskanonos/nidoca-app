import { customElement, html, LitElement, property, query } from 'lit-element';
import {
   NidocaForm,
   TypographyType,
   InputfieldType,
   NidocaFormOutputData
} from '@domoskanonos/nidoca-core';
import { BasicService, I18nService } from '@domoskanonos/frontend-basis';

@customElement('nidoca-reset-password')
export class NidocaResetPassword extends LitElement {

   static EVENT_RESET_PASSWORD: string = 'nidoca-eventreset-password-event';

   @property()
   changePasswordPath: string = '';

   @query('#reset-password-form')
   formComponent: NidocaForm | undefined;

   render() {
      return html`
         <nidoca-form id="reset-password-form">
            <nidoca-typography .typographyType="${TypographyType.H4}"
               >${I18nService.getUniqueInstance().getValue(
                  'component_reset_password_header'
               )}</nidoca-typography
            >
            <slot></slot>
            <nidoca-inputfield
               .inputfieldType="${InputfieldType.EMAIL}"
               label="${I18nService.getUniqueInstance().getValue(
                  'component_reset_password_email'
               )}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="email"
            ></nidoca-inputfield>
            <nidoca-button
               text="${I18nService.getUniqueInstance().getValue(
                  'component_reset_password_submit'
               )}"
               @click="${() => this.resetPassword()}"
            ></nidoca-button>
         </nidoca-form>
      `;
   }

   private resetPassword() {
      if (this.formComponent?.validate()) {
         BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
            this,
            NidocaResetPassword.EVENT_RESET_PASSWORD,
            this.formComponent != undefined
               ? this.formComponent.getOutputData()
               : NidocaFormOutputData.prototype
         );
      }
   }
}
