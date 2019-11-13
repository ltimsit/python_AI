// JavaScript Document

/***********************************************************************
 *               ON LOAD									           *
 **********************************************************************/

function CodeQuestionWindowLoad()
{
    ResizeBlocks();
	document.strings_runtest_code = javaGetStrings("runtest_code.js", "tst"); //171
	CreateScreenEditors(mainArticleData('ace_mode'), parseInt($('.answers').data('lan_lin_off')), 'TakeQuestionCode')
    $(window).resize(function(event,ui) {ResizeBlocks();});
	if (parseInt($('.question_text').css("height")) < 250) {
		$('#medium_question').hide();
	}
	ShowCode('question_code_container', '#show_code');
	if (document.is_html) {
		HTMLQuestionWindowLoad();
	}
	if ($('#autocompletion_dialog').length != 0) {
		OpenDialog("autocompletion_dialog", {width: 500, resizable: false, closeOnEscape: true});
	}

	if (document.is_contest) {
		InitalizeNewsArea();
	}

}

function ResizeBlocks(){
    var section_height = parseInt($('section.runtest').css("height"));
    var server_result = parseInt($('div.server_result').css("height"));
    if( $('article.review_block').length!=0){
        section_height -= 446;
    }
    $('#contest_helper, div.left_block, #darklayer').css('height', section_height);
    $('#news_container').css('height', server_result-10);
}

/***********************************************************************
 *               SOLUTION DIALOG								       *
 **********************************************************************/
function ShowSolution() {
	if ($('#solution_code').val().length > 3) {
		CreateReadOnlyEditorWithCode(1, $('#solution_code').val());
	}
	OpenDialog("solution", {width: 790, height: 600, resizable: false, closeOnEscape: true});
	$("#solution_code_container").show();
}

/***********************************************************************
 *               WAIT												   *
 **********************************************************************/

function ShowWaitArea(include_stop_button)
{
	var speed;
	if (document.is_html) {
		include_stop_button = false;
	}
	$('div.subject_container').hide();
	$('div.code_controlbar button').hide();
	switch (mainArticleData('ace_mode')) {
		case "java":
			speed = 40;
			break;
		case "csharp":
			speed = 120;
			break;
		default:
			speed = 20;
	}
	$('.progress-bar').css('width', '0%');
	$('#wait_area').removeClass('hide');// hide does not work on Chrome;
	$('.control-bar-buttons').addClass('hide'); // hide does not work on Chrome;
	$('#stop_processing_button').removeClass('hide');
	$('#stop_processing_button').show();
	AnimateProgressBar(speed);
}

function HideWaitArea()
{
	$('#wait_area').addClass('hide');// hide does not work on Chrome;
	$('div.code_controlbar button').show();
	$('#stop_processing_button').addClass('hide');
	$('div.subject_container').show();
	clearInterval(timer_interval_wait);
}

/***********************************************************************
 *                ANSWER PROCESSING								       *
 **********************************************************************/
function TestCodeAnswer()
{
	var result = "";
	var thedata, cod, answer;

	ShowWaitArea(true);
	cod = window.hasOwnProperty('aceEditor') ? ConcatenateCodes() : null;
	thedata = {final_code: cod, submit_sta_id: document.runtest_constants.SUBMIT_STA_OK, comments: $('#comments').val(), "que_str_id": $('#que_str_id').val()};
	if ($('#sub_sbj_id').length != 0) {
		thedata['sub_sbj_id'] = $('#sub_sbj_id').val();
	}
	document.tryanswerajax = $.post(
			{url: '/RunTest/TryAnswerAjaxScript',
				type: 'post',
				data: thedata,
				dataType: "json",
				success: function (data) {
					if (data.hasOwnProperty('refresh')) {
						$(window).off('beforeunload');
						$('#QuestionForm').attr("action", data.next_screen).submit();
					}
					ProcessResult(data);
					if (data.success) {
						if (!document.is_html) {
							displayTryAnswerResultDialog(data);
							if (data.score == data.max_sco) {
								$('#correct_answer_information_dialog button.improve').show();
							}
						}
					}
				},
				error: function () {
					HideWaitArea();
					displayInErrorArea(document.strings_runtest_code[6]);
				}

			});

}

