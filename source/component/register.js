"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaRegister_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
let NidocaRegister = NidocaRegister_1 = class NidocaRegister extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.errorMessage = '';
    }
    render() {
        return lit_element_1.html `
         <nidoca-form id="register-form">
            <nidoca-typography .typographyType="${nidoca_core_1.TypographyType.H4}"
               >${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_header')}</nidoca-typography
            >
            <nidoca-inputfield
               id="email"
               name="email"
               .inputfieldType="${nidoca_core_1.InputfieldType.EMAIL}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_email')}"
               trailingIcon="mail"
               required="true"
            ></nidoca-inputfield>
            <nidoca-inputfield
               id="repeat-email"
               name="repeatEmail"
               .inputfieldType="${nidoca_core_1.InputfieldType.EMAIL}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_repeat_email')}"
               trailingIcon="mail"
               required="true"
            ></nidoca-inputfield>
            <nidoca-inputfield
               .inputfieldType="${nidoca_core_1.InputfieldType.PASSWORD}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_password')}"
               name="password"
               trailingIcon="vpn_key"
               minlength="8"
               required="true"
            ></nidoca-inputfield>
            <nidoca-inputfield
               .inputfieldType="${nidoca_core_1.InputfieldType.CHECKBOX}"
               label="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_accept_terms_of_use')}"
               name="acceptTermsOfUse"
               minlength="8"
               required="true"
            ></nidoca-inputfield>
            <nidoca-button
               text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_submit')}"
               @nidoca-event-button-clicked="${() => this.register()}"
            ></nidoca-button>

            <nidoca-typography
               slot="errorMessages"
               .typographyType="${nidoca_core_1.TypographyType.OVERLINE}"
               text="${this.errorMessage}"
            ></nidoca-typography>
         </nidoca-form>
      `;
    }
    register() {
        var _a, _b, _c;
        if (((_a = this.emailInputField) === null || _a === void 0 ? void 0 : _a.value) != ((_b = this.repeatEmailInputField) === null || _b === void 0 ? void 0 : _b.value)) {
            this.errorMessage = frontend_basis_1.I18nService.getUniqueInstance().getValue('component_register_error_same_email_check');
        }
        else if ((_c = this.formComponent) === null || _c === void 0 ? void 0 : _c.validate()) {
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaRegister_1.EVENT_SUBMIT, this.getOutputData());
        }
    }
    getOutputData() {
        var _a;
        if ((_a = this.formComponent) === null || _a === void 0 ? void 0 : _a.isValid()) {
            let formOutputData = this.formComponent.getOutputData();
            return formOutputData;
        }
        return nidoca_core_1.NidocaFormOutputData.prototype;
    }
};
NidocaRegister.EVENT_SUBMIT = 'nidoca-register-submit';
__decorate([
    lit_element_1.property()
], NidocaRegister.prototype, "errorMessage", void 0);
__decorate([
    lit_element_1.query('#email')
], NidocaRegister.prototype, "emailInputField", void 0);
__decorate([
    lit_element_1.query('#repeat-email')
], NidocaRegister.prototype, "repeatEmailInputField", void 0);
__decorate([
    lit_element_1.query('#register-form')
], NidocaRegister.prototype, "formComponent", void 0);
NidocaRegister = NidocaRegister_1 = __decorate([
    lit_element_1.customElement('nidoca-register')
], NidocaRegister);
exports.NidocaRegister = NidocaRegister;
//# sourceMappingURL=register.js.map