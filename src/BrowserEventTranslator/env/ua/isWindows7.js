define('BrowserEventTranslator/env/ua/isWindows7',function () {
  return function isWindows7(){
    var ua = navigator.userAgent;
    var windowsPattern = /Windows ([ .a-zA-Z0-9]+)[;\\)]/;
    var windowsNtPattern = /NT (\d\.\d)/;

    // WindowsNT系でない場合は関係ない
    var match = windowsPattern.exec(ua);
    if (!match) {
      return false;
    }
    // NT系でない場合は関係ない
    var version = windowsNtPattern.exec(match[1]);
    if (!version) {
      return false;
    }
    // XP:5.1 Vista:6.0 7:6.1 8:6.2 8.1:6.3
    return parseFloat(version[1]) === 6.1;
  };
});