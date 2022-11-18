/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_cement_bg_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _images_sign_in_bg_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_cement_bg_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_sign_in_bg_jpg__WEBPACK_IMPORTED_MODULE_4__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Crimson Text', serif;\n  font-weight: 400;\n}\n\nbody {\n  position: relative;\n  border: none;\n  margin: 0;\n  height: 100%;\n}\n\nbutton {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  letter-spacing: 2px;\n}\n\np {\n  font-size: .8em;\n}\n\nb {\n  font-family: 'Alata', sans-serif;\n  font-size: 11px;\n}\n\nbutton:hover:enabled {\n  cursor: pointer;\n  -webkit-transition: all .3s ease-in-out;\n}\n\n.book-button {\n  background-color: rgba(0, 0, 0, 0);\n  border-radius: 100px;\n  height: 21px;\n  border: 1px solid black;\n  width: 100px;\n  font-size: 8px;\n}\n\n.book-button:hover:enabled {\n  background-color: black;\n  color: white;\n}\n\nbody:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-attachment: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 190%;\n  opacity: 0.15;\n  background-repeat: no-repeat;\n  background-position: 50% 0;\n  background-size: cover;\n  z-index: -1;\n}\n\n.sign-in-body:before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n/* ---------------------GLOBAL TABLE ATTR--------------------- */\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  text-align: center;\n  font-size: max(1.2vw, 10px);\n}\n\ntr {\n  background-color: aliceblue;\n  border-top: 2px solid white;\n}\n\ntr:hover {\n  cursor: default;\n}\n\nth {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  letter-spacing: 1px;\n  font-size: .8em;\n  background-color: #53638180;\n  color: white;\n}\n\ntd {\n  font-family: 'Alata', sans-serif;\n  font-weight: 100;\n  letter-spacing: 1px;\n  font-size: .8em;\n  padding: 15px;\n}\n\n/* ---------------------USER LOGIN VIEW--------------------- */\n\n.user-login-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 422px;\n  width: 72%;\n  margin-top: 7vh;\n}\n\n.user-login-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  background-color: #00000012;\n  border-radius: 1px;\n  width: 74%;\n  height: 68%;\n}\n\n.user-login-parent>p {\n  font-size: 1.5em;\n}\n\n.login-input-grandparent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-input-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: .6em;\n  height: 86px;\n  justify-content: space-evenly;\n}\n\n.sign-in-p {\n  font-family: 'Alata', sans-serif;\n}\n\n.login-input {\n  height: 10px;\n  font-size: 10px;\n  width: 110px;\n}\n\n.login-button {\n  margin: 23px;\n  width: 60px;\n  letter-spacing: 1px;\n}\n\n.login-error {\n  color: #e72600;\n  margin: 0px;\n  font-size: 9px;\n  height: 9px;\n}\n\n/* ---------------------ADMIN VIEW--------------------- */\n\n.admin-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 587px;\n  width: 92%;\n  margin-top: 67px;\n}\n\n.admin-parent {\n  height: 587px;\n  width: 100%;\n  background-color: #00000066;\n  color: white;\n}\n\n.admin-header-text {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  font-size: 10px;\n  margin: 3px 5px 3px 0px;\n}\n\n.admin-header {\n  width: 100%;\n  height: 3%;\n  font-size: .8em;\n  border-bottom: 1px solid white;\n  padding-left: 4px;\n}\n\n.report-parent {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  height: 35%;\n  border-bottom: 1px solid white;\n}\n\n.admin-user-bookings-table-container,\n.guest-table-parent,\n.report-rooms-table-parent {\n  background-color: white;\n  overflow: auto;\n  overflow-x: hidden;\n}\n\n.stats-table-parent {\n  width: 30%;\n  height: 50%;\n}\n\n.hidden-metric {\n  color: #00000000\n}\n\n.admin-table-row>td {\n  height: 20px;\n  padding: 0px;\n  border: 1px solid rgb(255, 255, 255);\n  color: black;\n}\n\n.lookup-parent {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  height: 57%;\n}\n\n.report-rooms-table-parent {\n  height: 145px;\n  width: 360px;\n}\n\n.lookup-left,\n.lookup-center,\n.lookup-right {\n  display: flex;\n  flex-direction: column;\n  width: 20%;\n  height: 98%;\n  justify-content: space-evenly;\n}\n\n.lookup-left {\n  height: 70%;\n}\n\n.guest-search-label {\n  font-size: .6em;\n}\n\n.guest-search-input-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n.guest-search-input {\n  height: 10px;\n  font-size: 10px;\n  width: 120px;\n  margin-right: 5px;\n}\n\n.admin-button {\n  height: 15px;\n  width: 48px;\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n\n.guest-table-parent {\n  height: 165px;\n}\n\n.guest-result-row:hover {\n  cursor: pointer;\n}\n\n.lookup-center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 33%;\n}\n\n.admin-user-bookings-parent {\n  width: 100%;\n}\n\n.admin-user-bookings-table-container {\n  height: 248px;\n  width: 100%;\n}\n\n.admin-past-bookings {\n  background-color: #dd4223a5;\n}\n\n.remove-booking-button {\n  width: 110px;\n}\n\n.lookup-right {\n  width: 40%;\n}\n\n.admin-new-booking-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n\n.admin-new-booking-parent>h3 {\n  font-size: .8em;\n  font-weight: 800;\n}\n\n.admin-new-booking-fields {\n  width: 100%;\n}\n\n.admin-date-parent {\n  display: flex;\n  width: 100%;\n}\n\n.admin-date-input {\n  height: 12px;\n  font-size: .6em;\n  margin-right: 5px;\n}\n\n.admin-date-error {\n  color: white;\n  height: 13px;\n  margin: 0px;\n  font-size: 9px;\n}\n\n.admin-new-booking-table-parent {\n  width: 100%;\n  height: 182px;\n}\n\n.admin-room-error {\n  margin-top: 7px;\n}\n\n.admin-submit-button {\n  margin-top: 8px;\n}\n\n/* ---------------------HEADER--------------------- */\n\nheader {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  width: 100%;\n  z-index: 2;\n  background-color: #ffffffb5;\n}\n\n.header-left,\n.header-right {\n  width: 50%;\n  display: flex;\n  align-items: center;\n  padding: 0px 15px;\n}\n\n.header-left {\n  justify-content: flex-start;\n}\n\n.logo {\n  font-size: 1.2em;\n  cursor: pointer;\n  margin: 13px 30px 13px 11px;\n}\n\n.header-subtext {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  font-size: .5em;\n  margin-top: 12px;\n  letter-spacing: 3px;\n}\n\n.header-right {\n  justify-content: flex-end;\n}\n\n.book-button-header {\n  margin-right: 15px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n\n/* ---------------------BANNER--------------------- */\n\n.banner-parent {\n  display: flex;\n  width: 80%;\n  height: 66vw;\n  margin-top: 22vh;\n}\n\n.image-parent-left,\n.image-parent-right {\n  width: 50%;\n  height: 66vw;\n}\n\n.image-parent-right {\n  display: flex;\n  align-items: flex-end\n}\n\n.banner-image {\n  width: 100%;\n  transform: scaleX(-1);\n  opacity: .95;\n}\n\n.overlook-title {\n  position: absolute;\n  background-color: #ffffffe6;\n  padding: 1vw 4vw;\n  right: 21%;\n  top: 17%;\n  letter-spacing: 2px;\n}\n\n.copy-oneline {\n  position: absolute;\n  background-color: #ffffffe6;\n  font-size: 1.4vw;\n  padding: 1vw 4vw;\n  left: 12%;\n  top: 42%;\n}\n\n/* ---------------------USER TOOLS VIEW--------------------- */\n\n.user-tools-view {\n  display: flex;\n  justify-content: center;\n  position: absolute;\n  margin-top: 254vh;\n  width: 72%;\n  height: 822px;\n  background-color: rgba(255, 255, 255, 0.81);\n  font-size: .8em;\n}\n\n.accordion-parent {\n  display: flex;\n  flex-direction: column;\n  width: 150%;\n}\n\n.accordion-banner-parent {\n  margin: 25px 30px 0px 30px;\n}\n\n.hotel-copy-parent {\n  height: 215px;\n}\n\n.hotel-copy-left,\n.hotel-copy-right {\n  width: 48%;\n  margin-bottom: 20px;\n  height: 48px;\n}\n\n.hotel-copy-right {\n  float: right;\n}\n\n.copy-title {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  font-size: .3em;\n  letter-spacing: 2px;\n}\n\n.accordion-welcome-parent {\n  text-align: center;\n  margin-bottom: 35px;\n}\n\n.accordion-welcome {\n  margin-bottom: 35px;\n}\n\n.accordion-welcome-parent>p {\n  font-size: .7em;\n}\n\n.accordion-button {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-weight: 400;\n  font-size: 10px;\n  background-color: #f5f0ef;\n  border: 1px solid #d7d1d0;\n  height: 20px;\n}\n\n.accordion-button-collapsed::after {\n  font-family: 'Material Icons';\n  content: 'expand_more';\n  float: right;\n}\n\n.accordion-button-open::after {\n  content: 'expand_less';\n}\n\n/* ---------------------ACC: PROFILE--------------------- */\n\n.profile-parent {\n  flex-direction: column;\n  height: 470px;\n  padding: 0px 3vw;\n  display: none;\n}\n\n.dash-guest-name {\n  font-size: 1.2em;\n  margin-top: 21px;\n}\n\n.stays-parent {\n  overflow: auto;\n  overflow-x: hidden;\n  width: 80%;\n  height: 138px;\n  margin-bottom: 15px;\n}\n\n.profile-labels {\n  font-family: 'Alata', sans-serif;\n}\n\n.total-spent {\n  margin-bottom: 20px;\n}\n\n/* ---------------------ACC: ABOUT--------------------- */\n\n.about-parent {\n  display: none;\n  flex-direction: column;\n  padding: 0px 3vw;\n}\n\n/* ---------------------NEW BOOKING VIEW--------------------- */\n\n.book-grandparent {\n  height: 380px;\n}\n\n.book-accordion-buttons {\n  font-size: 8px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  height: 19px;\n}\n\n.accordion-header-collapsed {\n  display: flex;\n  align-items: center;\n  padding-left: 6px;\n}\n\n.accordion-header-collapsed>h2 {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  letter-spacing: 2px;\n  font-size: 10px;\n  margin: 0px;\n}\n\n.date-grandparent {\n  display: none;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  height: 175px;\n}\n\n.date-parent {\n  display: flex;\n  flex-direction: column;\n}\n\n.submit-button {\n  height: 18px;\n  width: 52px;\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n\n.error {\n  color: #e72600;\n  height: 9px;\n}\n\n.rooms-grandparent {\n  display: none;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  height: 387px;\n}\n\n.rooms-parent {\n  overflow: auto;\n  overflow-x: hidden;\n  width: 80%;\n  height: 206px;\n}\n\n.select-grandparent {\n  display: flex;\n  align-items: flex-end;\n  width: 80%;\n}\n\n.filter-label {\n  margin-right: 10px;\n}\n\n.clear-filter {\n  font-weight: 400;\n  letter-spacing: 1px;\n  font-size: 7px;\n  height: 15px;\n  border: none;\n  margin-left: 5px;\n  padding: 3px;\n}\n\nselect {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  letter-spacing: 2px;\n  outline: 0;\n  background-image: none;\n  width: 20%;\n  height: 15px;\n  color: black;\n  cursor: pointer;\n  font-size: 8px;\n  border: 1px solid black;\n  border-radius: 3px;\n}\n\nselect:focus {\n  border: 2px solid #1a7fcf;\n}\n\n.active {\n  background-color: #cbdded;\n}\n\n.avail-room-tr:hover {\n  cursor: pointer;\n}\n\n.confirm-grandparent {\n  height: 290px;\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.confirm-details {\n  width: 81%;\n  display: flex;\n  flex-direction: column;\n}\n\n.confirm-details>h2 {\n  font-family: 'Alata', sans-serif;\n  font-size: 1em;\n}\n\n.details-ul {\n  background-color: aliceblue;\n  padding: 20px 30px;\n  border-radius: 1px;\n}\n\n.details-ul>* {\n  list-style: none;\n  font-family: 'Alata', sans-serif;\n}\n\n.guest-name-li {\n  font-family: 'Alata', sans-serif;\n  font-size: 1.2em;\n}\n\n.room-details-li {\n  margin-top: 20px;\n}\n\n.room-details-ul {\n  display: flex;\n  justify-content: space-between;\n  background-color: aliceblue;\n  padding: 17px;\n  font-size: 10px;\n}\n\n.total-li {\n  margin-top: 15px;\n}\n\n.edit-details-button {\n  width: 62px;\n  font-size: 6px;\n  height: 14px;\n}\n\n.success-grandparent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 200px;\n}\n\n.conf-code {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f5f0ef;\n  width: 60%;\n  height: 21px;\n  margin: 0% 20%;\n  padding-top: 1px;\n}\n\n.server-error-section {\n  display: flex;\n  align-items: center;\n  height: 219px;\n}\n\n/* KEEP AT BOTTOM */\n\n.hide {\n  display: none;\n}\n\n.show {\n  display: flex;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,SAAS;EACT,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gCAAgC;EAChC,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,uCAAuC;AACzC;;AAEA;EACE,kCAAkC;EAClC,oBAAoB;EACpB,YAAY;EACZ,uBAAuB;EACvB,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,yDAA8C;EAC9C,sBAAsB;EACtB,4BAA4B;EAC5B,OAAO;EACP,MAAM;EACN,WAAW;EACX,YAAY;EACZ,aAAa;EACb,4BAA4B;EAC5B,0BAA0B;EAC1B,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,yDAA+C;AACjD;;AAEA,gEAAgE;;AAEhE;EACE,yBAAyB;EACzB,WAAW;EACX,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;EAC3B,2BAA2B;AAC7B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,aAAa;AACf;;AAEA,8DAA8D;;AAE9D;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;EAC7B,2BAA2B;EAC3B,kBAAkB;EAClB,UAAU;EACV,WAAW;AACb;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,6BAA6B;AAC/B;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,WAAW;EACX,cAAc;EACd,WAAW;AACb;;AAEA,yDAAyD;;AAEzD;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,UAAU;EACV,eAAe;EACf,8BAA8B;EAC9B,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;EACnB,WAAW;EACX,8BAA8B;AAChC;;AAEA;;;EAGE,uBAAuB;EACvB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,WAAW;AACb;;AAEA;EACE;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,oCAAoC;EACpC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;;;EAGE,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,WAAW;EACX,6BAA6B;AAC/B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA,qDAAqD;;AAErD;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,UAAU;EACV,2BAA2B;AAC7B;;AAEA;;EAEE,UAAU;EACV,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,2BAA2B;AAC7B;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA,qDAAqD;;AAErD;EACE,aAAa;EACb,UAAU;EACV,YAAY;EACZ,gBAAgB;AAClB;;AAEA;;EAEE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb;AACF;;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,gBAAgB;EAChB,UAAU;EACV,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,gBAAgB;EAChB,gBAAgB;EAChB,SAAS;EACT,QAAQ;AACV;;AAEA,8DAA8D;;AAE9D;EACE,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,aAAa;EACb,2CAA2C;EAC3C,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,UAAU;EACV,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;EACf,yBAAyB;EACzB,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,6BAA6B;EAC7B,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA,2DAA2D;;AAE3D;EACE,sBAAsB;EACtB,aAAa;EACb,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,UAAU;EACV,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,mBAAmB;AACrB;;AAEA,yDAAyD;;AAEzD;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA,+DAA+D;;AAE/D;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,UAAU;EACV,aAAa;AACf;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,UAAU;AACZ;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;EAChB,mBAAmB;EACnB,UAAU;EACV,sBAAsB;EACtB,UAAU;EACV,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,cAAc;EACd,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,gCAAgC;EAChC,cAAc;AAChB;;AAEA;EACE,2BAA2B;EAC3B,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,gCAAgC;AAClC;;AAEA;EACE,gCAAgC;EAChC,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,2BAA2B;EAC3B,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;EAC7B,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,yBAAyB;EACzB,UAAU;EACV,YAAY;EACZ,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,aAAa;AACf;;AAEA,mBAAmB;;AAEnB;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf","sourcesContent":["* {\n  font-family: 'Crimson Text', serif;\n  font-weight: 400;\n}\n\nbody {\n  position: relative;\n  border: none;\n  margin: 0;\n  height: 100%;\n}\n\nbutton {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  letter-spacing: 2px;\n}\n\np {\n  font-size: .8em;\n}\n\nb {\n  font-family: 'Alata', sans-serif;\n  font-size: 11px;\n}\n\nbutton:hover:enabled {\n  cursor: pointer;\n  -webkit-transition: all .3s ease-in-out;\n}\n\n.book-button {\n  background-color: rgba(0, 0, 0, 0);\n  border-radius: 100px;\n  height: 21px;\n  border: 1px solid black;\n  width: 100px;\n  font-size: 8px;\n}\n\n.book-button:hover:enabled {\n  background-color: black;\n  color: white;\n}\n\nbody:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  background-image: url(../images/cement-bg.jpg);\n  background-size: cover;\n  background-attachment: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 190%;\n  opacity: 0.15;\n  background-repeat: no-repeat;\n  background-position: 50% 0;\n  background-size: cover;\n  z-index: -1;\n}\n\n.sign-in-body:before {\n  background-image: url(../images/sign-in-bg.jpg);\n}\n\n/* ---------------------GLOBAL TABLE ATTR--------------------- */\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  text-align: center;\n  font-size: max(1.2vw, 10px);\n}\n\ntr {\n  background-color: aliceblue;\n  border-top: 2px solid white;\n}\n\ntr:hover {\n  cursor: default;\n}\n\nth {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  letter-spacing: 1px;\n  font-size: .8em;\n  background-color: #53638180;\n  color: white;\n}\n\ntd {\n  font-family: 'Alata', sans-serif;\n  font-weight: 100;\n  letter-spacing: 1px;\n  font-size: .8em;\n  padding: 15px;\n}\n\n/* ---------------------USER LOGIN VIEW--------------------- */\n\n.user-login-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 422px;\n  width: 72%;\n  margin-top: 7vh;\n}\n\n.user-login-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  background-color: #00000012;\n  border-radius: 1px;\n  width: 74%;\n  height: 68%;\n}\n\n.user-login-parent>p {\n  font-size: 1.5em;\n}\n\n.login-input-grandparent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-input-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-size: .6em;\n  height: 86px;\n  justify-content: space-evenly;\n}\n\n.sign-in-p {\n  font-family: 'Alata', sans-serif;\n}\n\n.login-input {\n  height: 10px;\n  font-size: 10px;\n  width: 110px;\n}\n\n.login-button {\n  margin: 23px;\n  width: 60px;\n  letter-spacing: 1px;\n}\n\n.login-error {\n  color: #e72600;\n  margin: 0px;\n  font-size: 9px;\n  height: 9px;\n}\n\n/* ---------------------ADMIN VIEW--------------------- */\n\n.admin-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 587px;\n  width: 92%;\n  margin-top: 67px;\n}\n\n.admin-parent {\n  height: 587px;\n  width: 100%;\n  background-color: #00000066;\n  color: white;\n}\n\n.admin-header-text {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  font-size: 10px;\n  margin: 3px 5px 3px 0px;\n}\n\n.admin-header {\n  width: 100%;\n  height: 3%;\n  font-size: .8em;\n  border-bottom: 1px solid white;\n  padding-left: 4px;\n}\n\n.report-parent {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  height: 35%;\n  border-bottom: 1px solid white;\n}\n\n.admin-user-bookings-table-container,\n.guest-table-parent,\n.report-rooms-table-parent {\n  background-color: white;\n  overflow: auto;\n  overflow-x: hidden;\n}\n\n.stats-table-parent {\n  width: 30%;\n  height: 50%;\n}\n\n.hidden-metric {\n  color: #00000000\n}\n\n.admin-table-row>td {\n  height: 20px;\n  padding: 0px;\n  border: 1px solid rgb(255, 255, 255);\n  color: black;\n}\n\n.lookup-parent {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  height: 57%;\n}\n\n.report-rooms-table-parent {\n  height: 145px;\n  width: 360px;\n}\n\n.lookup-left,\n.lookup-center,\n.lookup-right {\n  display: flex;\n  flex-direction: column;\n  width: 20%;\n  height: 98%;\n  justify-content: space-evenly;\n}\n\n.lookup-left {\n  height: 70%;\n}\n\n.guest-search-label {\n  font-size: .6em;\n}\n\n.guest-search-input-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n.guest-search-input {\n  height: 10px;\n  font-size: 10px;\n  width: 120px;\n  margin-right: 5px;\n}\n\n.admin-button {\n  height: 15px;\n  width: 48px;\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n\n.guest-table-parent {\n  height: 165px;\n}\n\n.guest-result-row:hover {\n  cursor: pointer;\n}\n\n.lookup-center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 33%;\n}\n\n.admin-user-bookings-parent {\n  width: 100%;\n}\n\n.admin-user-bookings-table-container {\n  height: 248px;\n  width: 100%;\n}\n\n.admin-past-bookings {\n  background-color: #dd4223a5;\n}\n\n.remove-booking-button {\n  width: 110px;\n}\n\n.lookup-right {\n  width: 40%;\n}\n\n.admin-new-booking-parent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n\n.admin-new-booking-parent>h3 {\n  font-size: .8em;\n  font-weight: 800;\n}\n\n.admin-new-booking-fields {\n  width: 100%;\n}\n\n.admin-date-parent {\n  display: flex;\n  width: 100%;\n}\n\n.admin-date-input {\n  height: 12px;\n  font-size: .6em;\n  margin-right: 5px;\n}\n\n.admin-date-error {\n  color: white;\n  height: 13px;\n  margin: 0px;\n  font-size: 9px;\n}\n\n.admin-new-booking-table-parent {\n  width: 100%;\n  height: 182px;\n}\n\n.admin-room-error {\n  margin-top: 7px;\n}\n\n.admin-submit-button {\n  margin-top: 8px;\n}\n\n/* ---------------------HEADER--------------------- */\n\nheader {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  width: 100%;\n  z-index: 2;\n  background-color: #ffffffb5;\n}\n\n.header-left,\n.header-right {\n  width: 50%;\n  display: flex;\n  align-items: center;\n  padding: 0px 15px;\n}\n\n.header-left {\n  justify-content: flex-start;\n}\n\n.logo {\n  font-size: 1.2em;\n  cursor: pointer;\n  margin: 13px 30px 13px 11px;\n}\n\n.header-subtext {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  font-size: .5em;\n  margin-top: 12px;\n  letter-spacing: 3px;\n}\n\n.header-right {\n  justify-content: flex-end;\n}\n\n.book-button-header {\n  margin-right: 15px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n\n/* ---------------------BANNER--------------------- */\n\n.banner-parent {\n  display: flex;\n  width: 80%;\n  height: 66vw;\n  margin-top: 22vh;\n}\n\n.image-parent-left,\n.image-parent-right {\n  width: 50%;\n  height: 66vw;\n}\n\n.image-parent-right {\n  display: flex;\n  align-items: flex-end\n}\n\n.banner-image {\n  width: 100%;\n  transform: scaleX(-1);\n  opacity: .95;\n}\n\n.overlook-title {\n  position: absolute;\n  background-color: #ffffffe6;\n  padding: 1vw 4vw;\n  right: 21%;\n  top: 17%;\n  letter-spacing: 2px;\n}\n\n.copy-oneline {\n  position: absolute;\n  background-color: #ffffffe6;\n  font-size: 1.4vw;\n  padding: 1vw 4vw;\n  left: 12%;\n  top: 42%;\n}\n\n/* ---------------------USER TOOLS VIEW--------------------- */\n\n.user-tools-view {\n  display: flex;\n  justify-content: center;\n  position: absolute;\n  margin-top: 254vh;\n  width: 72%;\n  height: 822px;\n  background-color: rgba(255, 255, 255, 0.81);\n  font-size: .8em;\n}\n\n.accordion-parent {\n  display: flex;\n  flex-direction: column;\n  width: 150%;\n}\n\n.accordion-banner-parent {\n  margin: 25px 30px 0px 30px;\n}\n\n.hotel-copy-parent {\n  height: 215px;\n}\n\n.hotel-copy-left,\n.hotel-copy-right {\n  width: 48%;\n  margin-bottom: 20px;\n  height: 48px;\n}\n\n.hotel-copy-right {\n  float: right;\n}\n\n.copy-title {\n  font-family: 'Alata', sans-serif;\n  font-weight: 800;\n  font-size: .3em;\n  letter-spacing: 2px;\n}\n\n.accordion-welcome-parent {\n  text-align: center;\n  margin-bottom: 35px;\n}\n\n.accordion-welcome {\n  margin-bottom: 35px;\n}\n\n.accordion-welcome-parent>p {\n  font-size: .7em;\n}\n\n.accordion-button {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-weight: 400;\n  font-size: 10px;\n  background-color: #f5f0ef;\n  border: 1px solid #d7d1d0;\n  height: 20px;\n}\n\n.accordion-button-collapsed::after {\n  font-family: 'Material Icons';\n  content: 'expand_more';\n  float: right;\n}\n\n.accordion-button-open::after {\n  content: 'expand_less';\n}\n\n/* ---------------------ACC: PROFILE--------------------- */\n\n.profile-parent {\n  flex-direction: column;\n  height: 470px;\n  padding: 0px 3vw;\n  display: none;\n}\n\n.dash-guest-name {\n  font-size: 1.2em;\n  margin-top: 21px;\n}\n\n.stays-parent {\n  overflow: auto;\n  overflow-x: hidden;\n  width: 80%;\n  height: 138px;\n  margin-bottom: 15px;\n}\n\n.profile-labels {\n  font-family: 'Alata', sans-serif;\n}\n\n.total-spent {\n  margin-bottom: 20px;\n}\n\n/* ---------------------ACC: ABOUT--------------------- */\n\n.about-parent {\n  display: none;\n  flex-direction: column;\n  padding: 0px 3vw;\n}\n\n/* ---------------------NEW BOOKING VIEW--------------------- */\n\n.book-grandparent {\n  height: 380px;\n}\n\n.book-accordion-buttons {\n  font-size: 8px;\n  font-weight: 500;\n  letter-spacing: 1px;\n  height: 19px;\n}\n\n.accordion-header-collapsed {\n  display: flex;\n  align-items: center;\n  padding-left: 6px;\n}\n\n.accordion-header-collapsed>h2 {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  letter-spacing: 2px;\n  font-size: 10px;\n  margin: 0px;\n}\n\n.date-grandparent {\n  display: none;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  height: 175px;\n}\n\n.date-parent {\n  display: flex;\n  flex-direction: column;\n}\n\n.submit-button {\n  height: 18px;\n  width: 52px;\n  font-size: 8px;\n  letter-spacing: 1px;\n}\n\n.error {\n  color: #e72600;\n  height: 9px;\n}\n\n.rooms-grandparent {\n  display: none;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  height: 387px;\n}\n\n.rooms-parent {\n  overflow: auto;\n  overflow-x: hidden;\n  width: 80%;\n  height: 206px;\n}\n\n.select-grandparent {\n  display: flex;\n  align-items: flex-end;\n  width: 80%;\n}\n\n.filter-label {\n  margin-right: 10px;\n}\n\n.clear-filter {\n  font-weight: 400;\n  letter-spacing: 1px;\n  font-size: 7px;\n  height: 15px;\n  border: none;\n  margin-left: 5px;\n  padding: 3px;\n}\n\nselect {\n  font-family: 'Alata', sans-serif;\n  font-weight: 400;\n  letter-spacing: 2px;\n  outline: 0;\n  background-image: none;\n  width: 20%;\n  height: 15px;\n  color: black;\n  cursor: pointer;\n  font-size: 8px;\n  border: 1px solid black;\n  border-radius: 3px;\n}\n\nselect:focus {\n  border: 2px solid #1a7fcf;\n}\n\n.active {\n  background-color: #cbdded;\n}\n\n.avail-room-tr:hover {\n  cursor: pointer;\n}\n\n.confirm-grandparent {\n  height: 290px;\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.confirm-details {\n  width: 81%;\n  display: flex;\n  flex-direction: column;\n}\n\n.confirm-details>h2 {\n  font-family: 'Alata', sans-serif;\n  font-size: 1em;\n}\n\n.details-ul {\n  background-color: aliceblue;\n  padding: 20px 30px;\n  border-radius: 1px;\n}\n\n.details-ul>* {\n  list-style: none;\n  font-family: 'Alata', sans-serif;\n}\n\n.guest-name-li {\n  font-family: 'Alata', sans-serif;\n  font-size: 1.2em;\n}\n\n.room-details-li {\n  margin-top: 20px;\n}\n\n.room-details-ul {\n  display: flex;\n  justify-content: space-between;\n  background-color: aliceblue;\n  padding: 17px;\n  font-size: 10px;\n}\n\n.total-li {\n  margin-top: 15px;\n}\n\n.edit-details-button {\n  width: 62px;\n  font-size: 6px;\n  height: 14px;\n}\n\n.success-grandparent {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 200px;\n}\n\n.conf-code {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f5f0ef;\n  width: 60%;\n  height: 21px;\n  margin: 0% 20%;\n  padding-top: 1px;\n}\n\n.server-error-section {\n  display: flex;\n  align-items: center;\n  height: 219px;\n}\n\n/* KEEP AT BOTTOM */\n\n.hide {\n  display: none;\n}\n\n.show {\n  display: flex;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/cement-bg.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/sign-in-bg.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/metrograph-interior.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/imperial-bedroom-left.jpg");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);



