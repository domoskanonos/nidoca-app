import { customElement, html, LitElement, property, query } from "lit-element";
import {
  NidocaForm,
  TypographyType,
  InputfieldType,
} from "@domoskanonos/nidoca-core";
import { BasicService, I18nService } from "@domoskanonos/frontend-basis";
import {
  InputfieldMode,
  SpacerAlignment,
  SpacerSize,
  TargetType,
  TypographyAlignment,
  VisibleType,
} from "@domoskanonos/nidoca-core/lib";

@customElement("nidoca-register")
export class NidocaRegister extends LitElement {
  @property()
  errorMessage: string = "";

  @property()
  hrefTermsOfUse: string = "";

  @property()
  hrefLogin: string = "";

  @query("#email")
  emailInputField: HTMLInputElement | undefined;

  @query("#repeat-email")
  repeatEmailInputField: HTMLInputElement | undefined;

  @query("#register-form")
  formComponent: NidocaForm | undefined;

  render() {
    return html`
      <nidoca-form id="register-form">
        <nidoca-inputfield
          id="email"
          name="email"
          .inputfieldType="${InputfieldType.EMAIL}"
          label="${I18nService.getUniqueInstance().getValue(
            "nidoca-register-email"
          )}"
          trailingIcon="mail"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          id="repeat-email"
          name="repeatEmail"
          .inputfieldType="${InputfieldType.EMAIL}"
          label="${I18nService.getUniqueInstance().getValue(
            "nidoca-register-repeat-email"
          )}"
          trailingIcon="mail"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          .inputfieldType="${InputfieldType.PASSWORD}"
          label="${I18nService.getUniqueInstance().getValue(
            "nidoca-register-password"
          )}"
          name="password"
          trailingIcon="vpn_key"
          minlength="8"
          required="true"
        ></nidoca-inputfield>
        <nidoca-inputfield
          .inputfieldMode="${InputfieldMode.CLEAN}"
          .inputfieldType="${InputfieldType.SWITCH}"
          label="${I18nService.getUniqueInstance().getValue(
            "nidoca-register-accept-terms-of-use"
          )}"
          name="acceptTermsOfUse"
          required="true"
          ><nidoca-typography
            .typographyType="${TypographyType.BODY1}"
            .typographyAlignment="${TypographyAlignment.LEFT}"
          >
            ${I18nService.getUniqueInstance().getValue(
              "nidoca-register-terms-of-use-text"
            )}
            <nidoca-link
              href="${this.hrefTermsOfUse}"
              .targetType="${TargetType.BLANK}"
              >${I18nService.getUniqueInstance().getValue(
                "nidoca-register-terms-of-use-link"
              )}</nidoca-link
            >
          </nidoca-typography></nidoca-inputfield
        >
        <nidoca-button
          text="${I18nService.getUniqueInstance().getValue(
            "nidoca-register-submit"
          )}"
          @nidoca-event-button-clicked="${() => this.register()}"
        ></nidoca-button>

        <nidoca-visible
          slot="errorMessages"
          visibleType="${BasicService.getUniqueInstance().isNotBlank(
            this.errorMessage
          )
            ? VisibleType.NORMAL
            : VisibleType.HIDE}"
        >
          <nidoca-spacer
            spacerSize="${SpacerSize.MEDIUM}"
            .spacerAlignment="${SpacerAlignment.VERTICAL}"
          >
            <nidoca-typography
              .typographyType="${TypographyType.OVERLINE}"
              text="${this.errorMessage}"
            ></nidoca-typography>
          </nidoca-spacer>
        </nidoca-visible>
      </nidoca-form>
      <nidoca-spacer
        spacerSize="${SpacerSize.MEDIUM}"
        .spacerAlignment="${SpacerAlignment.VERTICAL}"
      >
        <nidoca-typography .typographyType="${TypographyType.BODY1}">
          ${I18nService.getUniqueInstance().getValue(
            "nidoca-register-already-have-an-account-text"
          )}
          <nidoca-link href="${this.hrefLogin}" .targetType="${TargetType.SELF}"
            >${I18nService.getUniqueInstance().getValue(
              "nidoca-register-already-have-an-account-link"
            )}</nidoca-link
          >
        </nidoca-typography>
      </nidoca-spacer>
    `;
  }

  private register() {
    this.errorMessage = "";
    if (this.emailInputField?.value != this.repeatEmailInputField?.value) {
      this.errorMessage = I18nService.getUniqueInstance().getValue(
        "nidoca-register-error-same-email-check"
      );
    } else if (this.formComponent?.validate()) {
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
        this,
        "nidoca-event-register-submit",
        this.formComponent.getOutputData()
      );
    }
  }
}
