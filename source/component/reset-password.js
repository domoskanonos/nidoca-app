"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaResetPassword_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
let NidocaResetPassword = NidocaResetPassword_1 = class NidocaResetPassword extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.changePasswordPath = '';
    }
    render() {
        return lit_element_1.html `
         <nidoca-form id="reset-password-form">
            <nidoca-typography .typographyType="${nidoca_core_1.TypographyType.H4}"
               >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_reset_password_header')}</nidoca-typography
            >
            <slot></slot>
            <nidoca-inputfield
               .inputfieldType="${nidoca_core_1.InputfieldType.EMAIL}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_reset_password_email')}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="email"
            ></nidoca-inputfield>
            <nidoca-button
               text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_reset_password_submit')}"
               @click="${() => this.resetPassword()}"
            ></nidoca-button>
         </nidoca-form>
      `;
    }
    resetPassword() {
        var _a;
        if ((_a = this.formComponent) === null || _a === void 0 ? void 0 : _a.validate()) {
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaResetPassword_1.EVENT_RESET_PASSWORD, this.formComponent != undefined
                ? this.formComponent.getOutputData()
                : nidoca_core_1.NidocaFormOutputData.prototype);
        }
    }
};
NidocaResetPassword.EVENT_RESET_PASSWORD = 'nidoca-eventreset-password-event';
__decorate([
    lit_element_1.property()
], NidocaResetPassword.prototype, "changePasswordPath", void 0);
__decorate([
    lit_element_1.query('#reset-password-form')
], NidocaResetPassword.prototype, "formComponent", void 0);
NidocaResetPassword = NidocaResetPassword_1 = __decorate([
    lit_element_1.customElement('nidoca-reset-password')
], NidocaResetPassword);
exports.NidocaResetPassword = NidocaResetPassword;
//# sourceMappingURL=reset-password.js.map