class BookingList {
  constructor(allBookingsData, allRoomsData) {
    this.bookings = this.initBookings(allBookingsData)
    this.rooms = this.initRooms(allRoomsData)
  };

  initBookings(allBookingsData) {
    return allBookingsData.map(bookingObject => new _Booking__WEBPACK_IMPORTED_MODULE_0__.default(bookingObject));
  };

  initRooms(allRoomsData) {
    return allRoomsData.map(roomObject => new _Room__WEBPACK_IMPORTED_MODULE_1__.default(roomObject));
  };

  getAvailableRooms(date) {
    let roomNums = this.rooms.map(room => room.number);
    this.bookings.forEach(booking => {
      if (booking.date === date) {
        roomNums.splice(roomNums.indexOf(booking.roomNumber), 1);
      };
    });
    return roomNums.map(num => {
      return this.rooms.find(room => room.number === num);
    });
  };

  getRoomByNumber(num) {
    return this.rooms.find(room => room.number == num);
  };

  getFilteredRooms(date, option) {
    let availRooms = this.getAvailableRooms(date);
    return availRooms.filter(room => room.roomType === option);
  };

  getTodaysRevenue(todaysDate) {
    return this.bookings.reduce((acc, booking) => {
      if (booking.date === todaysDate) {
        let targetRoom = this.rooms.find(room => room.number === booking.roomNumber);
        acc += targetRoom.costPerNight;
      }
      return acc;
    }, 0);
  };

