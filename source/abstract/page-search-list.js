"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
const lit_element_1 = require("lit-element");
const nidoca_core_1 = require("@domoskanonos/nidoca-core");
const template_app_1 = require("./template-app");
class NidocaAbstractPageSearchList extends template_app_1.NidocaAppTemplate {
    constructor(searchList) {
        super();
        this.searchList = searchList;
        this.resultSize = 0;
        this.selectionMode = false;
        this.showDeleteDialog = false;
        this.navigationTitle = this.getNavigationTitle();
    }
    getMainComponent() {
        return lit_element_1.html `
         <span>
            <span
               @nidoca-event-search-list-delete-items-successful="${() => (this.showDeleteDialog = false)}"
               @nidoca-event-search-list-run-search-successful="${() => {
            this.resultSize = this.searchList.result.length;
        }}"
               >${this.searchList}
            </span>
            <decision-dialog-component
               @decision-dialog-component-ok-event="${() => this.deleteSelected()}"
               @decision-dialog-component-cancel-event="${() => (this.showDeleteDialog = false)}"
               title="TITLE"
               description="Description"
               .showDialog="${this.showDeleteDialog}"
            ></decision-dialog-component>
         </span>
      `;
    }
    getTopRightComponent() {
        return lit_element_1.html `
         <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.resultSize > 1
            ? nidoca_core_1.VisibleType.NORMAL
            : nidoca_core_1.VisibleType.HIDE}"
         >
         <nidoca-icon
            icon="${this.selectionMode ? 'close' : 'playlist_add_check'}"
            clickable="true"
            title="${frontend_basis_1.I18nService.getUniqueInstance().getValue('select_items')}"
            @nidoca-event-icon-clicked="${() => this.switchSelectionMode()}"
         ></nidoca-icon>
         
         </nidoca-visible>
         <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.selectionMode
            ? nidoca_core_1.VisibleType.NORMAL
            : nidoca_core_1.VisibleType.HIDE}"
         >
            <nidoca-icon
               icon="delete"
               clickable="true"
               title="${frontend_basis_1.I18nService.getUniqueInstance().getValue('delete')}"
               @nidoca-event-icon-clicked="${() => (this.showDeleteDialog = true)}"
            ></nidoca-icon
         ></nidoca-visible>
         <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.selectionMode
            ? nidoca_core_1.VisibleType.HIDE
            : nidoca_core_1.VisibleType.NORMAL}"
         >
            <nidoca-icon
               icon="add"
               clickable="true"
               title="${this.getAddTitle()}"
               @nidoca-event-icon-clicked="${() => frontend_basis_1.RouterService.getUniqueInstance().navigate(this.getEditPageUrl())}"
            ></nidoca-icon
         ></nidoca-visible>
      `;
    }
    switchSelectionMode() {
        this.searchList.switchSelectionMode();
        let value = Boolean(this.searchList.listComponent != null &&
            !this.searchList.listComponent.selectionMode);
        this.changeSelectionMode(value);
    }
    changeSelectionMode(value) {
        if (this.searchList.listComponent != null) {
            this.searchList.listComponent.selectionMode = value;
            this.selectionMode = this.searchList.listComponent.selectionMode;
        }
    }
    deleteSelected() {
        this.searchList.deleteSelection();
    }
}
__decorate([
    lit_element_1.property()
], NidocaAbstractPageSearchList.prototype, "resultSize", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractPageSearchList.prototype, "selectionMode", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractPageSearchList.prototype, "showDeleteDialog", void 0);
exports.NidocaAbstractPageSearchList = NidocaAbstractPageSearchList;
//# sourceMappingURL=page-search-list.js.map