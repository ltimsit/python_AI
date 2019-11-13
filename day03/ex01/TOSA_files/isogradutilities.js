
$(function() {
    document.main_form = $('section').find('div.content > form:first-of-type'); //used in pages with a main table
    document.main_form_id = document.main_form.prop("id");
    document.main_update_form = $('form.mainupdate:first'); //used in Update page or in dialogs tha contain an UPDATE featur
    document.main_update_form_id = document.main_update_form.prop("id");
    document.button_column_width = 400;

    if ($('section.withmenu').length != 0 && localStorage.menu_contracted == "true") {
        localStorage.setItem("menu_contracted", "false");
        ToggleMenu(); // will contract the menu
    }
    AdjustFilterSize();
    $('article.top ul.buttonbar li ul').mouseenter(function() {
        $(this).parent().find('a').addClass('deployed');
    });
    $('article.top ul.buttonbar li ul').mouseleave(function() {
        $(this).parent().find('a').removeClass('deployed');
    });
    if ($('#psw').length != 0 && $('#confirmpsw').length != 0) {
        SetPasswordFieldAutoCheck();
    }
    if ($('div.top.text_with_button').length != 0) {
        AdjustTopWithButton();
    }
    if ($('div.top.report.result p.inside_knob').length != 0) {
        AdjustReportTopKnobContent();
    }
    if($('body').data('lan_id')==document.language_constants.EL){
        //special case for greek language
        $('p,label,a,ul,li,div,button').attr('lang','el');
    }


});

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function(ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch(navigator.userAgent);
browser = {};
if (matched.browser) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.name = matched.browser;
}

// Chrome is Webkit, but Webkit is also Safari.
if (browser.chrome) {
    browser.webkit = true;
    browser.name = "chrome";
} else if (browser.webkit) {
    browser.safari = true;
    browser.name = "safari";
    var version = browser.version.split(".");
    browser.version = version[0];
}

if (!browser.msie) {
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        browser.msie = true;
        browser.mozilla = false;
        browser.version = 11;
        browser.name = "msie";
    }

    if (!!navigator.userAgent.match(/Trident\/6\./)) {
        browser.msie = true;
        browser.mozilla = false;
        browser.version = 10;
        browser.name = "msie";
    }
} else {
    //safety
    browser.name = "msie";
}
jQuery.browser = browser;

function CheckIECompatibility() {
    var engine = 100;
    if (browser.msie)
    {
        // This is an IE browser. What mode is the engine in?
        if (document.documentMode) // IE8 or later
            engine = document.documentMode;
        else // IE 5-7
        {
            engine = 5; // Assume quirks mode unless proven otherwise
            if (document.compatMode)
            {
                if (document.compatMode == "CSS1Compat")
                    engine = 7; // standards mode
            }
            // There is no test for IE6 standards mode because that mode  
            // was replaced by IE7 standards mode; there is no emulation.
        }
        // the engine variable now contains the document compatibility mode.
    }

    return(engine > 9);
}

function CheckIsBrowserValid() {
    /*
     * Check IE first
     */
    if (browser.msie) {
        return CheckIECompatibility();
    } else {
        if (jQuery.browser.chrome === true) {
            return jQuery.browser.version.split(".")[0] >= 37;
        } else if (jQuery.browser.mozilla === true) {
            return jQuery.browser.version.split(".")[0] > 40;
        } else if (jQuery.browser.msie === true) {
            return jQuery.browser.version > 9;
        } else if (jQuery.browser.safari === true) {
            return jQuery.browser.version > 7;
        }
    }
}


function CheckIsIpad() {
    return navigator.userAgent.match(/iPad/i) != null;
}
/***********************************************************************
 ****                  CONSTANTS								****
 /***********************************************************************/
document.saver_constants = {
    ACTION_UPDATE: 1,
    ACTION_DELETE: 2,
    ACTION_TRANSFER_TO_PROD: 3,
    ACTION_CREATE: 6,
    ACTION_CREATE_UPDATE: 7,
    ACTION_DUPLICATE: 8,
    ACTION_UPDATE_ASSESSMENTS_OPTIONS: 50,
    ACTION_UPDATE_CERTIFICATION_OPTIONS: 51,
    ACTION_UPDATE_PASSWORD: 52,
    ACTION_ACTION_DELETE_UNFINISHED_TEST: 53,
    ACTION_CREATE_VIDEO: 99,
    ACTION_UPDATE_SUB_SBJ_ID: 50,
    ACTION_UPDATE_SESSION: 51,
    ACTION_UPDATE_COMMENTS: 99,
    ACTION_RENUMBER_QUESTION: 97,
    ACTION_REMOVE_FROM_PROD: 98,
    ACTION_RESET_TEST: 96,
    ACTION_RESET_COOKIE: 97,
    ACTION_ADJUST_TIME: 98,
    ACTION_SEND_ACTIVATION_CODE: 50,
    ACTION_ACTIVATE_ACCOUNT: 51,
    ACTION_ADD_QUESTIONS_TO_QUESTION_SET: 54,
    ACTION_TOGGLE_COLOR: 800,
    ACTION_OPEN_EXAM_ROOM: 50,
    ACTION_UPDATE_REASON: 51,
    ACTION_ACCEPT_REASON: 52,
    ACTION_TRANSFERT_ALL_TO_PROD: 100,
    ACTION_CLEAR_NOTIFICATION: 53,
    ACTION_CLEAR_COMMENT: 50,
    ACTION_TERMINATE_CONTEST : 99,
    ACTION_ADJUST_CONTEST_ANSWER_TIMES: 100,
    ACTION_SET_SUBJECT_VERSION:101,
    ACTION_UPDATE_CALENDAR:103,
    ACTION_DELETE_TESTS_ASSOCIATED_WITH_EXPIRED_SESSIONS:102,
    ACTION_ADD_CONFIRMATION_TEST:103,
    ACTION_UNLOCK_ADMIN : 55,
    ACTION_UPDATE_TRA_CEN_PRI : 56
};

