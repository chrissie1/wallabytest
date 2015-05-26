$("#SearchText").keydown(function (e) {
    if (e.keyCode === 13) {
        $("#btnSearch").click();
        return false;
    } 
});

$("#SearchText").keyup(function (e) {
     if ($("#SearchText").val().indexOf("/") !== -1) {
            $("#searchTextWarning").show();
        } else {
            $("#searchTextWarning").hide();
        }
});

function search(searchOn, errorCaption, errorStatusCode, objectType, waitText, searchCaption, page) {
        if (typeof page === "undefined") { page = 1; }
        var myWaitDialog = waitDialog(waitText);
        $("#collapseTwo").collapse("show");
        $("#collapseOne").collapse("hide");
        var searchtext = $("#SearchText").val();
        var xhr = new XMLHttpRequest();
        var $table = $("#result");
        $table.empty();
        $("#message").empty();
        myWaitDialog.showPleaseWait();
        
        xhr.open("PUT", "/search/" + searchOn + "/" + page);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                $("#message").append(makeSuccessMessage(result, searchCaption));
                if (result.Results !== "undefined") {
                    $.each(result.Results, function (i, item) {
                        if (objectType === "all") {
                            $table.append(makeRow(item, item.Type));
                        } else {
                            $table.append(makeRow(item, objectType));
                        }
                    });
                }
                var options = {
                    currentPage: result.CurrentPage,
                    totalPages: result.NumberOfPages,
                    bootstrapMajorVersion: 3,
                    onPageClicked: function (e, originalEvent, type, pagenum) {
                        search(searchOn, errorCaption, e, objectType, waitText, searchCaption, pagenum);
                    },
                    shouldShowPage: function (type, pagenum, current) {
                        switch (type) {
                            default:
                                return true;
                        }
                    }
                }
                if (result.NumberOfPages > 0) {
                    $("#paging1").bootstrapPaginator(options);
                    $("#paging2").bootstrapPaginator(options);
                    $("#paging1").show();
                    $("#paging2").show();
                } else {
                    $("#paging1").hide();
                    $("#paging2").hide();
                }
                
                myWaitDialog.hidePleaseWait();
            }
            if (xhr.readyState === 4 && xhr.status !== 200) {
                $("#message").append(makeDangerMessage(errorCaption, errorStatusCode, xhr.status, xhr.statusText, xhr.responseText));
                myWaitDialog.hidePleaseWait();
            }
        };
        xhr.send(makeSearchString(searchtext));
}

function makeSearchString(searchtext) {
    return '{"SearchText":"' + searchtext.replace(/"/g, "\\\"") + '"}';
}

function makeSuccessMessage(result,searchCaption) {
    var message = '<div class="bs-callout bs-callout-success">';
    message += "<p>" + result.Message + result.ElapsedTime + ".</p>";
    message += "<p><b>" + searchCaption + ": </b>" + result.SearchText + "</p>";
    message += '</div>';
    return message;
}

function makeDangerMessage(errorCaption, errorStatusCode, status, statusText, responseText) {
    var message = '<div class="bs-callout bs-callout-danger">';
    message += '<h4>' + errorCaption + '</h4>';
    message += '<p>' + errorStatusCode + ' ' + status + ': ' + statusText + ' ' + responseText + "</p>";
    message += '</div>';
    return message;
}

function makeRow(item, objectType) {
    var row = '<tr><td>';
    row += '<a href="/' + objectType + '/' + item.Id + '" target="_blank">' + item.Id + '</a>';
    row += '<ul>';
    row += '<li>' + item.Information + '</li>';
    var index, index2;
    if (typeof item.Highlights !== 'undefined') {
        for (index = 0; index < item.Highlights.length; ++index) {
            row += '<li>' + item.Highlights[index].Field + ': <ul>';
            for (index2 = 0; index2 < item.Highlights[index].HighLightTexts.length; ++index2) {
                row += '<li>' + item.Highlights[index].HighLightTexts[index2].trunc(100) + '</li>';
            };
            row += '</ul></li>';
        };
    };
    row += '</ul>';
    row += '</td></tr>';
    return row;
}

