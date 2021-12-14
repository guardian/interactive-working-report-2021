// Hide for supporters
function getCookieValue(name) {
    var val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return val ? val.pop() : undefined;
}
function shouldHideSupportMessaging() {
    return getCookieValue('gu_hide_support_messaging') === 'true';
}
if (shouldHideSupportMessaging()) {
    // document.getElementById("wr-support-atom").style.display = "none";
    document.getElementById("wr-support-atom").classList.add('hide-sub');
    document.getElementById("wr-support-atom").classList.remove('show-sub');
} else {
    // document.getElementById("wr-support-atom").style.display = "block";
    document.getElementById("wr-support-atom").classList.remove('hide-sub');
    document.getElementById("wr-support-atom").classList.add('show-sub');
}