document.isograd_constants = {
    NEEDS_CREATE_ID: -9990000,
    HTML_SBJ_ID: 105,
    RES_STA_OK: 1,
    PAGE_SELECTOR_ID: "#thepage",
    MAIN_DEP_STA_ID: 3,
    DEFAULT_ERROR_DISPLAY_ID: '#errormessagedisplay',
    /***** TABLE HOVER ACTIONS******/
    ACTION_CREATE_NEW: 10,
    ACTION_EDIT: 1,
    ACTION_DELETE: 2,
    ACTION_DUPLICATE: 3,
    ACTION_TAKE_QUESTION: 4,
    ACTION_DELETE_COMMENT: 11,
    NO_DOCUMENT_TO_LOAD_STA_ID: 1,
    REM_PRO_STA_ID_NO_PROCTORING: 0,
    REM_PRO_STA_ID_HAS_PROCTORING: 1,
    REGISTER_THRESHOLD_ALERT : 40
};

document.table_constants = {
    SORT_INPUT_ID: '#orderby',
    SEARCH_INPUT_ID: '#filter_search'
}

document.certification_error_constants = {
    UNSOLVED_STA_ID: 3,
    REASON_GIVEN_STA_ID: 4,
    SOLVED_STA_ID: 5,
    TYP_ID_FULL_SCREEN: 2
};

document.diploma_saver_constants = {
    PRO_TYP_ID_FULLSCREEN: 2
}


document.runtest_constants = {
    SUBMIT_STA_OK: 1,
    SUBMIT_STA_SKIP: 2,
    SUBMIT_STA_STOP_TEST: 3,
	SUBMIT_STA_TST_TIM_OVE:4,
    SUBMIT_STA_HTML_SUBMIT: 6,
    SUBMIT_STA_REM_NO_EXEC: 7,
    SUBMIT_STA_FIRST_QUESTION: 8,
    SUBMIT_STA_QUE_CHAN: 9,
    SUBMIT_STA_NO_REMOTE_CONNECT: 10,
    SUBMIT_STA_RESET_REMOTE: 12,
    SUBMIT_STA_CHECK_SUCCESS: 14,
    SUBMIT_STA_QUE_TIM_OVE:15,
    REOPEN_DOCUMENT_ACT_ID: 15,
    THINFINITY_TYP_REM_APP: 1,
    THINFINITY_TYP_DESKTOP: 2,
    THINFINITY_TYP_RESET_IE: 3,
    THINFINITY_TYP_LAUNCHSERVER: 4,
    THINFINITY_TYP_LAUNCH_QUEUE_LISTENER: 5,
    CHECK_RESULT_ACT_ID: 3,
    RESTART_APP_ACT_ID: 5,
	IMAGE_BORDER_WIDTH:5,
    CHANGE_PAGE_STATUS_DEMO: 1,
    CHANGE_PAGE_STATUS_ALL_QUESTION_ANSWERED: 2,
    CHANGE_PAGE_STATUS_CONTEST_IS_OVER: 3,
    CHANGE_PAGE_STATUS_RANK: 4,
    CHANGE_PAGE_STATUS_EXCEPTION: 5

};


document.ans_typ_constants = {
    TEXT_MCQ_ANS_TYP_ID: 0,
    HORIZONTAL_IMG_ANS_TYP_ID: 1,
    MATRIX_IMG_ANS_TYP_ID: 2,
    CODE_ANS_TYP_ID: 3,
    STDINCODE_ANS_TYP_ID: 6,
    REMOTE_APP_ANS_TYP_ID: 5,
    TEXT_ANS_TYP_ID: 7,
    DRAG_AND_DROP_ANS_TYP_ID: 8,
    RIGHT_WRONG_ANS_TYP_ID: 9,
    TEXT_WITH_SELECT_ANS_TYP_ID: 10,
    LINK_ANS_TYP_ID: 11,
    CLICK_IN_AREA_ANS_TYP_ID: 12,
    DESKTOP_REMOTE_ANS_TYP_ID: 13,
    JSCHECK_ANS_TYP_ID: 14,
    PSYCHOMETRIC_ANS_TYP_ID: 15,
    CLICK_IN_TEXT_ANS_TYP_ID: 16,
    REMOTE_TEXT_WITH_SELECT_ANS_TYP_ID: 17,
    MULTI_INPUT_ANS_TYP_ID: 18,
    MANUALMARKING_ANS_TYP_ID: 19,
    MANUALMARKING_TEXT_ANS_TYP_ID: 20,
    MANUALMARKING_MULTI_INPUT_ANS_TYP_ID: 4,
    SCALE_ANS_TYP_ID: 21,
    SELF_ASSESSMENT_ANS_TYP_ID: 22,
    TYPING_TEST_ANS_TYP_ID: 26,
    TYPING_TST_WITH_COR_ANS_TYP_ID: 31,
    LOCAL_APP_ANS_TYP_ID:24,
	DICTATION_ANS_TYP_ID:29,
    SORTABLE_ANS_TYP_ID:32
}

document.tst_typ_constants = {
    EVAL_TYP_ID: 10,
    CERTIF_TYP_ID: 20,
    CONTEST_TYP_ID: 95
}

