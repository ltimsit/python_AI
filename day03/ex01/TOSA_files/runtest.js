// JavaScript Document

/***********************************************************************
 ****                 TIPS                  ****
 ***********************************************************************/
function formatTitle(title, currentArray, currentIndex, currentOpts) {
    return '<div id="tiptitle">' + title + '</div>';
}

/***********************************************************************
 ****                 SUBMIT                                            ****
 /***********************************************************************/
function SubmitQuestion(submit_sta_id)
{
    document.unload_is_ok = true;
    document.submit_question_form = true;
    $(window).off('beforeunload');
    ShowWaitText('#boutonvalidation');
    $('#boutondontknow').hide();
    $('#btnstop').hide();
    switch (submit_sta_id) {
        case document.runtest_constants.SUBMIT_STA_OK:
        case document.runtest_constants.SUBMIT_STA_CHECK_SUCCESS:
            if (document.is_code && !SubmitCodeAnswer(submit_sta_id)) {
                return false;
            }
            break;
        case document.runtest_constants.SUBMIT_STA_SKIP:
            $('.answers .control-bar-buttons').hide(); //Hide control bar to avoid to click two times on button
            break;
        case document.runtest_constants.SUBMIT_STA_QUE_CHAN :
            if ($('#change_question').val() == -1) {
                document.submit_question_form = false;
            }
            break;
    }
    if (document.is_code) {
        $('#final_code').val(ConcatenateCodes());
    }
    $('<input>').attr({type: 'hidden', name: 'submit_sta_id', value: submit_sta_id}).appendTo('#QuestionForm');
    $('<input>').attr({type: 'hidden', name: 'time_over', value: document.local_timeover}).appendTo('#QuestionForm');
    if (document.submit_question_form) {
        document.count_submit = 0;
        ContinueSubmit();
    }
}

function ContinueSubmit()
{
    if (document.count_submit < 5) {
        $.post({
            url: '/RunTest/QuestionSubmitRuntestAjaxScript',
            data: $('#QuestionForm').serialize(),
            async: (document.is_code && (mainArticleData('ace_mode') == 'java')), //
            dataType: "json",
            success: function(data) {
                var result = data;
                if ((typeof result === 'object') && result.hasOwnProperty('next_screen') && (result.next_screen.length > 3)) {
                    if (document.is_remote) {
                        CloseThinRDP();
                    }
                    $('#QuestionForm').attr("action", result.next_screen).submit();
                } else {
                    document.count_submit++;
                    setTimeout(function() {
                        ContinueSubmit();
                    }, 1000);
                }
            },
            error: function() {
                document.count_submit++;
                setTimeout(function() {
                    ContinueSubmit();
                }, 1000);
            }
        });

    } else {
        document.strings_runtest = javaGetStrings("runtest.js", "tst"); //57
        alert(document.strings_runtest[2]);
        $('#QuestionForm').attr("action", "/candidates/ChooseTest").submit();
    }
}


/***********************************************************************
 ****       DocumentReady and Window load                           ****
 /***********************************************************************/
