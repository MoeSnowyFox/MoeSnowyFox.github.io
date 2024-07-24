const scrollThreshold = 50; // 设置滚动阈值
const uiList = ['#a', '#b', '#c', '#d'];
let hashValue = window.location.hash;
let lastTriggerTime = 0;
const throttleInterval = 1000; // 3秒


        // 当页面加载完成时执行  
window.onload = function() { 
          // 检查URL中是否包含#  
      if (window.location.hash) {  
        hashValue = window.location.hash.substring(1);
        if (!uiList.includes(hashValue)) {  
          // 如果不在，就移除hash并重新加载页面  
          window.location.replace(window.location.href.split('#')[0]);  
          }    
      }else{
        window.location.hash = uiList[0];
    }  
};  

window.addEventListener('wheel', function(event) {
    const deltaY = event.deltaY;
    const currentTime = Date.now();
    if (Math.abs(deltaY) > scrollThreshold && currentTime - lastTriggerTime > throttleInterval) {
        // 滚动距离超过阈值时触发函数
        triggerFunction(deltaY);
        lastTriggerTime = currentTime;
    }
});

function triggerFunction(deltaY) {
    if (deltaY > 0) {
        console.log('Scrolled down:', deltaY);
        hashValue = window.location.hash;
        window.location.hash = getNextOrPrevious(hashValue,true) ;

    } else {
        console.log('Scrolled up:', -deltaY);
        hashValue = window.location.hash;
        window.location.hash = getNextOrPrevious(hashValue, false);

    }
}

function getNextOrPrevious(current, direction) {
  const index = uiList.indexOf(current);

  if (index === -1) {
      return uiList[0]; // 如果当前元素不在列表中，返回第一项
  }

  if (direction) {
      return index < uiList.length - 1 ? uiList[index + 1] : uiList[uiList.length - 1];
  } else {
      return index > 0 ? uiList[index - 1] : uiList[0];
  } 
}

// 示例列表

