function waitDialog(waitText) {
    var pleaseWaitDiv = $('<div class="modal" id="pleaseWaitDiv" role="dialog" style="display:none" data-backdrop="static" data-keyboard="false"><div class="modal-dialog" data-backdrop="static" data-keyboard="false"><div class="modal-content"><h1 style="padding:5px">' + waitText + '</h1><div class="progress progress-striped active" style="margin:5px"><div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div></div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function() {
            pleaseWaitDiv.modal('hide');
        },

    };
}

