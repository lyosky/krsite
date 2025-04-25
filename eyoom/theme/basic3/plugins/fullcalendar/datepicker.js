var Datepicker = function () {

    return {

        //Datepickers
        initDatepicker: function () {
	        $('#start').datepicker({
	            dateFormat: 'yy-mm-dd',
	            prevText: '<i class="fa fa-angle-left"></i>',
	            nextText: '<i class="fa fa-angle-right"></i>',
	            showMonthAfterYear: true,
	            monthNames: ['년 1월','년 2월','년 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월'],
	            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	            dayNamesMin: ['일','월','화','수','목','금','토'],
	            onSelect: function(selectedDate){
	                $('#finish').datepicker('option', 'minDate', selectedDate);
	            }
	        });
	        $('#finish').datepicker({
	            dateFormat: 'yy-mm-dd',
	            prevText: '<i class="fa fa-angle-left"></i>',
	            nextText: '<i class="fa fa-angle-right"></i>',
	            showMonthAfterYear: true,
	            monthNames: ['년 1월','년 2월','년 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월'],
	            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	            dayNamesMin: ['일','월','화','수','목','금','토'],
	            onSelect: function(selectedDate){
	                $('#start').datepicker('option', 'maxDate', selectedDate);
	            }
	        });
	        $('#time_start').timepicker({ 'timeFormat': 'H:i' });
	        $('#time_finish').timepicker({ 'timeFormat': 'H:i' });
        }

    };
}();