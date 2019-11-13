// JavaScript Document

const ACE_THEME_BRIGHT = 'ace/theme/textmate';
const ACE_THEME_DARK = 'ace/theme/tomorrow_night_eighties';
const COOKIE_CODE_THEME = 'code_theme';

/***********************************************************************
 *          		EDITOR CREATION							           *
 **********************************************************************/
function GetCodeWithAjax(code_type, que_str_id) {
	var result, sub_sbj_id;
	sub_sbj_id = ($('div.subject_container').length != 0) ? $('#sub_sbj_id').val() : null;
	$.get({
		url: '/commonscripts/GetCodeRuntestAjaxScript',
		async: false,
		dataType: 'json',
		data: {code_type: code_type, sub_sbj_id: sub_sbj_id, que_str_id: que_str_id},
		success: function (data) {
			result = data;
		}
	});

	if (result.hasOwnProperty('refresh')) {
		$('#QuestionForm').attr("action", result.next_screen).submit();
	} else {
		return result;
	}
}
/***********************************************************************
 *          		EDITOR CREATION							           *
 **********************************************************************/
function CreateScreenEditors(ace_mode, lan_lin_offset, code_type) {
	var result;
	result = (arguments.length == 4) ? GetCodeWithAjax(code_type, arguments[3]) : GetCodeWithAjax(code_type, $('#que_str_id').val());
	if (ace_mode == 'html') {
		document.is_html = true;
		window.aceEditor = CreateEditor('question_code', 1, result.code.question_code.html==null ? " " :  result.code.question_code.html);
		window.aceEditor.session.setMode("ace/mode/html");
		window.CSSEditor = CreateEditor('question_css', 1, result.code.question_code.css==null ? " " :  result.code.question_code.css);
		window.CSSEditor.session.setMode("ace/mode/css");
		window.JSEditor = CreateEditor('question_js', 1, result.code.question_code.css==null ? " " :  result.code.question_code.js);
		window.JSEditor.session.setMode("ace/mode/javascript");
	} else {
		document.is_html = false;
		window.aceEditor = CreateEditor('question_code', lan_lin_offset, result.code.question_code==null ? " " :  result.code.question_code);
	}
	if(result.code.hasOwnProperty("solution_code")){
		window.aceSolutionEditor = CreateEditor('solution_code', 1, result.code.solution_code==null ? " " :  result.code.solution_code);
	}
	if(code_type=='EditorCode'){
		window.aceEditor.setReadOnly(result.use_github_for_code);
		window.aceSolutionEditor.setReadOnly(result.use_github_for_solution);
		$('#code_is_locked').toggle(result.use_github_for_code);
		$('#solution_is_locked').toggle(result.use_github_for_solution);
	}
	document.question_submit_request = false;
}

function CreateEditor(theEditor, line_offset, source) //can be called with 4 arguments to force mode
{
	ace.require("ace/ext/language_tools");
	var myeditor = ace.edit(theEditor);
	myeditor.setShowPrintMargin(false);
	myeditor.setTheme(getCurrentTheme());
	myeditor.setOption("firstLineNumber", line_offset);
	

	var	ace_mode = (arguments.length == 4) ?  arguments[3] : mainArticleData('ace_mode');
	myeditor.session.setMode("ace/mode/" + ace_mode);
	
	myeditor.SetSource = function (source) {
		this.setValue(source);
		if (($('textarea[name="txt"]').length == 0) && (source.search("<NON EDITABLE FILE/>") > 0)) {
			this.setReadOnly(true);
			var therange = this.find('<NON EDITABLE FILE/>');
			this.find('zutzut');
			this.session.addFold("", new Range(therange.start.row + 0, 0, therange.end.row + 2, 300));
		}
	};
	myeditor.$blockScrolling = Infinity;
	myeditor.SetSource(source);
	myeditor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		fontSize: "14px",
		fontFamily: "Inconsolata",
        wrap:true,
		
	});

	var beg = myeditor.find($('#beg_tag').val());
	if (beg != undefined){
		myeditor.gotoLine(beg.start.row + 2);
	}
	return myeditor;
}

function CreateReadOnlyEditor(que_str_id)
{
	var result = GetCodeWithAjax('result_report', que_str_id)
	return CreateReadOnlyEditorWithCode(que_str_id, result.code);
}

