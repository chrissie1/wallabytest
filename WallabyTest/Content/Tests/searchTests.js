/// <reference path="../Scripts/search.js" />
/// <reference path="../Scripts/truncate.js" />

test("If makeSuccessMessage returns the correct result.", function () {
    var message = {
        Message: "TestMessage"
        , ElapsedTime: "TestElapsedTime"
        , SearchText: "TestSearchText"
    };
    var result = makeSuccessMessage(message, "testCaption");
    equal(result
        , '<div class="bs-callout bs-callout-success"><p>TestMessageTestElapsedTime.</p><p><b>testCaption: </b>TestSearchText</p></div>'
        );
});

test("If makeDangerMessage returns the correct result.", function () {
    var result = makeDangerMessage("TestErrorCaption", "TestErrorStatusCode", "testStatus", "testStatusText", "TestResponseText");
    equal(result
        , '<div class="bs-callout bs-callout-danger"><h4>TestErrorCaption</h4><p>TestErrorStatusCode testStatus: testStatusText TestResponseText</p></div>'
        );
});

test("If makes row correctly when no highlights.", function() {
    var item = {
        Id: "TestId"
        , Information: "TestInformation"
    }
    var result = makeRow(item, "TestObjectType");
    equal('<tr><td><a href="/TestObjectType/TestId" target="_blank">TestId</a><ul><li>TestInformation</li></ul></td></tr>', result);
});

test("If makes row correctly when highlights.", function () {
    var item = {
        Id: "TestId"
        , Information: "TestInformation"
        , Highlights: [
        {
            Field: "TestField"
            , HighLightTexts: ["HighLightText1"]
        }]
    }
    var result = makeRow(item, "TestObjectType");
    equal(result
        , '<tr><td><a href="/TestObjectType/TestId" target="_blank">TestId</a><ul><li>TestInformation</li><li>TestField: <ul><li>HighLightText1</li></ul></li></ul></td></tr>');
});

test("If makes correct json when single quote in searchtext.", function () {
    var result = makeSearchString("test'");
    JSON.parse(result);
    equal(result, "{\"SearchText\":\"test'\"}");
});

test("If makes correct json when double quote in searchtext.", function () {
    var result = makeSearchString("test\"");
    JSON.parse(result);
    equal(result, "{\"SearchText\":\"test\\\"\"}");
});

test("If makes correct json in searchtext.", function () {
    var result = makeSearchString("test");
    JSON.parse(result);
    equal(result, "{\"SearchText\":\"test\"}");
});