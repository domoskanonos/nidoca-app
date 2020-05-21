"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaI18NSelector_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
const frontend_basis_2 = require("@domoskanonos/frontend-basis");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
let NidocaI18NSelector = NidocaI18NSelector_1 = class NidocaI18NSelector extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.langKey = frontend_basis_1.I18nService.getUniqueInstance().getLanguage();
        this.languages = [];
    }
    render() {
        return lit_element_1.html `
         <nidoca-form>
            <nidoca-inputfield
               inputfieldType="${nidoca_core_1.InputfieldType.COMBOBOX}"
               value="${this.langKey}"
               .options="${this.languages}"
               label="${this.label}"
               @nidoca-event-inputfield-change="${(event) => this.changeLanguage(event)}"
            ></nidoca-inputfield>
         </nidoca-form>
      `;
    }
    changeLanguage(event) {
        this.langKey = event.detail.outputData.value[0];
        frontend_basis_1.I18nService.getUniqueInstance().setLanguage(this.langKey);
        frontend_basis_2.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaI18NSelector_1.EVENT_CHANGE_LANGUAGE, this.langKey);
    }
};
NidocaI18NSelector.EVENT_CHANGE_LANGUAGE = 'nidoca-i18n-selector-change-language';
__decorate([
    lit_element_1.property()
], NidocaI18NSelector.prototype, "label", void 0);
__decorate([
    lit_element_1.property()
], NidocaI18NSelector.prototype, "langKey", void 0);
__decorate([
    lit_element_1.property()
], NidocaI18NSelector.prototype, "languages", void 0);
NidocaI18NSelector = NidocaI18NSelector_1 = __decorate([
    lit_element_1.customElement('nidoca-i18n-selector')
], NidocaI18NSelector);
exports.NidocaI18NSelector = NidocaI18NSelector;
//# sourceMappingURL=i18n-selector.js.map