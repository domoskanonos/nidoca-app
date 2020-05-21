import { customElement, html, LitElement, property, query } from 'lit-element';

import { BasicService, I18nService } from '@domoskanonos/frontend-basis';
import {
   NidocaFormOutputData,
   NidocaForm,
   TypographyType,
   InputfieldType
} from '@domoskanonos/nidoca-core';

@customElement('nidoca-change-password')
export class NidocaChangePassword extends LitElement {

   static EVENT_CHANGE_PASSWORD: string = 'nidoca-eventchange-password';

   @property()
   changePasswordPath: string = '';

   @property()
   errorMessage: string = '';

   @query('#change-password-form')
   formComponent: NidocaForm | undefined;

   @query('#current-password-inputfield')
   currentPasswordInputField: HTMLInputElement | undefined;

   @query('#new-password-inputfield')
   newPasswordInputField: HTMLInputElement | undefined;

   @query('#repeat-new-password-inputfield')
   repeatNewPasswordInputField: HTMLInputElement | undefined;

   render() {
      return html`
         <nidoca-form id="change-password-form">
            <nidoca-typography
               slot="header"
               .typographyType="${TypographyType.H4}"
               >${I18nService.getUniqueInstance().getValue(
                  'component_change_password'
               )}</nidoca-typography
            >
            <nidoca-inputfield
               id="current-password-inputfield"
               .inputfieldType="${InputfieldType.PASSWORD}"
               label="${I18nService.getUniqueInstance().getValue(
                  'component_change_password_current_password'
               )}"
               trailingIcon="vpn_key"
               required="true"
               name="passwordCurrent"
            ></nidoca-inputfield>
            <nidoca-inputfield
               id="new-password-inputfield"
               .inputfieldType="${InputfieldType.PASSWORD}"
               label="${I18nService.getUniqueInstance().getValue(
                  'component_change_password_new_password'
               )}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="passwordNew"
            ></nidoca-inputfield>
            <nidoca-inputfield
               id="repeat-new-password-inputfield"
               .inputfieldType="${InputfieldType.PASSWORD}"
               label="${I18nService.getUniqueInstance().getValue(
                  'component_change_password_repeat_new_password'
               )}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="passwordNewRepeat"
            ></nidoca-inputfield>
            <nidoca-button
               text="${I18nService.getUniqueInstance().getValue(
                  'component_change_password_submit'
               )}"
               @click="${() => this.changePassword()}"
            ></nidoca-button>

            <nidoca-typography
               slot="errorMessages"
               .typographyType="${TypographyType.OVERLINE}"
               text="${this.errorMessage}"
            ></nidoca-typography>
         </nidoca-form>
      `;
   }

   private changePassword() {
      this.errorMessage = '';
      if (
         this.newPasswordInputField?.value !=
         this.repeatNewPasswordInputField?.value
      ) {
         this.errorMessage = I18nService.getUniqueInstance().getValue(
            'component_change_password_error_samepasswordcheck'
         );
      } else if (
         this.currentPasswordInputField?.value ==
         this.newPasswordInputField?.value
      ) {
         this.errorMessage = I18nService.getUniqueInstance().getValue(
            'component_change_password_error_samepasswordcheck_current_new'
         );
      } else if (this.formComponent != null && this.formComponent.isValid()) {
         BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
            this,
            NidocaChangePassword.EVENT_CHANGE_PASSWORD,
            this.formComponent != undefined
               ? this.formComponent.getOutputData()
               : NidocaFormOutputData.prototype
         );
      }
   }
}
