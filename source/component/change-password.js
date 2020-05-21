"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaChangePassword_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
let NidocaChangePassword = NidocaChangePassword_1 = class NidocaChangePassword extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.changePasswordPath = '';
        this.errorMessage = '';
    }
    render() {
        return lit_element_1.html `
         <nidoca-form id="change-password-form">
            <nidoca-typography
               slot="header"
               .typographyType="${nidoca_core_1.TypographyType.H4}"
               >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password')}</nidoca-typography
            >
            <nidoca-inputfield
               id="current-password-inputfield"
               .inputfieldType="${nidoca_core_1.InputfieldType.PASSWORD}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_current_password')}"
               trailingIcon="vpn_key"
               required="true"
               name="passwordCurrent"
            ></nidoca-inputfield>
            <nidoca-inputfield
               id="new-password-inputfield"
               .inputfieldType="${nidoca_core_1.InputfieldType.PASSWORD}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_new_password')}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="passwordNew"
            ></nidoca-inputfield>
            <nidoca-inputfield
               id="repeat-new-password-inputfield"
               .inputfieldType="${nidoca_core_1.InputfieldType.PASSWORD}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_repeat_new_password')}"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
               name="passwordNewRepeat"
            ></nidoca-inputfield>
            <nidoca-button
               text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_submit')}"
               @click="${() => this.changePassword()}"
            ></nidoca-button>

            <nidoca-typography
               slot="errorMessages"
               .typographyType="${nidoca_core_1.TypographyType.OVERLINE}"
               text="${this.errorMessage}"
            ></nidoca-typography>
         </nidoca-form>
      `;
    }
    changePassword() {
        var _a, _b, _c, _d;
        this.errorMessage = '';
        if (((_a = this.newPasswordInputField) === null || _a === void 0 ? void 0 : _a.value) != ((_b = this.repeatNewPasswordInputField) === null || _b === void 0 ? void 0 : _b.value)) {
            this.errorMessage = frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_error_samepasswordcheck');
        }
        else if (((_c = this.currentPasswordInputField) === null || _c === void 0 ? void 0 : _c.value) == ((_d = this.newPasswordInputField) === null || _d === void 0 ? void 0 : _d.value)) {
            this.errorMessage = frontend_basis_1.I18nService.getUniqueInstance().getValue('component_change_password_error_samepasswordcheck_current_new');
        }
        else if (this.formComponent != null && this.formComponent.isValid()) {
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaChangePassword_1.EVENT_CHANGE_PASSWORD, this.formComponent != undefined
                ? this.formComponent.getOutputData()
                : nidoca_core_1.NidocaFormOutputData.prototype);
        }
    }
};
NidocaChangePassword.EVENT_CHANGE_PASSWORD = 'nidoca-eventchange-password';
__decorate([
    lit_element_1.property()
], NidocaChangePassword.prototype, "changePasswordPath", void 0);
__decorate([
    lit_element_1.property()
], NidocaChangePassword.prototype, "errorMessage", void 0);
__decorate([
    lit_element_1.query('#change-password-form')
], NidocaChangePassword.prototype, "formComponent", void 0);
__decorate([
    lit_element_1.query('#current-password-inputfield')
], NidocaChangePassword.prototype, "currentPasswordInputField", void 0);
__decorate([
    lit_element_1.query('#new-password-inputfield')
], NidocaChangePassword.prototype, "newPasswordInputField", void 0);
__decorate([
    lit_element_1.query('#repeat-new-password-inputfield')
], NidocaChangePassword.prototype, "repeatNewPasswordInputField", void 0);
NidocaChangePassword = NidocaChangePassword_1 = __decorate([
    lit_element_1.customElement('nidoca-change-password')
], NidocaChangePassword);
exports.NidocaChangePassword = NidocaChangePassword;
//# sourceMappingURL=change-password.js.map