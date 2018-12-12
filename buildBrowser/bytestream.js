"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.parseByteMap=parseByteMap;exports.SeqBitStream=exports.BitStream=exports.SeqStream=exports.ByteStream=void 0;require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/es6.function.name");require("core-js/modules/es6.typed.uint32-array");require("core-js/modules/es6.typed.uint16-array");require("core-js/modules/es6.array.sort");require("core-js/modules/es6.array.from");require("core-js/modules/es6.regexp.to-string");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.map");require("core-js/modules/es6.typed.uint8-array");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.object.keys");function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/*
 * Copyright (c) 2016-2018, Peculiar Ventures
 * All rights reserved.
 *
 * Author 2016-2018, Yury Strozhevsky <www.strozhevsky.com>.
 *
 * THIS IS A PRIVATE SOURCE CODE AND ANY DISTRIBUTION OR COPYING IS PROHIBITED.
 *
 */ //**************************************************************************************
var ByteStream=/*#__PURE__*/function(){//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
	 * Constructor for ByteStream class
	 * @param {{[length]: number, [stub]: number, [view]: Uint8Array, [buffer]: ArrayBuffer, [string]: string, [hexstring]: string}} parameters
	 */function ByteStream(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,ByteStream);this.clear();var _arr=Object.keys(parameters);for(var _i=0;_i<_arr.length;_i++){var key=_arr[_i];switch(key){case"length":this.length=parameters.length;break;case"stub":// noinspection NonBlockStatementBodyJS
for(var i=0;i<this._view.length;i++){this._view[i]=parameters.stub;}break;case"view":this.fromUint8Array(parameters.view);break;case"buffer":this.fromArrayBuffer(parameters.buffer);break;case"string":this.fromString(parameters.string);break;case"hexstring":this.fromHexString(parameters.hexstring);break;default:}}}//**********************************************************************************
/**
	 * Setter for "buffer"
	 * @param {ArrayBuffer} value
	 */_createClass(ByteStream,[{key:"clear",//**********************************************************************************
/**
	 * Clear existing stream
	 */value:function clear(){this._buffer=new ArrayBuffer(0);this._view=new Uint8Array(this._buffer);}//**********************************************************************************
/**
	 * Initialize "Stream" object from existing "ArrayBuffer"
	 * @param {!ArrayBuffer} array The ArrayBuffer to copy from
	 */},{key:"fromArrayBuffer",value:function fromArrayBuffer(array){this.buffer=array;}//**********************************************************************************
// noinspection FunctionNamingConventionJS
/**
	 * Initialize "Stream" object from existing "Uint8Array"
	 * @param {!Uint8Array} array The Uint8Array to copy from
	 */},{key:"fromUint8Array",value:function fromUint8Array(array){this._buffer=new ArrayBuffer(array.length);this._view=new Uint8Array(this._buffer);this._view.set(array);}//**********************************************************************************
/**
	 * Initialize "Stream" object from existing string
	 * @param {string} string The string to initialize from
	 */},{key:"fromString",value:function fromString(string){var stringLength=string.length;this.length=stringLength;// noinspection NonBlockStatementBodyJS
for(var i=0;i<stringLength;i++){this.view[i]=string.charCodeAt(i);}}//**********************************************************************************
/**
	 * Represent "Stream" object content as a string
	 * @param {number} [start] Start position to convert to string
	 * @param {number} [length] Length of array to convert to string
	 * @returns {string}
	 */},{key:"toString",value:function toString(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.view.length-start;//region Initial variables
var result="";//endregion
//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start>=this.view.length||start<0){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length>=this.view.length||length<0){// noinspection AssignmentToFunctionParameterJS
length=this.view.length-start;}//endregion
//region Convert array of bytes to string
// noinspection NonBlockStatementBodyJS
for(var i=start;i<start+length;i++){result+=String.fromCharCode(this.view[i]);}//endregion
return result;}//**********************************************************************************
// noinspection FunctionTooLongJS
/**
	 * Initialize "Stream" object from existing hexdecimal string
	 * @param {string} hexString String to initialize from
	 */},{key:"fromHexString",value:function fromHexString(hexString){//region Initial variables
var stringLength=hexString.length;this.buffer=new ArrayBuffer(stringLength>>1);this.view=new Uint8Array(this.buffer);var hexMap=new Map();// noinspection MagicNumberJS
hexMap.set("0",0x00);// noinspection MagicNumberJS
hexMap.set("1",0x01);// noinspection MagicNumberJS
hexMap.set("2",0x02);// noinspection MagicNumberJS
hexMap.set("3",0x03);// noinspection MagicNumberJS
hexMap.set("4",0x04);// noinspection MagicNumberJS
hexMap.set("5",0x05);// noinspection MagicNumberJS
hexMap.set("6",0x06);// noinspection MagicNumberJS
hexMap.set("7",0x07);// noinspection MagicNumberJS
hexMap.set("8",0x08);// noinspection MagicNumberJS
hexMap.set("9",0x09);// noinspection MagicNumberJS
hexMap.set("A",0x0A);// noinspection MagicNumberJS
hexMap.set("a",0x0A);// noinspection MagicNumberJS
hexMap.set("B",0x0B);// noinspection MagicNumberJS
hexMap.set("b",0x0B);// noinspection MagicNumberJS
hexMap.set("C",0x0C);// noinspection MagicNumberJS
hexMap.set("c",0x0C);// noinspection MagicNumberJS
hexMap.set("D",0x0D);// noinspection MagicNumberJS
hexMap.set("d",0x0D);// noinspection MagicNumberJS
hexMap.set("E",0x0E);// noinspection MagicNumberJS
hexMap.set("e",0x0E);// noinspection MagicNumberJS
hexMap.set("F",0x0F);// noinspection MagicNumberJS
hexMap.set("f",0x0F);var j=0;// noinspection MagicNumberJS
var temp=0x00;//endregion
//region Convert char-by-char
for(var i=0;i<stringLength;i++){// noinspection NegatedIfStatementJS
if(!(i%2)){// noinspection NestedFunctionCallJS
temp=hexMap.get(hexString.charAt(i))<<4;}else{// noinspection NestedFunctionCallJS
temp|=hexMap.get(hexString.charAt(i));this.view[j]=temp;j++;}}//endregion
}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Represent "Stream" object content as a hexdecimal string
	 * @param {number} [start=0] Start position to convert to string
	 * @param {number} [length=(this.view.length - start)] Length of array to convert to string
	 * @returns {string}
	 */},{key:"toHexString",value:function toHexString(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.view.length-start;//region Initial variables
var result="";//endregion
//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start>=this.view.length||start<0){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length>=this.view.length||length<0){// noinspection AssignmentToFunctionParameterJS
length=this.view.length-start;}//endregion
for(var i=start;i<start+length;i++){// noinspection ChainedFunctionCallJS
var str=this.view[i].toString(16).toUpperCase();// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
result=result+(str.length==1?"0":"")+str;}return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Return copy of existing "Stream"
	 * @param {number} [start=0] Start position of the copy
	 * @param {number} [length=this.view.length] Length of the copy
	 * @returns {ByteStream}
	 */},{key:"copy",value:function copy(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._buffer.byteLength-start;//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start===0&&this._buffer.byteLength===0)return new ByteStream();// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start<0||start>this._buffer.byteLength-1)throw new Error("Wrong start position: ".concat(start));//endregion
var stream=new ByteStream();stream._buffer=this._buffer.slice(start,start+length);stream._view=new Uint8Array(stream._buffer);return stream;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Return slice of existing "Stream"
	 * @param {number} [start=0] Start position of the slice
	 * @param {number} [end=this._buffer.byteLength] End position of the slice
	 * @returns {ByteStream}
	 */},{key:"slice",value:function slice(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var end=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this._buffer.byteLength;//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start===0&&this._buffer.byteLength===0)return new ByteStream();// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start<0||start>this._buffer.byteLength-1)throw new Error("Wrong start position: ".concat(start));//endregion
var stream=new ByteStream();stream._buffer=this._buffer.slice(start,end);stream._view=new Uint8Array(stream._buffer);return stream;}//**********************************************************************************
/**
	 * Change size of existing "Stream"
	 * @param {!number} size Size for new "Stream"
	 */},{key:"realloc",value:function realloc(size){//region Initial variables
var buffer=new ArrayBuffer(size);var view=new Uint8Array(buffer);//endregion
//region Create a new ArrayBuffer content
// noinspection NonBlockStatementBodyJS
if(size>this._view.length)view.set(this._view);else{// noinspection NestedFunctionCallJS
view.set(new Uint8Array(this._buffer,0,size));}//endregion
//region Initialize "Stream" with new "ArrayBuffer"
this._buffer=buffer.slice(0);this._view=new Uint8Array(this._buffer);//endregion
}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Append a new "Stream" content to the current "Stream"
	 * @param {ByteStream} stream A new "stream" to append to current "stream"
	 */},{key:"append",value:function append(stream){//region Initial variables
var initialSize=this._buffer.byteLength;var streamViewLength=stream._buffer.byteLength;var copyView=stream._view.slice();//endregion
//region Re-allocate current internal buffer
this.realloc(initialSize+streamViewLength);//endregion
//region Copy input stream content to a new place
this._view.set(copyView,initialSize);//endregion
}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Insert "Stream" content to the current "Stream" at specific position
	 * @param {ByteStream} stream A new "stream" to insert to current "stream"
	 * @param {number} [start=0] Start position to insert to
	 * @param {number} [length]
	 * @returns {boolean}
	 */},{key:"insert",value:function insert(stream){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this._buffer.byteLength-start;//region Initial variables
// noinspection NonBlockStatementBodyJS
if(start>this._buffer.byteLength-1)return false;if(length>this._buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this._buffer.byteLength-start;}//endregion
//region Check input variables
if(length>stream._buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
length=stream._buffer.byteLength;}//endregion
//region Update content of the current stream
// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(length==stream._buffer.byteLength)this._view.set(stream._view,start);else{// noinspection NestedFunctionCallJS
this._view.set(stream._view.slice(0,length),start);}//endregion
return true;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Check that two "Stream" objects has equal content
	 * @param {ByteStream} stream Stream to compare with
	 * @returns {boolean}
	 */},{key:"isEqual",value:function isEqual(stream){//region Check length of both buffers
// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(this._buffer.byteLength!=stream._buffer.byteLength)return false;//endregion
//region Compare each byte of both buffers
for(var i=0;i<stream._buffer.byteLength;i++){// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(this.view[i]!=stream.view[i])return false;}//endregion
return true;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Check that current "Stream" objects has equal content with input "Uint8Array"
	 * @param {Uint8Array} view View to compare with
	 * @returns {boolean}
	 */},{key:"isEqualView",value:function isEqualView(view){//region Check length of both buffers
// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(view.length!=this.view.length)return false;//endregion
//region Compare each byte of both buffers
for(var i=0;i<view.length;i++){// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(this.view[i]!=view[i])return false;}//endregion
return true;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Find any byte pattern in "Stream"
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward] Flag to search in backward order
	 * @returns {number}
	 */},{key:"findPattern",value:function findPattern(pattern){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Check input variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}//endregion
//region Initial variables
var patternLength=pattern.buffer.byteLength;// noinspection NonBlockStatementBodyJS
if(patternLength>length)return-1;//endregion
//region Make a "pre-read" array for pattern
var patternArray=[];// noinspection NonBlockStatementBodyJS
for(var i=0;i<patternLength;i++){patternArray.push(pattern.view[i]);}//endregion
//region Search for pattern
for(var _i2=0;_i2<=length-patternLength;_i2++){var equal=true;// noinspection ConditionalExpressionJS
var equalStart=backward?start-patternLength-_i2:start+_i2;for(var j=0;j<patternLength;j++){// noinspection EqualityComparisonWithCoercionJS
if(this.view[j+equalStart]!=patternArray[j]){equal=false;// noinspection BreakStatementJS
break;}}if(equal){// noinspection ConditionalExpressionJS
return backward?start-patternLength-_i2:start+patternLength+_i2;// Position after the pattern found
}}//endregion
return-1;}//**********************************************************************************
// noinspection OverlyComplexFunctionJS
/**
	 * Find first position of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{id: number, position: number}}
	 */},{key:"findFirstIn",value:function findFirstIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}// noinspection ConditionalExpressionJS
var result={id:-1,position:backward?0:start+length};//endregion
for(var i=0;i<patterns.length;i++){var position=this.findPattern(patterns[i],start,length,backward);// noinspection EqualityComparisonWithCoercionJS
if(position!=-1){var valid=false;if(backward){// noinspection NonBlockStatementBodyJS
if(position>=result.position)valid=true;}else{// noinspection NonBlockStatementBodyJS
if(position<=result.position)valid=true;}if(valid){result.position=position;result.id=i;}}}return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllIn",value:function findAllIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this.buffer.byteLength-start;//region Initial variables
var result=[];// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}var patternFound={id:-1,position:start};//endregion
//region Find all accurences of patterns
do{var position=patternFound.position;patternFound=this.findFirstIn(patterns,patternFound.position,length);// noinspection EqualityComparisonWithCoercionJS
if(patternFound.id==-1){// noinspection BreakStatementJS
break;}// noinspection AssignmentToFunctionParameterJS
length-=patternFound.position-position;result.push({id:patternFound.id,position:patternFound.position});}while(true);// eslint-disable-line
//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
	 * Find all positions of a pattern
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array|number} Array with all pattern positions or (-1) if failed
	 */},{key:"findAllPatternIn",value:function findAllPatternIn(pattern){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this.buffer.byteLength-start;//region Check input variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}//endregion
//region Initial variables
var result=[];var patternLength=pattern.buffer.byteLength;// noinspection NonBlockStatementBodyJS
if(patternLength>length)return-1;//endregion
//region Make a "pre-read" array for pattern
var patternArray=Array.from(pattern.view);//endregion
//region Search for pattern
for(var i=0;i<=length-patternLength;i++){var equal=true;var equalStart=start+i;for(var j=0;j<patternLength;j++){// noinspection EqualityComparisonWithCoercionJS
if(this.view[j+equalStart]!=patternArray[j]){equal=false;// noinspection BreakStatementJS
break;}}if(equal){result.push(start+patternLength+i);// Position after the pattern found
i+=patternLength-1;// On next step of "for" we will have "i++"
}}//endregion
return result;}//**********************************************************************************
// noinspection OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{left: {id: number, position: *}, right: {id: number, position: number}, value: ByteStream}}
	 */},{key:"findFirstNotIn",value:function findFirstNotIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}var result={left:{id:-1,position:start},right:{id:-1,position:0},value:new ByteStream()};var currentLength=length;//endregion
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
while(currentLength>0){//region Search for nearest "pattern"
// noinspection ConditionalExpressionJS
result.right=this.findFirstIn(patterns,backward?start-length+currentLength:start+length-currentLength,currentLength,backward);//endregion
//region No pattern at all
// noinspection EqualityComparisonWithCoercionJS
if(result.right.id==-1){// noinspection AssignmentToFunctionParameterJS
length=currentLength;if(backward){// noinspection AssignmentToFunctionParameterJS
start-=length;}else{// noinspection AssignmentToFunctionParameterJS
start=result.left.position;}result.value=new ByteStream();result.value._buffer=this._buffer.slice(start,start+length);result.value._view=new Uint8Array(result.value._buffer);// noinspection BreakStatementJS
break;}//endregion
//region Check distance between two patterns
// noinspection ConditionalExpressionJS, EqualityComparisonWithCoercionJS
if(result.right.position!=(backward?result.left.position-patterns[result.right.id].buffer.byteLength:result.left.position+patterns[result.right.id].buffer.byteLength)){if(backward){// noinspection AssignmentToFunctionParameterJS
start=result.right.position+patterns[result.right.id].buffer.byteLength;// noinspection AssignmentToFunctionParameterJS
length=result.left.position-result.right.position-patterns[result.right.id].buffer.byteLength;}else{// noinspection AssignmentToFunctionParameterJS
start=result.left.position;// noinspection AssignmentToFunctionParameterJS
length=result.right.position-result.left.position-patterns[result.right.id].buffer.byteLength;}result.value=new ByteStream();result.value._buffer=this._buffer.slice(start,start+length);result.value._view=new Uint8Array(result.value._buffer);// noinspection BreakStatementJS
break;}//endregion
//region Store information about previous pattern
result.left=result.right;//endregion
//region Change current length
currentLength-=patterns[result.right.id]._buffer.byteLength;//endregion
}//region Swap "patterns" in case of backward order
if(backward){var temp=result.right;result.right=result.left;result.left=temp;}//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllNotIn",value:function findAllNotIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Initial variables
var result=[];// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}var patternFound={left:{id:-1,position:start},right:{id:-1,position:start},value:new ByteStream()};//endregion
//region Find all accurences of patterns
// noinspection EqualityComparisonWithCoercionJS
do{var position=patternFound.right.position;patternFound=this.findFirstNotIn(patterns,patternFound.right.position,length);// noinspection AssignmentToFunctionParameterJS
length-=patternFound.right.position-position;result.push({left:{id:patternFound.left.id,position:patternFound.left.position},right:{id:patternFound.right.id,position:patternFound.right.position},value:patternFound.value});}while(patternFound.right.id!=-1);//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS
/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array of pattern to look for
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */},{key:"findFirstSequence",value:function findFirstSequence(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}//endregion
//region Find first byte from sequence
var firstIn=this.skipNotPatterns(patterns,start,length,backward);// noinspection EqualityComparisonWithCoercionJS
if(firstIn==-1){return{position:-1,value:new ByteStream()};}//endregion
//region Find first byte not in sequence
// noinspection ConditionalExpressionJS
var firstNotIn=this.skipPatterns(patterns,firstIn,length-(backward?start-firstIn:firstIn-start),backward);//endregion
//region Make output value
if(backward){// noinspection AssignmentToFunctionParameterJS
start=firstNotIn;// noinspection AssignmentToFunctionParameterJS
length=firstIn-firstNotIn;}else{// noinspection AssignmentToFunctionParameterJS
start=firstIn;// noinspection AssignmentToFunctionParameterJS
length=firstNotIn-firstIn;}var value=new ByteStream();value._buffer=this._buffer.slice(start,start+length);value._view=new Uint8Array(value._buffer);//endregion
return{position:firstNotIn,value:value};}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Find all positions of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array of patterns to search for
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllSequences",value:function findAllSequences(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Initial variables
var result=[];// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}var patternFound={position:start,value:new ByteStream()};//endregion
//region Find all accurences of patterns
// noinspection EqualityComparisonWithCoercionJS
do{var position=patternFound.position;patternFound=this.findFirstSequence(patterns,patternFound.position,length);// noinspection EqualityComparisonWithCoercionJS
if(patternFound.position!=-1){// noinspection AssignmentToFunctionParameterJS
length-=patternFound.position-position;result.push({position:patternFound.position,value:patternFound.value});}}while(patternFound.position!=-1);//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Find all paired patterns in the stream
	 * @param {ByteStream} leftPattern Left pattern to search for
	 * @param {ByteStream} rightPattern Right pattern to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findPairedPatterns",value:function findPairedPatterns(leftPattern,rightPattern){var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;//region Initial variables
var result=[];// noinspection NonBlockStatementBodyJS
if(leftPattern.isEqual(rightPattern))return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}var currentPositionLeft=0;//endregion
//region Find all "left patterns" as sorted array
var leftPatterns=this.findAllPatternIn(leftPattern,start,length);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(leftPatterns.length==0)return result;//endregion
//region Find all "right patterns" as sorted array
var rightPatterns=this.findAllPatternIn(rightPattern,start,length);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(rightPatterns.length==0)return result;//endregion
//region Combine patterns
while(currentPositionLeft<leftPatterns.length){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
if(rightPatterns.length==0){// noinspection BreakStatementJS
break;}// noinspection EqualityComparisonWithCoercionJS
if(leftPatterns[0]==rightPatterns[0]){// Possible situation when one pattern is a part of another
// For example "stream" and "endstream"
// In case when we have only "endstream" in fact "stream" will be also found at the same position
// (position of the pattern is an index AFTER the pattern)
result.push({left:leftPatterns[0],right:rightPatterns[0]});leftPatterns.splice(0,1);rightPatterns.splice(0,1);// noinspection ContinueStatementJS
continue;}if(leftPatterns[currentPositionLeft]>rightPatterns[0]){// noinspection BreakStatementJS
break;}while(leftPatterns[currentPositionLeft]<rightPatterns[0]){currentPositionLeft++;if(currentPositionLeft>=leftPatterns.length){// noinspection BreakStatementJS
break;}}result.push({left:leftPatterns[currentPositionLeft-1],right:rightPatterns[0]});leftPatterns.splice(currentPositionLeft-1,1);rightPatterns.splice(0,1);currentPositionLeft=0;}//endregion
//region Sort result
result.sort(function(a,b){return a.left-b.left;});//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Find all paired patterns in the stream
	 * @param {Array.<ByteStream>} inputLeftPatterns Array of left patterns to search for
	 * @param {Array.<ByteStream>} inputRightPatterns Array of right patterns to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findPairedArrays",value:function findPairedArrays(inputLeftPatterns,inputRightPatterns){var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;//region Initial variables
