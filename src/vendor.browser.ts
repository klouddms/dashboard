// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
import 'ng2-rating';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'jquery';
import 'widgster';
import './assets/js/jquery-pjax/jquery.pjax';
import './assets/js/backbone/backbone';
import './assets/js/underscore/underscore';
import './assets/bootstrap-sass/assets/javascripts/bootstrap';
import './assets/js/bootstrap-select/dist/js/bootstrap-select';
// import './assets/js/backbone.paginator/lib/backbone.paginator'
// import './assets/backgrid/lib/backgrid'
import './assets/js/app';

import 'tether';
// import 'bootstrap';

// import './assets/backgrid-paginator/backgrid-paginator'
import './assets/js/datatables/media/js/jquery.dataTables'

// import './assets/js/nvd3/lib/d3.v2.min';
// import './assets/js/nvd3/nv.d3.custom';
// import './assets/js/nvd3/src/models/pie';
// import './assets/js/nvd3/src/models/legend';
// import './assets/js/nvd3/src/models/pieChartTotal';

// import './assets/js/stat-charts';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
