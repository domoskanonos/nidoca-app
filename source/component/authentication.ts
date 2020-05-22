import { customElement, html, LitElement, property, query } from "lit-element";
import {
  NidocaForm,
  TypographyType,
  InputfieldType,
  NidocaFormOutputData
} from "@domoskanonos/nidoca-core";
import { BasicService, I18nService } from "@domoskanonos/frontend-basis";

@customElement("nidoca-authentication")
export class NidocaAuthentication extends LitElement {
  static EVENT_AUTHENTICATION_LOGIN: string =
    "nidoca-event-authentication-event-login";

  static EVENT_AUTHENTICATION_LOGOUT: string =
    "nidoca-event-authentication-event-logout";

  constructor() {
    super();
  }

  @query("#authenitcate-form")
  formComponent: NidocaForm | undefined;

  @property()
  isAuthenticated: boolean = false;

  @property()
  errorMessage: string = "";

  render() {
    return !this.isAuthenticated
      ? html`
          <nidoca-form id="authenitcate-form">
            <nidoca-typography .typographyType="${TypographyType.H4}"
              >${I18nService.getUniqueInstance().getValue(
                "component_authentication_header"
              )}</nidoca-typography
            >
            <nidoca-inputfield
              name="username"
              .inputfieldType="${InputfieldType.EMAIL}"
              label="${I18nService.getUniqueInstance().getValue(
                "component_authentication_username"
              )}"
              trailingIcon="account_circle"
              required="true"
            ></nidoca-inputfield>
            <nidoca-inputfield
              .inputfieldType="${InputfieldType.PASSWORD}"
              label="${I18nService.getUniqueInstance().getValue(
                "component_authentication_password"
              )}"
              name="password"
              trailingIcon="vpn_key"
              required="true"
            ></nidoca-inputfield>
            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue(
                "component_authentication_login"
              )}"
              @nidoca-event-button-clicked="${() => this.login()}"
            ></nidoca-button>
            <nidoca-typography
              slot="errorMessages"
              .typographyType="${TypographyType.OVERLINE}"
              text="${this.errorMessage}"
            ></nidoca-typography>
          </nidoca-form>

          <nidoca-typography
            .typographyType="${TypographyType.BODY1}"
            text="${I18nService.getUniqueInstance().getValue(
              "component_authentication_password_lost"
            )}"
          ></nidoca-typography>
          <nidoca-link href="#reset_password" target="_self"
            >${I18nService.getUniqueInstance().getValue(
              "component_authentication_password_lost_link"
            )}</nidoca-link
          >
          <nidoca-typography
            .typographyType="${TypographyType.BODY1}"
            text="${I18nService.getUniqueInstance().getValue(
              "component_authentication_register"
            )}"
          ></nidoca-typography>
          <nidoca-link href="#register" target="_self"
            >${I18nService.getUniqueInstance().getValue(
              "component_authentication_register_link"
            )}</nidoca-link
          >
        `
      : html`
          <nidoca-form id="logout-form">
            <nidoca-typography .typographyType="${TypographyType.H4}"
              >${I18nService.getUniqueInstance().getValue(
                "component_authentication_header_logout"
              )}</nidoca-typography
            >
            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue(
                "component_authentication_logout"
              )}"
              @click="${() => this.logout()}"
            ></nidoca-button>
          </nidoca-form>
        `;
  }

  private login() {
    if (this.formComponent != null && this.formComponent.validate()) {
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
        this,
        NidocaAuthentication.EVENT_AUTHENTICATION_LOGIN,
        this.getOutputData()
      );
    }
  }

  private logout() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
      this,
      NidocaAuthentication.EVENT_AUTHENTICATION_LOGOUT,
      this.getOutputData()
    );
  }

  getOutputData(): NidocaFormOutputData {
    return this.formComponent != undefined
      ? this.formComponent.getOutputData()
      : NidocaFormOutputData.prototype;
  }
}
