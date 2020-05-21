import { html, LitElement, query, TemplateResult, property } from 'lit-element';
import { RouterService } from '@domoskanonos/frontend-basis';
import { NidocaForm } from '@domoskanonos/nidoca-core';

export abstract class NidocaAbstractComponentEdit<T> extends LitElement {

   constructor() {
      super();
      this.identifier = RouterService.getUniqueInstance().getStateProperty(
         'id'
      );
      if (this.identifier != null) {
         this.getItemById(this.identifier).then((item) => {
            this.item = item;
            this.itemToProperties(this.item);
         });
      }
   }

   identifier: any = null;

   item: T = <T>{};

   @property()
   showDeleteDialog: boolean = false;

   @query('#form')
   formComponent: NidocaForm | undefined;

   render() {
      return html`
         <nidoca-form id="form">
            ${this.renderFormFields()}
         </nidoca-form>
         <decision-dialog-component
            @decision-dialog-component-ok-event="${() =>
               this.deleteItemHideDialog()}"
            @decision-dialog-component-cancel-event="${() =>
               (this.showDeleteDialog = false)}"
            title="${this.getDialogDeleteTitle()}"
            description="${this.getDialogDeleteDescription()}"
            .showDialog="${this.showDeleteDialog}"
         ></decision-dialog-component>
      `;
   }

   abstract async getItemById(identifier: any): Promise<T>;

   abstract async executeSave(item: T): Promise<T>;

   abstract async executeUpdate(identifier: any, item: T): Promise<T>;

   abstract async executeDelete(identifier: any): Promise<void>;

   abstract renderFormFields(): TemplateResult;

   abstract itemToProperties(item: T): void;

   abstract getIdentifier(item: T): any;

   abstract getDialogDeleteTitle(): string;

   abstract getDialogDeleteDescription(): string;

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
            RouterService.getUniqueInstance().back();
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
               RouterService.getUniqueInstance().back();
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
               RouterService.getUniqueInstance().back();
            });
         }
      }
   }
}
