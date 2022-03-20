import React, {useState, useEffect} from "react";
import $ from 'jquery' ;
import locationIcon from '../img/location.png';
import locationIconNew from '../img/locationNew.png'
import ControlBar from './ControlBar';
import {Button , Select} from "antd";

var labels = [];
var connectionsMap = new Map();

function Picture(){

  //用setLabel来更新label，否侧无法实现页面状态更新
  const [label, setLabel] = useState([]);
  const [url, setUrl] = useState('');
  const [maps, setMaps] = useState([]);
  const [connectionMap, setConnectionMap] = useState(new Map());

  function fetchInitialMaps(){
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/map/all`)
    .then(res => res.json())
    .then(data => {
      let map = data['data']['Maps'];
      setMaps(map);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  fetchInitialMaps();
  fetchMaps(1);

  function fetchMaps(value){
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/map/filter?id=${value}`)
    .then(res => res.json())
    .then(data => {
      let link = data['data']['Map']['Url'];
      setUrl(link);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  function onFetchLabel() {
    fetchInitialLabels();
    // drawInitialLabels();
  }
  //initialize fetch
  function fetchInitialLabels(){
    //http://localhost:3000/v1/api/nodes
    //https://fyp21043s1.cs.hku.hk:8080/v1/api/nodes
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/api/nodes`)
    .then(res => res.json())
    .then(data => {
      let nodes = data['data']['Nodes'];
      for (let label in nodes){
        let imgEl = document.getElementById("imageId");
        let width = imgEl.offsetWidth
        let height = imgEl.offsetHeight
        let imgSpot = {x: Math.floor(nodes[label].Latitude*width), y:Math.floor(nodes[label].Longitude*height)}
        drawInitialLabels(imgSpot,imgEl);
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  function drawInitialLabels(imgSpot,imgEl) {
    let img_x = locationLeft(imgEl);
    let img_y = locationTop(imgEl);
    var displaySpot = {x: imgSpot.x+img_x, y: imgEl.offsetHeight-imgSpot.y+img_y};
    addHotspot(displaySpot,imgSpot,true);
  }

  function onFetchConnection() {
    fetchInitialConnections();
  }

  function fetchInitialConnections() {
    //https://fyp21043s1.cs.hku.hk:8080/v1/api/connections
    //http://localhost:3000/v1/api/connections
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/api/connections`)
    .then(res => res.json())
    .then(data => {

      let connectionList = data['data']['Connections'];
      for (let connection in connectionList){
        //draw initial connections
        createPoints(connectionList[connection].Source,connectionList[connection].Destination);
        if (connectionsMap.has(connectionList[connection].Source)){
          connectionsMap.set(connectionList[connection].Source,connectionsMap.get(connectionList[connection].Source).push(connectionList[connection].Destination));
        }else{
          connectionsMap.set(connectionList[connection].Source,[connectionList[connection].Destination]);
        }
      }
      setConnectionMap(connectionsMap);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  }

  function createPoints(source,destination) {
    let firstPoint = null;
    let secondPoint = null;
    let imgEl = document.getElementById("imageId");
    let img_x = locationLeft(imgEl);
    let img_y = locationTop(imgEl);
    let width = imgEl.offsetWidth
    let height = imgEl.offsetHeight
    if (firstPoint === null) {
      firstPoint = {};
      firstPoint.xPoint = source['Latitude']*width+img_x;
      firstPoint.YPoint = imgEl.offsetHeight-source['Longitude']*height+img_y;
    }
    if (secondPoint === null) {
      secondPoint = {};
      secondPoint.xPoint = destination['Latitude']*width+img_x;
      secondPoint.YPoint = imgEl.offsetHeight-destination['Longitude']*height+img_y;
    }

    if (firstPoint !== null && secondPoint !== null) {
      let lineLength = calcLine(firstPoint, secondPoint);
      let angle = getAngle(
          firstPoint.xPoint,
          firstPoint.YPoint,
          secondPoint.xPoint,
          secondPoint.YPoint
      );
      // 设置一个div 宽度为 两点之间的距离，并且以 transform-origin: 0 50% 为圆心旋转，角度已经算出来
      let lineHtmlStr = `<div style="position:absolute;border-top: 1px solid red;width:${lineLength}px;top:${firstPoint.YPoint}px;left:${firstPoint.xPoint}px;transform:rotate(${angle}deg);transform-origin: 0 50%;"></div>`;
      $('.container').append(lineHtmlStr);
    }
  }
  function calcLine(firstPoint, secondPoint) {
    // 计算出两个点之间的距离
    let line = Math.sqrt(
        Math.pow(firstPoint.xPoint - secondPoint.xPoint, 2) +
        Math.pow(firstPoint.YPoint - secondPoint.YPoint, 2)
    );
    return line;
  }
  function getAngle(x1, y1, x2, y2) {
    // 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    var x = x1 - x2;
    var y = y1 - y2;
    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var cos = y / z;
    var radina = Math.acos(cos); // 用反三角函数求弧度
    var angle = 180 / (Math.PI / radina); // 将弧度转换成角度
    if (x2 > x1 && y2 === y1) {
      // 在x轴正方向上
      angle = 0;
    }
    if (x2 > x1 && y2 < y1) {
      // 在第一象限;
      angle = angle - 90;
    }
    if (x2 === x1 && y1 > y2) {
      // 在y轴正方向上
      angle = -90;
    }
    if (x2 < x1 && y2 < y1) {
      // 在第二象限
      angle = 270 - angle;
    }
    if (x2 < x1 && y2 === y1) {
      // 在x轴负方向
      angle = 180;
    }
    if (x2 < x1 && y2 > y1) {
      // 在第三象限
      angle = 270 - angle;
    }
    if (x2 === x1 && y2 > y1) {
      // 在y轴负方向上
      angle = 90;
    }
    if (x2 > x1 && y2 > y1) {
      // 在四象限
      angle = angle - 90;
    }
    return angle;
  }
  function createLine(source,destination) {


    // 创建节点


    // 计算连线


    // 计算角度
    // 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角

    // 解决第一次绑定的时候执行方法
    //   setTimeout(function() {
    document.removeEventListener("click", createPoints);
    // 添加节点
    document.addEventListener("click", createPoints, false);
    //   }, 0);
  }





  function handleClick(e) {
    // eslint-disable-next-line no-restricted-globals
    var xPage = (navigator.appName == 'Netscape') ? e.pageX : event.x + document.body.scrollLeft;
    // eslint-disable-next-line no-restricted-globals
    var yPage = (navigator.appName == 'Netscape') ? e.pageY : event.y + document.body.scrollTop;
    // 当前点击位置
    var displaySpot = {x: xPage, y: yPage};

    let imgEl = document.getElementById("imageId");

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


    <Select
      showSearch
      placeholder="Select a map"
      optionFilterProp="children"
      onChange={fetchMaps}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      options={maps.map(map=>({ value: map['Id'], label: 'Floor '+map['Floor']}))}
    />

    <div id="imageId" style={{ width:'100%',height:'100%'}} onClick={handleClick}>
      <img alt="map" src={url} style={{width:'100%'}}/>
    </div>
    <div><ControlBar label={label} connection={connectionMap}/></div>
    </>
  )
}

export default Picture