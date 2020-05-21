"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const repeat_1 = require("lit-html/directives/repeat");
const guard_1 = require("lit-html/directives/guard");
const frontend_basis_1 = require("@domoskanonos/frontend-basis");
class NidocaAbstractComponentSearchList extends lit_element_1.LitElement {
    constructor() {
        super();
        this.resultSize = 50;
        this.minCharacterSize = 0;
        this.clickable = true;
        this.result = [];
        this.search = '';
        this.selectionMode = false;
        this.search = frontend_basis_1.BasicService.getUniqueInstance().getValue(frontend_basis_1.RouterService.getUniqueInstance().getStateProperty('search'), '');
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.runSearch();
    }
    render() {
        return lit_element_1.html `
         <nidoca-search-bar
            @nidoca-event-inputfield-focus="${() => {
            this.resetSelection();
        }}"
            value="${this.search}"
            @nidoca-event-inputfield-keyup="${(event) => this.onKeyUp(event)}"
            @nidoca-event-icon-clicked="${(event) => this.iconClicked(event)}"
         ></nidoca-search-bar>
         <nidoca-list id="listComponent">
            ${guard_1.guard([this.selectionMode, this.result], () => lit_element_1.html `
                     ${repeat_1.repeat(this.result, (itemData, index) => lit_element_1.html `
                              <nidoca-list-item
                                 index="${index}"
                                 .selectMode="${this.selectionMode}"
                                 @nidoca-event-list-item-clicked="${() => this.clicked(itemData, index)}"
                                 >${this.renderListItem(itemData)}</nidoca-list-item
                              >
                           `)}
                  `)}
         </nidoca-list>
         ${this.result.length == 0 ? this.renderNoRecord() : lit_element_1.html ``}
      `;
    }
    onKeyUp(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = event.detail;
            this.search = data.value;
            this.runSearch();
        });
    }
    runSearch() {
        if (this.search.length >= this.minCharacterSize ||
            this.search.indexOf('*') > -1) {
            if (this.search.indexOf('*') > -1) {
                this.search = '';
            }
            console.log('run search: %s', this.search);
            this.executeSearch(this.search).then((result) => {
                this.result = result;
                frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, 'nidoca-event-search-list-run-search-successful');
            });
        }
    }
    clicked(itemData, index) {
        if (this.clickable && !this.selectionMode) {
            console.debug('list item clicked.');
            this.itemClicked(itemData, index);
        }
    }
    iconClicked(event) {
        let data = event.detail;
        if (data.icon === 'close') {
            this.search = '';
            this.runSearch();
        }
    }
    switchSelectionMode() {
        this.selectionMode = !this.selectionMode;
    }
    deleteSelection() {
        let itemsToDelete = [];
        if (this.listComponent) {
            let index = 0;
            this.listComponent.getSelectedIndexes().forEach((value) => {
                itemsToDelete.push(this.result[value]);
            });
        }
        this.deleteItems(itemsToDelete).then(() => {
            console.log('all items deleted.');
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, 'nidoca-event-search-list-delete-items-successful');
        });
    }
    resetSelection() {
        if (this.listComponent != null) {
            this.selectionMode = this.listComponent.selectionMode;
        }
    }
}
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "resultSize", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "minCharacterSize", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "clickable", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "result", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "search", void 0);
__decorate([
    lit_element_1.property()
], NidocaAbstractComponentSearchList.prototype, "selectionMode", void 0);
__decorate([
    lit_element_1.query('#listComponent')
], NidocaAbstractComponentSearchList.prototype, "listComponent", void 0);
exports.NidocaAbstractComponentSearchList = NidocaAbstractComponentSearchList;
//# sourceMappingURL=component-search-list.js.map