  getVacancyData(date) {
    let numVacantRooms = this.getAvailableRooms(date).length;

    return {
      vacant: numVacantRooms,
      percentVacant: ((numVacantRooms / 25) * 100).toFixed(0),
      booked: 25 - numVacantRooms,
      percentBooked: (((25 - numVacantRooms) / 25) * 100).toFixed(0)
    };
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingList);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(object) {
    this.id = object.id
    this.guestId = object.userID
    this.date = object.date.replace(/\//g, '-')
    this.roomNumber = object.roomNumber
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(object) {
    this.number = object.number
    this.roomType = object.roomType
    this.hasBidet = object.bidet
    this.bedSize = object.bedSize
    this.numBeds = object.numBeds
    this.costPerNight = Number(object.costPerNight.toFixed(2))
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "deleteData": () => (/* binding */ deleteData)
/* harmony export */ });
function getData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.log("Fetch error: ", error);
    });
};

function postData(body, url) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

function deleteData(url) {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Guest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);


class GuestList {
  constructor(allGuestsData) {
    this.guests = this.initGuests(allGuestsData);
  };

  initGuests(allGuestsData) {
    return allGuestsData.map(guest => new _Guest__WEBPACK_IMPORTED_MODULE_0__.default(guest));
  };

  checkUserCredentials(username, password) {
    if (password === "overlook2021") {
      let id = Number(username.replace("customer", ""));
      return this.guests.find(guest => guest.id === id);
    } else {
      return;
    };
  };

