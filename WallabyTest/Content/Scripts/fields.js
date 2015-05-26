$("#fields").change(function () {
    var selecteditem = $("#fields").val();
    if (selecteditem !== 'empty') { $("#SearchText").val($("#SearchText").val() + ($("#SearchText").val().length > 0 ? ' ' : '') + selecteditem + ': ') };
});