document.fam_tst_typ_constants = {
    EVAL_TST_TYP_FAM_ID: 1,
    CERTIF_TST_TYP_FAM_ID: 3
}

document.pla_tst_sta_id_constants = {
    TST_NOT_STARTED_STA_ID: 1,
    TST_STARTED_STA_ID: 2,
    TST_COMPLETE_STA_ID: 3,
    TST_WAITTING_FOR_MARKING_STA_ID: 4
}

document.icon_constants = {
    ICON_SAVE: '<i class="far fa-save"></i>',
    ICON_DELETE: '<i class="far fa-trash-alt"></i>',
    ICON_ADD: '<i class="far fa-plus-square"></i>',
    ICON_CLOSE: '<i class="far fa-times"></i>'
}

document.language_constants = {
    FR:1,
    EN:2,
    DE:3,
    NL:4,
    ES:5,
    IT:6,
    EL:7
}

document.user_reset_type_constants = {
    DELETE_THIRD_STAGE :5,
}

document.export_to_excel_constants = {
	CREATE_FILE_ACTION: 1,
	APPEND_DATA_ACTION: 2,
	CLOSE_FILE_ACTION: 3
}
/***********************************************************************
 ****                   OS DETECTCTION								****
 /***********************************************************************/

function GetOS() {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1)
        OSName = "Windows";
    else if ((navigator.appVersion.indexOf("Mac") != -1) || (navigator.platform.toUpperCase().indexOf('MAC') >= 0))
        OSName = "MacOS";
    return OSName;
}

/***********************************************************************
 ****                   AJAX SAVER									****
 /***********************************************************************/
function AjaxSaver(theform, theclass, action)
{
    var result = new Object();
    var additional_params, param;

    if ($.isPlainObject(theform)) {
        result.success = true;
        param = $.param(theform);
        additional_params = '';
    } else {
        result.success = true;
        if ((action == document.saver_constants.ACTION_UPDATE) || (action == document.saver_constants.ACTION_CREATE_UPDATE))
        {
            result = CheckForm();
        }
        if (action == document.saver_constants.ACTION_TRANSFER_TO_PROD)
        {
            result = ConfirmTransfer()
            result.nomessage = true;
        }

        if (result.success)
        {
            theform = '#' + theform;
            additional_params = result.hasOwnProperty('additional_params') ? "&" + result.additional_params : "";
            param = $(theform).serialize();
        }
    }
    if (result.success) {
        $.ajax(
                {url: '/commonscripts/SaverAjaxScript',
                    type: 'post',
                    data: param + "&action=" + action + "&class=" + theclass + additional_params,
                    success: function(data) {
                        result = data;
                    },
                    dataType: 'json',
                    async: false
                });
        // ajax error messages are never displaed in fields
        result.use_fields_for_error = false;
        return result;

    } else
    {
        return result;
    }
}
function CallAjaxSaverAndSubmit(theform, theclass, action, display_id)
{

    if (arguments.length == 3)
    {
        display_id = 'errormessagedisplay';
    }
    var result = AjaxSaver(theform, theclass, action);
    if (result.success)
    {
        $('#' + theform + ' input[name="postback_message"]').val(result.message);
        $('#' + theform).submit();
    } else
    {	// if checkform uses field error then we do not do anything
        if (!(result.hasOwnProperty('use_fields_for_error')) || !result.use_fields_for_error)
        {
            DisplaySaverMessage('#' + display_id, result.message, true, -1);
        }
    }
}

function CallAjaxSaverAndDisplay(theform, theclass, action, display_id)
{
    var result = AjaxSaver(theform, theclass, action);
    display_id = arguments.length == 3 ? document.isograd_constants.DEFAULT_ERROR_DISPLAY_ID : display_id;
    // ajax error messages are never displaed in fields
    if (!(result.hasOwnProperty('nomessage')))
    {
        if (result.success)
        {
            DisplaySaverMessage(display_id, result.message, false, 4000);
        } else
        {
            if ((!(result.hasOwnProperty('use_fields_for_error')) || !result.use_fields_for_error) && (typeof result.message != 'undefined'))
            {
                DisplaySaverMessage(display_id, result.message, true, -1);
            } else {
                $(display_id).hide();
            }
        }
    } else
    {
        $(display_id).hide();
    }
    return result;
}
/***********************************************************************
 ****                   CheckMandatoryFields						****
 /***********************************************************************/
function SetEventForm(form) {
    $('#' + form + ' .form-control').change(function() {
        CheckField($(this));
    });
}

function SetPasswordFieldAutoCheck() {
    $('#psw').change(function() {
        if ($.trim($('#confirmpsw').val()) != '') {
            CheckPasswordConfirm('#psw');
        }
    });

    $('#confirmpsw').change(function() {
        CheckPasswordConfirm('#psw');
    });
}

function DisplayPassword() {
    var type = document.is_psw_visible ? "password" : "text";
    document.is_psw_visible = !document.is_psw_visible;
    $('#confirmpsw,#psw').attr('type', type);
}

function CheckMandatoryFields(fields, theform)
{
    var result = {success: true, message: "", use_fields_for_error: true};
    var iter;
    $('#' + theform + ' form').each(function() {
        HideErrorFieldMessage(this)
    });
    for (iter in fields)
    {
        if ($('#' + fields[iter]).val().length < 3)
        {
            DisplayErrorFieldMessage('#' + fields[iter]);
            result.success = false;
        }
    }
    return result;
}

function CheckFormFields(containerForm) {
    var $containerForm = $('#' + containerForm);
    var result = {success: true};
    $.each($containerForm.find('.form-control'), function(index, value) {
        if (!CheckField($(this))) {
            result.success = false;
        }
    });

    return result;
}

