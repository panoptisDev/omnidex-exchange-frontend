'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var contracts = require('@ethersproject/contracts');
var networks$1 = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');

var _SOLIDITY_TYPE_MAXIMA;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 40] = "MAINNET";
})(exports.ChainId || (exports.ChainId = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var FACTORY_ADDRESS = '0x5D1A1293cb6d2BA0BB40c39083F7506C24545192';
var INIT_CODE_HASH = '0x4d10d387ef77de5c32218603f5dca3b354c92a472abfd9b306c8a0903389595f';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var FEES_NUMERATOR = /*#__PURE__*/JSBI.BigInt(9975);
var FEES_DENOMINATOR = /*#__PURE__*/JSBI.BigInt(10000);
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */

Currency.ETHER = /*#__PURE__*/new Currency(18, 'TLOS', 'TLOS');
var ETHER = Currency.ETHER;

var _WETH;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E', 18, 'WTLOS', 'Wrapped TLOS'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.ether = function ether(amount) {
    return new CurrencyAmount(ETHER, amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var PAIR_ADDRESS_CACHE = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB) {
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token), 18, 'Charm-LP', 'Omnidex LPs');
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB) {
    var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE$t === void 0 ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(FACTORY_ADDRESS, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH), _extends2)), _extends3));
    }

    return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, FEES_NUMERATOR);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, FEES_DENOMINATOR), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), FEES_DENOMINATOR);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), FEES_NUMERATOR);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHER) return new TokenAmount(WETH[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHER) return WETH[chainId];
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : route.input === ETHER ? CurrencyAmount.ether(amounts[0].raw) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : route.output === ETHER ? CurrencyAmount.ether(amounts[amounts.length - 1].raw) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Pancake Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency === ETHER;
    var etherOut = trade.outputAmount.currency === ETHER; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(!('ttl' in options) || options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = 'ttl' in options ? "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16) : "0x" + options.deadline.toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;

        if (etherIn) {
          methodName = 'swapETHForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var contractName = "IOmnidexPair";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode = "0x";
var deployedBytecode = "0x";
var sourceMap = "";
var deployedSourceMap = "";
var source = "pragma solidity >=0.5.0;\r\n\r\ninterface IOmnidexPair {\r\n    event Approval(address indexed owner, address indexed spender, uint value);\r\n    event Transfer(address indexed from, address indexed to, uint value);\r\n\r\n    function name() external pure returns (string memory);\r\n    function symbol() external pure returns (string memory);\r\n    function decimals() external pure returns (uint8);\r\n    function totalSupply() external view returns (uint);\r\n    function balanceOf(address owner) external view returns (uint);\r\n    function allowance(address owner, address spender) external view returns (uint);\r\n\r\n    function approve(address spender, uint value) external returns (bool);\r\n    function transfer(address to, uint value) external returns (bool);\r\n    function transferFrom(address from, address to, uint value) external returns (bool);\r\n\r\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\r\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\r\n    function nonces(address owner) external view returns (uint);\r\n\r\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\r\n\r\n    event Mint(address indexed sender, uint amount0, uint amount1);\r\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\r\n    event Swap(\r\n        address indexed sender,\r\n        uint amount0In,\r\n        uint amount1In,\r\n        uint amount0Out,\r\n        uint amount1Out,\r\n        address indexed to\r\n    );\r\n    event Sync(uint112 reserve0, uint112 reserve1);\r\n\r\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\r\n    function factory() external view returns (address);\r\n    function token0() external view returns (address);\r\n    function token1() external view returns (address);\r\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\r\n    function price0CumulativeLast() external view returns (uint);\r\n    function price1CumulativeLast() external view returns (uint);\r\n    function kLast() external view returns (uint);\r\n\r\n    function mint(address to) external returns (uint liquidity);\r\n    function burn(address to) external returns (uint amount0, uint amount1);\r\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;\r\n    function skim(address to) external;\r\n    function sync() external;\r\n\r\n    function initialize(address, address) external;\r\n}\r\n";
var ast = {
	absolutePath: "project:/contracts/interfaces/IOmnidexPair.sol",
	exportedSymbols: {
		IOmnidexPair: [
			2197
		]
	},
	id: 2198,
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 1957,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "0:24:8"
		},
		{
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 2197,
			linearizedBaseContracts: [
				2197
			],
			name: "IOmnidexPair",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 1965,
					name: "Approval",
					nodeType: "EventDefinition",
					parameters: {
						id: 1964,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1959,
								indexed: true,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "73:21:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1958,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "73:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1961,
								indexed: true,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "96:23:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1960,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "96:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1963,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 1965,
								src: "121:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1962,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "121:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "72:60:8"
					},
					src: "58:75:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 1973,
					name: "Transfer",
					nodeType: "EventDefinition",
					parameters: {
						id: 1972,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1967,
								indexed: true,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 1973,
								src: "154:20:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1966,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "154:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1969,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 1973,
								src: "176:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1968,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "176:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 1971,
								indexed: false,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 1973,
								src: "196:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1970,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "196:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "153:54:8"
					},
					src: "139:69:8"
				},
				{
					body: null,
					documentation: null,
					id: 1978,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "name",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1974,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "229:2:8"
					},
					returnParameters: {
						id: 1977,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1976,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1978,
								src: "255:13:8",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 1975,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "255:6:8",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "254:15:8"
					},
					scope: 2197,
					src: "216:54:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1983,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "symbol",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1979,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "291:2:8"
					},
					returnParameters: {
						id: 1982,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1981,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1983,
								src: "317:13:8",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 1980,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "317:6:8",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "316:15:8"
					},
					scope: 2197,
					src: "276:56:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1988,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "decimals",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1984,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "355:2:8"
					},
					returnParameters: {
						id: 1987,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1986,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1988,
								src: "381:5:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 1985,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "381:5:8",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "380:7:8"
					},
					scope: 2197,
					src: "338:50:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 1993,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "totalSupply",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1989,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "414:2:8"
					},
					returnParameters: {
						id: 1992,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1991,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 1993,
								src: "440:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1990,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "440:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "439:6:8"
					},
					scope: 2197,
					src: "394:52:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2000,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "balanceOf",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 1996,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1995,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2000,
								src: "471:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 1994,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "471:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "470:15:8"
					},
					returnParameters: {
						id: 1999,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 1998,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2000,
								src: "509:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 1997,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "509:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "508:6:8"
					},
					scope: 2197,
					src: "452:63:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2009,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allowance",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2005,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2002,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2009,
								src: "540:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2001,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "540:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2004,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2009,
								src: "555:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2003,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "555:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "539:32:8"
					},
					returnParameters: {
						id: 2008,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2007,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2009,
								src: "595:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2006,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "595:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "594:6:8"
					},
					scope: 2197,
					src: "521:80:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2018,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "approve",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2014,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2011,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2018,
								src: "626:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2010,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "626:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2013,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2018,
								src: "643:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2012,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "643:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "625:29:8"
					},
					returnParameters: {
						id: 2017,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2016,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2018,
								src: "673:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2015,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "673:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "672:6:8"
					},
					scope: 2197,
					src: "609:70:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2027,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transfer",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2023,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2020,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2027,
								src: "703:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2019,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "703:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2022,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2027,
								src: "715:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2021,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "715:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "702:24:8"
					},
					returnParameters: {
						id: 2026,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2025,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2027,
								src: "745:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2024,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "745:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "744:6:8"
					},
					scope: 2197,
					src: "685:66:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2038,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transferFrom",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2034,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2029,
								name: "from",
								nodeType: "VariableDeclaration",
								scope: 2038,
								src: "779:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2028,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "779:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2031,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2038,
								src: "793:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2030,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "793:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2033,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2038,
								src: "805:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2032,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "805:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "778:38:8"
					},
					returnParameters: {
						id: 2037,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2036,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2038,
								src: "835:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 2035,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "835:4:8",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "834:6:8"
					},
					scope: 2197,
					src: "757:84:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2043,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "DOMAIN_SEPARATOR",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2039,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "874:2:8"
					},
					returnParameters: {
						id: 2042,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2041,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2043,
								src: "900:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2040,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "900:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "899:9:8"
					},
					scope: 2197,
					src: "849:60:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2048,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "PERMIT_TYPEHASH",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2044,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "939:2:8"
					},
					returnParameters: {
						id: 2047,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2046,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2048,
								src: "965:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2045,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "965:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "964:9:8"
					},
					scope: 2197,
					src: "915:59:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2055,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "nonces",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2051,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2050,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2055,
								src: "996:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2049,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "996:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "995:15:8"
					},
					returnParameters: {
						id: 2054,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2053,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2055,
								src: "1034:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2052,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1034:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1033:6:8"
					},
					scope: 2197,
					src: "980:60:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2072,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "permit",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2070,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2057,
								name: "owner",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1064:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2056,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1064:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2059,
								name: "spender",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1079:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2058,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1079:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2061,
								name: "value",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1096:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2060,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1096:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2063,
								name: "deadline",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1108:13:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2062,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1108:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2065,
								name: "v",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1123:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 2064,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "1123:5:8",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2067,
								name: "r",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1132:9:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2066,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1132:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2069,
								name: "s",
								nodeType: "VariableDeclaration",
								scope: 2072,
								src: "1143:9:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 2068,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1143:7:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1063:90:8"
					},
					returnParameters: {
						id: 2071,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1162:0:8"
					},
					scope: 2197,
					src: "1048:115:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2080,
					name: "Mint",
					nodeType: "EventDefinition",
					parameters: {
						id: 2079,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2074,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2080,
								src: "1182:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2073,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1182:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2076,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2080,
								src: "1206:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2075,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1206:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2078,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2080,
								src: "1220:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2077,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1220:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1181:52:8"
					},
					src: "1171:63:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2090,
					name: "Burn",
					nodeType: "EventDefinition",
					parameters: {
						id: 2089,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2082,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2090,
								src: "1251:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2081,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1251:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2084,
								indexed: false,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2090,
								src: "1275:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2083,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1275:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2086,
								indexed: false,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2090,
								src: "1289:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2085,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1289:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2088,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2090,
								src: "1303:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2087,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1303:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1250:72:8"
					},
					src: "1240:83:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2104,
					name: "Swap",
					nodeType: "EventDefinition",
					parameters: {
						id: 2103,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2092,
								indexed: true,
								name: "sender",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1350:22:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2091,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1350:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2094,
								indexed: false,
								name: "amount0In",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1383:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2093,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1383:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2096,
								indexed: false,
								name: "amount1In",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1408:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2095,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1408:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2098,
								indexed: false,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1433:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2097,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1433:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2100,
								indexed: false,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1459:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2099,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1459:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2102,
								indexed: true,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2104,
								src: "1485:18:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2101,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1485:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1339:171:8"
					},
					src: "1329:182:8"
				},
				{
					anonymous: false,
					documentation: null,
					id: 2110,
					name: "Sync",
					nodeType: "EventDefinition",
					parameters: {
						id: 2109,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2106,
								indexed: false,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2110,
								src: "1528:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2105,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1528:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2108,
								indexed: false,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2110,
								src: "1546:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2107,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1546:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1527:36:8"
					},
					src: "1517:47:8"
				},
				{
					body: null,
					documentation: null,
					id: 2115,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "MINIMUM_LIQUIDITY",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2111,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1598:2:8"
					},
					returnParameters: {
						id: 2114,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2113,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2115,
								src: "1624:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2112,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1624:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1623:6:8"
					},
					scope: 2197,
					src: "1572:58:8",
					stateMutability: "pure",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2120,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "factory",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2116,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1652:2:8"
					},
					returnParameters: {
						id: 2119,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2118,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2120,
								src: "1678:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2117,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1678:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1677:9:8"
					},
					scope: 2197,
					src: "1636:51:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2125,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token0",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2121,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1708:2:8"
					},
					returnParameters: {
						id: 2124,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2123,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2125,
								src: "1734:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2122,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1734:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1733:9:8"
					},
					scope: 2197,
					src: "1693:50:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2130,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token1",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2126,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1764:2:8"
					},
					returnParameters: {
						id: 2129,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2128,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2130,
								src: "1790:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2127,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1790:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1789:9:8"
					},
					scope: 2197,
					src: "1749:50:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2139,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getReserves",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2131,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1825:2:8"
					},
					returnParameters: {
						id: 2138,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2133,
								name: "reserve0",
								nodeType: "VariableDeclaration",
								scope: 2139,
								src: "1851:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2132,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1851:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2135,
								name: "reserve1",
								nodeType: "VariableDeclaration",
								scope: 2139,
								src: "1869:16:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 2134,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1869:7:8",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2137,
								name: "blockTimestampLast",
								nodeType: "VariableDeclaration",
								scope: 2139,
								src: "1887:25:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 2136,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "1887:6:8",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1850:63:8"
					},
					scope: 2197,
					src: "1805:109:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2144,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price0CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2140,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1949:2:8"
					},
					returnParameters: {
						id: 2143,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2142,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2144,
								src: "1975:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2141,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1975:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1974:6:8"
					},
					scope: 2197,
					src: "1920:61:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2149,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price1CumulativeLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2145,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2016:2:8"
					},
					returnParameters: {
						id: 2148,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2147,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2149,
								src: "2042:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2146,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2042:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2041:6:8"
					},
					scope: 2197,
					src: "1987:61:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2154,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "kLast",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2150,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2068:2:8"
					},
					returnParameters: {
						id: 2153,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2152,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2154,
								src: "2094:4:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2151,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2094:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2093:6:8"
					},
					scope: 2197,
					src: "2054:46:8",
					stateMutability: "view",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2161,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "mint",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2157,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2156,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2161,
								src: "2122:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2155,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2122:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2121:12:8"
					},
					returnParameters: {
						id: 2160,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2159,
								name: "liquidity",
								nodeType: "VariableDeclaration",
								scope: 2161,
								src: "2152:14:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2158,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2152:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2151:16:8"
					},
					scope: 2197,
					src: "2108:60:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2170,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "burn",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2164,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2163,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2170,
								src: "2188:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2162,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2188:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2187:12:8"
					},
					returnParameters: {
						id: 2169,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2166,
								name: "amount0",
								nodeType: "VariableDeclaration",
								scope: 2170,
								src: "2218:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2165,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2218:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2168,
								name: "amount1",
								nodeType: "VariableDeclaration",
								scope: 2170,
								src: "2232:12:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2167,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2232:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2217:28:8"
					},
					scope: 2197,
					src: "2174:72:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2181,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swap",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2179,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2172,
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "2266:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2171,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2266:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2174,
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "2283:15:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 2173,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2283:4:8",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2176,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "2300:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2175,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2300:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2178,
								name: "data",
								nodeType: "VariableDeclaration",
								scope: 2181,
								src: "2312:19:8",
								stateVariable: false,
								storageLocation: "calldata",
								typeDescriptions: {
									typeIdentifier: "t_bytes_calldata_ptr",
									typeString: "bytes"
								},
								typeName: {
									id: 2177,
									name: "bytes",
									nodeType: "ElementaryTypeName",
									src: "2312:5:8",
									typeDescriptions: {
										typeIdentifier: "t_bytes_storage_ptr",
										typeString: "bytes"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2265:67:8"
					},
					returnParameters: {
						id: 2180,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2341:0:8"
					},
					scope: 2197,
					src: "2252:90:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2186,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "skim",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2184,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2183,
								name: "to",
								nodeType: "VariableDeclaration",
								scope: 2186,
								src: "2362:10:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2182,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2362:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2361:12:8"
					},
					returnParameters: {
						id: 2185,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2382:0:8"
					},
					scope: 2197,
					src: "2348:35:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2189,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "sync",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2187,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2402:2:8"
					},
					returnParameters: {
						id: 2188,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2413:0:8"
					},
					scope: 2197,
					src: "2389:25:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					id: 2196,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "initialize",
					nodeType: "FunctionDefinition",
					parameters: {
						id: 2194,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 2191,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2196,
								src: "2442:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2190,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2442:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 2193,
								name: "",
								nodeType: "VariableDeclaration",
								scope: 2196,
								src: "2451:7:8",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 2192,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2451:7:8",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2441:18:8"
					},
					returnParameters: {
						id: 2195,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2468:0:8"
					},
					scope: 2197,
					src: "2422:47:8",
					stateMutability: "nonpayable",
					superFunction: null,
					visibility: "external"
				}
			],
			scope: 2198,
			src: "28:2444:8"
		}
	],
	src: "0:2474:8"
};
var legacyAST = {
	attributes: {
		absolutePath: "project:/contracts/interfaces/IOmnidexPair.sol",
		exportedSymbols: {
			IOmnidexPair: [
				2197
			]
		}
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 1957,
			name: "PragmaDirective",
			src: "0:24:8"
		},
		{
			attributes: {
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					2197
				],
				name: "IOmnidexPair",
				scope: 2198
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Approval"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "owner",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1958,
											name: "ElementaryTypeName",
											src: "73:7:8"
										}
									],
									id: 1959,
									name: "VariableDeclaration",
									src: "73:21:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "spender",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1960,
											name: "ElementaryTypeName",
											src: "96:7:8"
										}
									],
									id: 1961,
									name: "VariableDeclaration",
									src: "96:23:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 1965,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1962,
											name: "ElementaryTypeName",
											src: "121:4:8"
										}
									],
									id: 1963,
									name: "VariableDeclaration",
									src: "121:10:8"
								}
							],
							id: 1964,
							name: "ParameterList",
							src: "72:60:8"
						}
					],
					id: 1965,
					name: "EventDefinition",
					src: "58:75:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Transfer"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "from",
										scope: 1973,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1966,
											name: "ElementaryTypeName",
											src: "154:7:8"
										}
									],
									id: 1967,
									name: "VariableDeclaration",
									src: "154:20:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 1973,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1968,
											name: "ElementaryTypeName",
											src: "176:7:8"
										}
									],
									id: 1969,
									name: "VariableDeclaration",
									src: "176:18:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "value",
										scope: 1973,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1970,
											name: "ElementaryTypeName",
											src: "196:4:8"
										}
									],
									id: 1971,
									name: "VariableDeclaration",
									src: "196:10:8"
								}
							],
							id: 1972,
							name: "ParameterList",
							src: "153:54:8"
						}
					],
					id: 1973,
					name: "EventDefinition",
					src: "139:69:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "name",
						scope: 2197,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1974,
							name: "ParameterList",
							src: "229:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1978,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 1975,
											name: "ElementaryTypeName",
											src: "255:6:8"
										}
									],
									id: 1976,
									name: "VariableDeclaration",
									src: "255:13:8"
								}
							],
							id: 1977,
							name: "ParameterList",
							src: "254:15:8"
						}
					],
					id: 1978,
					name: "FunctionDefinition",
					src: "216:54:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "symbol",
						scope: 2197,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1979,
							name: "ParameterList",
							src: "291:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1983,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 1980,
											name: "ElementaryTypeName",
											src: "317:6:8"
										}
									],
									id: 1981,
									name: "VariableDeclaration",
									src: "317:13:8"
								}
							],
							id: 1982,
							name: "ParameterList",
							src: "316:15:8"
						}
					],
					id: 1983,
					name: "FunctionDefinition",
					src: "276:56:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "decimals",
						scope: 2197,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1984,
							name: "ParameterList",
							src: "355:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1988,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 1985,
											name: "ElementaryTypeName",
											src: "381:5:8"
										}
									],
									id: 1986,
									name: "VariableDeclaration",
									src: "381:5:8"
								}
							],
							id: 1987,
							name: "ParameterList",
							src: "380:7:8"
						}
					],
					id: 1988,
					name: "FunctionDefinition",
					src: "338:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "totalSupply",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 1989,
							name: "ParameterList",
							src: "414:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 1993,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1990,
											name: "ElementaryTypeName",
											src: "440:4:8"
										}
									],
									id: 1991,
									name: "VariableDeclaration",
									src: "440:4:8"
								}
							],
							id: 1992,
							name: "ParameterList",
							src: "439:6:8"
						}
					],
					id: 1993,
					name: "FunctionDefinition",
					src: "394:52:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "balanceOf",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2000,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 1994,
											name: "ElementaryTypeName",
											src: "471:7:8"
										}
									],
									id: 1995,
									name: "VariableDeclaration",
									src: "471:13:8"
								}
							],
							id: 1996,
							name: "ParameterList",
							src: "470:15:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2000,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 1997,
											name: "ElementaryTypeName",
											src: "509:4:8"
										}
									],
									id: 1998,
									name: "VariableDeclaration",
									src: "509:4:8"
								}
							],
							id: 1999,
							name: "ParameterList",
							src: "508:6:8"
						}
					],
					id: 2000,
					name: "FunctionDefinition",
					src: "452:63:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allowance",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2009,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2001,
											name: "ElementaryTypeName",
											src: "540:7:8"
										}
									],
									id: 2002,
									name: "VariableDeclaration",
									src: "540:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2009,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2003,
											name: "ElementaryTypeName",
											src: "555:7:8"
										}
									],
									id: 2004,
									name: "VariableDeclaration",
									src: "555:15:8"
								}
							],
							id: 2005,
							name: "ParameterList",
							src: "539:32:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2009,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2006,
											name: "ElementaryTypeName",
											src: "595:4:8"
										}
									],
									id: 2007,
									name: "VariableDeclaration",
									src: "595:4:8"
								}
							],
							id: 2008,
							name: "ParameterList",
							src: "594:6:8"
						}
					],
					id: 2009,
					name: "FunctionDefinition",
					src: "521:80:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "approve",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2018,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2010,
											name: "ElementaryTypeName",
											src: "626:7:8"
										}
									],
									id: 2011,
									name: "VariableDeclaration",
									src: "626:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2018,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2012,
											name: "ElementaryTypeName",
											src: "643:4:8"
										}
									],
									id: 2013,
									name: "VariableDeclaration",
									src: "643:10:8"
								}
							],
							id: 2014,
							name: "ParameterList",
							src: "625:29:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2018,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2015,
											name: "ElementaryTypeName",
											src: "673:4:8"
										}
									],
									id: 2016,
									name: "VariableDeclaration",
									src: "673:4:8"
								}
							],
							id: 2017,
							name: "ParameterList",
							src: "672:6:8"
						}
					],
					id: 2018,
					name: "FunctionDefinition",
					src: "609:70:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transfer",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2027,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2019,
											name: "ElementaryTypeName",
											src: "703:7:8"
										}
									],
									id: 2020,
									name: "VariableDeclaration",
									src: "703:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2027,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2021,
											name: "ElementaryTypeName",
											src: "715:4:8"
										}
									],
									id: 2022,
									name: "VariableDeclaration",
									src: "715:10:8"
								}
							],
							id: 2023,
							name: "ParameterList",
							src: "702:24:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2027,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2024,
											name: "ElementaryTypeName",
											src: "745:4:8"
										}
									],
									id: 2025,
									name: "VariableDeclaration",
									src: "745:4:8"
								}
							],
							id: 2026,
							name: "ParameterList",
							src: "744:6:8"
						}
					],
					id: 2027,
					name: "FunctionDefinition",
					src: "685:66:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transferFrom",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "from",
										scope: 2038,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2028,
											name: "ElementaryTypeName",
											src: "779:7:8"
										}
									],
									id: 2029,
									name: "VariableDeclaration",
									src: "779:12:8"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2038,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2030,
											name: "ElementaryTypeName",
											src: "793:7:8"
										}
									],
									id: 2031,
									name: "VariableDeclaration",
									src: "793:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2038,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2032,
											name: "ElementaryTypeName",
											src: "805:4:8"
										}
									],
									id: 2033,
									name: "VariableDeclaration",
									src: "805:10:8"
								}
							],
							id: 2034,
							name: "ParameterList",
							src: "778:38:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2038,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 2035,
											name: "ElementaryTypeName",
											src: "835:4:8"
										}
									],
									id: 2036,
									name: "VariableDeclaration",
									src: "835:4:8"
								}
							],
							id: 2037,
							name: "ParameterList",
							src: "834:6:8"
						}
					],
					id: 2038,
					name: "FunctionDefinition",
					src: "757:84:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "DOMAIN_SEPARATOR",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2039,
							name: "ParameterList",
							src: "874:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2043,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2040,
											name: "ElementaryTypeName",
											src: "900:7:8"
										}
									],
									id: 2041,
									name: "VariableDeclaration",
									src: "900:7:8"
								}
							],
							id: 2042,
							name: "ParameterList",
							src: "899:9:8"
						}
					],
					id: 2043,
					name: "FunctionDefinition",
					src: "849:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "PERMIT_TYPEHASH",
						scope: 2197,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2044,
							name: "ParameterList",
							src: "939:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2048,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2045,
											name: "ElementaryTypeName",
											src: "965:7:8"
										}
									],
									id: 2046,
									name: "VariableDeclaration",
									src: "965:7:8"
								}
							],
							id: 2047,
							name: "ParameterList",
							src: "964:9:8"
						}
					],
					id: 2048,
					name: "FunctionDefinition",
					src: "915:59:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "nonces",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2055,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2049,
											name: "ElementaryTypeName",
											src: "996:7:8"
										}
									],
									id: 2050,
									name: "VariableDeclaration",
									src: "996:13:8"
								}
							],
							id: 2051,
							name: "ParameterList",
							src: "995:15:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2055,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2052,
											name: "ElementaryTypeName",
											src: "1034:4:8"
										}
									],
									id: 2053,
									name: "VariableDeclaration",
									src: "1034:4:8"
								}
							],
							id: 2054,
							name: "ParameterList",
							src: "1033:6:8"
						}
					],
					id: 2055,
					name: "FunctionDefinition",
					src: "980:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "permit",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "owner",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2056,
											name: "ElementaryTypeName",
											src: "1064:7:8"
										}
									],
									id: 2057,
									name: "VariableDeclaration",
									src: "1064:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "spender",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2058,
											name: "ElementaryTypeName",
											src: "1079:7:8"
										}
									],
									id: 2059,
									name: "VariableDeclaration",
									src: "1079:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "value",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2060,
											name: "ElementaryTypeName",
											src: "1096:4:8"
										}
									],
									id: 2061,
									name: "VariableDeclaration",
									src: "1096:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "deadline",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2062,
											name: "ElementaryTypeName",
											src: "1108:4:8"
										}
									],
									id: 2063,
									name: "VariableDeclaration",
									src: "1108:13:8"
								},
								{
									attributes: {
										constant: false,
										name: "v",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 2064,
											name: "ElementaryTypeName",
											src: "1123:5:8"
										}
									],
									id: 2065,
									name: "VariableDeclaration",
									src: "1123:7:8"
								},
								{
									attributes: {
										constant: false,
										name: "r",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2066,
											name: "ElementaryTypeName",
											src: "1132:7:8"
										}
									],
									id: 2067,
									name: "VariableDeclaration",
									src: "1132:9:8"
								},
								{
									attributes: {
										constant: false,
										name: "s",
										scope: 2072,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 2068,
											name: "ElementaryTypeName",
											src: "1143:7:8"
										}
									],
									id: 2069,
									name: "VariableDeclaration",
									src: "1143:9:8"
								}
							],
							id: 2070,
							name: "ParameterList",
							src: "1063:90:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2071,
							name: "ParameterList",
							src: "1162:0:8"
						}
					],
					id: 2072,
					name: "FunctionDefinition",
					src: "1048:115:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Mint"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2080,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2073,
											name: "ElementaryTypeName",
											src: "1182:7:8"
										}
									],
									id: 2074,
									name: "VariableDeclaration",
									src: "1182:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2080,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2075,
											name: "ElementaryTypeName",
											src: "1206:4:8"
										}
									],
									id: 2076,
									name: "VariableDeclaration",
									src: "1206:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2080,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2077,
											name: "ElementaryTypeName",
											src: "1220:4:8"
										}
									],
									id: 2078,
									name: "VariableDeclaration",
									src: "1220:12:8"
								}
							],
							id: 2079,
							name: "ParameterList",
							src: "1181:52:8"
						}
					],
					id: 2080,
					name: "EventDefinition",
					src: "1171:63:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Burn"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2090,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2081,
											name: "ElementaryTypeName",
											src: "1251:7:8"
										}
									],
									id: 2082,
									name: "VariableDeclaration",
									src: "1251:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0",
										scope: 2090,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2083,
											name: "ElementaryTypeName",
											src: "1275:4:8"
										}
									],
									id: 2084,
									name: "VariableDeclaration",
									src: "1275:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1",
										scope: 2090,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2085,
											name: "ElementaryTypeName",
											src: "1289:4:8"
										}
									],
									id: 2086,
									name: "VariableDeclaration",
									src: "1289:12:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2090,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2087,
											name: "ElementaryTypeName",
											src: "1303:7:8"
										}
									],
									id: 2088,
									name: "VariableDeclaration",
									src: "1303:18:8"
								}
							],
							id: 2089,
							name: "ParameterList",
							src: "1250:72:8"
						}
					],
					id: 2090,
					name: "EventDefinition",
					src: "1240:83:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Swap"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "sender",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2091,
											name: "ElementaryTypeName",
											src: "1350:7:8"
										}
									],
									id: 2092,
									name: "VariableDeclaration",
									src: "1350:22:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0In",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2093,
											name: "ElementaryTypeName",
											src: "1383:4:8"
										}
									],
									id: 2094,
									name: "VariableDeclaration",
									src: "1383:14:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1In",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2095,
											name: "ElementaryTypeName",
											src: "1408:4:8"
										}
									],
									id: 2096,
									name: "VariableDeclaration",
									src: "1408:14:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount0Out",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2097,
											name: "ElementaryTypeName",
											src: "1433:4:8"
										}
									],
									id: 2098,
									name: "VariableDeclaration",
									src: "1433:15:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "amount1Out",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2099,
											name: "ElementaryTypeName",
											src: "1459:4:8"
										}
									],
									id: 2100,
									name: "VariableDeclaration",
									src: "1459:15:8"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										name: "to",
										scope: 2104,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2101,
											name: "ElementaryTypeName",
											src: "1485:7:8"
										}
									],
									id: 2102,
									name: "VariableDeclaration",
									src: "1485:18:8"
								}
							],
							id: 2103,
							name: "ParameterList",
							src: "1339:171:8"
						}
					],
					id: 2104,
					name: "EventDefinition",
					src: "1329:182:8"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Sync"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve0",
										scope: 2110,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2105,
											name: "ElementaryTypeName",
											src: "1528:7:8"
										}
									],
									id: 2106,
									name: "VariableDeclaration",
									src: "1528:16:8"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										name: "reserve1",
										scope: 2110,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2107,
											name: "ElementaryTypeName",
											src: "1546:7:8"
										}
									],
									id: 2108,
									name: "VariableDeclaration",
									src: "1546:16:8"
								}
							],
							id: 2109,
							name: "ParameterList",
							src: "1527:36:8"
						}
					],
					id: 2110,
					name: "EventDefinition",
					src: "1517:47:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "MINIMUM_LIQUIDITY",
						scope: 2197,
						stateMutability: "pure",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2111,
							name: "ParameterList",
							src: "1598:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2115,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2112,
											name: "ElementaryTypeName",
											src: "1624:4:8"
										}
									],
									id: 2113,
									name: "VariableDeclaration",
									src: "1624:4:8"
								}
							],
							id: 2114,
							name: "ParameterList",
							src: "1623:6:8"
						}
					],
					id: 2115,
					name: "FunctionDefinition",
					src: "1572:58:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "factory",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2116,
							name: "ParameterList",
							src: "1652:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2120,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2117,
											name: "ElementaryTypeName",
											src: "1678:7:8"
										}
									],
									id: 2118,
									name: "VariableDeclaration",
									src: "1678:7:8"
								}
							],
							id: 2119,
							name: "ParameterList",
							src: "1677:9:8"
						}
					],
					id: 2120,
					name: "FunctionDefinition",
					src: "1636:51:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token0",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2121,
							name: "ParameterList",
							src: "1708:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2125,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2122,
											name: "ElementaryTypeName",
											src: "1734:7:8"
										}
									],
									id: 2123,
									name: "VariableDeclaration",
									src: "1734:7:8"
								}
							],
							id: 2124,
							name: "ParameterList",
							src: "1733:9:8"
						}
					],
					id: 2125,
					name: "FunctionDefinition",
					src: "1693:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token1",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2126,
							name: "ParameterList",
							src: "1764:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2130,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2127,
											name: "ElementaryTypeName",
											src: "1790:7:8"
										}
									],
									id: 2128,
									name: "VariableDeclaration",
									src: "1790:7:8"
								}
							],
							id: 2129,
							name: "ParameterList",
							src: "1789:9:8"
						}
					],
					id: 2130,
					name: "FunctionDefinition",
					src: "1749:50:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getReserves",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2131,
							name: "ParameterList",
							src: "1825:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "reserve0",
										scope: 2139,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2132,
											name: "ElementaryTypeName",
											src: "1851:7:8"
										}
									],
									id: 2133,
									name: "VariableDeclaration",
									src: "1851:16:8"
								},
								{
									attributes: {
										constant: false,
										name: "reserve1",
										scope: 2139,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 2134,
											name: "ElementaryTypeName",
											src: "1869:7:8"
										}
									],
									id: 2135,
									name: "VariableDeclaration",
									src: "1869:16:8"
								},
								{
									attributes: {
										constant: false,
										name: "blockTimestampLast",
										scope: 2139,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 2136,
											name: "ElementaryTypeName",
											src: "1887:6:8"
										}
									],
									id: 2137,
									name: "VariableDeclaration",
									src: "1887:25:8"
								}
							],
							id: 2138,
							name: "ParameterList",
							src: "1850:63:8"
						}
					],
					id: 2139,
					name: "FunctionDefinition",
					src: "1805:109:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price0CumulativeLast",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2140,
							name: "ParameterList",
							src: "1949:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2144,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2141,
											name: "ElementaryTypeName",
											src: "1975:4:8"
										}
									],
									id: 2142,
									name: "VariableDeclaration",
									src: "1975:4:8"
								}
							],
							id: 2143,
							name: "ParameterList",
							src: "1974:6:8"
						}
					],
					id: 2144,
					name: "FunctionDefinition",
					src: "1920:61:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price1CumulativeLast",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2145,
							name: "ParameterList",
							src: "2016:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2149,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2146,
											name: "ElementaryTypeName",
											src: "2042:4:8"
										}
									],
									id: 2147,
									name: "VariableDeclaration",
									src: "2042:4:8"
								}
							],
							id: 2148,
							name: "ParameterList",
							src: "2041:6:8"
						}
					],
					id: 2149,
					name: "FunctionDefinition",
					src: "1987:61:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "kLast",
						scope: 2197,
						stateMutability: "view",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2150,
							name: "ParameterList",
							src: "2068:2:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2154,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2151,
											name: "ElementaryTypeName",
											src: "2094:4:8"
										}
									],
									id: 2152,
									name: "VariableDeclaration",
									src: "2094:4:8"
								}
							],
							id: 2153,
							name: "ParameterList",
							src: "2093:6:8"
						}
					],
					id: 2154,
					name: "FunctionDefinition",
					src: "2054:46:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "mint",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2161,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2155,
											name: "ElementaryTypeName",
											src: "2122:7:8"
										}
									],
									id: 2156,
									name: "VariableDeclaration",
									src: "2122:10:8"
								}
							],
							id: 2157,
							name: "ParameterList",
							src: "2121:12:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "liquidity",
										scope: 2161,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2158,
											name: "ElementaryTypeName",
											src: "2152:4:8"
										}
									],
									id: 2159,
									name: "VariableDeclaration",
									src: "2152:14:8"
								}
							],
							id: 2160,
							name: "ParameterList",
							src: "2151:16:8"
						}
					],
					id: 2161,
					name: "FunctionDefinition",
					src: "2108:60:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "burn",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2170,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2162,
											name: "ElementaryTypeName",
											src: "2188:7:8"
										}
									],
									id: 2163,
									name: "VariableDeclaration",
									src: "2188:10:8"
								}
							],
							id: 2164,
							name: "ParameterList",
							src: "2187:12:8"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0",
										scope: 2170,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2165,
											name: "ElementaryTypeName",
											src: "2218:4:8"
										}
									],
									id: 2166,
									name: "VariableDeclaration",
									src: "2218:12:8"
								},
								{
									attributes: {
										constant: false,
										name: "amount1",
										scope: 2170,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2167,
											name: "ElementaryTypeName",
											src: "2232:4:8"
										}
									],
									id: 2168,
									name: "VariableDeclaration",
									src: "2232:12:8"
								}
							],
							id: 2169,
							name: "ParameterList",
							src: "2217:28:8"
						}
					],
					id: 2170,
					name: "FunctionDefinition",
					src: "2174:72:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swap",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "amount0Out",
										scope: 2181,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2171,
											name: "ElementaryTypeName",
											src: "2266:4:8"
										}
									],
									id: 2172,
									name: "VariableDeclaration",
									src: "2266:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "amount1Out",
										scope: 2181,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 2173,
											name: "ElementaryTypeName",
											src: "2283:4:8"
										}
									],
									id: 2174,
									name: "VariableDeclaration",
									src: "2283:15:8"
								},
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2181,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2175,
											name: "ElementaryTypeName",
											src: "2300:7:8"
										}
									],
									id: 2176,
									name: "VariableDeclaration",
									src: "2300:10:8"
								},
								{
									attributes: {
										constant: false,
										name: "data",
										scope: 2181,
										stateVariable: false,
										storageLocation: "calldata",
										type: "bytes",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes",
												type: "bytes"
											},
											id: 2177,
											name: "ElementaryTypeName",
											src: "2312:5:8"
										}
									],
									id: 2178,
									name: "VariableDeclaration",
									src: "2312:19:8"
								}
							],
							id: 2179,
							name: "ParameterList",
							src: "2265:67:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2180,
							name: "ParameterList",
							src: "2341:0:8"
						}
					],
					id: 2181,
					name: "FunctionDefinition",
					src: "2252:90:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "skim",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "to",
										scope: 2186,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2182,
											name: "ElementaryTypeName",
											src: "2362:7:8"
										}
									],
									id: 2183,
									name: "VariableDeclaration",
									src: "2362:10:8"
								}
							],
							id: 2184,
							name: "ParameterList",
							src: "2361:12:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2185,
							name: "ParameterList",
							src: "2382:0:8"
						}
					],
					id: 2186,
					name: "FunctionDefinition",
					src: "2348:35:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "sync",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2187,
							name: "ParameterList",
							src: "2402:2:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2188,
							name: "ParameterList",
							src: "2413:0:8"
						}
					],
					id: 2189,
					name: "FunctionDefinition",
					src: "2389:25:8"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "initialize",
						scope: 2197,
						stateMutability: "nonpayable",
						superFunction: null,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2196,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2190,
											name: "ElementaryTypeName",
											src: "2442:7:8"
										}
									],
									id: 2191,
									name: "VariableDeclaration",
									src: "2442:7:8"
								},
								{
									attributes: {
										constant: false,
										name: "",
										scope: 2196,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 2192,
											name: "ElementaryTypeName",
											src: "2451:7:8"
										}
									],
									id: 2193,
									name: "VariableDeclaration",
									src: "2451:7:8"
								}
							],
							id: 2194,
							name: "ParameterList",
							src: "2441:18:8"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 2195,
							name: "ParameterList",
							src: "2468:0:8"
						}
					],
					id: 2196,
					name: "FunctionDefinition",
					src: "2422:47:8"
				}
			],
			id: 2197,
			name: "ContractDefinition",
			src: "28:2444:8"
		}
	],
	id: 2198,
	name: "SourceUnit",
	src: "0:2474:8"
};
var compiler = {
	name: "solc",
	version: "0.5.16+commit.9c3226ce.Emscripten.clang"
};
var networks = {
};
var schemaVersion = "3.4.2";
var updatedAt = "2021-08-12T18:59:11.319Z";
var devdoc = {
	methods: {
	}
};
var userdoc = {
	methods: {
	}
};
var IOmnidexPair = {
	contractName: contractName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	sourceMap: sourceMap,
	deployedSourceMap: deployedSourceMap,
	source: source,
	ast: ast,
	legacyAST: legacyAST,
	compiler: compiler,
	networks: networks,
	schemaVersion: schemaVersion,
	updatedAt: updatedAt,
	devdoc: devdoc,
	userdoc: userdoc
};

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var TOKEN_DECIMALS_CACHE = {};
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE, _TOKEN_DECIMALS_CACHE2;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE2 = _TOKEN_DECIMALS_CACHE[chainId]) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE2[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new contracts.Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE3, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE3 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$1.getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB);
      return Promise.resolve(new contracts.Contract(address, IOmnidexPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

exports.JSBI = JSBI;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.ETHER = ETHER;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fetcher = Fetcher;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.Route = Route;
exports.Router = Router;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.WETH = WETH;
exports.currencyEquals = currencyEquals;
exports.inputOutputComparator = inputOutputComparator;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=sdk.cjs.development.js.map
