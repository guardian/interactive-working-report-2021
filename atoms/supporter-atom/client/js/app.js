// Hide for supporters
function getCookieValue(name) {
    var val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return val ? val.pop() : undefined;
}
function shouldHideSupportMessaging() {
    return getCookieValue('gu_hide_support_messaging') === 'true';
}
if (shouldHideSupportMessaging()) {
    document.getElementById("wr-support-atom").style.display = "none";
    console.log("display none")
} else {
    document.getElementById("wr-support-atom").style.display = "block";
    console.log("display block")
}