
function ChangeSubSubject(id)
{
	$.get({url: '/RunTest/ClearStdinCodeAjaxScript', 
		dataType: "json", 
		success: function(data) {
			$('#sub_sbj_id').val(id);
			$('#QuestionForm').attr("action", "/runtest/QuestionDisplayer").submit();
		}});
}

function SubmitContestQuestion() {
	var result;
	ShowWaitArea(true);
	$('#final_code').val(ConcatenateCodes());
	document.tryanswerajax = $.post(
			{url:  '/RunTest/TryAnswerAjaxScript',
				data: $('#QuestionForm').serialize() + "&submit_sta_id=" + document.runtest_constants.SUBMIT_STA_OK,
				dataType: "json",
				timeout: 60000,
				success: function (data) {
					result = data;
					if ((typeof result === 'object')) {
						if(result.hasOwnProperty('refresh')){
							$(window).off('beforeunload');
							$('#QuestionForm').attr("action", result.next_screen).submit();
						}else if(result.hasOwnProperty('change_page')){
							ProcessResult(result);
							if (result.change_page) {
								if (result.change_page_status === document.runtest_constants.CHANGE_PAGE_STATUS_EXCEPTION) {
									CheckSession();
								} else if (result.change_page_status === document.runtest_constants.CHANGE_PAGE_STATUS_ALL_QUESTION_ANSWERED) {
									ContinueContest();
								} else {
									if (result.change_page_status === document.runtest_constants.CHANGE_PAGE_STATUS_RANK) {
										$('.question_title').html(GetRankingText(result));
										$('.next_question').removeClass('hide');
									} else if (result.change_page_status === document.runtest_constants.CHANGE_PAGE_STATUS_CONTEST_IS_OVER) {
										$('.question_title').html(document.strings_runtest[16]);
									}
									OpenDialog("contest_success", {width: 580, closeOnEscape: false});
								}
							} else if (result.dis_is_con_ove) {
								OpenDialog("contest_finish", {width: 550, closeOnEscape: false});
							}
						} else {
							CheckSession();
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					if (textStatus == "timeout") {
						ProcessResult({type: "text", output: "", error_output: document.strings_runtest_code[17], local_echo: ""});
					} else if (textStatus == "error") {
						CheckSession();
					}
				}
			});
}

function CheckSession() {
	var result;
	$.get(
			{url: '/RunTest/CheckSessionIsAliveAjaxScript',
				dataType: "json",
				timeout: 2000,
				success: function (data) {
					result = data;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					result = {success: false};
				}
			});
	HideWaitArea();
	if ((typeof result !== 'object') || (result.success == false)) {
		$('#last_code').val(ConcatenateCodes());
		OpenDialog("connection_lost", {width: 600, resizable: false, closeOnEscape: false});
	} else {
		ProcessResult({type: "text", output: "", error_output: document.strings_runtest_code[18], local_echo: ""});
	}
}

function ContinueContest() {
	$('#contest_success .button_area').addClass('hide');
	SubmitQuestion(document.runtest_constants.SUBMIT_STA_CHECK_SUCCESS);
}

function BackToList(return_page) {
	document.unload_is_ok = true;
	$(window).off('beforeunload');
    window.location = return_page;
}

function GetRankingText(result) {
	switch(result.ranking){
		case  "-1": //Do not display ranking
		case -1:
			return '';
			break;
		case  "1": //Candidate is first
			return document.strings_runtest[8];
			break;
		case "2": //Candidate is second
			return $.vsprintf(document.strings_runtest[9], [result.delay]);
			break;
		default: //Candidate is more than second
			return $.vsprintf(document.strings_runtest[10], [result.ranking, result.delay]);
	}
}



function ExpandHelper(element){
    //contestquestion displayer menu helper;
   
    var targetid = $(element).attr('data-target');
    //console.log('ExpandHelper target id=', targetid);
    $('.left_block').find('a.active').removeClass('active');
    $('#contest_helper').find('.collapse.in[id!="' + targetid + '"]').removeClass('in');
    //console.log('.collapse.in[id!="' + targetid + '"]');
    $('#' + targetid).toggleClass('in');
    if($('#' + targetid).hasClass('in')){
        $('#darklayer').addClass('on');
        $(element).addClass('active');
    }else{
        $('#darklayer').removeClass('on');
    
    }
    if(targetid=='help_text'){
        $('.hint_notification').removeClass('hint_notification');
        sessionStorage.setItem('hint_'+$('input[name="que_str_id"').val(),0);
        
    }
}
$(document).ready(function () {
    $(document).click(function (event) {        
        if (!$('#contest_helper').is(event.target) && $('#contest_helper').has(event.target).length == 0 && !$('.left_block').is(event.target) && $('.left_block').has(event.target).length == 0) {
            $('.left_block').find('a.active').trigger("click");
        }
    });
});
/***********************************************************************
 *               SOLUTION SUBMITTING								       *
 **********************************************************************/

function ProposeSolution(){
    $('#contest_success').dialog('close');
    OpenDialog("propose_solution", {width: 600, resizable: false, closeOnEscape: false});
    
}
function getSolutionFormdata()
{
    var formData = new FormData();
	if ($('#upl_fil')[0].files[0] != undefined) {
        formData.append('upl_fil', $('#upl_fil')[0].files[0]);
    }
   
    formData.append('sub_sbj_id', $('#sub_sbj_id').val());
	formData.append('ema', $('#ema').val());
	formData.append('nam', $('#nam').val());
    formData.append('ful_cod', window.aceEditor.getSession().getValue()); 
    return formData;
}

function SubmitProposedSolution(){
	$.post({
            url: '/RunTest/SaveProposedSolutionAjaxScript',
            data: getSolutionFormdata(),
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(data) {
				$('#propose_solution_error').toggleClass('error', !data.success);
				$('#propose_solution_error').toggleClass('success', data.success);
                $('#propose_solution_error').html(data.message).show();
            },
        });
}
/***********************************************************************
 *               NEWS AND RANKING						       *
 **********************************************************************/

function InitalizeNewsArea() {
	GetNewsContent();
	setInterval(GetNewsContent, 30000);
	
}

function GetNewsContent() {

    $.get(
            {url: '/public/contestnewsframe.php',
            data: {cts_id:mainArticleData('cts_id'), que_str_id:$('input[name="que_str_id"').val(), is_cts_demo:mainArticleData('is_cts_demo'), can_id:mainArticleData('can_id')},    
			dataType: "json",
                timeout: 2000,
                success: function (data) {
                    $("div#news_container").html(data.news);
                    if(data.hasOwnProperty('rank')){
                        $('p.rank').html(data.rank);
                    }
                    if (data.hint.has_hint==1 && data.hint.is_ready==1) {
                        $('.helptext').html(data.hint.txt);
                        if (sessionStorage.getItem('hint_' + $('input[name="que_str_id"').val()) == null) {
                            sessionStorage.setItem('hint_' + $('input[name="que_str_id"').val(), 1);
                        }
                        if (sessionStorage.getItem('hint_' + $('input[name="que_str_id"').val()) == 1) {
                            $('a[data-target="help_text"]').find('.fa-lightbulb-on').addClass('hint_notification');
                        } else {
                            $('a[data-target="help_text"]').find('.fa-lightbulb-on').removeClass('hint_notification');
                        }
                    }

                    var objDiv = document.getElementById("news_container");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            });
}