function CheckField($field) {
    var result = true;
    var type = $field.attr('data-format');
    var value = $field.val();
    var donothing = false;

    if ($field.attr('data-required') == '1' && $.trim($field.val()) == '') {
        result = false;
    } else if ($field.attr('data-required-sel') == '1' && parseInt($field.val()) == -1) {
        result = false;
    } else if ($field.attr('data-required') == '0' && $.trim($field.val()) == '') {
        donothing = true;
    } else {
        switch (type)
        {
            case 'char':
                for (var i = 0; i < value.length; i++) {
                    if (!isNaN(value.charAt(i)) && $.trim(value.charAt(i)) != '') {
                        result = false;
                    }
                }
                break;
            case 'email':
                var reg = new RegExp('^[a-z0-9_.+-]+@[a-z0-9-.]+[a-z0-9-]{2,12}$', 'i');
                if (!reg.test(value)) {
                    result = false;
                }
                break;
            case 'number':
                for (var i = 0; i < value.length; i++) {
                    if (isNaN(value.charAt(i))) {
                        result = false;
                    }
                }
                break;

            default:

        }
    }
    if (!donothing) {
        DisplayFieldCheckStatus($field, result);
    } else {
        DisplayFieldNeutralStatus($field);
    }
    return result;
}

function CheckPasswordConfirm(id_psw)
{
    var result = {success: true};
    if ($('#' + id_psw).val().length < 6)
    {
        result.success = false;
        DisplayFieldWrongStatus($('#' + id_psw));
    }
    if ($('#' + id_psw).val() != $('#confirmpsw').val())
    {
        result.success = false;
        DisplayFieldWrongStatus($('#confirmpsw'));
    }
    return result;
}

function DisplayFieldCheckStatus($field, $status) {
    if ($status) {
        DisplayFieldRightStatus($field)
    } else {
        DisplayFieldWrongStatus($field)
    }
}

function DisplayFieldRightStatus($field) {
    var $container = $field.parents('.form-group');
    $container.find('.icon-wrong').addClass('hide');
    $container.find('.help-block').addClass('hide');
    $container.find('.icon-right').removeClass('hide');
    $field.removeClass('errorfield');
}
function DisplayFieldWrongStatus($field) {
    var $container = $field.parents('.form-group');
    $container.find('.icon-wrong').removeClass('hide');
    $container.find('.help-block').removeClass('hide');
    $container.find('.icon-right').addClass('hide');
    $field.addClass('errorfield');
}

function DisplayFieldNeutralStatus($field) {
    var $container = $field.parents('.form-group');
    $container.find('.icon-wrong').addClass('hide');
    $container.find('.help-block').addClass('hide');
    $container.find('.icon-right').addClass('hide');
    $field.removeClass('errorfield');
}

function ClearFields(fields) {
    var input;
    for (var field in fields)
    {
        input = fields[field];
        switch (($('#' + input).prop("type"))) {
            case 'text':
            case 'hidden':
            case 'textarea':
                $('#' + input).val('');
                break;
            case 'select':
            case 'select-one':
                $('#' + input + ' option[value=-1]').prop('selected', true);
                break;
            default:
                $('#' + input).val('');
                break;
        }
    }
}

function SetFields(fields, data) {
    var field, input;
    for (field in fields) {
        input = fields[field];
        switch (($('#' + input).prop("type"))) {
            case 'text':
            case 'hidden':
            case 'textarea':
                $('#' + input).val(data[input]);
                break;
            case 'select':
            case 'select-one':
                $('#' + input + ' option[value=' + data[input] + ']').prop('selected', true);
                break;

            default:
                //we check if it's a radio
                if ($('input:radio[name=' + input + ']').length != 0) {
                    $('input:radio[name=' + input + '][value="' + data[input] + '"]').prop('checked', true);
                } else {
                    $('#' + input).val(data[input]);//uesd by disabled fields
                }
                break;
        }
    }
}

function mainArticleData(field)
{
    return $('.main_article').data(field);
}
/***********************************************************************
 ****                  GoBackToLogin									****
 /***********************************************************************/
function GoBackToLogin()
{
    document.location = "https://www.isograd.com/login.php";
}
/***********************************************************************
 ****                    DISPLAY ERROR								****
 /***********************************************************************/
function DisplaySaverMessage(id, message, is_error, duration)
{
    message = (is_error ? '<i class="fa fa-times-circle-o"></i>' : '<i class="fa fa-check-circle-o"></i>') + message;
    $(id).html(message);
    $(id).toggleClass("error", is_error);
    $(id).toggleClass("success", !is_error);
    $(id).show();
    if (duration > 0)
    {
        $(id).delay(duration).fadeOut("slow");
    }
}


function DisplayAjaxQueryResult(id, result)
{
    if (result.success)
    {
        DisplaySaverMessage(id, result.message, false, 4500);
    } else
    {
        DisplaySaverMessage(id, result.message, true, -1);
    }
}

function DisplayPostBackMessage()
{
    var display_id = document.isograd_constants.DEFAULT_ERROR_DISPLAY_ID;
    var duration = 4500;

    if (($('#postback_message').length != 0) && ($('#postback_message').val().length > 3))
    {
        DisplaySaverMessage(display_id, $('#postback_message').val(), false, duration);
        $('#postback_message').val(""); // so that it does not display on next page
    }
}


// This function either displays in a placeHolder or shows an error message around the field

