webpackJsonpac__name_([5],{

/***/ "./src/app/another/another.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var AnotherPage = (function () {
    function AnotherPage() {
    }
    AnotherPage = __decorate([
        core_1.Component({
            selector: 'another',
            template: __webpack_require__("./src/app/another/another.template.html")
        }), 
        __metadata('design:paramtypes', [])
    ], AnotherPage);
    return AnotherPage;
}());
exports.AnotherPage = AnotherPage;


/***/ },

/***/ "./src/app/another/another.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var another_component_ts_1 = __webpack_require__("./src/app/another/another.component.ts");
exports.routes = [
    { path: '', component: another_component_ts_1.AnotherPage, pathMatch: 'full' }
];
var AnotherModule = (function () {
    function AnotherModule() {
    }
    AnotherModule.routes = exports.routes;
    AnotherModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(exports.routes)],
            declarations: [another_component_ts_1.AnotherPage]
        }), 
        __metadata('design:paramtypes', [])
    ], AnotherModule);
    return AnotherModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnotherModule;


/***/ },

/***/ "./src/app/another/another.template.html":
/***/ function(module, exports) {

module.exports = "<h1 class=\"page-title\">Another Page <small>Just like that</small></h1>\r\n\r\n<div class=\"widget-container\">\r\n  <p>Some page content. Feel free to place whatever you want here</p>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=5.map