function CreateReadOnlyEditorWithCode(que_str_id, code) {
	editor = ace.edit('editor_' + que_str_id + '_code');
	editor.setShowPrintMargin(false);
	editor.setTheme(getCurrentTheme());
	editor.session.setMode("ace/mode/" + mainArticleData('ace_mode'));
	editor.$blockScrolling = Infinity;
	editor.setValue(code);
	editor.setReadOnly(true);
	editor.clearSelection();
	editor.renderer.setShowGutter(false);
	editor.getSession().setUseWorker(false);
	editor.setOptions({
		enableBasicAutocompletion: false,
		enableSnippets: false,
		fontSize: "14px",
		fontFamily: "Inconsolata",
        wrap:true,
		
	});
	return editor;
}

function CreateReportEditors(questions)
{
	var myeditors = new Array();
	var ace_mode = mainArticleData('ace_mode');
	questions = jQuery.parseJSON(questions);

	for (var iter in questions) {
		var que_str_id = questions[iter];
		var editor_name = 'editor_' + que_str_id + '_code';
		myeditors[iter] = CreateReadOnlyEditorWithCode(que_str_id, $('#' + que_str_id + '_answer').val());
		document.getElementById(editor_name).style.fontSize = '11px';
		var height = GetHeight(editor_name);
		$('#' + editor_name).css('height', height);
		myeditors[iter].resize(true);
		$('#editor_' + que_str_id + "_container").css('height', height);
		var beg = myeditors[iter].find($('#beg_tag').val());
		var end = myeditors[iter].find($('#end_tag').val());
		myeditors[iter].clearSelection();

		if ((typeof beg !== 'undefined') && (typeof end !== 'undefined')) {
			var therange = new Range(beg.start.row, 0, end.start.row + 1, 0);
			myeditors[iter].getSession().addMarker(therange, "ace_active-line", "fullLine");
		}
	}
	return myeditors;
}

function ConcatenateCodes() {
	if (mainArticleData('ace_mode') == 'html') {
		var result = new Object();
		result[document.isograd_constants.HTML_SBJ_ID] = window.aceEditor.getSession().getValue();
		result['js'] =  window.JSEditor.getSession().getValue() ;
		result['css'] = window.CSSEditor.getSession().getValue() ;
		return JSON.stringify(result);
	} else {
		return window.aceEditor.getSession().getValue();
	}
}

/***********************************************************************
 *            MULTI CODE AREA DISPLAY								   *
 **********************************************************************/
function ShowCode(zone, me)
{
	$('div.code').each(function () {
		$(this).hide();
	});
	$('div.code.multi_code').each(function () {
		$(this).show();
	});
	$('p.onglet').each(function () {
		$(this).removeClass("selected");
	});
	$('#' + zone).show();
	$(me).parent().addClass("selected");
}

/*********************************************************************
 *              RESIZE								                 *
 ********************************************************************/
function ResizeEditors(){
	window.aceEditor.resize(true);
	if(document.is_html){
		window.CSSEditor.resize(true);
		window.JSEditor.resize(true);
	}
	if($('#solution_container').length!=0){
		window.aceEditor.resize(true);
	}
}

function GetHeight(editor){
	return 1500 - $('#' + editor).parent().position().top;
}

function switchCodeTheme() {
	var newTheme = window.aceEditor.getTheme() === ACE_THEME_BRIGHT ? ACE_THEME_DARK : ACE_THEME_BRIGHT;

	window.aceEditor.setTheme(newTheme);
	if(typeof window.JSEditor !== 'undefined') {
		window.JSEditor.setTheme(newTheme);
	}
	if(typeof window.CSSEditor !== 'undefined') {
		window.CSSEditor.setTheme(newTheme);
	}

	$('.code_controlbar button.change_theme i').toggleClass('fa-moon-o');
	$('section.runtest').toggleClass('bright');
	setCookie(COOKIE_CODE_THEME, newTheme === ACE_THEME_BRIGHT ? 'bright' : '');
}

function getCurrentTheme() {
	var theme = ACE_THEME_DARK;

	/* Force editor in bright mode
		 - #displaycode > Show candidate result (in dialog)
	     - #article_questioneditor > question edition
	     - .pdfcontent > in a PDF page
	     - .bright > color set manually (or in cookie)
	*/
	if ($("#displaycode, #article_questioneditor, .pdfcontent, .bright").length) {
		theme = ACE_THEME_BRIGHT;
	}

	if(theme === ACE_THEME_BRIGHT) {
		$('.code_controlbar button.change_theme i').toggleClass('fa-moon-o');
	}

	return theme;
}

function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + ((365+30)*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