function DisplayErrorFieldMessage(field, message)
{
    jQuery.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();
    if (arguments.length == 1)
    {
        message = $(field + "_error").html();
    }
    if (jQuery.support.placeholder)
    {
        $(field).addClass("error");
        $(field).val("");
        $(field).attr("placeholder", message);
    } else
    {
        $(field + "_error").html(message);
        $(field + "_error").show();
    }
}

function HideErrorFieldMessage(field)
{
    jQuery.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();
    if (jQuery.support.placeholder)
    {
        $(field).removeClass("error");
        $(field).attr("placeholder", "");
    } else
    {
        $(field + "_error").hide();
    }
}

/***********************************************************************
 ****                   STRINGS										****
 /***********************************************************************/
jQuery.extend({
    stringify: function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string")
                obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v + '"';
                    } else if (t == "object" && v !== null) {
                        v = jQuery.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});


function javaGetStrings(pageName, context)
{	/* context is either tst or usr to decide which session variable has to be used*/
    /* if it is test getjavastrings will use tst_lan_id session variable otherwise it will use lan_id*/
    var result;
    $.ajax(
            {url: '/commonscripts/GetJavascriptStringsAjaxScript',
                type: 'get',
                data: {'page': pageName, 'lan_id': context},
                dataType: "json",
                async: false,
                success: function(data) {
                    result = data;
                }
            });
    return result;
}

function javaGetGenericStrings(generic, context)
{
    var result;

    $.ajax(
            {url: '/commonscripts/GetGenericJavascriptStringsAjaxScript',
                type: 'get',
                data: {'strings': generic, 'lan_id': context},
                dataType: "json",
                async: false,
                success: function(data) {
                    result = data;
                }
            });
    return(result);
}
/***********************************************************************
 ****                   TABLES									  ****
 /***********************************************************************/
function GetHoverButtons(params, me)
{
    var localparams = jQuery.extend(true, {}, params); // very important to clone the boject
    var iter, result = '';
    if (localparams.hasOwnProperty('ButtonGenerator'))
    {
        localparams = localparams.ButtonGenerator(me, localparams);
    }
    for (iter in localparams.fields)
    {
        $('#' + localparams.fields[iter].id).val($(me).data(localparams.fields[iter].source));
    }
    for (iter in localparams.action)
    {
        result += '<a onclick="' + localparams.action[iter].action + '" id="wd_hover_button_' + iter + '">' + localparams.action[iter].label + '</a>';
    }
    return result;
}
function SetTableHover(){
	// Argument 1 if provided is the id of the table
	var params,  string;
    var table_id = arguments.length == 1 ? arguments[0] : 'article:nth-of-type(2) table ';
    $(table_id + "tr").addClass("with_hover");
    $(table_id + "tbody tr").hover(
            function() {
                var last_cell = $(this).find("td:last");
                $(this).find("td.tohide").hide();
                last_cell.attr("colspan", $(this).find("td.tohide").length + 1);
            },
            function() {
                var last_cell = $(this).find("td:last");
                //last_cell.html('');
                last_cell.removeAttr("colspan");
                $(this).find("td.tohide").show();
            }
    );
	document.button_column_width = (arguments.length == 1) ? arguments[0] : 400;
    ActivateSearchField();
    SetSortArrow('');
    AdjustTableSize(table_id);
    ExportToExcel();
    DisplayPostBackMessage();
}

function SortAdminBy(sortfield, theform, action)
{
    var jqueryform = '#' + theform;
    var thesortfield = jqueryform + ' #orderby';
    var changepagefield = jqueryform + ' #changepage';
    var thecurrentsort = $(thesortfield).val();
    var newsort = (thecurrentsort == sortfield + " ASC") ? sortfield + " DESC" : sortfield + " ASC";
    $(thesortfield).val(newsort);
    $(changepagefield).val(1);
    $(jqueryform).attr('action', action).submit();
}

function SetSortArrow(thevalue)
{
    var temp = new String(arguments.length == 0 ? $('#orderby').val() : thevalue);
    var thearray = temp.split(" ");
    var column = '#column_' + thearray[0].replace(/[^a-zA-Z0-9]/g, "");
    if (thearray[1] == "ASC")
    {
        $(column).addClass("sortasc");
    } else
    if (thearray[1] == "DESC")
    {
        $(column).addClass("sortdesc");
    }
}

function ResetPage(form, page)
{
    var jqueryform = '#' + form;
    var field = jqueryform + ' input[name=changepage]';
    $(field).val(page);
    $(jqueryform).submit();
}


function AdjustTableSize(table)
{
    var article_width = parseInt($(table).parent().css("width"));
    var tr_width, offset, last_cell_width, th_width, new_th_width;
    table += " ";
    $(table + "thead tr").each(
            function()
            {
                tr_width = parseInt($(this).css("width")) + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right"));
                if ($('td.tohide').length == 0) {
                    offset = Math.max(article_width - tr_width, 0);
                    last_cell_width = parseInt($(this).find("th:last").css("width")) + offset;
                    $(this).find("th:last").css("width", Math.min(document.button_column_width, last_cell_width) + "px");
                }
            }
    );
    $(table).css("width", "100%");
    if (typeof document.resize_table_event_added == "undefined") {
        $(window).resize(function() {
            AdjustTableSize(table)
        });
        document.resize_table_event_added = true;
    }

}
/***********************************************************************
 ****                ProgressBar	 							  ****
 /***********************************************************************/
var timer_interval_wait;

function CreateProgressbar(id, duration)
{
    var htmlProgressbar;
    htmlProgressbar = '<div class="progress">';
    htmlProgressbar += '<div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" style="width: 1%">';
    htmlProgressbar += '<span class="sr-only"></span>';
    htmlProgressbar += '</div>';
    htmlProgressbar += '</div>';
    $(id).append(htmlProgressbar);
    AnimateProgressBar(duration)
}

