import { html, LitElement, property, query, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { RouterService, BasicService } from '@domoskanonos/frontend-basis';
import { KeyValueData, NidocaList, NidocaIcon, NidocaListItem } from '@domoskanonos/nidoca-core';

export abstract class NidocaAbstractComponentSearchList<T> extends LitElement {
   constructor() {
      super();
      this.search = BasicService.getUniqueInstance().getValue(
         RouterService.getUniqueInstance().getStateProperty('search'),
         ''
      );
   }

   @property()
   resultSize: number = 50;

   @property()
   minCharacterSize: number = 0;

   @property()
   clickable: boolean = true;

   @property()
   result: T[] = [];

   @property()
   private search: string = '';

   @property()
   selectionMode: boolean = false;

   @query('#listComponent')
   listComponent: NidocaList | undefined;

   protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
      super.firstUpdated(_changedProperties);
      this.runSearch();
   }

   render() {
      return html`
         <nidoca-search-bar
            @nidoca-event-inputfield-focus="${() => {
               this.resetSelection();
            }}"
            value="${this.search}"
            @nidoca-event-inputfield-keyup="${(event: CustomEvent) =>
               this.onKeyUp(event)}"
            @nidoca-event-icon-clicked="${(event: CustomEvent) =>
               this.iconClicked(event)}"
         ></nidoca-search-bar>
         <nidoca-list id="listComponent">
            ${guard(
               [this.selectionMode, this.result],
               () =>
                  html`
                     ${repeat(
                        this.result,
                        (itemData: T, index: number) =>
                           html`
                              <nidoca-list-item
                                 index="${index}"
                                 .selectMode="${this.selectionMode}"
                                 @nidoca-event-list-item-clicked="${() =>
                                    this.clicked(itemData, index)}"
                                 >${this.renderListItem(
                                    itemData
                                 )}</nidoca-list-item
                              >
                           `
                     )}
                  `
            )}
         </nidoca-list>
         ${this.result.length == 0 ? this.renderNoRecord() : html``}
      `;
   }

   async onKeyUp(event: CustomEvent): Promise<void> {
      let data: KeyValueData = event.detail;
      this.search = data.value;
      this.runSearch();
   }

   private runSearch(): void {
      if (
         this.search.length >= this.minCharacterSize ||
         this.search.indexOf('*') > -1
      ) {
         if (this.search.indexOf('*') > -1) {
            this.search = '';
         }
         console.log('run search: %s', this.search);
         this.executeSearch(this.search).then((result) => {
            this.result = result;
            BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
                this,
                'nidoca-event-search-list-run-search-successful'
            );
         });
      }
   }

   abstract async executeSearch(search: string): Promise<T[]>;

   abstract itemClicked(itemData: T, index: number): void;

   abstract renderListItem(item: T): TemplateResult;

   abstract renderNoRecord(): TemplateResult;

   private clicked(itemData: T, index: number) {
      if (this.clickable && !this.selectionMode) {
         console.debug('list item clicked.');
         this.itemClicked(itemData, index);
      }
   }

   private iconClicked(event: CustomEvent) {
      let data: NidocaIcon = event.detail;
      if (data.icon === 'close') {
         this.search = '';
         this.runSearch();
      }
   }

   switchSelectionMode() {
      this.selectionMode = !this.selectionMode;
   }

   abstract async deleteItems(itemsToDelete: T[]): Promise<void>;

   deleteSelection(): void {
      let itemsToDelete: T[] = [];
      if (this.listComponent) {
         let index: number = 0;
         this.listComponent.getSelectedIndexes().forEach((value: number) => {
            itemsToDelete.push(this.result[value])
         });
      }
      this.deleteItems(itemsToDelete).then(() => {
         console.log('all items deleted.');
         BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
            this,
            'nidoca-event-search-list-delete-items-successful'
         );
      });
   }

   private resetSelection() {
      if (this.listComponent != null) {
         this.selectionMode = this.listComponent.selectionMode;
      }
   }
}