var result=[];// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}var currentPositionLeft=0;//endregion
//region Find all "left patterns" as sorted array
var leftPatterns=this.findAllIn(inputLeftPatterns,start,length);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(leftPatterns.length==0)return result;//endregion
//region Find all "right patterns" as sorted array
var rightPatterns=this.findAllIn(inputRightPatterns,start,length);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(rightPatterns.length==0)return result;//endregion
//region Combine patterns
while(currentPositionLeft<leftPatterns.length){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
if(rightPatterns.length==0){// noinspection BreakStatementJS
break;}// noinspection EqualityComparisonWithCoercionJS
if(leftPatterns[0].position==rightPatterns[0].position){// Possible situation when one pattern is a part of another
// For example "stream" and "endstream"
// In case when we have only "endstream" in fact "stream" will be also found at the same position
// (position of the pattern is an index AFTER the pattern)
result.push({left:leftPatterns[0],right:rightPatterns[0]});leftPatterns.splice(0,1);rightPatterns.splice(0,1);// noinspection ContinueStatementJS
continue;}if(leftPatterns[currentPositionLeft].position>rightPatterns[0].position){// noinspection BreakStatementJS
break;}while(leftPatterns[currentPositionLeft].position<rightPatterns[0].position){currentPositionLeft++;if(currentPositionLeft>=leftPatterns.length){// noinspection BreakStatementJS
break;}}result.push({left:leftPatterns[currentPositionLeft-1],right:rightPatterns[0]});leftPatterns.splice(currentPositionLeft-1,1);rightPatterns.splice(0,1);currentPositionLeft=0;}//endregion
//region Sort result
result.sort(function(a,b){return a.left.position-b.left.position;});//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS, FunctionTooLongJS
/**
	 * Replace one patter with other
	 * @param {ByteStream} searchPattern The pattern to search for
	 * @param {ByteStream} replacePattern The pattern to replace initial pattern
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {Array|null} [findAllResult=null] Pre-calculated results of "findAllIn"
	 * @returns {*}
	 */},{key:"replacePattern",value:function replacePattern(searchPattern,_replacePattern){var _output$searchPattern;var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var findAllResult=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;//region Initial variables
var result;var i;var output={status:-1,searchPatternPositions:[],replacePatternPositions:[]};// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>this.buffer.byteLength-1)return false;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}//endregion
//region Find a pattern to search for
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(findAllResult==null){result=this.findAllIn([searchPattern],start,length);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.length==0)return output;}else result=findAllResult;// noinspection NestedFunctionCallJS
(_output$searchPattern=output.searchPatternPositions).push.apply(_output$searchPattern,_toConsumableArray(Array.from(result,function(element){return element.position;})));//endregion
//region Variables for new buffer initialization
var patternDifference=searchPattern.buffer.byteLength-_replacePattern.buffer.byteLength;var changedBuffer=new ArrayBuffer(this.view.length-result.length*patternDifference);var changedView=new Uint8Array(changedBuffer);//endregion
//region Copy data from 0 to start
// noinspection NestedFunctionCallJS
changedView.set(new Uint8Array(this.buffer,0,start));//endregion
//region Replace pattern
for(i=0;i<result.length;i++){//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
var currentPosition=i==0?start:result[i-1].position;//endregion
//region Copy bytes other then search pattern
// noinspection NestedFunctionCallJS
changedView.set(new Uint8Array(this.buffer,currentPosition,result[i].position-searchPattern.buffer.byteLength-currentPosition),currentPosition-i*patternDifference);//endregion
//region Put replace pattern in a new buffer
changedView.set(_replacePattern.view,result[i].position-searchPattern.buffer.byteLength-i*patternDifference);output.replacePatternPositions.push(result[i].position-searchPattern.buffer.byteLength-i*patternDifference);//endregion
}//endregion
//region Copy data from the end of old buffer
i--;// noinspection NestedFunctionCallJS
changedView.set(new Uint8Array(this.buffer,result[i].position,this.buffer.byteLength-result[i].position),result[i].position-searchPattern.buffer.byteLength+_replacePattern.buffer.byteLength-i*patternDifference);//endregion
//region Re-initialize existing buffer
this.buffer=changedBuffer;this.view=new Uint8Array(this.buffer);//endregion
output.status=1;return output;}//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Skip any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */},{key:"skipPatterns",value:function skipPatterns(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}var result=start;//endregion
//region Search for pattern
for(var k=0;k<patterns.length;k++){var patternLength=patterns[k].buffer.byteLength;// noinspection ConditionalExpressionJS
var equalStart=backward?result-patternLength:result;var equal=true;for(var j=0;j<patternLength;j++){// noinspection EqualityComparisonWithCoercionJS
if(this.view[j+equalStart]!=patterns[k].view[j]){equal=false;// noinspection BreakStatementJS
break;}}if(equal){k=-1;if(backward){result-=patternLength;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(result<=0)return result;}else{result+=patternLength;// noinspection NonBlockStatementBodyJS
if(result>=start+length)return result;}}}//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
	 * Skip any pattern not from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should not be ommited
	 * @param start
	 * @param length
	 * @param backward
	 * @returns {number}
	 */},{key:"skipNotPatterns",value:function skipNotPatterns(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
start=backward?this.buffer.byteLength:0;}if(start>this.buffer.byteLength){// noinspection AssignmentToFunctionParameterJS
start=this.buffer.byteLength;}if(backward){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=start;}if(length>start){// noinspection AssignmentToFunctionParameterJS
length=start;}}else{// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}if(length>this.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=this.buffer.byteLength-start;}}var result=-1;//endregion
//region Search for pattern
for(var i=0;i<length;i++){for(var k=0;k<patterns.length;k++){var patternLength=patterns[k].buffer.byteLength;// noinspection ConditionalExpressionJS
var equalStart=backward?start-i-patternLength:start+i;var equal=true;for(var j=0;j<patternLength;j++){// noinspection EqualityComparisonWithCoercionJS
if(this.view[j+equalStart]!=patterns[k].view[j]){equal=false;// noinspection BreakStatementJS
break;}}if(equal){// noinspection ConditionalExpressionJS
result=backward?start-i:start+i;// Exact position of pattern found
// noinspection BreakStatementJS
break;}}// noinspection EqualityComparisonWithCoercionJS
if(result!=-1){// noinspection BreakStatementJS
break;}}//endregion
return result;}//**********************************************************************************
},{key:"buffer",set:function set(value){this._buffer=value.slice(0);this._view=new Uint8Array(this._buffer);}//**********************************************************************************
/**
	 * Getter for "buffer"
	 * @returns {ArrayBuffer}
	 */,get:function get(){return this._buffer;}//**********************************************************************************
/**
	 * Setter for "view"
	 * @param {Uint8Array} value
	 */},{key:"view",set:function set(value){this._buffer=new ArrayBuffer(value.length);this._view=new Uint8Array(this._buffer);this._view.set(value);}//**********************************************************************************
/**
	 * Getter for "view"
	 * @returns {Uint8Array}
	 */,get:function get(){return this._view;}//**********************************************************************************
/**
	 * Getter for "length"
	 * @returns {number}
	 */},{key:"length",get:function get(){return this._buffer.byteLength;}//**********************************************************************************
/**
	 * Setter for "length"
	 * @param {number} value
	 */,set:function set(value){this._buffer=new ArrayBuffer(value);this._view=new Uint8Array(this._buffer);}}]);return ByteStream;}();//**************************************************************************************