function AnimateProgressBar(speed) {
    var timer_interval_wait;
    $('.progress-bar').css('width', '0%');
    var progress = 0;
    speed = 1000 * speed /100; // Ok we could simplify but it is to explain how it works it's milliseconds
    timer_interval_wait = setInterval(function() {
        progress = progress + 1;
        if (progress > 100) {
            clearInterval(timer_interval_wait);
        }
        $('.progress-bar').css('width', progress + '%');
    }
    , speed);
}

function StartExport(theform, thepage)
{
    $('#export_to_excel').val(1);
    $('#' + theform).attr('action', thepage).submit();
}
/***********************************************************************
 ****                Export to Excel		 							  ****
 /***********************************************************************/
function ExportToExcel()
{
    var ExportToExcel_result = new Array();
    var ExportToExcel_row = 0;
    var ExportToExcel_column = 0;
    var temp, iter, iter2;
    var content;

    if ($('#export_to_excel').val() == 1)
    {
        ExportToExcel_result[ExportToExcel_row] = new Array();
        $('table.export tr').each(function()
        {
            ExportToExcel_column = 0;
            $(this).find("th, td").each(function() {
                if ($(this).find("a,span").length != 0) {
                    content = $(this).find("a,span").text();
                } else {
                    content = $(this).text();
                }
                ExportToExcel_result[ExportToExcel_row][ExportToExcel_column] = content;
                ExportToExcel_column++;
            });
            ExportToExcel_row++;
            ExportToExcel_result[ExportToExcel_row] = new Array();
        });
        // we split the array in bucket of 50 rows
        var action = document.export_to_excel_constants.CREATE_FILE_ACTION;
        for (iter = 0; iter < ExportToExcel_result.length; iter += 30)
        {
            temp = new Array();
            for (iter2 = 0; iter2 < 30; iter2++) {
                temp[iter2] = ExportToExcel_result[iter + iter2];
            }
            $.ajax({
                url: '/commonscripts/ExportToExcelAjaxScript',
                type: 'post',
                dataType: "json",
                data: {content: temp, action: action},
                async: false
            });
            action = document.export_to_excel_constants.APPEND_DATA_ACTION;
        }
        // we call one last time to generate the file with action=2
        var message = '<a>Error</a>';
        $.ajax({
            url: '/commonscripts/ExportToExcelAjaxScript',
            type: 'post',
            dataType: "json",
            data: {action: document.export_to_excel_constants.CLOSE_FILE_ACTION},
            async: false,
            success: function(res) {
                if (res.success) {
                    message = res.message;
                }
            }
        });

        $('#Export_Button').html(message);
        $('#export_to_excel').val(0);
        SetSortArrow();
    }
}
/***********************************************************************
 ****               Buttons	 							  ****
 /***********************************************************************/


function ShowWaitText(button_id)
{
    $(button_id).addClass("wait");
    $(button_id).attr("disabled", "disabled");
}


function HideWaitText(button_id)
{
    $(button_id).removeClass("wait");
    $(button_id).removeAttr("disabled");
}
/***********************************************************************
 ****               DATEPICKER MULTILINGUAL	 					  ****
 /***********************************************************************/

function PrivateSetLanguageForDatePicker(fields, dateformat, with_time)
{
    var lan_id = $('body').data('lan_id');
    if (lan_id != 1)
    {
        $.datepicker.setDefaults($.datepicker.regional['']);
    } else
    {
        $.datepicker.setDefaults($.datepicker.regional['fr']);
        if (with_time) {
            $.timepicker.setDefaults($.timepicker.regional['fr']);
        }
    }

    if (dateformat == "d/m/y")
    {
        if (with_time) {
            $(fields).datetimepicker({changeMonth: true, changeYear: true, dateFormat: 'dd/mm/y', timeFormat: 'HH:mm', });
        } else {
            $(fields).datepicker({changeMonth: true, changeYear: true, dateFormat: 'dd/mm/y'});
        }
    } else
    {
        if (with_time) {
            $(fields).datetimepicker({changeMonth: true, changeYear: true, dateFormat: 'mm/dd/y', timeFormat: 'HH:mm'});
        } else {
            $(fields).datepicker({changeMonth: true, changeYear: true, dateFormat: 'mm/dd/y'});
        }
    }
    $(fields).change(function() {
        $('#changepage').val(1);
    });
}

function SetLanguageForDateTimePicker(fields, dateformat) {
    PrivateSetLanguageForDatePicker(fields, dateformat, true);
}

function SetLanguageForDatePicker(fields, dateformat) {
    PrivateSetLanguageForDatePicker(fields, dateformat, false);
}
/***********************************************************************
 ****              SEARCH FIELD				  ****
 /***********************************************************************/
function ActivateSearchField()
{
    if ($(document.table_constants.SEARCH_INPUT_ID).length != 0) {
        $(document.table_constants.SEARCH_INPUT_ID).keypress(function(event)
        {
            if (event.which == 13)
            {
                event.preventDefault();
                ResetPage(document.main_form.prop("id"), 1);
            }
        });
        $(document.table_constants.SEARCH_INPUT_ID).focus();
    }
}
/***********************************************************************
 ****              Toggle Param				  ****
 /***********************************************************************/
function toggleparam(param)
{
    $.ajax({url: '/questions/SwitchParamAjaxScript', type: 'post', data: {what: param}, async: false});
    $('section form').first().submit();
}

function ToggleRemoteMode(param)
{
    $.ajax({url: '/questions/ToggleRemoteModeAjaxScript', type: 'post', async: false});
    $('section form').first().submit();
}

