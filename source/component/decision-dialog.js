"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NidocaDecisionDialog_1;
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const component_1 = require("@domoskanonos/nidoca-core/source/flex-container/component");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
let NidocaDecisionDialog = NidocaDecisionDialog_1 = class NidocaDecisionDialog extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.showDialog = false;
        this.title = '';
        this.description = '';
    }
    render() {
        return lit_element_1.html `
         <nidoca-dialog .show="${this.showDialog}">
            
               <nidoca-spacer
                  .spacerSize="${nidoca_core_1.SpacerSize.MEDIUM}"
                  spacerAlignment="${nidoca_core_1.SpacerAlignment.BOTH}"
               >
                  <nidoca-flex-container
                     .flexContainerProperties="${[component_1.FlexContainerProperties.CONTAINER_WIDTH_100]}"
                     itemFlexBasisValue="100%"
                  >
                     <nidoca-typography
                        .typographyType="${nidoca_core_1.TypographyType.H6}"
                        text="${this.title}"
                     ></nidoca-typography>
                     <nidoca-spacer
                        .spacerSize="${nidoca_core_1.SpacerSize.SMALL}"
                        spacerAlignment="${nidoca_core_1.SpacerAlignment.VERTICAL}"
                     >
                     </nidoca-spacer>
                     <nidoca-typography
                        .typographyType="${nidoca_core_1.TypographyType.BODY1}"
                        text="${this.description}"
                     ></nidoca-typography>
                     <nidoca-spacer
                        .spacerSize="${nidoca_core_1.SpacerSize.MEDIUM}"
                        spacerAlignment="${nidoca_core_1.SpacerAlignment.VERTICAL}"
                     >
                     </nidoca-spacer>
                     <nidoca-flex-container
                        .flexContainerProperties="${[
            component_1.FlexContainerProperties.CONTAINER_WIDTH_100
        ]}"
                        .flexJustifyContent="${component_1.FlexJustifyContent.FLEX_END}"
                        itemFlexBasisValue="auto"
                     >
                        <nidoca-link
                           @click="${() => this.dispatchDeleteEvent()}"
                           text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('yes')}"
                        ></nidoca-link>
                        <nidoca-link
                           @click="${() => {
            this.dispatchCancelEvent();
        }}"
                           text="${frontend_basis_1.I18nService.getUniqueInstance().getValue('no')}"
                        ></nidoca-link>
                     </nidoca-flex-container>
                  </nidoca-flex-container>
               </nidoca-spacer>
         </nidoca-dialog>
      `;
    }
    dispatchDeleteEvent() {
        frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaDecisionDialog_1.EVENT_OK);
    }
    dispatchCancelEvent() {
        frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaDecisionDialog_1.EVENT_CANCEL);
    }
};
NidocaDecisionDialog.EVENT_OK = 'nidoca-decision-dialog-ok-event';
NidocaDecisionDialog.EVENT_CANCEL = 'nidoca-decision-dialog-cancel-event';
__decorate([
    lit_element_1.property()
], NidocaDecisionDialog.prototype, "showDialog", void 0);
__decorate([
    lit_element_1.property()
], NidocaDecisionDialog.prototype, "title", void 0);
__decorate([
    lit_element_1.property()
], NidocaDecisionDialog.prototype, "description", void 0);
NidocaDecisionDialog = NidocaDecisionDialog_1 = __decorate([
    lit_element_1.customElement('nidoca-decision-dialog')
], NidocaDecisionDialog);
exports.NidocaDecisionDialog = NidocaDecisionDialog;
//# sourceMappingURL=decision-dialog.js.map