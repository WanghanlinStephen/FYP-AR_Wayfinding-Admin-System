import React, {useState, useEffect} from "react";
import $ from 'jquery' ;
import locationIcon from '../img/location.png';
import locationIconNew from '../img/locationNew.png'
import ControlBar from './ControlBar';
import {Button} from "antd";

var labels = [];
var connectionsMap = new Map();

function Picture(){

  //用setLabel来更新label，否侧无法实现页面状态更新
  const [label, setLabel] = useState([]);
  const [connectionMap, setConnectionMap] = useState(new Map());

  function onFetchLabel() {
    fetchInitialLabels();
    drawInitialLabels();
  }
  //initialize fetch
  function fetchInitialLabels(){
    fetch( `http://localhost:3000/v1/api/nodes`)
    .then(res => res.json())
    .then(data => {
      let nodes = data['data']['Nodes'];
      for (let label in nodes){
        let imgSpot = {x: nodes[label].Latitude, y:nodes[label].Longitude}
        drawInitialLabels(imgSpot);
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  function drawInitialLabels(imgSpot) {
    let imgEl = document.getElementById("imageId");
    let img_x = locationLeft(imgEl);
    let img_y = locationTop(imgEl);
    var displaySpot = {x: imgSpot.x+img_x, y: imgEl.offsetHeight-imgSpot.y+img_y};
    addHotspot(displaySpot,imgSpot,true);
  }
  function onFetchConnection() {
    fetchInitialConnections();
  }

  function fetchInitialConnections() {
    fetch( `http://localhost:3000/v1/api/connections`)
    .then(res => res.json())
    .then(data => {

      let connectionList = data['data']['Connections'];
      for (let connection in connectionList){
        if (connectionsMap.has(connectionList[connection].Source)){
          connectionsMap.set(connectionList[connection].Source,connectionsMap.get(connectionList[connection].Source).push(connectionList[connection].Destination));
        }else{
          connectionsMap.set(connectionList[connection].Source,[connectionList[connection].Destination]);
        }
      }
      setConnectionMap(connectionsMap);
      console.log(connectionMap);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  function handleClick(e) {
    // eslint-disable-next-line no-restricted-globals
    var xPage = (navigator.appName == 'Netscape') ? e.pageX : event.x + document.body.scrollLeft;
    // eslint-disable-next-line no-restricted-globals
    var yPage = (navigator.appName == 'Netscape') ? e.pageY : event.y + document.body.scrollTop;
    // 当前点击位置
    var displaySpot = {x: xPage, y: yPage};

    let imgEl = document.getElementById("imageId");
    let height = $('imageId').prop("height")
    console.log(imgEl.offsetHeight);

    let img_x = locationLeft(imgEl);
    let img_y = locationTop(imgEl);
    var imgSpot = {x: xPage-img_x, y:imgEl.offsetHeight-yPage+img_y}

    addHotspot(displaySpot,imgSpot,false);
  }
  // 找到元素的屏幕位置
  function locationLeft(element) {
    var offsetTotal = element.offsetLeft;
    var scrollTotal = 0; // element.scrollLeft but we dont want to deal with scrolling - already in page coords
    if (element.tagName != "BODY") {
      if (element.offsetParent != null)
        return offsetTotal + scrollTotal + locationLeft(element.offsetParent);
    }
    return offsetTotal + scrollTotal;
  }

// 找到元素的屏幕位置
  function locationTop(element) {
    var offsetTotal = element.offsetTop;
    var scrollTotal = 0; // element.scrollTop but we dont want to deal with scrolling - already in page coords
    if (element.tagName != "BODY") {
      if (element.offsetParent != null)
        return offsetTotal + scrollTotal + locationTop(element.offsetParent);
    }
    return offsetTotal + scrollTotal;
  }

  function createImagElement(displaySpot,fetchType) {
    var x = displaySpot.x -15;
    var y = displaySpot.y -30;
    var width = 30;
    var height = 30;
    if (fetchType){
      var src = locationIcon;
    }else{
      var src = locationIconNew;
    }

    let imgEle = '<img ' + ' class="' + 'label' + '" '+' src="' + src + '"  style="top: '
        + y + 'px; left: ' + x + 'px; width: ' + width + 'px; height: ' + height + 'px;  position: absolute; cursor: pointer;"'
        + ')" />';
    return imgEle
  }
  function createCoordinateElement(displaySpot,imgSpot) {
    var x = displaySpot.x -30;
    var y = displaySpot.y ;
    var width = 30;
    var height = 30;
    let textEle = '<text ' + ' class="' + 'coordinate' + '" '+' style="top: '
        + y + 'px; left: ' + x + 'px; width: ' + width + 'px; height: ' + height + 'px;  position: absolute; cursor: pointer;"'
        + ')" >{'+imgSpot.x+','+imgSpot.y+'}</text>';
    console.log(textEle);
    return textEle
  }

  // 添加自定义内容
  function addHotspot(displaySpot,imgSpot,fetchType) {
    let imgEle = createImagElement(displaySpot,fetchType);
    let textEle = createCoordinateElement(displaySpot,imgSpot);
    labels.push('{'+imgSpot.x+','+imgSpot.y+'}');
    $('.container').append(imgEle);
    $('.container').append(textEle);
    setLabel([...labels]);
  }

  return (
    <>
    <Button  htmlType="button" onClick={onFetchLabel}>
      Fetch Previous Labels
    </Button>
    <Button  htmlType="button" onClick={onFetchConnection}>
      Fetch Previous Connections
    </Button>

    <div id="imageId" style={{ width:'100%',height:'100%'}} onClick={handleClick}>
      <img alt="map" src="https://innowings.engg.hku.hk/content/uploads/2020/06/LG.png" style={{width:'100%'}}/>
    </div>
    <div><ControlBar label={label} connection={connectionMap}/></div>
    </>
  )
}

export default Picture