function ProcessResult(result)
{
	if ((typeof result === 'object') && result.hasOwnProperty('success')) {
        var old_doc_height=$(document).height();
		$('#server_output').html(result.output);
		$('#server_errors').html(result.error_output);
		if (result.hasOwnProperty('displayed_page')) {
			DisplayHTMLResult(result);
		}
	} else {
		$('#server_output, #server_errors').html('');
	}
	if (!document.question_submit_request) {
		HideWaitArea();
	}

	if (result.error_output && result.error_output.length > 5) {
		$('#outputerror_button').click();
	} else {
		ToggleOutput("#output", '#server_output');
	}
	document.location.href = "#output";
    ResizeBlocks();
	
}

function StopProcessing()
{
	if (document.hasOwnProperty('tryanswerajax')) {
		document.tryanswerajax.abort();
	}
	$('#server_output, #server_errors, #html_result').html('');
	$('#local_echo_display pre').html('');
	if ($('#show_question_success_area').val() == 1)
	{
		displayInErrorArea("Execution has been aborted");
	}
	HideWaitArea();
}

function displayInErrorArea(message) {
	$('#server_output').html('');
	$('#server_errors').html(message);
	$('#outputerror_button').click();

}

function SubmitCodeAnswer(submit_sta_id)
{
	var ok;
	ok = (!document.hasOwnProperty('tryanswerajax') && !document.is_contest && document.confirm_submit) ? confirm(document.strings_runtest_code[8]) : true;// this check if the test button has been used
	if (ok)
	{
		if (document.is_html && submit_sta_id == document.runtest_constants.SUBMIT_STA_OK) {
			//This is the case where the candidate presses Submit on an HTML question
			//we return false so that the question is not submitted an we first do the processing locally
			document.question_submit_request = true;
			TestCodeAnswer();
			return false;
		}
		ShowWaitArea(false); // false mean do not show stop button
	} else {
		HideWaitText('#boutonvalidation');
	}
	return ok;
}

function HideCorrectAnswerDialogButton() {
	$('#correct_answer_information_dialog .button_area').addClass('hide');
}


/***********************************************************************
 *                     UTILITIES			  						   *
 **********************************************************************/
function ToggleOutput(link, zone)
{
	$('div.server_result div').hide();
	$(zone).show();
	$('div.server_result button').removeClass('selected');
	$(link).addClass('selected');
    ResizeBlocks();
	
}

function ToggleHint()
{
	$('#hint').toggle();
}

function ResetCode()
{
	var result;

	if (confirm(document.strings_runtest_code[15])) {
		result = GetCodeWithAjax('reset')
		if (document.is_html) {
			ShowCode('code', '#show_code');
			window.aceEditor.SetSource(result.code.question_code.html);
			window.aceEditor.resize(true);
			ShowCode('css', '#show_css');
			window.CSSEditor.SetSource(result.code.question_code.css);
			window.CSSEditor.resize(true);
			ShowCode('js', '#show_js');
			window.JSEditor.SetSource(result.code.question_code.js);
			window.JSEditor.resize(true);
			ShowCode('code', '#show_code');
		} else {
			window.aceEditor.SetSource(result.code.question_code);
		}
	}
}

function ChangeCodeQuestion(que_str_id) {
	$('#change_question').val(que_str_id);
	SubmitQuestion(document.runtest_constants.SUBMIT_STA_QUE_CHAN);
}


function SkipCodeQuestion() {
	if (confirm(document.strings_runtest_code[19])) {
		SubmitQuestion(document.runtest_constants.SUBMIT_STA_SKIP);
	}
}
