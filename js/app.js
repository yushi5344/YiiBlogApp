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
var request=function(type,params,method){
	var result;
	mui.ajax({
		url:config.server+method,
		type:type,
		dataType:'json',
		async : false,
		data:params,
		success:function(data){
			console.log(JSON.stringify(data));
			if(data.success==false){
				mui.alert(data.message);
				result=data;
			}else{
				result=data;
			}
		},
		error:function(xhr,type,errorThrown){
			console.log(xhr);
		}
	});
	return result;
}
var queryPosts=function(page){
	var arr={
		page:page
	};
	var data=request('GET', arr,config.apimethod.posts);
	return data.data;
}
var queryPostsDetail=function(articleId){
	var arr={};
	var data=request('GET', arr,config.apimethod.posts+'/'+articleId);
	return data.data;
}
var  formatDateTime=function(timeStamp) {
	var date = new Date();
	date.setTime(timeStamp * 1000);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d;
};



























































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