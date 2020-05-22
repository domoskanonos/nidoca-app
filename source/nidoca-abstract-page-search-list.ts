import { I18nService, RouterService } from "@domoskanonos/frontend-basis";
import { html, LitElement, property, TemplateResult } from "lit-element";

import {
  VisibleType,
  NidocaTemplate,
  TypographyType
} from "@domoskanonos/nidoca-core";
import { NidocaAbstractComponentSearchList } from "./nidoca-abstract-component-search-list";
import { BorderProperties } from "@domoskanonos/nidoca-core";

export abstract class NidocaAbstractPageSearchList extends LitElement {
  @property()
  navigationTitle: string = "";

  @property()
  resultSize: number = 0;

  @property()
  selectionMode: boolean = false;

  @property()
  showDeleteDialog: boolean = false;

  protected constructor(
    private searchList: NidocaAbstractComponentSearchList<any>
  ) {
    super();
    this.navigationTitle = this.getNavigationTitle();
  }

  abstract getNavigationTitle(): string;

  abstract getAddTitle(): string;

  abstract getEditPageUrl(): string;

  render() {
    return html`
      <nidoca-border .borderProperties="${[BorderProperties.BOTTOM]}">
        <nidoca-top-app-bar
          style="color: var(--app-color-primary);background-color: var(--app-color-primary-background);"
        >
          <nidoca-icon
            slot="leftComponents"
            icon="arrow_back"
            clickable="true"
            title="${I18nService.getUniqueInstance().getValue("select_items")}"
            @nidoca-event-icon-clicked="${() =>
              RouterService.getUniqueInstance().back()}"
          ></nidoca-icon>
          <nidoca-typography
            slot="leftComponents"
            .typographyType="${TypographyType.BODY1}"
            >${this.navigationTitle}</nidoca-typography
          >
          <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.resultSize > 1
              ? VisibleType.NORMAL
              : VisibleType.HIDE}"
          >
            <nidoca-icon
              icon="${this.selectionMode ? "close" : "playlist_add_check"}"
              clickable="true"
              title="${I18nService.getUniqueInstance().getValue(
                "select_items"
              )}"
              @nidoca-event-icon-clicked="${() => this.switchSelectionMode()}"
            ></nidoca-icon>
          </nidoca-visible>
          <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.selectionMode
              ? VisibleType.NORMAL
              : VisibleType.HIDE}"
          >
            <nidoca-icon
              icon="delete"
              clickable="true"
              title="${I18nService.getUniqueInstance().getValue("delete")}"
              @nidoca-event-icon-clicked="${() =>
                (this.showDeleteDialog = true)}"
            ></nidoca-icon
          ></nidoca-visible>
          <nidoca-visible
            slot="rightComponents"
            .visibleType="${this.selectionMode
              ? VisibleType.HIDE
              : VisibleType.NORMAL}"
          >
            <nidoca-icon
              icon="add"
              clickable="true"
              title="${this.getAddTitle()}"
              @nidoca-event-icon-clicked="${() =>
                RouterService.getUniqueInstance().navigate(
                  this.getEditPageUrl()
                )}"
            ></nidoca-icon
          ></nidoca-visible>
        </nidoca-top-app-bar>
      </nidoca-border>
      <span>
        <span
          @nidoca-event-search-list-delete-items-successful="${() =>
            (this.showDeleteDialog = false)}"
          @nidoca-event-search-list-run-search-successful="${() => {
            this.resultSize = this.searchList.result.length;
          }}"
          >${this.searchList}
        </span>
        <decision-dialog-component
          @decision-dialog-component-ok-event="${() => this.deleteSelected()}"
          @decision-dialog-component-cancel-event="${() =>
            (this.showDeleteDialog = false)}"
          title="TITLE"
          description="Description"
          .showDialog="${this.showDeleteDialog}"
        ></decision-dialog-component>
      </span>
    `;
  }

  private switchSelectionMode() {
    this.searchList.switchSelectionMode();
    let value: boolean = Boolean(
      this.searchList.listComponent != null &&
        !this.searchList.listComponent.selectionMode
    );
    this.changeSelectionMode(value);
  }

  private changeSelectionMode(value: boolean) {
    if (this.searchList.listComponent != null) {
      this.searchList.listComponent.selectionMode = value;
      this.selectionMode = this.searchList.listComponent.selectionMode;
    }
  }

  private deleteSelected() {
    this.searchList.deleteSelection();
  }
}
