"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
class NidocaAppTemplate extends nidoca_core_1.NidocaTemplate {
    constructor() {
        super(...arguments);
        this.isAuthenticated = frontend_basis_1.SecureService.getUniqueInstance().isAuthenticated();
        this.navigationTitle = '';
    }
    getTopContent() {
        return lit_element_1.html `
         <nidoca-top-app-bar>
            ${this.getTopLeftComponent()} ${this.getTopMainComponent()}
            ${this.getTopRightComponent()}
         </nidoca-top-app-bar>
      `;
    }
    getTopLeftComponent() {
        return lit_element_1.html `
         <nidoca-icon
            title="${frontend_basis_1.I18nService.getUniqueInstance().getValue('menu')}"
            slot="leftComponents"
            icon="menu"
            clickable="true"
         ></nidoca-icon>
         <nidoca-typography
            slot="leftComponents"
            .typographyType="${nidoca_core_1.TypographyType.BODY1}"
            >${this.navigationTitle}</nidoca-typography
         >
      `;
    }
    getTopMainComponent() {
        return lit_element_1.html ``;
    }
    getTopRightComponent() {
        return lit_element_1.html ``;
    }
}
__decorate([
    lit_element_1.property()
], NidocaAppTemplate.prototype, "isAuthenticated", void 0);
__decorate([
    lit_element_1.property()
], NidocaAppTemplate.prototype, "navigationTitle", void 0);
exports.NidocaAppTemplate = NidocaAppTemplate;
//# sourceMappingURL=template-app.js.map