$(document).ready(function() {
    var result;

    $('div.content .spanloupe a.loupe').tooltipster({
        functionInit: function(instance, helper) {
            var content = $(helper.origin).find('.tooltip_content').detach();
            instance.content(content);
        },
        trigger: 'click',
        theme: 'tooltipster-light',
        side: ['bottom', 'top', 'right'],
        contentCloning: true,
        contentAsHTML: true
    });

    if (document.hasOwnProperty("do_not_load")) {
        return false;
    }
    document.is_error_screen = ($('#is_error_screen').length != 0);
    if (document.is_error_screen) {
        document.unload_is_ok == true;
        return false;
    }
    document.strings_runtest = javaGetStrings("runtest.js", "tst"); //57
    if ($('#selenium_remote').length !== 0) {
        document.is_remote = true;
        return false;
    }
    $.get({
        url: '/commonscripts/GetQuestionDataAjaxScript',
        async: false,
        dataType: "json",
        timeout: 5000,
        success: function(data) {
            result = data;
        }
    });
    if (!(typeof result === 'object')) {
        alert(document.strings_runtest[2]);
        if ($('div.review_block').length == 0) {
            $('#QuestionForm').attr("action", "/candidates/ChooseTest").submit();
        } else {
            return false;
        }
    }
    document.question_data = result;
    document.is_remote = result.is_remote;
    document.is_code = result.is_code;
    document.is_contest = result.is_contest;
    document.ans_typ_id = parseInt(result.ans_typ_id);
    document.unload_is_ok = false;
    document.local_timeover = false;
    document.needs_local_timer = result.needs_local_timer;
    document.result_mode = result.result_mode;
    document.edit_mode = result.edit_mode;
    if (result.result_mode && document.ans_typ_id == document.ans_typ_constants.LINK_ANS_TYP_ID) {
        //special case
        document.can_ans = result.can_ans;
        document.correct = result.correct;
    }
    SetUpTimer(result);
    if (document.ans_typ_id == document.ans_typ_constants.HORIZONTAL_IMG_ANS_TYP_ID || document.ans_typ_id == document.ans_typ_constants.MATRIX_IMG_ANS_TYP_ID) {
        $("a[rel=zoom_reponse]").fancybox({'hideOnContentClick': false,
            'titlePosition': 'inside',
            'autoDimensions': true,
            'titleFormat': formatTitle});
        //AdjustImages();
    }
    if (result.result_mode && !result.is_code) {
        $("#answered_questions").dialog({
            width: 300,
            resizable: false,
            closeOnEscape: false,
            position: {my: "left+175%"}, //In order to push the dialog on the 
            close: function(event, ui) {
                window.location = $('.answers').data('submit_href');
            }});
    }
    if ((document.result_mode || document.edit_mode) && !result.is_code && !result.is_remote) {
        if (result.is_mcq) {
            DisplayMCQRightAnswers(result);
        } else {
            if (document.result_mode) {
                DisplayScriptAnswer(result);
            }
        }
    }
    if (result.edit_mode || result.result_mode || ($('#is_error_screen').val() == 1)) {
        document.unload_is_ok = true;
    }
    //          FULL SCREEN MANAGEMENT                          
    if (result.needs_browser_info) {
        $.post({
            url: '/runtest/StoreBrowserInfoAjaxScript',
            data: {browser_ver: jQuery.browser.version, browser: jQuery.browser.name},
            async: false
        });
    }
    if (result.needs_full_screen) {
        StartFullScreenMonitoring();
    }
    if (document.unload_is_ok == false) {
        $(window).on('beforeunload', function() {
            return (document.unload_is_ok == false) ? document.strings_runtest[1] : '';
        });
    }
    document.confirm_submit = document.is_code;
    document.submit_question_form = false;
    //videojs
    // $('.vjs-icon-placeholder').click(function(){$('#bottom_main_image').css('padding-bottom','41px');})
});

