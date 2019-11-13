function SetUpTimer(result)
{
	var local_count_down_action;
	if (result.result_mode) {
		local_count_down_action = true; //IE DO NOTHING
	} else {
		// GLOBAL timer setup
		if (result.needs_global_timer){
			if (document.is_contest) {
				document.needs_terminate = result.needs_terminate;
			}

			var layout = result.global_remaining_time < 3600 ? '{mnn}:{snn} {desc}' : '{hnn}:{mnn}:{snn} {desc}';
			var d = new Date();
			var n = d.getTime() / 1000;
			var global_timer_start_time = n - (parseInt(result.tst_tim) - parseInt(result.global_remaining_time));
			var global_timer_end_time = global_timer_start_time + parseInt(result.tst_tim);
			var thesize = 80;
			$('#knob_globaltimer').knob({min: 0, max: 100, "readOnly": true, displayInput: false, width: thesize, height: thesize, thickness: 0.20, fgColor: '#E95F69', bgColor: '#e3e0d9'});
			$('#globaltimer').countdown({
				until: result.global_remaining_time,
				compact: true,
				format: 'HMS',
				description: '',
				layout: layout,
				onExpiry: function(){GlobalTimeOver();},
				onTick: function() {
					UpdateKnob("knob_globaltimer", global_timer_start_time, global_timer_end_time);
				}
			});
			local_count_down_action = true;
			// WE CHECK THAT THE TEST IS NOT ALREADY TERMINATED.
			if (result.global_remaining_time < -3) {
				GlobalTimeOver();
			}
		}
		local_count_down_action = false; //IE submit
	}

	//LOCAL TIMER, setup
	// for remote questions we wait for the question to be loaded to start the timer
	//	so if it's remote we only store the time
	if (result.needs_local_timer && !document.is_remote) {
        if(result.local_timer_is_countdown){
            CreateLocalTimer(result.que_tim, result.local_remaining_time, local_count_down_action);
        }else{
            //We create an upward timer
            CreateUpwardTimer();
        }
	} else {
		document.question_time = parseInt(result.que_tim);
		document.local_remaining_time = parseInt(result.local_remaining_time);
	}
}

function CreateLocalTimer(que_tim, remaining_time, isactive)
{
	if (remaining_time > 0) {
		var d = new Date();
		var n = d.getTime() / 1000;
		document.local_timer_start_time = n - (parseInt(que_tim) - parseInt(remaining_time));
		document.local_timer_end_time = document.local_timer_start_time + parseInt(que_tim);
		var thesize = document.is_code ? 80 : 70;
		$('#knob_localtimer').knob({min: 0, max: 100, "readOnly": true,displayInput: false, width: thesize, height: thesize, thickness: 0.24, fgColor: '#E95F69', bgColor: '#e3e0d9'});
		$('#localtimer').countdown({
			until: remaining_time,
			compact: true,
			format: 'HMS',
			description: '',
			layout: ' {mnn}:{snn} {desc}',
			onExpiry: function() {
				document.tryanswerajax = true; // this is to avoid confirmation dialog when submitting
				$('#knob_localtimer').val(100).trigger('change');
				LocalTimeOver();
			},
			onTick: function() {
				UpdateKnob("knob_localtimer", document.local_timer_start_time, document.local_timer_end_time);
			}
		});
	}
}

function CreateUpwardTimer(){
   $('#localtimer').countdown({
			since: '00:00:00',
			compact: true,
			format: 'HMS',
			description: '',
			layout: ' {mnn}:{snn} {desc}',
			onExpiry: function() {
				document.tryanswerajax = true; // this is to avoid confirmation dialog when submitting
				$('#knob_localtimer').val(100).trigger('change');
				LocalTimeOver();
			},
			onTick: function() {
				UpdateKnob("knob_localtimer", document.local_timer_start_time, document.local_timer_end_time);
			}
		}); 
}
/***********************************************************************
 ****                TIMEOVER FUNCTIONS							****
 /***********************************************************************/
function GlobalTimeOver() {
	$('#knob_globaltimer').val(100).trigger('change');
	document.confirm_submit = false;
	document.disconnect_request = 1;
	if (!document.is_contest || document.needs_terminate) {
		SubmitQuestion(document.runtest_constants.SUBMIT_STA_TST_TIM_OVE);
	} else {
		//This s a "normal" contest where you can continue to code after the end of the contest
		$('p.global_timer_container').html($('.answers').data('alternative_timer_string'));
        $('p.global_timer_container').addClass('timeovermessage');
	}
}
function LocalTimeOver()
{
	document.local_timeover = true;
	OpenDialog("timeover", {width: 550, closeOnEscape: false});
	$('#timeover').parent().find('span.ui-dialog-title').css("font-size:", "18px");
	$('#timeover').parent().find('span.ui-dialog-title').css("line-height", "44px");
	$('#timeover').parent().find('span.ui-dialog-title').css("text-align", "left");
	if ($('#timer_finish_small').length == 0) {
		//this is to avoid multiple add in edit mode when trying question multiple times after timeover
		$('#timeover').parent().find('span.ui-dialog-title').prepend('<div id="timer_finish_small"></div>');
	}
	$('#timeover').parent().find('a.ui-dialog-titlebar-close').hide();
	if (document.is_remote && !document.edit_mode) {
		mythinrdp.sendKeyStroke(0x1B);
		window.setTimeout(function() {
			mythinrdp.sendKeyStroke(0x1B);
		}, 200);
		TakeScreenShot(false);
		window.setTimeout(function() {
			CloseThinRDP();
		}, 400);

	}
}
/***********************************************************************
 ****               UTILS						****
 /***********************************************************************/
function UpdateKnob(knob_id, start_time, end_time) {
	if ($('#' + knob_id).length != 0) {
		var d = new Date();
		var n = d.getTime() / 1000;
		var timer_value = 100 * (n - start_time) / (end_time - start_time);
		$('#' + knob_id).val(timer_value).trigger('change');
	}
}