  searchGuests(string) {
    if (string === "") { return [] }
    return this.guests.filter(guest => guest.name.toLowerCase().includes(string.toLowerCase()));
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GuestList);

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Guest {
  constructor(object) {
    this.id = object.id
    this.name = object.name
  };

  getTotalSpent(bookingList) {
    return Number(bookingList.bookings.reduce((acc, booking) => {
      let isPastDate = (new Date(booking.date) < new Date());
      if (isPastDate && booking.guestId === this.id) {
        acc += bookingList.rooms.find(room => room.number === booking.roomNumber).costPerNight;
      }
      return acc;
    }, 0));
  };

  getAllBookings(bookingList) {
    return bookingList.bookings.reduce((acc, booking) => {
      if (booking.guestId === this.id) {
        let targetRoom = bookingList.rooms.find(room => room.number === booking.roomNumber);
        let currentDate = new Date();
        currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        let isFutureDate = currentDate <= booking.date;
        let bookingObject = {
          date: booking.date,
          roomNumber: booking.roomNumber,
          numBeds: targetRoom.numBeds,
          bedSize: targetRoom.bedSize,
          roomType: targetRoom.roomType,
          costPerNight: targetRoom.costPerNight.toFixed(2),
          id: booking.id
        };
        
        if (isFutureDate) {
          acc.upcomingBookings.push(bookingObject);
        } else {
          acc.pastBookings.push(bookingObject);
        };
      };
      return acc;
    }, {
      pastBookings: [],
      upcomingBookings: []
    });
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Guest);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_metrograph_interior_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _images_imperial_bedroom_left_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _src_classes_BookingList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _classes_GuestList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);







//----------------------UTILITY DATA----------------------//

let allBookingsData;
let allGuestsData;

let allBookingsURL = "http://localhost:3001/api/v1/bookings";
let allGuestsURL = "http://localhost:3001/api/v1/customers";
let allRoomsURL = "http://localhost:3001/api/v1/rooms";

//----------------------DATA MODEL----------------------//

let allRooms;
let bookingList;
let guestList;
let guest;

let newBooking;
let selectedRoom;
let confirmedBookingId;

let adminSelectedGuest;
let adminSelectedBooking;
let adminSelectedRoom;

function fetchData(urls) {
  Promise.all([(0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(urls[0]), (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(urls[1]), (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(urls[2])])
    .then(data => {
      allBookingsData = data[0].bookings;
      allGuestsData = data[1].customers;
      allRooms = data[2].rooms;
      initPage();
    })
  .catch(error => {
    if (error instanceof TypeError) {
      displayServerError();
      serverErrorMessage.innerText = "Sorry! Something broke on our end. Please try again later.";
    } else if (error instanceof ReferenceError) {
      displayServerError();
      serverErrorMessage.innerText = "Sorry! Please refresh and try making your request again.";
    } else {
      displayServerError();
      serverErrorMessage.innerText = "Looks like something went wrong! Please try again later.";
    };
  });
};

//----------------------QUERY SELECTORS----------------------//

const body = document.getElementById("body");
const logo = document.getElementById("logo");
const userLoginView = document.getElementById("user-login-view");
const loginButton = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const guestHeaderSub = document.getElementById("header-subtext-guest");
const adminHeaderSub = document.getElementById("header-subtext-admin");
const signOutButton = document.getElementById("sign-out-button");
const adminView = document.getElementById("admin-view");
const bannerParent = document.getElementById("banner-parent");
const userToolsView = document.getElementById("user-tools-view");
const profileButton = document.getElementById("profile-button");
const profileParent = document.getElementById("profile-parent");
const bookButtonHeader = document.getElementById("book-button-header");
const dashParent = document.getElementById("dash-parent");
const bookParent = document.getElementById("book-parent");
const bookButtonAcc = document.getElementById("book-button-accordion");
const aboutButton = document.getElementById("about-button");
const aboutParent = document.getElementById("about-parent");
const guestNameDash = document.getElementById("dash-guest-name");
const upcomingBookingsTable = document.getElementById("upcoming-stays-tbody");
const pastBookingsTable = document.getElementById("past-stays-tbody");
const totalSpentTag = document.getElementById("total-spent");
const accordionWelcome = document.getElementById("accordion-welcome");
const dateGrandparent = document.getElementById("date-grandparent");
const dateInput = document.getElementById("date-input");
const backToCalButton = document.getElementById("back-to-cal");
const submitDateButton = document.getElementById("submit-date");
const dateError = document.getElementById("date-error");
const roomsGrandparent = document.getElementById("rooms-grandparent");
const roomAccHeader = document.getElementById("room-acc-header");
const availRoomsTable = document.getElementById("avail-rooms-table");
const roomsFilter = document.getElementById("rooms-filter");
const clearButton = document.getElementById("clear-filter");
const submitRoomButton = document.getElementById("submit-room");
const roomError = document.getElementById("room-error");
const confirmGrandparent = document.getElementById("confirm-grandparent");
const confirmAccHeader = document.getElementById("confirm-acc-header");
const detailsList = document.getElementById("details-list");
const editDetailsButton = document.getElementById("edit-details");
const confirmButton = document.getElementById("confirm-details");
const successGrandparent = document.getElementById("success-grandparent");
const successParent = document.getElementById("success-parent");
const homeButton = document.getElementById("home-button");
const statsDate = document.getElementById("stats-date");
const statsTable = document.getElementById("stats-table-body");
const adminAvailRoomsTable = document.getElementById("admin-avail-rooms-table");
const guestSearchInput = document.getElementById("guest-search-input");
const guestSearchButton = document.getElementById("guest-search-button");
const guestSearchTable = document.getElementById("guest-search-table");
const adminGuestBookingsTable = document.getElementById("admin-guest-bookings-table");
const adminPastBookingError = document.getElementById("admin-past-booking-error");
const adminRemoveBookingButton = document.getElementById("admin-remove-booking");
const adminDateInput = document.getElementById("admin-date-input");
const adminDateSearch = document.getElementById("admin-date-search");
const adminDateError = document.getElementById("admin-date-error");
const adminBookingRoomsTable = document.getElementById("admin-booking-rooms");
const adminRoomError = document.getElementById("admin-room-error");
const adminSubmitBookingButton = document.getElementById("admin-submit-booking");
const serverErrorSection = document.getElementById("server-error-section");
const serverErrorMessage = document.getElementById("server-error");

//----------------------EVENT LISTENERS----------------------//

window.addEventListener("load", () => fetchData([allBookingsURL, allGuestsURL, allRoomsURL]));

logo.addEventListener("click", () => location.reload());

passwordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    loginUser();
  };
});

loginButton.addEventListener("click", () => loginUser());

profileButton.addEventListener("click", () => {
  toggleAccordion(profileParent, profileButton);
  toggleAriaExpanded(profileButton);

  const profilePosition = profileParent.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({top: profilePosition, behavior: "smooth"});
});

bookButtonHeader.addEventListener("click", () => {
  let bookingConfirmedIsHidden = (successGrandparent.classList.contains("hide"));
  let bookingParentIsHidden = (bookParent.classList.contains("hide"));

  if (!bookingConfirmedIsHidden) {
    toggleAriaExpanded(bookButtonHeader);
    toggleHidden(successGrandparent);
    toggleHidden(bookParent);
  } else if (bookingParentIsHidden) {
    toggleAriaExpanded(bookButtonHeader);
    toggleHidden(dashParent);
    toggleHidden(bookParent);
  }

  const bookParentPosition = bookParent.getBoundingClientRect().top + window.pageYOffset - 50;
  window.scrollTo({top: bookParentPosition, behavior: "smooth"});
});

bookButtonAcc.addEventListener("click", () => {
  toggleAriaExpanded(bookButtonHeader);
  toggleHidden(dashParent);
  toggleHidden(bookParent);

  const bookParentPosition = bookParent.getBoundingClientRect().top + window.pageYOffset - 50;
  window.scrollTo({top: bookParentPosition, behavior: "smooth"});
});

aboutButton.addEventListener("click", () => {
  toggleAccordion(aboutParent, aboutButton);
  aboutParent.scrollIntoView({ behavior: "smooth" });
  toggleAriaExpanded(aboutButton);
});

submitDateButton.addEventListener("click", () => {
  let selectedDate = dateInput.value;
  if (!bookingList.getAvailableRooms(selectedDate).length) {
    dateError.innerText = "we're sorry! there are no available rooms for your selected date.";
    return;
  } else if (new Date(selectedDate) >= new Date(getReformattedCurrentDate())) {
    initNewBooking(selectedDate, guest);
    renderAvailableRooms(bookingList.getAvailableRooms(selectedDate));
    toggleBookingAccordion(dateGrandparent);
    toggleBookingAccordion(roomsGrandparent);
    dateError.innerText = "";

    const chooseRoomPosition = roomAccHeader.getBoundingClientRect().top + window.pageYOffset - 50;
    window.scrollTo({top: chooseRoomPosition, behavior: "smooth"});
  } else {
    dateError.innerText = "* please select a valid date";
  }
});

availRoomsTable.addEventListener("click", e => {
  if (e.target.parentNode.nodeName === "TBODY") { return }
  selectedRoom = Number(e.target.parentNode.dataset.roomNum);
  deactivateTableNodes();
  activateSelectedNode(e.target.parentNode);
});

availRoomsTable.addEventListener('keypress', e => {
  if (e.key === "Enter") {
    selectedRoom = Number(document.activeElement.dataset.roomNum);
    deactivateTableNodes();
    activateSelectedNode(document.activeElement);
  };
});

roomsFilter.addEventListener("change", () => {
  if (roomsFilter.value === "") { return };
  renderAvailableRooms(bookingList.getFilteredRooms(dateInput.value, roomsFilter.value));
  clearButton.removeAttribute("disabled");
});

clearButton.addEventListener("click", () => {
  renderAvailableRooms(bookingList.getAvailableRooms(dateInput.value));
  clearButton.setAttribute("disabled", "");
  roomsFilter.value = "";
});

backToCalButton.addEventListener("click", () => {
  toggleBookingAccordion(roomsGrandparent);
  toggleBookingAccordion(dateGrandparent);

  const bookParentPosition = bookParent.getBoundingClientRect().top + window.pageYOffset - 50;
  window.scrollTo({top: bookParentPosition, behavior: "smooth"});
});

submitRoomButton.addEventListener("click", () => {
  if (selectedRoom) {
    newBooking["roomNumber"] = selectedRoom;
    renderDetails();
    toggleBookingAccordion(roomsGrandparent);
    toggleBookingAccordion(confirmGrandparent);

    const confirmHeaderPosition = confirmAccHeader.getBoundingClientRect().top + window.pageYOffset - 50;
    window.scrollTo({top: confirmHeaderPosition, behavior: "smooth"});
  } else {
    roomError.innerText = "* please select a room";
  };
});

editDetailsButton.addEventListener("click", () => {
  toggleBookingAccordion(confirmGrandparent);
  toggleBookingAccordion(dateGrandparent);

  const bookParentPosition = bookParent.getBoundingClientRect().top + window.pageYOffset - 50;
  window.scrollTo({top: bookParentPosition, behavior: "smooth"});
});

confirmButton.addEventListener("click", () => {
  (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.postData)(newBooking, allBookingsURL)
    .then(response => response.json())
    .then(response => confirmedBookingId = response.newBooking.id)
    .then(() => (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(allBookingsURL))
    .then(data => {
      updateBookings(data.bookings);
      renderConfirmation();
      renderGuestDash();
      clearBookingMemory();
      clearErrors();
      toggleBookingAccordion(dateGrandparent);
      toggleBookingAccordion(confirmGrandparent);
      toggleHidden(bookParent);
      toggleHidden(successGrandparent);
      toggleAriaExpanded(bookButtonHeader);

      const userToolsPosition = userToolsView.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({top: userToolsPosition, behavior: "smooth"});
    })
});

homeButton.addEventListener("click", () => {
  toggleHidden(successGrandparent);
  toggleHidden(dashParent);

  window.scrollTo({top: body, behavior: "smooth"});
});

guestSearchButton.addEventListener("click", () => searchForUser());

guestSearchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    searchForUser();
  };
});

