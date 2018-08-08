var showMenu=function() {
	var menuStr='<a class="mui-tab-item mui-active" id="index">\n' +
    '\t\t\t\t\t\t<span class="mui-icon mui-icon-home-filled"></span>\n' +
    '\t\t\t\t\t\t<span class="mui-tab-label">首页</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t\t<a class="mui-tab-item" id="mine">\n' +
    '\t\t\t\t\t\t<span class="mui-icon mui-icon-contact"></span>\n' +
    '\t\t\t\t\t\t<span class="mui-tab-label">我的</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t\t<a class="mui-tab-item" id="about">\n' +
    '\t\t\t\t\t\t<span class="mui-icon mui-icon-spinner mui-spin"></span>\n' +
    '\t\t\t\t\t\t<span class="mui-tab-label">关于</span>\n' +
    '\t\t\t\t\t</a>\n' +
    '\t\t\t\t\t<a class="mui-tab-item" id="settings">\n' +
    '\t\t\t\t\t\t<span class="mui-icon mui-icon-gear-filled"></span>\n' +
    '\t\t\t\t\t\t<span class="mui-tab-label">设置</span>\n' +
    '\t\t\t\t\t</a>';
	var table = document.body.querySelector('.mui-table-view');
	var nav = document.createElement('nav');
	nav.className = 'mui-bar mui-bar-tab';
	nav.innerHTML = menuStr;
	table.insertBefore(nav, table.firstChild);
}






























































var as = 'pop-in'; // 默认窗口动画
var _openw = null;
// 预创建二级页面
var preate = {};
//打开新页面
function clicked(id, param, a, s) {
  var obj = {
    preate: true
  };
  if(_openw) {
    return;
  }
  a || (a = as);
  _openw = preate[id];
  if(_openw) {
    _openw.showded = true;
    _openw.show(a, null, function() {
      _openw = null; //避免快速点击打开多个页面
    });
  } else {
    var wa = plus.nativeUI.showWaiting();
    obj = mui.extend(obj, param);
    _openw = plus.webview.create(id, id, {
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'hide'
    }, obj);
    preate[id] = _openw;
    _openw.setStyle({
      'popGesture': 'none'
    });
    _openw.addEventListener('loaded', function() { //页面加载完成后才显示
      setTimeout(function() { //延后显示可避免低端机上动画时白屏
        wa.close();
        _openw.showded = true;
        s || _openw.show(a, null, function() {
          _openw = null; //避免快速点击打开多个页面
        });
        s && (_openw = null); //避免s模式下变量无法重置
      }, 10);
    }, false);
    _openw.addEventListener('hide', function() {
      _openw && (_openw.showded = true);
      _openw = null;
    }, false);
    _openw.addEventListener('close', function() { //页面关闭后可再次打开
      _openw = null;
      preate[id] && (preate[id] = null); //兼容窗口的关闭
    }, false);
  }
}