import React, {useState, useEffect} from "react";
import $ from 'jquery' ;
import locationIcon from '../img/location.png';

import ControlBar from './ControlBar';

var labels = [];

function Picture(){

  //用setLabel来更新label，否侧无法实现页面状态更新
  const [label, setLabel] = useState([]);

  function handleClick(e) {
    // eslint-disable-next-line no-restricted-globals
    var xPage = (navigator.appName == 'Netscape') ? e.pageX : event.x + document.body.scrollLeft;
    // eslint-disable-next-line no-restricted-globals
    var yPage = (navigator.appName == 'Netscape') ? e.pageY : event.y + document.body.scrollTop;
    // 当前点击位置
    var hotspot = {x: xPage, y: yPage};

    //1:check labels size
    // if(labels.length>2){
    //   labels.splice(0,labels.length-2);
    // }
    // deleteHotspot();
    addHotspot(hotspot);
    displayHotspot();
  }

  // 添加自定义内容
  function addHotspot(hotspot) {
    var x = hotspot.x -15;
    var y = hotspot.y -30;
    var width = 30;
    var height = 30;
    var src = locationIcon;
    let imgEle = '<img ' + ' class="' + 'label' + '" '+' src="' + src + '"  style="top: '
    + y + 'px; left: ' + x + 'px; width: ' + width + 'px; height: ' + height + 'px;  position: absolute; cursor: pointer;"'
    + ')" />';
    labels.push(imgEle);
    setLabel([...labels]);

    console.log("click:::labels",labels);
    console.log("click:::state",label);
    // $('.container').append(imgEle);
  }
  // function deleteHotspot() {
  //   $('.container').delete()
  // }

  function displayHotspot() {
    for(const index in labels) {
      $('.container').append(labels[index]);
    }
  }

  return (
    <>
    <div><ControlBar label={label}/></div>
    <div id="imageId" style={{ width:'100%',height:'100%'}} onClick={handleClick}>
        <img alt="map" src="https://innowings.engg.hku.hk/content/uploads/2020/06/LG.png" style={{width:'100%'}}/>
    </div>
    </>
  )
}

export default Picture