$(window).on('load', function() {
    AddZoomAndClueTips();
    switch (document.ans_typ_id) {
        case document.ans_typ_constants.HORIZONTAL_IMG_ANS_TYP_ID:
        case document.ans_typ_constants.MATRIX_IMG_ANS_TYP_ID:
            ResizeImageAnswers();
            break;
        case document.ans_typ_constants.DRAG_AND_DROP_ANS_TYP_ID:
            DocumentReadyDragAndDrop();
            break;
        case document.ans_typ_constants.SORTABLE_ANS_TYP_ID:
            DocumentReadySortable();
            break;
        case document.ans_typ_constants.LINK_ANS_TYP_ID:
            DocumentReadyLinkAnswer();
            break;
        case document.ans_typ_constants.CLICK_IN_AREA_ANS_TYP_ID:
            DocumentReadyClickInArea();
            break;
        case document.ans_typ_constants.CLICK_IN_TEXT_ANS_TYP_ID:
            DocumentReadyClickInText();
            break;
        case document.ans_typ_constants.TYPING_TEST_ANS_TYP_ID:
            DocumentReadyTypingTest();
            break;
        case document.ans_typ_constants.TYPING_TST_WITH_COR_ANS_TYP_ID:
            DocumentReadyTypingTestWithCor();
            break;
        case document.ans_typ_constants.LOCAL_APP_ANS_TYP_ID:
            DocumentReadyLocalApplication();
            break;
        default:
            if (document.is_code) {
                CodeQuestionWindowLoad();
            }

            if (document.is_remote & !document.result_mode) {
                document.reset_all_has_been_tried = false;
                DisplayThinRDP();
            }
    }
    if ($('#magnifyinglass_dialog').length != 0) {
        OpenDialog("magnifyinglass_dialog", {width: 520, closeOnEscape: true});
    }
});

function AddZoomAndClueTips()
{
    var button = $('#zoomquestionbutton').length != 0 ? '#zoomquestionbutton' : '#zoomvideobutton';
    var content = $('img.main_image').length != 0 ? 'img.main_image' : '#videojs';
    var margin = $('#zoomquestionbutton').length != 0 ? 25 : 15;
    setTimeout(function() {
        $(button).css("left", parseInt($(content).css("width")) - margin).show();
    }, 1000);
    $(button).click(function() {
        var has_zoomin = $(button).hasClass('zoomin');
        $(content).toggleClass('small', has_zoomin);
        $(button).toggleClass('zoomin', !has_zoomin);
        $(button).css("left", parseInt($(content).css("width")) - margin).show();
    });

    $("#cluetip").click(function(event) {
        $('#cluetip').hide();
    });
}

/***************************************************************************************************/
/*              TEST NON CODE ANSWER                                                                */
/***************************************************************************************************/
function TestNonCodeAnswer()
{
    if (!document.hasOwnProperty('tryanswerajax') || document.tryanswerajax.readyState == 4 || document.tryanswerajax === true) {
        document.tryanswerajax = $.post({
            url: '/RunTest/TryAnswerAjaxScript',
            data: {can_ans: $('#can_ans').val(), submit_sta_id: 1},
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    displayTryAnswerResultDialog(data);
                } else {
                    if (document.is_remote) {
                        ShowRemoteCheckFailureDialog();
                    }
                }
            }
        });
    }
}
/***************************************************************************************************/
/*                              HELP DIALOG                                                         */
/***************************************************************************************************/
function DisplayHelpDialog() {
    OpenDialog("help_dialog", {width: 900});
}

function displayTryAnswerResultDialog(data) {
    var full_success = (parseFloat(data.score) == parseFloat(data.max_sco));
    $('#correct_answer_information_dialog p, #correct_answer_information_dialog button').hide();
    if (data.score == 0) {
        $(' #correct_answer_information_dialog button.skip,#correct_answer_information_dialog button.continue, #correct_answer_information_dialog p#try_error').show();
    } else {
        if (full_success) {
            $('#correct_answer_information_dialog button.full_success, #correct_answer_information_dialog p#try_success').show();
        } else {
            $('#correct_answer_information_dialog button.continue, #correct_answer_information_dialog button.partial_success, #correct_answer_information_dialog p#try_partial_success').show();
        }

    }

    if (document.edit_mode) {
        $('#additional_info').html('(Score :' + data.score + ')<br/>' + data.message).show();
    } else {
        if (data.message != '') {
            $('#additional_info').html(data.message).show();
        }
    }
    OpenDialog("correct_answer_information_dialog", {width: 600, closeOnEscape: !full_success});
    if ($('div#localtimer').length != 0 && !full_success) {
        $('div#localtimer').countdown('resume');
    }

}