import { html, property, TemplateResult } from "lit-element";
import { I18nService, SecureService } from "@domoskanonos/frontend-basis";
import { TypographyType, NidocaTemplate } from "@domoskanonos/nidoca-core";

export abstract class NidocaAppTemplate extends NidocaTemplate {
  @property()
  isAuthenticated: boolean = SecureService.getUniqueInstance().isAuthenticated();

  @property()
  navigationTitle: string = "";

  getTopContent(): TemplateResult {
    return html`
      <nidoca-top-app-bar>
        ${this.getTopLeftComponent()} ${this.getTopMainComponent()}
        ${this.getTopRightComponent()}
      </nidoca-top-app-bar>
    `;
  }

  getTopLeftComponent(): TemplateResult {
    return html`
      <nidoca-icon
        title="${I18nService.getUniqueInstance().getValue("menu")}"
        slot="leftComponents"
        icon="menu"
        clickable="true"
      ></nidoca-icon>
      <nidoca-typography
        slot="leftComponents"
        .typographyType="${TypographyType.BODY1}"
        >${this.navigationTitle}</nidoca-typography
      >
    `;
  }

  getTopMainComponent(): TemplateResult {
    return html``;
  }

  getTopRightComponent(): TemplateResult {
    return html``;
  }

  abstract getLeftNavigationContent(): TemplateResult;
}
