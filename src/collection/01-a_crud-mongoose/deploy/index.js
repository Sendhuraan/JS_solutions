/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/collection/01_crud-mongoose/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/collection/01_crud-mongoose/config/index.js":
/*!*********************************************************!*\
  !*** ./src/collection/01_crud-mongoose/config/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n  const DB_NAME = 'mern-quick-start-examples_01_crud-mongoose_users';\n  module.exports = {\n    env: \"development\" || false,\n    port: process.env.PORT || 3000,\n    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/' + DB_NAME\n  };\n})();\n\n//# sourceURL=webpack:///./src/collection/01_crud-mongoose/config/index.js?");

/***/ }),

/***/ "./src/collection/01_crud-mongoose/data/models/user.model.js":
/*!*******************************************************************!*\
  !*** ./src/collection/01_crud-mongoose/data/models/user.model.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n  const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n  const {\n    Schema\n  } = mongoose;\n  const UserSchema = new Schema({\n    firstName: String,\n    lastName: String,\n    likes: [String]\n  }); // Export Contact model\n\n  var User = module.exports = mongoose.model('User', UserSchema);\n})();\n\n//# sourceURL=webpack:///./src/collection/01_crud-mongoose/data/models/user.model.js?");

/***/ }),

/***/ "./src/collection/01_crud-mongoose/data/operations/user.operations.js":
/*!****************************************************************************!*\
  !*** ./src/collection/01_crud-mongoose/data/operations/user.operations.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n  var User = __webpack_require__(/*! ../models/user.model.js */ \"./src/collection/01_crud-mongoose/data/models/user.model.js\");\n\n  const addUser = function (firstName, lastName) {\n    var newUser = new User({\n      firstName,\n      lastName\n    });\n    newUser.save().then(() => {\n      console.log('User Inserted Successfully!');\n    });\n    return newUser;\n  };\n\n  const getUser = function (id) {\n    var retrievedUser = User.findById(id, function (err) {\n      if (err) {\n        console.log(err);\n      } else {\n        console.log('User Retrieved Successfully!');\n      }\n    });\n    return retrievedUser;\n  };\n\n  const removeUser = function (id) {\n    var deletedUser = User.deleteOne({\n      id\n    }, function (err) {\n      if (err) {\n        console.log(err);\n      } else {\n        console.log('User Deleted Successfully!');\n      }\n    });\n    return deletedUser;\n  };\n\n  var publicAPI = {\n    addUser,\n    getUser,\n    removeUser\n  };\n  module.exports = publicAPI;\n})();\n\n//# sourceURL=webpack:///./src/collection/01_crud-mongoose/data/operations/user.operations.js?");

/***/ }),

/***/ "./src/collection/01_crud-mongoose/index.js":
/*!**************************************************!*\
  !*** ./src/collection/01_crud-mongoose/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n  const path = __webpack_require__(/*! path */ \"path\");\n\n  const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n  const {\n    connection\n  } = mongoose;\n\n  var config = __webpack_require__(/*! ./config */ \"./src/collection/01_crud-mongoose/config/index.js\");\n\n  var {\n    addUser,\n    getUser,\n    removeUser\n  } = __webpack_require__(/*! ./data/operations/user.operations.js */ \"./src/collection/01_crud-mongoose/data/operations/user.operations.js\");\n\n  mongoose.Promise = global.Promise;\n  mongoose.connect(config.mongoUri, {\n    useNewUrlParser: true\n  }).catch(console.error);\n  connection.once('connected', async () => {\n    try {\n      // Create\n      const newUser = await addUser('John', 'Smith'); // Read\n\n      const user = await getUser(newUser.id); // Update\n\n      user.firstName = 'Sendhuraan';\n      user.lastName = 'NKK';\n      user.likes = ['cooking', 'watching movies', 'ice cream'];\n      await user.save();\n      console.log(JSON.stringify(user, null, 4)); // Delete\n\n      await removeUser(user.id);\n    } catch (error) {\n      console.dir(error.message, {\n        colors: true\n      });\n    } finally {\n      await connection.close();\n    }\n  });\n})();\n\n//# sourceURL=webpack:///./src/collection/01_crud-mongoose/index.js?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });