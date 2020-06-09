import {html, LitElement, query, TemplateResult, property, PropertyValues} from 'lit-element';
import {RouterService} from '@domoskanonos/frontend-basis';
import {NidocaForm} from '@domoskanonos/nidoca-core';
import {I18nService} from '@domoskanonos/frontend-basis/lib';

export abstract class NidocaAbstractComponentEdit<T> extends LitElement {

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.identifier = RouterService.getUniqueInstance().getStateProperty('id');
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
  dialogDeleteTitle: string = I18nService.getUniqueInstance().getValue('component_edit_dialog_delete_title');

  @property()
  dialogDeleteDescription: string = I18nService.getUniqueInstance().getValue('component_edit_dialog_delete_description');

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
        @decision-dialog-component-ok-event="${() => this.deleteItemHideDialog()}"
        @decision-dialog-component-cancel-event="${() => (this.showDeleteDialog = false)}"
        title="${this.dialogDeleteTitle}"
        description="${this.dialogDeleteDescription}"
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
