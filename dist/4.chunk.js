webpackJsonpac__name_([4],{

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Dashboard = (function () {
    function Dashboard() {
    }
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.template.html")
        }), 
        __metadata('design:paramtypes', [])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;


/***/ },

/***/ "./src/app/dashboard/dashboard.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var dashboard_component_1 = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
var widget_directive_1 = __webpack_require__("./src/app/layout/widget/widget.directive.ts");
exports.routes = [
    { path: '', component: dashboard_component_1.Dashboard, pathMatch: 'full' }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule.routes = exports.routes;
    LoginModule = __decorate([
        core_1.NgModule({
            declarations: [
                dashboard_component_1.Dashboard,
                widget_directive_1.Widget
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModule;


/***/ },

/***/ "./src/app/dashboard/dashboard.template.html":
/***/ function(module, exports) {

module.exports = "<h2 class=\"page-title\">Dashboard <small><small>The Lucky One</small></small></h2>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <section widget class=\"widget\">\r\n            <header>\r\n                <h4>\r\n                    Example <span class=\"fw-semi-bold\">Widget</span>\r\n                </h4>\r\n                <div class=\"widget-controls\">\r\n                    <a data-widgster=\"expand\" title=\"Expand\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>\r\n                    <a data-widgster=\"collapse\" title=\"Collapse\" href=\"#\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>\r\n                    <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n                </div>\r\n            </header>\r\n            <div class=\"widget-body\">\r\n                <img class=\"pull-left mr-sm\" src=\"assets/img/a2.png\" alt=\"Angular 2.0\" width=\"100\">\r\n                <p class=\"lead\">You are looking at a completely new version of Light Blue built\r\n                    with brand new <strong>Angular <em>2.0</em> Final Release</strong></p>\r\n                <p class=\"fs-mini\">Made by <a href=\"http://flatlogic.com\" target=\"_blank\">Flatlogic</a>.</p>\r\n            </div>\r\n        </section>\r\n    </div>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/layout/widget/widget.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Widget = (function () {
    function Widget(el) {
        this.$el = jQuery(el.nativeElement);
        jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
        /*
         When widget is closed remove its parent if it is .col-*
         */
        jQuery(document).on('close.widgster', function (e) {
            var $colWrap = jQuery(e.target)
                .closest('.content > .row > [class*="col-"]:not(.widget-container)');
            // remove colWrap only if there are no more widgets inside
            if (!$colWrap.find('.widget').not(e.target).length) {
                $colWrap.remove();
            }
        });
    }
    Widget.prototype.ngOnInit = function () {
        this.$el.widgster();
    };
    Widget = __decorate([
        core_1.Directive({
            selector: '[widget]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], Widget);
    return Widget;
    var _a;
}());
exports.Widget = Widget;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }

});
//# sourceMappingURL=4.map