exports.ByteStream=ByteStream;var SeqStream=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for "SeqStream" class
	 * @param {{[stream]: ByteStream, [length]: number, [backward]: boolean, [start]: number, [appendBlock]: number}} parameters
	 */function SeqStream(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SeqStream);/**
		 * Major stream
		 * @type {ByteStream}
		 */this.stream=new ByteStream();/**
		 * Length of the major stream
		 * @type {number}
		 */this._length=0;/**
		 * Flag to search in backward direction
		 * @type {boolean}
		 */this.backward=false;/**
		 * Start position to search
		 * @type {number}
		 */this._start=0;/**
		 * Length of a block when append information to major stream
		 * @type {number}
		 */this.appendBlock=0;this.prevLength=0;this.prevStart=0;var _arr2=Object.keys(parameters);for(var _i3=0;_i3<_arr2.length;_i3++){var key=_arr2[_i3];switch(key){case"stream":this.stream=parameters.stream;break;case"backward":this.backward=parameters.backward;// noinspection JSUnusedGlobalSymbols
this._start=this.stream.buffer.byteLength;break;case"length":// noinspection JSUnusedGlobalSymbols
this._length=parameters.length;break;case"start":// noinspection JSUnusedGlobalSymbols
this._start=parameters.start;break;case"appendBlock":this.appendBlock=parameters.appendBlock;break;case"view":this.stream=new ByteStream({view:parameters.view});break;case"buffer":this.stream=new ByteStream({buffer:parameters.buffer});break;case"string":this.stream=new ByteStream({string:parameters.string});break;case"hexstring":this.stream=new ByteStream({hexstring:parameters.hexstring});break;default:}}}//**********************************************************************************
/**
	 * Setter for "stream" property
	 * @param {ByteStream} value
	 */_createClass(SeqStream,[{key:"resetPosition",//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Reset current position of the "SeqStream"
	 */value:function resetPosition(){// noinspection JSUnusedGlobalSymbols
this._start=this.prevStart;// noinspection JSUnusedGlobalSymbols
this._length=this.prevLength;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Find any byte pattern in "ByteStream"
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {number}
	 */},{key:"findPattern",value:function findPattern(pattern){var gap=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>this.length){// noinspection AssignmentToFunctionParameterJS
gap=this.length;}//endregion
//region Find pattern
var result=this.stream.findPattern(pattern,this.start,this.length,this.backward);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result==-1)return result;if(this.backward){// noinspection NonBlockStatementBodyJS
if(result<this.start-pattern.buffer.byteLength-gap)return-1;}else{// noinspection NonBlockStatementBodyJS
if(result>this.start+pattern.buffer.byteLength+gap)return-1;}//endregion
//region Create new values
this.start=result;//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Find first position of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {{id: number, position: number}}
	 */},{key:"findFirstIn",value:function findFirstIn(patterns){var gap=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>this.length){// noinspection AssignmentToFunctionParameterJS
gap=this.length;}//endregion
//region Search for patterns
var result=this.stream.findFirstIn(patterns,this.start,this.length,this.backward);// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.id==-1)return result;if(this.backward){if(result.position<this.start-patterns[result.id].buffer.byteLength-gap){// noinspection ConditionalExpressionJS
return{id:-1,position:this.backward?0:this.start+this.length};}}else{if(result.position>this.start+patterns[result.id].buffer.byteLength+gap){// noinspection ConditionalExpressionJS
return{id:-1,position:this.backward?0:this.start+this.length};}}//endregion
//region Create new values
this.start=result.position;//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @returns {Array}
	 */},{key:"findAllIn",value:function findAllIn(patterns){// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this.start-this.length:this.start;return this.stream.findAllIn(patterns,start,this.length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS
/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} gap Maximum gap between start position and position of nearest object
	 * @returns {*}
	 */},{key:"findFirstNotIn",value:function findFirstNotIn(patterns){var gap=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>this._length){// noinspection AssignmentToFunctionParameterJS
gap=this._length;}//endregion
//region Search for patterns
var result=this._stream.findFirstNotIn(patterns,this._start,this._length,this.backward);// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.left.id==-1&&result.right.id==-1)return result;if(this.backward){// noinspection EqualityComparisonWithCoercionJS
if(result.right.id!=-1){if(result.right.position<this._start-patterns[result.right.id]._buffer.byteLength-gap){return{left:{id:-1,position:this._start},right:{id:-1,position:0},value:new ByteStream()};}}}else{// noinspection EqualityComparisonWithCoercionJS
if(result.left.id!=-1){if(result.left.position>this._start+patterns[result.left.id]._buffer.byteLength+gap){return{left:{id:-1,position:this._start},right:{id:-1,position:0},value:new ByteStream()};}}}//endregion
//region Create new values
if(this.backward){// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.left.id==-1)this.start=0;else this.start=result.left.position;}else{// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.right.id==-1)this.start=this._start+this._length;else this.start=result.right.position;}//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {Array}
	 */},{key:"findAllNotIn",value:function findAllNotIn(patterns){// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this._start-this._length:this._start;return this._stream.findAllNotIn(patterns,start,this._length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [length] Length to search sequence for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {*}
	 */},{key:"findFirstSequence",value:function findFirstSequence(patterns){var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var gap=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null||length>this._length){// noinspection AssignmentToFunctionParameterJS
length=this._length;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>length){// noinspection AssignmentToFunctionParameterJS
gap=length;}//endregion
//region Search for sequence
var result=this._stream.findFirstSequence(patterns,this._start,length,this.backward);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result.value.buffer.byteLength==0)return result;if(this.backward){if(result.position<this._start-result.value._buffer.byteLength-gap){return{position:-1,value:new ByteStream()};}}else{if(result.position>this._start+result.value._buffer.byteLength+gap){return{position:-1,value:new ByteStream()};}}//endregion
//region Create new values
this.start=result.position;//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @returns {Array}
	 */},{key:"findAllSequences",value:function findAllSequences(patterns){// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this.start-this.length:this.start;return this.stream.findAllSequences(patterns,start,this.length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Find all paired patterns in the stream
	 * @param {ByteStream} leftPattern Left pattern to search for
	 * @param {ByteStream} rightPattern Right pattern to search for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {Array}
	 */},{key:"findPairedPatterns",value:function findPairedPatterns(leftPattern,rightPattern){var gap=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>this.length){// noinspection AssignmentToFunctionParameterJS
gap=this.length;}//endregion
// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this.start-this.length:this.start;//region Search for patterns
var result=this.stream.findPairedPatterns(leftPattern,rightPattern,start,this.length);if(result.length){if(this.backward){// noinspection NonBlockStatementBodyJS
if(result[0].right<this.start-rightPattern.buffer.byteLength-gap)return[];}else{// noinspection NonBlockStatementBodyJS
if(result[0].left>this.start+leftPattern.buffer.byteLength+gap)return[];}}//endregion
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Find all paired patterns in the stream
	 * @param {Array.<ByteStream>} leftPatterns Array of left patterns to search for
	 * @param {Array.<ByteStream>} rightPatterns Array of right patterns to search for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {Array}
	 */},{key:"findPairedArrays",value:function findPairedArrays(leftPatterns,rightPatterns){var gap=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(gap==null||gap>this.length){// noinspection AssignmentToFunctionParameterJS
gap=this.length;}//endregion
// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this.start-this.length:this.start;//region Search for patterns
var result=this.stream.findPairedArrays(leftPatterns,rightPatterns,start,this.length);if(result.length){if(this.backward){// noinspection NonBlockStatementBodyJS
if(result[0].right.position<this.start-rightPatterns[result[0].right.id].buffer.byteLength-gap)return[];}else{// noinspection NonBlockStatementBodyJS
if(result[0].left.position>this.start+leftPatterns[result[0].left.id].buffer.byteLength+gap)return[];}}//endregion
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Replace one patter with other
	 * @param {ByteStream} searchPattern The pattern to search for
	 * @param {ByteStream} replacePattern The pattern to replace initial pattern
	 * @returns {*}
	 */},{key:"replacePattern",value:function replacePattern(searchPattern,_replacePattern2){// In case of "backward order" the start position is at the end on stream.
// In case of "normal order" the start position is at the begging of the stream.
// But in fact for search for all patterns we need to have start position in "normal order".
// noinspection ConditionalExpressionJS
var start=this.backward?this.start-this.length:this.start;return this.stream.replacePattern(searchPattern,_replacePattern2,start,this.length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Skip of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {*}
	 */},{key:"skipPatterns",value:function skipPatterns(patterns){var result=this.stream.skipPatterns(patterns,this.start,this.length,this.backward);//region Create new values
this.start=result;//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Skip of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {number}
	 */},{key:"skipNotPatterns",value:function skipNotPatterns(patterns){var result=this.stream.skipNotPatterns(patterns,this.start,this.length,this.backward);// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
if(result==-1)return-1;//region Create new values
this.start=result;//endregion ;
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Append a new "Stream" content to the current "Stream"
	 * @param {ByteStream} stream A new "stream" to append to current "stream"
	 */},{key:"append",value:function append(stream){if(this._start+stream._buffer.byteLength>this._stream._buffer.byteLength){if(stream._buffer.byteLength>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=stream._buffer.byteLength+1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}this._stream._view.set(stream._view,this._start);this._length+=stream._buffer.byteLength*2;this.start=this._start+stream._buffer.byteLength;this.prevLength-=stream._buffer.byteLength*2;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Append a "view" content to the current "Stream"
	 * @param {Uint8Array} view A new "view" to append to current "stream"
	 */},{key:"appendView",value:function appendView(view){if(this._start+view.length>this._stream._buffer.byteLength){if(view.length>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=view.length+1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}this._stream._view.set(view,this._start);this._length+=view.length*2;this.start=this._start+view.length;this.prevLength-=view.length*2;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Append a new char to the current "Stream"
	 * @param {number} char A new char to append to current "stream"
	 */},{key:"appendChar",value:function appendChar(char){if(this._start+1>this._stream._buffer.byteLength){// noinspection ConstantOnLefSideOfComparisonJS
if(1>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}this._stream._view[this._start]=char;this._length+=2;this.start=this._start+1;this.prevLength-=2;}//**********************************************************************************
// noinspection FunctionNamingConventionJS
/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 16-bit integer to append to current "stream"
	 */},{key:"appendUint16",value:function appendUint16(number){if(this._start+2>this._stream._buffer.byteLength){// noinspection ConstantOnLefSideOfComparisonJS
if(2>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}var value=new Uint16Array([number]);var view=new Uint8Array(value.buffer);this._stream._view[this._start]=view[1];this._stream._view[this._start+1]=view[0];this._length+=4;this.start=this._start+2;this.prevLength-=4;}//**********************************************************************************
// noinspection FunctionNamingConventionJS
/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 24-bit integer to append to current "stream"
	 */},{key:"appendUint24",value:function appendUint24(number){if(this._start+3>this._stream._buffer.byteLength){// noinspection ConstantOnLefSideOfComparisonJS
if(3>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}var value=new Uint32Array([number]);var view=new Uint8Array(value.buffer);this._stream._view[this._start]=view[2];this._stream._view[this._start+1]=view[1];this._stream._view[this._start+2]=view[0];this._length+=6;this.start=this._start+3;this.prevLength-=6;}//**********************************************************************************
// noinspection FunctionNamingConventionJS
/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 32-bit integer to append to current "stream"
	 */},{key:"appendUint32",value:function appendUint32(number){if(this._start+4>this._stream._buffer.byteLength){// noinspection ConstantOnLefSideOfComparisonJS
if(4>this.appendBlock){// noinspection MagicNumberJS
this.appendBlock=1000;}this._stream.realloc(this._stream._buffer.byteLength+this.appendBlock);}var value=new Uint32Array([number]);var view=new Uint8Array(value.buffer);this._stream._view[this._start]=view[3];this._stream._view[this._start+1]=view[2];this._stream._view[this._start+2]=view[1];this._stream._view[this._start+3]=view[0];this._length+=8;this.start=this._start+4;this.prevLength-=8;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Get a block of data
	 * @param {number} size Size of the data block to get
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {Array}
	 */},{key:"getBlock",value:function getBlock(size){var changeLength=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(this._length<=0)return[];if(this._length<size){// noinspection AssignmentToFunctionParameterJS
size=this._length;}//endregion
//region Initial variables
var result;//endregion
//region Getting result depends on "backward" flag
if(this.backward){var buffer=this._stream._buffer.slice(this._length-size,this._length);var view=new Uint8Array(buffer);result=new Array(size);// noinspection NonBlockStatementBodyJS
for(var i=0;i<size;i++){result[size-1-i]=view[i];}}else{var _buffer=this._stream._buffer.slice(this._start,this._start+size);// noinspection NestedFunctionCallJS
result=Array.from(new Uint8Array(_buffer));}//endregion
//region Change "length" value if needed
if(changeLength){// noinspection ConditionalExpressionJS
this.start+=this.backward?-1*size:size;}//endregion
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
/**
	 * Get 2-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */},{key:"getUint16",value:function getUint16(){var changeLength=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var block=this.getBlock(2,changeLength);//region Check posibility for convertion
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(block.length<2)return 0;//endregion
//region Convert byte array to "Uint32Array" value
var value=new Uint16Array(1);var view=new Uint8Array(value.buffer);view[0]=block[1];view[1]=block[0];//endregion
return value[0];}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
/**
	 * Get 3-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */},{key:"getUint24",value:function getUint24(){var changeLength=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var block=this.getBlock(3,changeLength);//region Check posibility for convertion
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(block.length<3)return 0;//endregion
//region Convert byte array to "Uint32Array" value
var value=new Uint32Array(1);var view=new Uint8Array(value.buffer);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
for(var i=3;i>=1;i--){view[3-i]=block[i-1];}//endregion
return value[0];}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
/**
	 * Get 4-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */},{key:"getUint32",value:function getUint32(){var changeLength=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var block=this.getBlock(4,changeLength);//region Check posibility for convertion
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(block.length<4)return 0;//endregion
//region Convert byte array to "Uint32Array" value
var value=new Uint32Array(1);var view=new Uint8Array(value.buffer);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
for(var i=3;i>=0;i--){view[3-i]=block[i];}//endregion
return value[0];}//**********************************************************************************
},{key:"stream",set:function set(value){this._stream=value;this.prevLength=this._length;// noinspection JSUnusedGlobalSymbols
this._length=value._buffer.byteLength;this.prevStart=this._start;// noinspection JSUnusedGlobalSymbols
this._start=0;}//**********************************************************************************
/**
	 * Getter for "stream" property
	 * @returns {ByteStream}
	 */,get:function get(){return this._stream;}//**********************************************************************************
/**
	 * Setter for "length" property
	 * @param {number} value
	 */},{key:"length",set:function set(value){this.prevLength=this._length;// noinspection JSUnusedGlobalSymbols
this._length=value;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Getter for "length" property
	 * @returns {number}
	 */,get:function get(){// noinspection NonBlockStatementBodyJS
if(this.appendBlock)return this.start;return this._length;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Setter for "start" property
	 * @param {number} value
	 */},{key:"start",set:function set(value){// noinspection NonBlockStatementBodyJS
if(value>this.stream.buffer.byteLength)return;//region Initialization of "prev" internal variables
this.prevStart=this._start;this.prevLength=this._length;//endregion
// noinspection JSUnusedGlobalSymbols, ConditionalExpressionJS
this._length-=this.backward?this._start-value:value-this._start;// noinspection JSUnusedGlobalSymbols
this._start=value;}//**********************************************************************************
/**
	 * Getter for "start" property
	 * @returns {number}
	 */,get:function get(){return this._start;}//**********************************************************************************
/**
	 * Return ArrayBuffer with having value of existing SeqStream length
	 * @return {ArrayBuffer}
	 */},{key:"buffer",get:function get(){return this._stream._buffer.slice(0,this._length);}}]);return SeqStream;}();//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
 * Get parsed values from "byte map"
 * @param {ByteStream} stream Stream to parse data from
 * @param {Object} map Object with information how to parse "byte map"
 * @param {number} elements Number of elements in parsing byte map
 * @param {?number} [start=null] Start position to parse from
 * @param {?number} [length=null] Length of byte block to parse from
 * @returns {*}
 */exports.SeqStream=SeqStream;function parseByteMap(stream,map,elements){var start=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var length=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;/*
	 Map example:
	 
	 let map = [
	 {
	 type: "string",
	 name: "type",
	 minlength: 1,
	 maxlength: 1,
	 func: function(array)
	 {
	 let result = {
	 status: (-1),
	 length: 1
	 };
	 
	 switch(array[0])
	 {
	 case 0x6E: // "n"
	 result.value = "n";
	 break;
	 case 0x66: // "f"
	 result.value = "f";
	 break;
	 default:
	 return result;
	 }
	 
	 result.status = 1;
	 
	 return result;
	 }
	 },
	 {
	 type: "check",
	 minlength: 1,
	 maxlength: 2,
	 func: function(array)
	 {
	 let position = (-1);
	 
	 if(array[0] == 0x0A)
	 position = 1;
	 if(array[1] == 0x0A)
	 position = 2;
	 
	 return {
	 status: (position > 0) ? 1 : (-1),
	 length: position
	 };
	 }
	 }
	 ];
	 */ //region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start===null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection NonBlockStatementBodyJS
if(start>stream.buffer.byteLength-1)return false;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length===null){// noinspection AssignmentToFunctionParameterJS
length=stream.buffer.byteLength-start;}if(length>stream.buffer.byteLength-start){// noinspection AssignmentToFunctionParameterJS
length=stream.buffer.byteLength-start;}var dataView;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(start==0&&length==stream.buffer.byteLength)dataView=stream.view;else dataView=new Uint8Array(stream.buffer,start,length);var resultArray=new Array(elements);var elementsCount=0;var count=0;var mapLength=map.length;//endregion
//region Parse all byte, structure by structure
while(count<length){var structureLength=0;resultArray[elementsCount]={};for(var i=0;i<mapLength;i++){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, JSUnresolvedVariable, EqualityComparisonWithCoercionJS
if(map[i].maxlength==0){// noinspection NonBlockStatementBodyJS
if("defaultValue"in map[i])resultArray[elementsCount][map[i].name]=map[i].defaultValue;// noinspection ContinueStatementJS
continue;}// noinspection JSUnresolvedVariable
var array=new Array(map[i].maxlength);// noinspection JSUnresolvedVariable
for(var j=0;j<map[i].maxlength;j++){// noinspection IncrementDecrementResultUsedJS
array[j]=dataView[count++];}// noinspection JSUnresolvedVariable
var result=map[i].func(array);// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(result.status==-1)return result;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(map[i].type!="check")resultArray[elementsCount][map[i].name]=result.value;// noinspection JSUnresolvedVariable
count-=map[i].maxlength-result.length;structureLength+=result.length;}// noinspection IncrementDecrementResultUsedJS
resultArray[elementsCount++].structureLength=structureLength;}//endregion
return resultArray;}//**************************************************************************************
//region "Bits-to-string" array
var bitsToStringArray=["00000000","00000001","00000010","00000011","00000100","00000101","00000110","00000111","00001000","00001001","00001010","00001011","00001100","00001101","00001110","00001111","00010000","00010001","00010010","00010011","00010100","00010101","00010110","00010111","00011000","00011001","00011010","00011011","00011100","00011101","00011110","00011111","00100000","00100001","00100010","00100011","00100100","00100101","00100110","00100111","00101000","00101001","00101010","00101011","00101100","00101101","00101110","00101111","00110000","00110001","00110010","00110011","00110100","00110101","00110110","00110111","00111000","00111001","00111010","00111011","00111100","00111101","00111110","00111111","01000000","01000001","01000010","01000011","01000100","01000101","01000110","01000111","01001000","01001001","01001010","01001011","01001100","01001101","01001110","01001111","01010000","01010001","01010010","01010011","01010100","01010101","01010110","01010111","01011000","01011001","01011010","01011011","01011100","01011101","01011110","01011111","01100000","01100001","01100010","01100011","01100100","01100101","01100110","01100111","01101000","01101001","01101010","01101011","01101100","01101101","01101110","01101111","01110000","01110001","01110010","01110011","01110100","01110101","01110110","01110111","01111000","01111001","01111010","01111011","01111100","01111101","01111110","01111111","10000000","10000001","10000010","10000011","10000100","10000101","10000110","10000111","10001000","10001001","10001010","10001011","10001100","10001101","10001110","10001111","10010000","10010001","10010010","10010011","10010100","10010101","10010110","10010111","10011000","10011001","10011010","10011011","10011100","10011101","10011110","10011111","10100000","10100001","10100010","10100011","10100100","10100101","10100110","10100111","10101000","10101001","10101010","10101011","10101100","10101101","10101110","10101111","10110000","10110001","10110010","10110011","10110100","10110101","10110110","10110111","10111000","10111001","10111010","10111011","10111100","10111101","10111110","10111111","11000000","11000001","11000010","11000011","11000100","11000101","11000110","11000111","11001000","11001001","11001010","11001011","11001100","11001101","11001110","11001111","11010000","11010001","11010010","11010011","11010100","11010101","11010110","11010111","11011000","11011001","11011010","11011011","11011100","11011101","11011110","11011111","11100000","11100001","11100010","11100011","11100100","11100101","11100110","11100111","11101000","11101001","11101010","11101011","11101100","11101101","11101110","11101111","11110000","11110001","11110010","11110011","11110100","11110101","11110110","11110111","11111000","11111001","11111010","11111011","11111100","11111101","11111110","11111111"];//endregion
//**************************************************************************************
var BitStream=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for "BitStream" class
	 * @param {{[byteStream]: ByteStream, [view]: Uint8Array, [buffer]: ArrayBuffer, [string]: string, [bitsCount]: number}} parameters
	 */function BitStream(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,BitStream);this.buffer=new ArrayBuffer(0);this.view=new Uint8Array(this.buffer);this.bitsCount=0;// Number of bits stored in current "BitStream"
var _arr3=Object.keys(parameters);for(var _i4=0;_i4<_arr3.length;_i4++){var key=_arr3[_i4];switch(key){case"byteStream":this.fromByteStream(parameters.byteStream);break;case"view":this.fromUint8Array(parameters.view);break;case"buffer":this.fromArrayBuffer(parameters.buffer);break;case"string":this.fromString(parameters.string);break;case"uint32":this.fromUint32(parameters.uint32);break;case"bitsCount":this.bitsCount=parameters.bitsCount;break;default:}}}//**********************************************************************************
/**
	 * Clear existing stream
	 */_createClass(BitStream,[{key:"clear",value:function clear(){this.buffer=new ArrayBuffer(0);this.view=new Uint8Array(this.buffer);this.bitsCount=0;}//**********************************************************************************
/**
	 * Initialize "BitStream" by data from existing "ByteStream"
	 * @param {ByteStream} stream
	 */},{key:"fromByteStream",value:function fromByteStream(stream){this.buffer=stream.buffer.slice(0);this.view=new Uint8Array(this.buffer);this.bitsCount=this.view.length<<3;}//**********************************************************************************
/**
	 * Initialize "BitStream" object from existing "ArrayBuffer"
	 * @param {ArrayBuffer} array The ArrayBuffer to copy from
	 */},{key:"fromArrayBuffer",value:function fromArrayBuffer(array){this.buffer=array.slice(0);this.view=new Uint8Array(this.buffer);this.bitsCount=this.view.length<<3;}//**********************************************************************************
// noinspection FunctionNamingConventionJS
/**
	 * Initialize "BitStream" object from existing "Uint8Array"
	 * @param {Uint8Array} array The Uint8Array to copy from
	 */},{key:"fromUint8Array",value:function fromUint8Array(array){this.buffer=new ArrayBuffer(array.length);this.view=new Uint8Array(this.buffer);this.view.set(array);this.bitsCount=this.view.length<<3;}//**********************************************************************************
/**
	 * Initialize "BitStream" object from existing bit string
	 * @param {string} string The string to initialize from
	 */},{key:"fromString",value:function fromString(string){//region Initial variables
var stringLength=string.length;// noinspection ConditionalExpressionJS
this.buffer=new ArrayBuffer((stringLength>>3)+(stringLength%8?1:0));this.view=new Uint8Array(this.buffer);this.bitsCount=(stringLength>>3)+1<<3;// In order to handle correct shifting
var byteIndex=0;//endregion
//region Convert from "bit string" to bytes
for(var i=0;i<stringLength;i++){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(string[i]=="1")this.view[byteIndex]|=1<<7-i%8;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(i&&(i+1)%8==0)byteIndex++;}//endregion
//region Shift "BitStream" into correct position
// noinspection NonBlockStatementBodyJS
if(stringLength%8)this.shiftRight(8-stringLength%8);//endregion
//region Change "bitsCount"
this.bitsCount=stringLength;//endregion
}//**********************************************************************************
/**
	 * Initialize "BitStream" object from existing uint32 number
	 * @param {Number} number The string to initialize from
	 */},{key:"fromUint32",value:function fromUint32(uint32){this.buffer=new ArrayBuffer(4);this.view=new Uint8Array(this.buffer);var value=new Uint32Array([uint32]);var view=new Uint8Array(value.buffer);for(var i=3;i>=0;i--){this.view[i]=view[3-i];}this.bitsCount=32;}//**********************************************************************************
/**
	 * Represent "BitStream" object content as a string
	 * @param {?number} [start=null] Start number to convert to string from
	 * @param {?number} [length=null] Length of BitStream to convert to string
	 * @returns {string}
	 */},{key:"toString",value:function toString(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start>=this.view.length||start<0){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length==null){// noinspection AssignmentToFunctionParameterJS
length=this.view.length-start;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length>=this.view.length||length<0){// noinspection AssignmentToFunctionParameterJS
length=this.view.length-start;}//endregion
//region Initial variables
var result=[];//endregion
//region Convert from bytes to "bit string"
// noinspection NonBlockStatementBodyJS
for(var i=start;i<start+length;i++){result.push(bitsToStringArray[this.view[i]]);}//endregion
// noinspection ChainedFunctionCallJS
return result.join("").slice((this.view.length<<3)-this.bitsCount);}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Shift entire "BitStream" value right to number of bits
	 * @param {number} shift Number of bits to shift value
	 * @param {boolean} [needShrink=true] Need to shrink result or not
	 */},{key:"shiftRight",value:function shiftRight(shift){var needShrink=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;//region Check parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(this.view.length==0)return;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(shift<0||shift>8)throw new Error("The \"shift\" parameter must be in range 0-8");// noinspection NonBlockStatementBodyJS
if(shift>this.bitsCount)throw new Error("The \"shift\" parameter can not be bigger than \"this.bitsCount\"");//endregion
//region Initial variables
// noinspection MagicNumberJS
var shiftMask=0xFF>>8-shift;this.view[this.view.length-1]>>=shift;//endregion
//region Shift value
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
for(var i=this.view.length-2;i>=0;i--){// noinspection NonShortCircuitBooleanExpressionJS
this.view[i+1]|=(this.view[i]&shiftMask)<<8-shift;this.view[i]>>=shift;}//endregion
//region Decrease number of bits stored into value
this.bitsCount-=shift;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(this.bitsCount==0)this.clear();//endregion
//region Change stream size if needed
// noinspection NonBlockStatementBodyJS
if(needShrink)this.shrink();//endregion
}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Shift entire "BitStream" value left to number of bits
	 * @param {number} shift Number of bits to shift value
	 */},{key:"shiftLeft",value:function shiftLeft(shift){/*
		 NOTE: We do not really shift value because of internal structure of "BitStream":
		 all bytes inside "BitStream" are aligned to right position. So, even if we will
		 really shift value to left after that we will need again shift it right to the
		 same number of bits. Thus all that we do here is hiding of left bits and descresing
		 the "bitsCount" number.
		 */ //region Check parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(this.view.length==0)return;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(shift<0||shift>8)throw new Error("The \"shift\" parameter must be in range 0-8");// noinspection NonBlockStatementBodyJS
if(shift>this.bitsCount)throw new Error("The \"shift\" parameter can not be bigger than \"this.bitsCount\"");//endregion
//region Remove shifted bits
// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
var bitsOffset=this.bitsCount&0x07;if(bitsOffset>shift){// noinspection MagicNumberJS
this.view[0]&=0xFF>>bitsOffset+shift;}else{//region Change size of buffer
var buffer=new ArrayBuffer(this.buffer.byteLength-1);var view=new Uint8Array(buffer);// noinspection NestedFunctionCallJS
view.set(new Uint8Array(this.buffer,1,this.buffer.byteLength-1));//endregion
//region Mask item with index 0
// noinspection MagicNumberJS
view[0]&=0xFF>>shift-bitsOffset;//endregion
//region Store final array into current stream
this.buffer=buffer.slice(0);this.view=new Uint8Array(this.buffer);//endregion
}//endregion
//region Decrease number of bits stored into value
this.bitsCount-=shift;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(this.bitsCount==0)this.clear();//endregion
}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS, FunctionTooLongJS
/**
	 * Return slice of existing "BitStream"
	 * @param {?number} [start=null] Start position of the slice (in bits)
	 * @param {?number} [end=null] End position of the slice (in bits)
	 * @returns {BitStream}
	 */},{key:"slice",value:function slice(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var end=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Make ability to pass non-value bits
var valueShift=0;// noinspection NonBlockStatementBodyJS
if(this.bitsCount%8)valueShift=8-this.bitsCount%8;// noinspection AssignmentToFunctionParameterJS
start+=valueShift;// noinspection AssignmentToFunctionParameterJS
end+=valueShift;//endregion
//region Initial variables
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(start==null){// noinspection AssignmentToFunctionParameterJS
start=0;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start<0||start>(this.view.length<<3)-1)return new BitStream();//("Wrong start position: " + start);
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(end==null){// noinspection AssignmentToFunctionParameterJS
end=(this.view.length<<3)-1;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(end<0||end>(this.view.length<<3)-1)return new BitStream();//("Wrong end position: " + end);
// noinspection NonBlockStatementBodyJS
if(end-start+1>this.bitsCount)return new BitStream();//("Maximum length is " + this.bitsCount);
var startIndex=start>>3;// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
var startOffset=start&0x07;var endIndex=end>>3;// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
var endOffset=end&0x07;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
var bitsLength=endIndex-startIndex==0?1:endIndex-startIndex+1;var result=new BitStream();//endregion
//region Store "primary bytes"
result.buffer=new ArrayBuffer(bitsLength);result.view=new Uint8Array(result.buffer);result.bitsCount=bitsLength<<3;// noinspection NestedFunctionCallJS
result.view.set(new Uint8Array(this.buffer,startIndex,bitsLength));//endregion
//region Change "start byte"
// noinspection MagicNumberJS
result.view[0]&=0xFF>>startOffset;//endregion
//region Change "end byte"
// noinspection MagicNumberJS
result.view[bitsLength]&=0xFF<<7-endOffset;//endregion
//region Shift result array to right
// noinspection NonBlockStatementBodyJS
if(7-endOffset)result.shiftRight(7-endOffset,false);//endregion
//region Set final number of bits
result.bitsCount=end-start+1;//endregion
//region Cut unnecessary bytes from result
result.shrink();//endregion
return result;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
	 * Return copy of existing "BitStream"
	 * @param {?number} [start=null] Start position of the copy (in bits)
	 * @param {?number} [length=null] Length of the copy (in bits)
	 * @returns {BitStream}
	 */},{key:"copy",value:function copy(){var start=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//region Check input parameters
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(start<0||start>(this.view.length<<3)-1)return new BitStream();//("Wrong start position: " + start);
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
if(length===null){// noinspection AssignmentToFunctionParameterJS
length=(this.view.length<<3)-start-1;}// noinspection NonBlockStatementBodyJS
if(length>this.bitsCount)return new BitStream();//("Maximum length is " + this.bitsCount);
//endregion
return this.slice(start,start+length-1);}//**********************************************************************************
/**
	 * Shrink unnecessary bytes in current stream accordingly to "bitsCount" value
	 */},{key:"shrink",value:function shrink(){// noinspection ConditionalExpressionJS
var currentLength=(this.bitsCount>>3)+(this.bitsCount%8?1:0);if(currentLength<this.buffer.byteLength){//region Change size of buffer
var buffer=new ArrayBuffer(currentLength);var view=new Uint8Array(buffer);// noinspection NestedFunctionCallJS
view.set(new Uint8Array(this.buffer,this.buffer.byteLength-currentLength,currentLength));//endregion
//region Store final array into current stream
this.buffer=buffer.slice(0);this.view=new Uint8Array(this.buffer);//endregion
}}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Reverse bits order in each byte in the stream
	 * Got it from here: http://graphics.stanford.edu/~seander/bithacks.html#ReverseByteWith32Bits
	 */},{key:"reverseBytes",value:function reverseBytes(){//region Reverse bits order in each byte in the stream
for(var i=0;i<this.view.length;i++){// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
this.view[i]=(this.view[i]*0x0802&0x22110|this.view[i]*0x8020&0x88440)*0x10101>>16;}//endregion
//region Shift "most significant" byte
if(this.bitsCount%8){// noinspection ConditionalExpressionJS
var currentLength=(this.bitsCount>>3)+(this.bitsCount%8?1:0);// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
this.view[this.view.length-currentLength]>>=8-(this.bitsCount&0x07);}//endregion
}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Reverse all bits in entire "BitStream"
	 */},{key:"reverseValue",value:function reverseValue(){var initialValue=this.toString();var initialValueLength=initialValue.length;var reversedValue=new Array(initialValueLength);// noinspection NonBlockStatementBodyJS
for(var i=0;i<initialValueLength;i++){reversedValue[initialValueLength-1-i]=initialValue[i];}// noinspection NestedFunctionCallJS
this.fromString(reversedValue.join(""));}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Trying to represent entire "BitStream" as an unsigned integer.
	 * @return {number}
	 */},{key:"getNumberValue",value:function getNumberValue(){//region Initial variables
var byteLength=this.buffer.byteLength-1;//endregion
//region Check posibility for convertion
// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
if(byteLength>3)return-1;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(byteLength==-1)return 0;//endregion
//region Convert byte array to "Uint32Array" value
var value=new Uint32Array(1);var view=new Uint8Array(value.buffer);// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
for(var i=byteLength;i>=0;i--){view[byteLength-i]=this.view[i];}//endregion
return value[0];}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find any bit pattern in "BitStream"
	 * @param {BitStream} pattern Stream having pattern value
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {number}
	 */},{key:"findPattern",value:function findPattern(pattern){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPattern=new ByteStream({string:pattern.toString()});//endregion
return stringStream.findPattern(stringPattern,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find first position of any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{id: number, position: number}}
	 */},{key:"findFirstIn",value:function findFirstIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findFirstIn(stringPatterns,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllIn",value:function findAllIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findAllIn(stringPatterns,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all positions of a pattern
	 * @param {BitStream} pattern Stream having pattern value
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array|number}
	 */},{key:"findAllPatternIn",value:function findAllPatternIn(pattern){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Convert "BitStream" values to "ByteStream" 
var stringStream=new ByteStream({string:this.toString()});var stringPattern=new ByteStream({string:pattern.toString()});//endregion 
return stringStream.findAllPatternIn(stringPattern,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{left: {id: number, position: *}, right: {id: number, position: number}, value: ByteStream}}
	 */},{key:"findFirstNotIn",value:function findFirstNotIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findFirstNotIn(stringPatterns,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllNotIn",value:function findAllNotIn(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findAllNotIn(stringPatterns,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{position, value}|*}
	 */},{key:"findFirstSequence",value:function findFirstSequence(patterns){var start=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var length=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var backward=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findFirstSequence(stringPatterns,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findAllSequences",value:function findAllSequences(patterns,start,length){//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.findAllSequences(stringPatterns,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Find all paired patterns in the stream
	 * @param {BitStream} leftPattern Left pattern to search for
	 * @param {BitStream} rightPattern Right pattern to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findPairedPatterns",value:function findPairedPatterns(leftPattern,rightPattern){var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringLeftPattern=new ByteStream({string:leftPattern.toString()});var stringRightPattern=new ByteStream({string:rightPattern.toString()});//endregion
return stringStream.findPairedPatterns(stringLeftPattern,stringRightPattern,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS
/**
	 * Find all paired patterns in the stream
	 * @param {Array.<BitStream>} inputLeftPatterns Array of left patterns to search for
	 * @param {Array.<BitStream>} inputRightPatterns Array of right patterns to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */},{key:"findPairedArrays",value:function findPairedArrays(inputLeftPatterns,inputRightPatterns){var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringLeftPatterns=new Array(inputLeftPatterns.length);for(var i=0;i<inputLeftPatterns.length;i++){stringLeftPatterns[i]=new ByteStream({string:inputLeftPatterns[i].toString()});}var stringRightPatterns=new Array(inputRightPatterns.length);for(var _i5=0;_i5<inputRightPatterns.length;_i5++){stringRightPatterns[_i5]=new ByteStream({string:inputRightPatterns[_i5].toString()});}//endregion
return stringStream.findPairedArrays(stringLeftPatterns,stringRightPatterns,start,length);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
/**
	 * Replace one pattern with other
	 * @param {BitStream} searchPattern The pattern to search for
	 * @param {BitStream} replacePattern The pattern to replace initial pattern
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {boolean}
	 */},{key:"replacePattern",value:function replacePattern(searchPattern,_replacePattern3){var start=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var length=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringSearchPattern=new ByteStream({string:searchPattern.toString()});var stringReplacePattern=new ByteStream({string:_replacePattern3.toString()});//endregion
//region Re-initialize existing data
if(stringStream.findPairedPatterns(stringSearchPattern,stringReplacePattern,start,length)){// noinspection NestedFunctionCallJS
this.fromString(stringStream.toString());return true;}//endregion
return false;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Skip any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */},{key:"skipPatterns",value:function skipPatterns(patterns,start,length,backward){//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.skipPatterns(stringPatterns,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Skip any pattern not from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {number}
	 */},{key:"skipNotPatterns",value:function skipNotPatterns(patterns,start,length,backward){//region Convert "BitStream" values to "ByteStream"
var stringStream=new ByteStream({string:this.toString()});var stringPatterns=new Array(patterns.length);for(var i=0;i<patterns.length;i++){stringPatterns[i]=new ByteStream({string:patterns[i].toString()});}//endregion
return stringStream.skipNotPatterns(stringPatterns,start,length,backward);}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Append a new "BitStream" content to the current "BitStream"
	 * @param {BitStream} stream A new "stream" to append to current "stream"
	 */},{key:"append",value:function append(stream){//region Initialize current stream with new data
// noinspection NestedFunctionCallJS
this.fromString([this.toString(),stream.toString()].join(""));//endregion
}//**********************************************************************************
}]);return BitStream;}();//**************************************************************************************
exports.BitStream=BitStream;var SeqBitStream=/*#__PURE__*/function(){//**********************************************************************************
function SeqBitStream(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SeqBitStream);//region Internal variables
this.stream=new BitStream();this._start=0;this._length=this.stream.bitsCount;this.backward=false;this.appendBlock=0;//endregion
var _arr4=Object.keys(parameters);for(var _i6=0;_i6<_arr4.length;_i6++){var key=_arr4[_i6];switch(key){case"stream":case"start":case"length":case"backward":case"appendBlock":this[key]=parameters[key];break;default:}}}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
_createClass(SeqBitStream,[{key:"getBits",//**********************************************************************************
// noinspection JSUnusedGlobalSymbols
/**
	 * Get next "length" bits from the stream
	 * @param {number} length Number of bits to read
	 * @returns {*}
	 */value:function getBits(length){//region Check input parameters 
if(this.start+length>this.stream.bitsCount){// noinspection AssignmentToFunctionParameterJS
length=this.stream.bitsCount-this.start;}//endregion 
//region Initial variables 
var result;//endregion 
//region Copy necessary length of bits
if(this.backward){result=this.stream.copy(this.start-length,length);this.start-=result.bitsCount;}else{result=this.stream.copy(this.start,length);this.start+=result.bitsCount;}//endregion
return result;}//**********************************************************************************
// noinspection FunctionTooLongJS
/**
	 * Get string representation for the next "length" bits from the stream
	 * @param {number} length Number of bits to read
	 * @returns {string}
	 */},{key:"getBitsString",value:function getBitsString(length){//region Check input parameters
if(this.start+length>this.stream.bitsCount){// noinspection AssignmentToFunctionParameterJS
length=this.stream.bitsCount-this.start;}//endregion
//region Initial variables
var result=[];var start;// noinspection NonBlockStatementBodyJS
if(this.backward)start=this.start-length;else start=this.start;var end=this.start+length-1;//region Make ability to pass non-value bits
var valueShift=0;// noinspection NonBlockStatementBodyJS
if(this.stream.bitsCount%8)valueShift=8-this.stream.bitsCount%8;start+=valueShift;end+=valueShift;//endregion
var startIndex=start>>3;// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
var startOffset=start&0x07;var endIndex=end>>3;// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
var endOffset=end&0x07;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
var bitsLengthIndex=startIndex+(endIndex-startIndex==0?1:endIndex-startIndex+1);//endregion
//region Get string representation of bits
for(var i=startIndex;i<bitsLengthIndex;i++){var value=bitsToStringArray[this.stream.view[i]];// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(i==startIndex)value=value.slice(startOffset);// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(i==bitsLengthIndex-1)value=value.slice(0,endOffset-7+value.length);result.push(value);}result=result.join("");//endregion
//region Change internal values
// noinspection NonBlockStatementBodyJS
if(this.backward)this.start-=result.length;else this.start+=result.length;//endregion
return result;}//**********************************************************************************
// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
	 * Get number value representation of the next "length" bits from the stream, preliminary reversed
	 * @param {number} length Number of bits to read
	 * @returns {*}
	 */},{key:"getBitsReversedValue",value:function getBitsReversedValue(length){//region Initial variables 
var initialValue=this.getBitsString(length);var initialValueLength=initialValue.length;var byteIndex;var initialOffset=8-initialValueLength%8;var reversedValue=new Array(initialValueLength);var value=new Uint32Array(1);var valueView=new Uint8Array(value.buffer,0,4);var i;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, MagicNumberJS, NonBlockStatementBodyJS
if(initialValueLength>32)return-1;// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, MagicNumberJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(length==32)byteIndex=3;else byteIndex=initialValueLength-1>>3;//endregion
//region Reverse value 
// noinspection NonBlockStatementBodyJS
for(i=0;i<initialValueLength;i++){reversedValue[initialValueLength-1-i]=initialValue[i];}//endregion 
//region Convert byte array to "Uint32Array" value 
for(i=initialOffset;i<initialOffset+initialValueLength;i++){// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
if(reversedValue[i-initialOffset]=="1"){// noinspection MagicNumberJS
valueView[byteIndex]|=0x01<<7-i%8;}// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
if(i&&(i+1)%8==0)byteIndex--;}//endregion 
return value[0];}//**********************************************************************************
/**
	 * Represent remaining bits in "BitStream" as a string
	 * @return {string}
	 */},{key:"toString",value:function toString(){var streamToDisplay=this.stream.copy(this.start,this.length);return streamToDisplay.toString();}//**********************************************************************************
},{key:"start",set:function set(value){// noinspection NonBlockStatementBodyJS
if(value>this.stream.bitsCount)return;// noinspection ConditionalExpressionJS
this._length-=this.backward?this._start-value:value-this._start;this._start=value;//region Initialization of "prev" internal variables
// noinspection JSUnusedGlobalSymbols
this.prevStart=this._start;// noinspection JSUnusedGlobalSymbols
this.prevLength=this._length;//endregion
}//**********************************************************************************
,get:function get(){return this._start;}//**********************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
},{key:"length",set:function set(value){// noinspection NonBlockStatementBodyJS
if(value>this.stream.bitsCount)return;// noinspection JSUnusedGlobalSymbols
this.prevLength=this._length;this._length=value;}//**********************************************************************************
,get:function get(){return this._length;}//**********************************************************************************
},{key:"stream",set:function set(value){this._stream=value;// noinspection JSUnusedGlobalSymbols
this.prevLength=this._length;this._length=value.bitsCount;// noinspection JSUnusedGlobalSymbols
this.prevStart=this._start;// noinspection ConditionalExpressionJS
this._start=this.backward?this.length:0;}//**********************************************************************************
,get:function get(){return this._stream;}}]);return SeqBitStream;}();//**************************************************************************************
exports.SeqBitStream=SeqBitStream;
//# sourceMappingURL=bytestream.js.map