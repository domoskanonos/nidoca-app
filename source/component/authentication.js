"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NidocaAuthentication = void 0;
var lit_element_1 = require("lit-element");
var nidoca_core_1 = require("@domoskanonos/nidoca-core");
var frontend_basis_1 = require("@domoskanonos/frontend-basis");
var NidocaAuthentication = /** @class */ (function (_super) {
    __extends(NidocaAuthentication, _super);
    function NidocaAuthentication() {
        var _this = _super.call(this) || this;
        _this.isAuthenticated = false;
        _this.errorMessage = "";
        return _this;
    }
    NidocaAuthentication_1 = NidocaAuthentication;
    NidocaAuthentication.prototype.render = function () {
        var _this = this;
        return !this.isAuthenticated
            ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          <nidoca-form id=\"authenitcate-form\">\n            <nidoca-typography .typographyType=\"", "\"\n              >", "</nidoca-typography\n            >\n            <nidoca-inputfield\n              name=\"username\"\n              .inputfieldType=\"", "\"\n              label=\"", "\"\n              trailingIcon=\"account_circle\"\n              required=\"true\"\n            ></nidoca-inputfield>\n            <nidoca-inputfield\n              .inputfieldType=\"", "\"\n              label=\"", "\"\n              name=\"password\"\n              trailingIcon=\"vpn_key\"\n              required=\"true\"\n            ></nidoca-inputfield>\n            <nidoca-button\n              text=\"", "\"\n              @nidoca-event-button-clicked=\"", "\"\n            ></nidoca-button>\n            <nidoca-typography\n              slot=\"errorMessages\"\n              .typographyType=\"", "\"\n              text=\"", "\"\n            ></nidoca-typography>\n          </nidoca-form>\n\n          <nidoca-typography\n            .typographyType=\"", "\"\n            text=\"", "\"\n          ></nidoca-typography>\n          <nidoca-link href=\"#reset_password\" target=\"_self\"\n            >", "</nidoca-link\n          >\n          <nidoca-typography\n            .typographyType=\"", "\"\n            text=\"", "\"\n          ></nidoca-typography>\n          <nidoca-link href=\"#register\" target=\"_self\"\n            >", "</nidoca-link\n          >\n        "], ["\n          <nidoca-form id=\"authenitcate-form\">\n            <nidoca-typography .typographyType=\"", "\"\n              >",
                "</nidoca-typography\n            >\n            <nidoca-inputfield\n              name=\"username\"\n              .inputfieldType=\"", "\"\n              label=\"",
                "\"\n              trailingIcon=\"account_circle\"\n              required=\"true\"\n            ></nidoca-inputfield>\n            <nidoca-inputfield\n              .inputfieldType=\"", "\"\n              label=\"",
                "\"\n              name=\"password\"\n              trailingIcon=\"vpn_key\"\n              required=\"true\"\n            ></nidoca-inputfield>\n            <nidoca-button\n              text=\"",
                "\"\n              @nidoca-event-button-clicked=\"", "\"\n            ></nidoca-button>\n            <nidoca-typography\n              slot=\"errorMessages\"\n              .typographyType=\"", "\"\n              text=\"", "\"\n            ></nidoca-typography>\n          </nidoca-form>\n\n          <nidoca-typography\n            .typographyType=\"", "\"\n            text=\"",
                "\"\n          ></nidoca-typography>\n          <nidoca-link href=\"#reset_password\" target=\"_self\"\n            >",
                "</nidoca-link\n          >\n          <nidoca-typography\n            .typographyType=\"", "\"\n            text=\"",
                "\"\n          ></nidoca-typography>\n          <nidoca-link href=\"#register\" target=\"_self\"\n            >",
                "</nidoca-link\n          >\n        "])), nidoca_core_1.TypographyType.H4, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_header"), nidoca_core_1.InputfieldType.EMAIL, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_username"), nidoca_core_1.InputfieldType.PASSWORD, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_password"), frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_login"), function () { return _this.login(); }, nidoca_core_1.TypographyType.OVERLINE, this.errorMessage, nidoca_core_1.TypographyType.BODY1, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_password_lost"), frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_password_lost_link"), nidoca_core_1.TypographyType.BODY1, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_register"), frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_register_link")) : lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          <nidoca-form id=\"logout-form\">\n            <nidoca-typography .typographyType=\"", "\"\n              >", "</nidoca-typography\n            >\n            <nidoca-button\n              text=\"", "\"\n              @click=\"", "\"\n            ></nidoca-button>\n          </nidoca-form>\n        "], ["\n          <nidoca-form id=\"logout-form\">\n            <nidoca-typography .typographyType=\"", "\"\n              >",
            "</nidoca-typography\n            >\n            <nidoca-button\n              text=\"",
            "\"\n              @click=\"", "\"\n            ></nidoca-button>\n          </nidoca-form>\n        "])), nidoca_core_1.TypographyType.H4, frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_header_logout"), frontend_basis_1.I18nService.getUniqueInstance().getValue("component_authentication_logout"), function () { return _this.logout(); });
    };
    NidocaAuthentication.prototype.login = function () {
        if (this.formComponent != null && this.formComponent.validate()) {
            frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaAuthentication_1.EVENT_AUTHENTICATION_LOGIN, this.getOutputData());
        }
    };
    NidocaAuthentication.prototype.logout = function () {
        frontend_basis_1.BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, NidocaAuthentication_1.EVENT_AUTHENTICATION_LOGOUT, this.getOutputData());
    };
    NidocaAuthentication.prototype.getOutputData = function () {
        return this.formComponent != undefined
            ? this.formComponent.getOutputData()
            : nidoca_core_1.NidocaFormOutputData.prototype;
    };
    var NidocaAuthentication_1;
    NidocaAuthentication.EVENT_AUTHENTICATION_LOGIN = "nidoca-event-authentication-event-login";
    NidocaAuthentication.EVENT_AUTHENTICATION_LOGOUT = "nidoca-event-authentication-event-logout";
    __decorate([
        lit_element_1.query("#authenitcate-form")
    ], NidocaAuthentication.prototype, "formComponent", void 0);
    __decorate([
        lit_element_1.property()
    ], NidocaAuthentication.prototype, "isAuthenticated", void 0);
    __decorate([
        lit_element_1.property()
    ], NidocaAuthentication.prototype, "errorMessage", void 0);
    NidocaAuthentication = NidocaAuthentication_1 = __decorate([
        lit_element_1.customElement("nidoca-authentication")
    ], NidocaAuthentication);
    return NidocaAuthentication;
}(lit_element_1.LitElement));
exports.NidocaAuthentication = NidocaAuthentication;
var templateObject_1, templateObject_2;
//# sourceMappingURL=authentication.js.map