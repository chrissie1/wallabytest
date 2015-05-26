/// <reference path="../Scripts/truncate.js" />

test("If truncates correctly when word is less than the max number you want to truncate to.", function () {
    equal("test".trunc(10), "test");
});
test("If truncates correctly to 1 character when word is 4 characters.", function () {
    equal("test".trunc(1), "t&hellip;");
});
test("If truncates correctly to 2 characters when word is 4 characters.", function () {
    equal("test".trunc(2), "te&hellip;");
});
test("If truncates correctly to 3 characters when word is 4 characters.", function () {
    equal("test".trunc(3), "tes&hellip;");
});
test("If truncates correctly to 4 characters when word is 4 characters.", function () {
    equal("test".trunc(4), "test");
});
test("If return empty string when trying to truncate empty string.", function () {
    equal("".trunc(10), "");
});