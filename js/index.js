const scrollThreshold = 50; // 设置滚动阈值
const uiList = ['#index', '#blog', '#homepage', '#about'];
const throttleInterval = 0//1000; // 1秒
let uiPage = {};
uiPage.index = {
    block1: {top: 100,left: 250},
    block2: {top: 100,left: 500},
    };
uiPage.blog = {
    block1: {top: 250,left: 100},
    block2: {top: 500,left: 100},
    };


    let hashValue = window.location.hash;
    let lastTriggerTime = 0;
    
    
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
        hashValue = getNextOrPrevious(hashValue,true) ;
        window.location.hash = hashValue
        changeUi(hashValue.slice(1));

    } else {
        console.log('Scrolled up:', -deltaY);
        hashValue = window.location.hash;
        hashValue = getNextOrPrevious(hashValue,false) ;
        window.location.hash = hashValue
        changeUi(hashValue.slice(1));

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



function changeUi(uiObjName) {
    const targetUi = uiPage[uiObjName];
    console.log(targetUi);
    if (!targetUi) {
        console.error(`object：${uiObjName}121does not exist.`);
        return;
    }
    moveObj(targetUi);
    for (const blockId in targetUi) {
        const targetPosition = targetUi[blockId];
        console.log(targetPosition);
        console.log(blockId);
        moveObj(blockId, targetPosition);
    }
}



function moveObj(blockId, targetPosition) {
    const block = document.getElementById(blockId);
    if (!block) {
        console.error(`Block with id ${blockId} does not exist.`);
        return;
    }

    const currentTop = parseInt(block.style.top) || 0;
    const currentLeft = parseInt(block.style.left) || 0;

    const targetTop = targetPosition.top;
    const targetLeft = targetPosition.left;

    const stepSize = 10; // Number of pixels to move per animation frame

    function animate(currentTop, currentLeft) {
        const newTop = currentTop + (targetTop > currentTop ? stepSize : -stepSize);
        const newLeft = currentLeft + (targetLeft > currentLeft ? stepSize : -stepSize);

        block.style.top = `${newTop}px`;
        block.style.left = `${newLeft}px`;

        // Continue the animation if the new position is not the target position
        if ((targetTop > currentTop ? newTop < targetTop : newTop > targetTop) ||
            (targetLeft > currentLeft ? newLeft < targetLeft : newLeft > targetLeft)) {
            requestAnimationFrame(() => animate(newTop, newLeft));
        }
    }

    animate(currentTop, currentLeft);
}