/***********************************************************************
 ****              Reset windows user profile in adminquestion			  ****
 /***********************************************************************/
function ResetWindowsUserProfile(reset_type)
{
    var result;
    var ajax_url = (reset_type == document.user_reset_type_constants.DELETE_THIRD_STAGE) ? "/RunTest/PerformDeleteThirdStageAjaxScript" : '/commonscripts/ResetWindowsUserProfileAjaxScript';
    $.ajax({url: ajax_url,
        type: 'post',
        data: {usr_nam: $('#usr_nam').val(), srv_str_id: $('#srv_str_id').val()},
        async: false,
        dataType: "json",
        success: function(data) {
            result = data;
        }});
    if (result.success) {
       window.location = result.next_page;
    } else {
        alert(result.message);
    }
}

/***********************************************************************
 ****    VIEW ANSWSER / DISPLAY QUESTION				      ****
 /***********************************************************************/
function TakeQuestion(que_str_id) {
    var fields = {que_str_id: que_str_id};
    /* The second argument is in_app_sta_id to display remote or local version of in_app questions*/
    if (arguments.length == 2) {
        fields.in_app_sta_id = arguments[1];
    }
    if (typeof(mythinrdp) == "object"  && mythinrdp !=null) {
        if (typeof mythinrdp.doDisconnect !== "undefined") {
            mythinrdp.doDisconnect();
        }
        if (typeof mythinrdp.Disconnect !== "undefined") {
            mythinrdp.Disconnect();
        }
    }
    $.ajax(
            {url: '/commonscripts/ViewOneAnswerAjaxScript',
                type: 'post',
                data: fields,
                async: false
            });
    $(window).off('beforeunload');
    window.location = '/runtest/QuestionDisplayer';
}
/***********************************************************************
 ****    MANAGE DIALOG							      ****
 ***********************************************************************/

function OpenDialog(id, parameters) {

    if (!parameters.hasOwnProperty('resizable')) {
        parameters.resizable = false;
    }
    parameters.modal = true;
    //closeonescape only works when the focus is on the dialog
    //focus in only activated if there is at least on input in the dialog
    $('#' + id).dialog(parameters);
    if (parameters.hasOwnProperty("closeOnEscape")) {
        if ($("#" + id).find("input").length == 0) {
            $("#" + id + " a.button").focus();
        }
    }
}

/***********************************************************************
 ****    SHOW AND HIDE FIELDS IN DIPSPLAY GROUP					****
 /***********************************************************************/
function ManageDisplayedFields(list_show, list_hide, list_replace, forced_values, formname) {
    //we start by hiding the fields, this is important
    //as if a field is both hidden and shown it should be shown
    list_hide.forEach(function(entry) {
        $("#" + formname).find('[name="' + entry + '"]').parent('.form-group').hide();
    });

    list_show.forEach(function(entry) {
        $("#" + formname).find('[name="' + entry + '"]').parent('.form-group').show();
    });

    for (var keys in forced_values) {
        $('#' + keys).val(forced_values[keys]);
    }
    for (var name in list_replace) {
        $('select[name="'+name+'"]').empty();
        $('select[name="'+name+'"]').append(list_replace[name]);
        
    }
}

function SetFieldVisibility(formname) {
    $.ajax(
            {url: '/commonscripts/GetFieldsVisibilityAjaxScript',
                type: 'get',
                data: $('#' + formname).serialize(),
                async: false,
                dataType: 'json',
                success: function(data) {
                    if (data.success) {
                        ManageDisplayedFields(data.list_show, data.list_hide, data.list_replace, data.forced_values, formname);
                    }
                }
            });
}

/***********************************************************************
 ****    MANAGE SUB GROUP					****
 /***********************************************************************/

function GetGroupOrSubGroupId() {
    if ($('#filter_sub_sub_dep_id').val() !== undefined && $('#filter_sub_sub_dep_id').val() > 0) {
        return $('#filter_sub_sub_dep_id').val();
    } else if ($('#filter_sub_dep_id').val() !== undefined && $('#filter_sub_dep_id').val() > 0) {
        return $('#filter_sub_dep_id').val();
    } else {
        return $('#filter_dep_id').val();
    }
}

/***********************************************************************
 ****    ALERT DIALOG					****
 /***********************************************************************/
function ShowDisabledDialog() {
    var Strings = javaGetStrings("showdisableddialog.function", "usr"); //63;
    $('#alert_dialog .message').html(Strings[1]);
    OpenDialog('alert_dialog', {width: 400});
}
/***********************************************************************
 ****   MULTILINGUAL DESCRIPTION IN READY_TEST AND CATEGORIES					****
 /***********************************************************************/
function ChangeLanguageDescription() {
    var lan_id = $('#des_lan_id').val();
    $('div.lan_description_container').hide();
    $('#tst_des_' + lan_id).show();

}

/***********************************************************************
 ****   MULTISELET MANAGEMENT										****
 /***********************************************************************/
function CreateMultiSelect() {
    $('select').each(function(index, element) {
        //do not reaffect sumoselect a second time (done by second condition) 
        if ($(element).prop("multiple") && $(element).parents(".SumoSelect").length === 0) {
            var dataarray = new String($(element).data("multi-value"));
            var string_select, string_placeholder;
            $(element).val(dataarray.split("%,%"));
            if ($('body').data('lan_id') == 1) {
                if ($(element).data("label_gender") == 1) {
                    string_select = "sélectionnés";
                } else {
                    string_select = "sélectionnées";
                }
                string_placeholder = "Sélectionner...";
            } else {
                string_select = "selected";
                string_placeholder = "Select here...";
            }
            $(element).SumoSelect({captionFormat: '{0} ' + string_select, placeholder: string_placeholder, csvDispCount: $(element).data("csvdispcount")});
        }
    });
}