guestSearchTable.addEventListener("click", e => {
  let guestId = Number(e.target.parentNode.dataset.guestId);

  adminSelectGuest(guestId, e.target.parentNode);
});

guestSearchTable.addEventListener("keypress", e => {
  let guestId = Number(e.target.dataset.guestId);

  adminSelectGuest(guestId, e.target.parentNode);
});

adminGuestBookingsTable.addEventListener("click", e => {
  if (e.target.parentNode.classList.contains("admin-past-bookings")) {
    adminSelectedBooking = null;
  } else {
    adminSelectedBooking = e.target.parentNode.dataset.bookingId;
  };

  deactivateAdminBookingsNodes(".admin-guest-bookings");
  activateSelectedNode(e.target.parentNode);
});

adminGuestBookingsTable.addEventListener("keypress", e => {
  if (e.target.classList.contains("admin-past-bookings")) {
    adminSelectedBooking = null;
  } else {
    adminSelectedBooking = e.target.dataset.bookingId;
  };

  deactivateAdminBookingsNodes(".admin-guest-bookings");
  activateSelectedNode(e.target);
});

adminRemoveBookingButton.addEventListener("click", () => {
  if (!adminSelectedBooking) {
    adminPastBookingError.innerText = "* cannot remove a past booking";
  } else {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.deleteData)(`http://localhost:3001/api/v1/bookings/${adminSelectedBooking}`)
    .then(() => (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(allBookingsURL))
    .then(data => {
      updateBookings(data.bookings);

      adminSelectedBooking = null;
      adminPastBookingError.innerText = "";
      deactivateAdminBookingsNodes(".admin-guest-bookings");
      renderAdminGuestBookings(adminSelectedGuest);
      renderAdminView();
    });
  };
});

