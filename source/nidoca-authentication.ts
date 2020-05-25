import { customElement, html, LitElement, property, query } from "lit-element";
import { BasicService, I18nService } from "@domoskanonos/frontend-basis";
import {
  NidocaForm,
  TypographyType,
  InputfieldType,
  NidocaFormOutputData,
  SpacerAlignment,
  SpacerSize,
  TargetType,
} from "@domoskanonos/nidoca-core";

@customElement("nidoca-authentication")
export class NidocaAuthentication extends LitElement {
  @property()
  username: string | null = localStorage.getItem(
    "nidoca-local-storage-authentication-username-value"
  );

  @property()
  hrefResetPassword: string = "";

  @property()
  hrefRegister: string = "";

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
            <nidoca-inputfield
              name="username"
              .inputfieldType="${InputfieldType.EMAIL}"
              .value="${this.username}"
              label="${I18nService.getUniqueInstance().getValue(
                "nidoca-authentication-username-label"
              )}"
              trailingIcon="account_circle"
              required="true"
            ></nidoca-inputfield>
            <nidoca-inputfield
              .inputfieldType="${InputfieldType.PASSWORD}"
              label="${I18nService.getUniqueInstance().getValue(
                "nidoca-authentication-password-label"
              )}"
              name="password"
              trailingIcon="vpn_key"
              required="true"
            ></nidoca-inputfield>
            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue(
                "nidoca-authentication-login-button"
              )}"
              @nidoca-event-button-clicked="${() => this.login()}"
            ></nidoca-button>
            <nidoca-typography
              slot="errorMessages"
              .typographyType="${TypographyType.OVERLINE}"
              text="${this.errorMessage}"
            ></nidoca-typography>
          </nidoca-form>

          <nidoca-spacer
            spacerSize="${SpacerSize.SMALL}"
            .spacerAlignment="${SpacerAlignment.VERTICAL}"
          >
          </nidoca-spacer>
          <nidoca-typography
            .typographyType="${TypographyType.BODY1}"
            text="${I18nService.getUniqueInstance().getValue(
              "nidoca-authentication-password-lost-text"
            )}"
          ></nidoca-typography>
          <nidoca-link
            href="${this.hrefResetPassword}"
            .targetType="${TargetType.SELF}"
            >${I18nService.getUniqueInstance().getValue(
              "nidoca-authentication-password-lost-link"
            )}</nidoca-link
          >
          <nidoca-spacer
            spacerSize="${SpacerSize.SMALL}"
            .spacerAlignment="${SpacerAlignment.VERTICAL}"
          ></nidoca-spacer>
          <nidoca-typography
            .typographyType="${TypographyType.BODY1}"
            text="${I18nService.getUniqueInstance().getValue(
              "nidoca-authentication-register-text"
            )}"
          ></nidoca-typography>
          <nidoca-link
            href="${this.hrefRegister}"
            .targetType="${TargetType.SELF}"
            >${I18nService.getUniqueInstance().getValue(
              "nidoca-authentication-register-link"
            )}</nidoca-link
          >
        `
      : html`
          <nidoca-form id="logout-form">
            <nidoca-button
              text="${I18nService.getUniqueInstance().getValue(
                "nidoca-authentication-logout-button"
              )}"
              @click="${() => this.logout()}"
            ></nidoca-button>
          </nidoca-form>
        `;
  }

  private login() {
    if (this.formComponent != null && this.formComponent.validate()) {
      let outputData = <NidocaFormOutputData>this.formComponent.getOutputData();
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
        this,
        "nidoca-event-authentication-login",
        outputData
      );
      localStorage.setItem(
        "nidoca-local-storage-authentication-username-value",
        outputData.jsonObject.username
      );
    }
  }

  private logout() {
    BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
      this,
      "nidoca-event-authentication-logout"
    );
  }
}