function RetrieveMultiSelect() {
    $('select').each(function(index, element) {
        if ($(element).prop("multiple")) {
            var current_multi_select_value = {};
            var id = '#' + $(element).prop("id");
            $(id + ' option:selected').each(function(index, myoption) {
                current_multi_select_value[index] = $(myoption).val();
            });
            $(id + '_ids').val(JSON.stringify(current_multi_select_value));
        }
    });
}
/***********************************************************************
 ****   MENUBAR														****
 /***********************************************************************/

function ToggleMenu() {
    var current = typeof localStorage.menu_contracted == undefined ? "false" : localStorage.menu_contracted;
    localStorage.setItem("menu_contracted", current == "false" ? "true" : "false");
    $('body').toggleClass("contract_menu", localStorage.menu_contracted == "true");
    AdjustTableSize();
    var char = localStorage.menu_contracted == "true" ? '>' : '<';
    $('li.toggle a.changesize').html(char);
}

function ToggleSideBarElement(item) {
    $(item).parent().find('a.expand').html($(item).parent().find('a.expand').html() == "+" ? "-" : "+");
    $(item).parent().find('ul').slideToggle();
    return false;
}
/***********************************************************************
 ****   ADJUSTMENTS TO ADMIN PAGE DISPLAY							****
 /***********************************************************************/
function AdjustFilterSize() {
    var has_first_row = $('div.top div.first_row').length == 1;
    var count = $('div.top.with_filters > div.form-group.horizontal').not($('.top.with_filters #filter_sub_dep_id, .top.with_filters #filter_sub_sub_dep_id').parent()).length;
    var search_input_width = 0;
    if (!has_first_row) {
        count -= $(document.table_constants.SEARCH_INPUT_ID).length;
        search_input_width = 200;
    } else {
        search_input_width = 0;
    }
    if (count != 0) {
        var width = Math.min((parseInt($('div.top.with_filters').css("width")) - 40 - search_input_width) / count, 400);
        $('div.top.with_filters > div.form-group.horizontal').css("width", width + "px");
        $(document.isograd_constants.PAGE_SELECTOR_ID).parent().css("width", "150px")
        if (!has_first_row) {
            $(document.table_constants.SEARCH_INPUT_ID).parent().css("width", "auto");
        }
        $('div.top.with_filters input[type=checkbox]').parent().css("width", "auto");
        if (typeof document.resize_filter_event_added == "undefined") {
            $(window).resize(function() {
                AdjustFilterSize();
            });
            document.resize_filter_event_added = true;
        }
    }
}

function AdjustTopWithButton() {
    var div_height = parseInt($('div.top.text_with_button').css("height"));
    var div_padding_top = parseInt($('div.top.text_with_button').css("padding-top"));
    var button_height = parseInt($('div.top.text_with_button button, div.top.text_with_button a.button').css("height"));
    $('div.top.text_with_button button, div.top.text_with_button a.button').css("top", (div_height / 2) - (button_height / 2) - div_padding_top);
}

function AdjustReportTopKnobContent() {
    var text_height = parseInt($('div.top.report.result p.inside_knob').css("height"));
    var title_height = parseInt($('div.top.report.result p:first-of-type').css("height"));
    if (text_height <= 30) {
        $('div.top.report.result p.inside_knob').css("top", (47 + title_height) + "px").css("font-size", "15px");
    }
}
/***********************************************************************
 ****   ALIAS														****
 /***********************************************************************/
function LogAsAlias(com_id)
{
    var result;
    $.ajax(
            {url: '/clientadmin/hyperadmin/LogAsAliasAjaxScript',
                type: 'post',
                data: {com_id: com_id},
                dataType: 'json',
                async: false,
                success: function(data) {
                    result = data;
                }
            });
    if (result.success)
    {
        $('#orderby').val(null);
        $('#filter_search').val(null);
        window.location = '/clientadmin/candidates/AdminCandidatesWithTable';
    } else {
        DisplaySaverMessage(document.isograd_constants.DEFAULT_ERROR_DISPLAY_ID, result.message, true, -1);
    }
}
/***********************************************************************
 ****   CopyToClipboard														****
 /***********************************************************************/

function copyToClipboard(elem) {
	var elem =$(elem);
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
		var textcontent = elem.val();
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
		var textcontent = elem.html();
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = textcontent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}
/***********************************************************************
 ****   VIEW COMPLETED TEST													****
 /***********************************************************************/
function ViewCompletedTestAnswers(pla_ts_id, return_url){
	/* The second argument is in_app_sta_id to display remote or local version of in_app questions*/
    $.ajax(
            {url: '/commonscripts/ViewOneAnswerAjaxScript',
                type: 'get',
                data: {pla_tst_id: pla_ts_id, is_candidate_view: 1, return_url: return_url},
                async: false
            });
    $(window).off('beforeunload');
    window.location = '/runtest/QuestionDisplayer';
}

function checkDatesAndSubmit(){
    var date_from = $('#filter_from').val();
    var date_to = $('#filter_to').val();
    var GenericStrings = javaGetGenericStrings(new Array("126"), "usr");
    if((!date_from.length == 0 && date_to.length==0) || (!date_to.length == 0 && date_from.length == 0  )){
        DisplaySaverMessage(document.isograd_constants.DEFAULT_ERROR_DISPLAY_ID, GenericStrings[126], true, 5000);
    }else{
        document.main_form.submit();
    }
}