adminDateSearch.addEventListener("click", () => {
  let selectedDate = adminDateInput.value;

  if (!bookingList.getAvailableRooms(selectedDate).length) {
    adminDateError.innerText = "* no available rooms for selected date.";
    return;
  } else if (new Date(selectedDate) >= new Date(getReformattedCurrentDate())) {
    adminDateError.innerText = "";
    initNewBooking(selectedDate, adminSelectedGuest);
    renderAdminBookingRooms(bookingList.getAvailableRooms(selectedDate));
  } else {
    adminDateError.innerText = "* select a valid date";
  };
});

adminBookingRoomsTable.addEventListener("click", e => {
  adminSelectedRoom = Number(e.target.parentNode.dataset.roomNum);

  deactivateAdminBookingsNodes(".admin-avail-rooms");
  activateSelectedNode(e.target.parentNode);
});

adminBookingRoomsTable.addEventListener("keypress", e => {
  adminSelectedRoom = Number(e.target.dataset.roomNum);

  deactivateAdminBookingsNodes(".admin-avail-rooms");
  activateSelectedNode(e.target);
});

adminSubmitBookingButton.addEventListener("click", () => {
  if (!adminSelectedRoom) {
    adminRoomError.innerText = "* you must select a room first";
  } else {
    newBooking["roomNumber"] = adminSelectedRoom;
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.postData)(newBooking, allBookingsURL)
      .then(response => response.json())
      .then(response => confirmedBookingId = response.newBooking.id)
      .then(() => (0,_api_calls__WEBPACK_IMPORTED_MODULE_4__.getData)(allBookingsURL))
      .then(data => {
        updateBookings(data.bookings);
  
        clearBookingMemory();
        clearErrors();
        renderAdminView();
        renderAdminGuestBookings(adminSelectedGuest);
      });
  };
});

