import { customElement, html, LitElement, property, query } from "lit-element";
import {
  NidocaForm,
  TypographyType,
  InputfieldType,
  NidocaFormOutputData
} from "@domoskanonos/nidoca-core";
import { BasicService, I18nService } from "@domoskanonos/frontend-basis";

@customElement("nidoca-register")
export class NidocaRegister extends LitElement {
  static EVENT_SUBMIT: string = "nidoca-register-submit";

  @property()
  errorMessage: string = "";

  @query("#email")
  emailInputField: HTMLInputElement | undefined;

  @query("#repeat-email")
  repeatEmailInputField: HTMLInputElement | undefined;

  @query("#register-form")
  formComponent: NidocaForm | undefined;

  render() {
    return html`
      <nidoca-form id="register-form">
        <nidoca-typography .typographyType="${TypographyType.H4}"
          >${I18nService.getUniqueInstance().getValue(
            "component_register_header"
          )}</nidoca-typography
        >
        <nidoca-inputfield
          id="email"
          name="email"
          .inputfieldType="${InputfieldType.EMAIL}"
          label="${I18nService.getUniqueInstance().getValue(
            "component_register_email"
          )}"
          trailingIcon="mail"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          id="repeat-email"
          name="repeatEmail"
          .inputfieldType="${InputfieldType.EMAIL}"
          label="${I18nService.getUniqueInstance().getValue(
            "component_register_repeat_email"
          )}"
          trailingIcon="mail"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          .inputfieldType="${InputfieldType.PASSWORD}"
          label="${I18nService.getUniqueInstance().getValue(
            "component_register_password"
          )}"
          name="password"
          trailingIcon="vpn_key"
          minlength="8"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          .inputfieldType="${InputfieldType.CHECKBOX}"
          label="${I18nService.getUniqueInstance().getValue(
            "component_register_accept_terms_of_use"
          )}"
          name="acceptTermsOfUse"
          minlength="8"
          required="true"
        ></nidoca-inputfield>
        <nidoca-button
          text="${I18nService.getUniqueInstance().getValue(
            "component_register_submit"
          )}"
          @nidoca-event-button-clicked="${() => this.register()}"
        ></nidoca-button>

        <nidoca-typography
          slot="errorMessages"
          .typographyType="${TypographyType.OVERLINE}"
          text="${this.errorMessage}"
        ></nidoca-typography>
      </nidoca-form>
    `;
  }

  private register() {
    if (this.emailInputField?.value != this.repeatEmailInputField?.value) {
      this.errorMessage = I18nService.getUniqueInstance().getValue(
        "component_register_error_same_email_check"
      );
    } else if (this.formComponent?.validate()) {
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
        this,
        NidocaRegister.EVENT_SUBMIT,
        this.getOutputData()
      );
    }
  }

  getOutputData(): NidocaFormOutputData {
    if (this.formComponent?.isValid()) {
      let formOutputData: NidocaFormOutputData = this.formComponent.getOutputData();
      return formOutputData;
    }
    return NidocaFormOutputData.prototype;
  }
}
