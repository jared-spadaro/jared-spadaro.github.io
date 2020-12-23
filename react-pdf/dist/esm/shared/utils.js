/**
 * Checks if we're running in a browser environment.
 */
export var isBrowser = typeof window !== 'undefined';
/**
 * Checks whether we're running from a local file system.
 */

export var isLocalFileSystem = isBrowser && window.location.protocol === 'file:';
/**
 * Checks whether we're running on a production build or not.
 */

export var isProduction = process.env.NODE_ENV === 'production';
/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */

export var isDefined = function isDefined(variable) {
  return typeof variable !== 'undefined';
};
/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */

export var isProvided = function isProvided(variable) {
  return isDefined(variable) && variable !== null;
};
/**
 * Checkes whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */

export var isString = function isString(variable) {
  return typeof variable === 'string';
};
/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */

export var isArrayBuffer = function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
};
/**
 * Checkes whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */

export var isBlob = function isBlob(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a Blob on a non-browser environment.');
  }

  return variable instanceof Blob;
};
/**
 * Checkes whether a variable provided is a File.
 *
 * @param {*} variable Variable to check
 */

export var isFile = function isFile(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a File on a non-browser environment.');
  }

  return variable instanceof File;
};
/**
 * Checks whether a string provided is a data URI.
 *
 * @param {String} str String to check
 */

export var isDataURI = function isDataURI(str) {
  return isString(str) && /^data:/.test(str);
};
export var dataURItoUint8Array = function dataURItoUint8Array(dataURI) {
  if (!isDataURI(dataURI)) {
    throw new Error('dataURItoUint8Array was provided with an argument which is not a valid data URI.');
  }

  var byteString;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  var ia = new Uint8Array(byteString.length);

  for (var i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  return ia;
};
export var getPixelRatio = function getPixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
};

var consoleOnDev = function consoleOnDev(method) {
  if (!isProduction) {
    var _console;

    for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      message[_key - 1] = arguments[_key];
    }

    // eslint-disable-next-line no-console
    (_console = console)[method].apply(_console, message);
  }
};

export var warnOnDev = function warnOnDev() {
  for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    message[_key2] = arguments[_key2];
  }

  return consoleOnDev.apply(void 0, ['warn'].concat(message));
};
export var errorOnDev = function errorOnDev() {
  for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }

  return consoleOnDev.apply(void 0, ['error'].concat(message));
};
export var displayCORSWarning = function displayCORSWarning() {
  if (isLocalFileSystem) {
    warnOnDev('Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.');
  }
};
export var cancelRunningTask = function cancelRunningTask(runningTask) {
  if (runningTask && runningTask.cancel) runningTask.cancel();
};
export var makePageCallback = function makePageCallback(page, scale) {
  Object.defineProperty(page, 'width', {
    get: function get() {
      return this.view[2] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, 'height', {
    get: function get() {
      return this.view[3] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, 'originalWidth', {
    get: function get() {
      return this.view[2];
    },
    configurable: true
  });
  Object.defineProperty(page, 'originalHeight', {
    get: function get() {
      return this.view[3];
    },
    configurable: true
  });
  return page;
};
export var isCancelException = function isCancelException(error) {
  return error.name === 'RenderingCancelledException';
};
export var loadFromFile = function loadFromFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function () {
      return resolve(new Uint8Array(reader.result));
    };

    reader.onerror = function (event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          return reject(new Error('Error while reading a file: File not found.'));

        case event.target.error.NOT_READABLE_ERR:
          return reject(new Error('Error while reading a file: File not readable.'));

        case event.target.error.SECURITY_ERR:
          return reject(new Error('Error while reading a file: Security error.'));

        case event.target.error.ABORT_ERR:
          return reject(new Error('Error while reading a file: Aborted.'));

        default:
          return reject(new Error('Error while reading a file.'));
      }
    };

    reader.readAsArrayBuffer(file);
    return null;
  });
};