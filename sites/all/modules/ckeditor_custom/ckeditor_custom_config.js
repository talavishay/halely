/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.config.contentsLangDirection='rtl';

CKEDITOR.editorConfig = function( config ){
     
  // config.styleSet is an array of objects that define each style available
  // in the font styles tool in the ckeditor toolbar
  
    config.stylesSet =
  [
        /* Block Styles */

        // Each style is an object whose properties define how it is displayed
        // in the dropdown, as well as what it outputs as html into the editor
        // text area.
        { name : 'publication category'   , element : 'h6', attributes : { 'style' : 'color:#620B01;    ' } }
  ];

};