signOutButton.addEventListener("click", () => {
  let viewingAdmin = (!adminView.classList.contains("hide"));
  if (viewingAdmin) {
    toggleHidden(adminView);
    toggleHidden(adminHeaderSub);
    toggleHidden(guestHeaderSub);
  } else {
    toggleHidden(bannerParent);
    toggleHidden(userToolsView);
    toggleHidden(bookButtonHeader);
  };

  clearBookingMemory();
  clearErrors();
  toggleHidden(userLoginView);
  toggleHidden(signOutButton);
  body.classList.add("sign-in-body");
  window.scrollTo({top: body, behavior: "smooth"});
})

//----------------------EVENT HANDLERS----------------------//

function initPage() {
  initBookingList();
  initGuestList();
  window.scrollTo({top: body, behavior: "smooth"});
};

function loginUser() {
  let username = usernameInput.value;
  let password = passwordInput.value;
  let user = guestList.checkUserCredentials(username, password);

  if (username === "manager" && password === "overlook2021") {
    renderAdminView();
    displayAdminView();
    clearLoginFields();
  } else if (user) {
    guest = user;
    renderGuestDash();
    displayGuestDash();
    clearLoginFields();
  } else {
    displayInvalidLogin();
  };
};

function searchForUser() {
  resetAdminInterface();
  renderGuestSearchResults();
};

function adminSelectGuest(guestId, node) {
  adminSelectedGuest = guestList.guests.find(guest => guest.id === guestId);
  enableBookingControls();
  renderAdminGuestBookings(adminSelectedGuest);
  deactivateTableNodes();
  activateSelectedNode(node);
};

//----------------------DATA FUNCTIONS----------------------//

function initBookingList() {
  bookingList = new _src_classes_BookingList__WEBPACK_IMPORTED_MODULE_3__.default(allBookingsData, allRooms);
};

function initGuestList() {
  guestList = new _classes_GuestList__WEBPACK_IMPORTED_MODULE_5__.default(allGuestsData);
};

function initNewBooking(date, guest) {
  newBooking = {
    userID: guest.id,
    date: date.replace(/-/g, '/')
  };
};

function updateBookings(newData) {
  allBookingsData = newData;
  bookingList.bookings = bookingList.initBookings(allBookingsData);
};

function clearBookingMemory() {
  selectedRoom = null;
  newBooking = null;
  confirmedBookingId = null;
  adminSelectedRoom = null;
  adminBookingRoomsTable.innerHTML = "";
  dateInput.value = "";
};

function clearErrors() {
  dateError.innerText = "";
  roomError.innerText = "";
  loginError.innerText = "";
  adminRoomError.innerText = "";
  adminDateInput.value = "";
  adminPastBookingError.innerText = "";
};

function clearLoginFields() {
  usernameInput.value = "";
  passwordInput.value = "";
};

//----------------------UTILITY FUNCTIONS----------------------//

function getReformattedCurrentDate() {
  let currentDate = new Date();
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
};

//----------------------DOM UPDATING----------------------//

function toggleAccordion(element, button) {
  element.classList.toggle("show");
  button.classList.toggle("accordion-button-open");
};

function toggleBookingAccordion(element) {
  element.classList.toggle("show");
};

function renderGuestDash() {
  let bookingsObject = guest.getAllBookings(bookingList);

  accordionWelcome.innerText = `welcome ${guest.name}.`;
  guestNameDash.innerText = guest.name;
  renderBookingsTable(bookingsObject, upcomingBookingsTable, true);
  renderBookingsTable(bookingsObject, pastBookingsTable, false);
  totalSpentTag.innerText = `lifetime total spent: $${guest.getTotalSpent(bookingList).toFixed(2)}`;
};

function renderBookingsTable(bookingsObject, table, isFuture) {
  let bookings = isFuture ? "upcomingBookings" : "pastBookings";
  table.innerHTML = "";
  bookingsObject[bookings].forEach(booking => {
    table.innerHTML += `
      <tr tabindex="1">
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>${booking.costPerNight}</td>
      </tr>`;
  });
};

