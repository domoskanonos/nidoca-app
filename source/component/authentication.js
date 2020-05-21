"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaAuthentication_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
let NidocaAuthentication = NidocaAuthentication_1 = class NidocaAuthentication extends lit_element_1.LitElement {
    constructor() {
        super();
        this.isAuthenticated = false;
        this.errorMessage = '';
    }
    render() {
        return !this.isAuthenticated
            ? lit_element_1.html `
              <nidoca-form id="authenitcate-form">
                 <nidoca-typography .typographyType="${nidoca_core_1.TypographyType.H4}"
                    >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_header')}</nidoca-typography
                 >
                 <nidoca-inputfield
                    name="username"
                    .inputfieldType="${nidoca_core_1.InputfieldType.EMAIL}"
                    label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_username')}"
                    trailingIcon="account_circle"
                    required="true"
                 ></nidoca-inputfield>
                 <nidoca-inputfield
                    .inputfieldType="${nidoca_core_1.InputfieldType.PASSWORD}"
                    label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_password')}"
                    name="password"
                    trailingIcon="vpn_key"
                    required="true"
                 ></nidoca-inputfield>
                 <nidoca-button
                    text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_login')}"
                    @nidoca-event-button-clicked="${() => this.login()}"
                 ></nidoca-button>
                 <nidoca-typography
                    slot="errorMessages"
                    .typographyType="${nidoca_core_1.TypographyType.OVERLINE}"
                    text="${this.errorMessage}"
                 ></nidoca-typography>
              </nidoca-form>

              <nidoca-typography
                 .typographyType="${nidoca_core_1.TypographyType.BODY1}"
                 text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_password_lost')}"
              ></nidoca-typography>
              <nidoca-link href="#reset_password" target="_self"
                 >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_password_lost_link')}</nidoca-link
              >
              <nidoca-typography
                 .typographyType="${nidoca_core_1.TypographyType.BODY1}"
                 text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_register')}"
              ></nidoca-typography>
              <nidoca-link href="#register" target="_self"
                 >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_register_link')}</nidoca-link
              >
           `
            : lit_element_1.html `
              <nidoca-form id="logout-form">
                 <nidoca-typography .typographyType="${nidoca_core_1.TypographyType.H4}"
                    >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_header_logout')}</nidoca-typography
                 >
                 <nidoca-button
                    text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_authentication_logout')}"
                    @click="${() => this.logout()}"
                 ></nidoca-button>
              </nidoca-form>
           `;
    }
    login() {
        if (this.formComponent != null && this.formComponent.validate()) {
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaAuthentication_1.EVENT_AUTHENTICATION_LOGIN, this.getOutputData());
        }
    }
    logout() {
        frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaAuthentication_1.EVENT_AUTHENTICATION_LOGOUT, this.getOutputData());
    }
    getOutputData() {
        return this.formComponent != undefined
            ? this.formComponent.getOutputData()
            : nidoca_core_1.NidocaFormOutputData.prototype;
    }
};
NidocaAuthentication.EVENT_AUTHENTICATION_LOGIN = 'nidoca-event-authentication-event-login';
NidocaAuthentication.EVENT_AUTHENTICATION_LOGOUT = 'nidoca-event-authentication-event-logout';
__decorate([
    lit_element_1.query('#authenitcate-form')
], NidocaAuthentication.prototype, "formComponent", void 0);
__decorate([
    lit_element_1.property()
], NidocaAuthentication.prototype, "isAuthenticated", void 0);
__decorate([
    lit_element_1.property()
], NidocaAuthentication.prototype, "errorMessage", void 0);
NidocaAuthentication = NidocaAuthentication_1 = __decorate([
    lit_element_1.customElement('nidoca-authentication')
], NidocaAuthentication);
exports.NidocaAuthentication = NidocaAuthentication;
//# sourceMappingURL=authentication.js.map