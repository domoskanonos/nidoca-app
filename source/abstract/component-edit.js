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
class NidocaAbstractComponentEdit extends lit_element_1.LitElement {
    constructor() {
        super();
        this.identifier = null;
        this.item = {};
        this.showDeleteDialog = false;
        this.identifier = frontend_basis_1.RouterService.getUniqueInstance().getStateProperty('id');
        if (this.identifier != null) {
            this.getItemById(this.identifier).then((item) => {
                this.item = item;
                this.itemToProperties(this.item);
            });
        }
    }
    render() {
        return lit_element_1.html `
         <nidoca-form id="form">
            ${this.renderFormFields()}
         </nidoca-form>
         <decision-dialog-component
            @decision-dialog-component-ok-event="${() => this.deleteItemHideDialog()}"
            @decision-dialog-component-cancel-event="${() => (this.showDeleteDialog = false)}"
            title="${this.getDialogDeleteTitle()}"
            description="${this.getDialogDeleteDescription()}"
            .showDialog="${this.showDeleteDialog}"
         ></decision-dialog-component>
      `;
    }
    deleteItemHideDialog() {
        if (this.identifier != null) {
            this.showDeleteDialog = false;
            this.deleteItem();
        }
    }
    deleteItem() {
        if (this.identifier != null) {
            this.executeDelete(this.identifier).then(() => {
                console.log('item deleted.');
                frontend_basis_1.RouterService.getUniqueInstance().back();
            });
        }
    }
    updateItem() {
        if (this.formComponent != null && this.formComponent.validate()) {
            this.item = this.formComponent.getOutputData().jsonObject;
            if (this.identifier != null) {
                console.log('save item, identifier {}', this.identifier);
                this.executeUpdate(this.identifier, this.item).then((item) => {
                    this.item = item;
                    frontend_basis_1.RouterService.getUniqueInstance().back();
                });
            }
        }
    }
    saveItem() {
        if (this.formComponent != null && this.formComponent.validate()) {
            this.item = this.formComponent.getOutputData().jsonObject;
            if (this.identifier == null) {
                console.log('save item, identifier {}', this.identifier);
                this.executeSave(this.item).then((item) => {
                    this.identifier = this.getIdentifier(item);
                    this.item = item;
                    frontend_basis_1.RouterService.getUniqueInstance().back();
                });
            }
        }
    }
}
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentEdit.prototype, "showDeleteDialog", void 0);
__decorate([
    lit_element_1.query('#form')
], NidocaAbstractComponentEdit.prototype, "formComponent", void 0);
exports.NidocaAbstractComponentEdit = NidocaAbstractComponentEdit;
//# sourceMappingURL=component-edit.js.map