function toggleHidden(element) {
  element.classList.toggle("hide");
};

function renderAvailableRooms(availRooms) {
  availRoomsTable.innerHTML = "";
  availRooms.forEach(room => {
    availRoomsTable.innerHTML += `
      <tr class="avail-room-tr" data-room-num="${room.number}" tabindex="0" aria-selected="false">
        <td>${room.number}</td>
        <td>${room.numBeds} / ${room.bedSize}</td>
        <td>${room.hasBidet ? "yes" : "no"}</td>
        <td>${room.roomType}</td>
        <td>${room.costPerNight.toFixed(2)}</td>
      </tr>`;
  });
};

function deactivateTableNodes() {
  document.querySelectorAll("tr").forEach(node => {
    node.classList.remove("active");
    node.setAttribute("aria-selected", "false");
  });
};

function activateSelectedNode(element) {
  element.classList.add("active");
  element.setAttribute("aria-selected", "true");
};

function renderDetails() {
  let selectedRoom = bookingList.getRoomByNumber(newBooking.roomNumber);
  detailsList.innerHTML = "";
  detailsList.innerHTML = `
    <li class="guest-name-li">${guest.name}</li>
    <li>date: ${newBooking.date}</li>
    <li class="room-details-li">room details:</li>
    <ul class="room-details-ul">
      <li>room number: ${newBooking.roomNumber}</li>
      <li>number of beds: ${selectedRoom.numBeds}</li>
      <li>bed size: ${selectedRoom.bedSize}</li>
      <li>has bidet: ${selectedRoom.hasBidet ? "yes" : "no"}</li>
      <li>${selectedRoom.roomType}</li>
    </ul>
    <li class="total-li">total: <b>$${selectedRoom.costPerNight.toFixed(2)}</b></li>`;
};

function renderConfirmation() {
  successParent.innerHTML = "";
  successParent.innerHTML = `
    <h2>thank you ${guest.name}!</h2>
    <p>your room is booked!</p>
    <p>your confirmation code is:</p>
    <div class="conf-code">${confirmedBookingId}</div>`;
};

function toggleAriaExpanded(element) {
  if (element.getAttribute("aria-expanded") === "true") {
    element.setAttribute("aria-expanded", "false");
  } else {
    element.setAttribute("aria-expanded", "true");
  };
};

function displayInvalidLogin() {
  loginError.innerText = "* invalid username or password";
};

function displayGuestDash() {
  toggleHidden(userLoginView);
  toggleHidden(bookButtonHeader);
  toggleHidden(signOutButton);
  toggleHidden(bannerParent);
  toggleHidden(userToolsView);
  body.classList.remove("sign-in-body");
};

function renderAdminView() {
  renderDailyStats();
  renderAvailableRoomsTable();
};

function displayAdminView() {
  toggleHidden(guestHeaderSub);
  toggleHidden(userLoginView);
  toggleHidden(adminHeaderSub);
  toggleHidden(signOutButton);
  toggleHidden(adminView);
  body.classList.remove("sign-in-body");
};

function resetAdminInterface() {
  adminRemoveBookingButton.setAttribute("disabled", "");
  adminDateSearch.setAttribute("disabled", "");
  adminDateInput.setAttribute("disabled", "");
  adminSubmitBookingButton.setAttribute("disabled", "");
  adminGuestBookingsTable.innerHTML = "";
  adminBookingRoomsTable.innerHTML = "";
  adminDateError.innerText = "";
};

function getDOMDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

function renderDailyStats() {
  statsDate.innerText = `${getDOMDate()}`;

  let vacancyData = bookingList.getVacancyData(getReformattedCurrentDate());
  statsTable.innerHTML = `
    <tr class="admin-table-row">
      <td>rooms available:</td>
      <td>${vacancyData.vacant}</td>
      <td>${vacancyData.percentVacant}%</td>
    </tr>
    <tr class="admin-table-row">
      <td>rooms booked:</td>
      <td>${vacancyData.booked}</td>
      <td>${vacancyData.percentBooked}%</td>
    </tr>
    <tr class="admin-table-row">
      <td>total revenue:</td>
      <td colspan="2">$${bookingList.getTodaysRevenue(getReformattedCurrentDate()).toFixed(2)}</td>
    </tr>`;
};

function renderAvailableRoomsTable() {
  adminAvailRoomsTable.innerHTML = "";
  bookingList.getAvailableRooms(getReformattedCurrentDate()).forEach(room => {
    adminAvailRoomsTable.innerHTML +=`
      <tr class="admin-table-row" tabindex="2">
        <td>${room.number}</td>
        <td>${room.numBeds} / ${room.bedSize}</td>
        <td>${room.hasBidet ? "yes" : "no"}</td>
        <td>${room.roomType}</td>
        <td>$${room.costPerNight.toFixed(2)}</td>
      </tr>`;
  });
};

function renderGuestSearchResults() {
  guestSearchTable.innerHTML = "";
  guestList.searchGuests(guestSearchInput.value).forEach(guest => {
    guestSearchTable.innerHTML += `
      <tr class="admin-table-row guest-result-row" data-guest-id="${guest.id}" tabindex="0" aria-selected="false">
        <td>${guest.name}</td>
        <td>${guest.id}</td>
      </tr>`;
  });
};

function enableBookingControls() {
  adminRemoveBookingButton.removeAttribute("disabled");
  adminDateSearch.removeAttribute("disabled");
  adminDateInput.removeAttribute("disabled");
  adminSubmitBookingButton.removeAttribute("disabled");
};

function renderAdminGuestBookings(adminGuest) {
  adminGuestBookingsTable.innerHTML = "";
  let guestBookings = adminGuest.getAllBookings(bookingList);
  
  guestBookings.upcomingBookings.forEach(booking => {
    adminGuestBookingsTable.innerHTML += `
      <tr class="admin-table-row guest-result-row admin-guest-bookings" data-booking-id="${booking.id}" tabindex="1" aria-selected="false">
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>$${booking.costPerNight}</td>
      </tr>`;
  });

  guestBookings.pastBookings.forEach(booking => {
    adminGuestBookingsTable.innerHTML += `
      <tr class="admin-table-row guest-result-row admin-guest-bookings admin-past-bookings" data-booking-id="${booking.id}" tabindex="1" aria-selected="false">
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>$${booking.costPerNight}</td>
      </tr>`;
  });
};

function deactivateAdminBookingsNodes(className) {
  document.querySelectorAll(className).forEach(node => {
    node.classList.remove("active");
    node.setAttribute("aria-selected", "false");
  });
};

function renderAdminBookingRooms(availableRooms) {
  adminBookingRoomsTable.innerHTML = "";
  availableRooms.forEach(room => {
    adminBookingRoomsTable.innerHTML += `
    <tr class="admin-table-row guest-result-row admin-avail-rooms" data-room-num="${room.number}" tabindex="0" aria-selected="false">
      <td>${room.number}</td>
      <td>${room.numBeds} / ${room.bedSize}</td>
      <td>${room.hasBidet ? "yes" : "no"}</td>
      <td>${room.roomType}</td>
      <td>$${room.costPerNight.toFixed(2)}</td>
    </tr>`;
  });
};

function displayServerError() {
  [bannerParent, userLoginView, adminView, bookButtonHeader, signOutButton, userToolsView, bookParent, successGrandparent].forEach(element => {
    if (!element.classList.contains("hide")) {
      element.classList.add("hide");
    };
  });
  serverErrorSection.classList.remove("hide");
};
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map