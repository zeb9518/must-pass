import { useState, useEffect } from "react";
import { View, Text, Button, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

interface Props {
  text?: string;
}

let list = [];
/**
 * 源码地址：https://gitee.com/tiankf/wx-swiper/blob/master/pages/wx-swiper/wx-swiper.js
 * TODO: 存在bug
 * @param props 
 * @returns 
 */
export default function ZSwiper(props: Props) {
  const [swpList, setSwpList] = useState([]); //swiper里的实际item（最多3个）
  const [showIdx, setShowIdx] = useState(0); //swiper里的实际item（最多3个）需要显示的那个item下标
  const [duration, setDuration] = useState(500); // swipper切换动画时间
  const [currItemNo, setCurrItemNo] = useState(1); //当前显示item对应在总数里的序号，例如swList共30条数据，currItemNo=15即当前显示的是第15个item

  useEffect(() => {
    //这里模拟创建5000条数据(每条数据都含图)
    for (let i = 0; i < 5000; i++) {
      list.push({
        title: "[第" + (i + 1) + "个]我是一个无限制数量的swiper",
        desc:
          "[第" +
          (i + 1) +
          "个]实现原理：swiper里永远最多放3个元素，在swiper切换时根据原来的下标计算新的需要显示的item对应下标，然后组装好新的最多3个item数据渲染到页面。",
      } as never);
    }
    //初始化
    setSwpList(list.length > 3 ? [list[0], list[1], list[2]] : list);
  }, []);

  /**
   * swiper切换监听
   */
  function handleAnimationFinish(e) {
    const currIdx = e.detail.current;
    let arr = list;
    let max = arr.length;
    let itemNo = currItemNo;
    let swList;
    let showIdx;
    if (
      max > 3 &&
      ((itemNo == 1 && itemNo == 1) ||
        (itemNo > 1 && itemNo == 2 && itemNo < max))
    ) {
      // 左滑-向右切换
      itemNo += 1;
      swList =
        max <= 3
          ? arr
          : itemNo == 2
          ? [arr[itemNo - 2], arr[itemNo - 1], arr[itemNo]]
          : itemNo == max
          ? [arr[itemNo - 3], arr[itemNo - 2], arr[itemNo - 1]]
          : [arr[itemNo - 2], arr[itemNo - 1], arr[itemNo]];
      showIdx = itemNo == 2 && currIdx == 1 ? 1 : itemNo < max ? 1 : 2;
      console.log("左滑-向右切换")
    } else if (
      (currIdx == 0 && itemNo > 1) ||
      (currIdx == 1 && itemNo == max)
    ) {
      //右滑-向左切换
      itemNo = currItemNo - 1;
      swList =
        max <= 3
          ? arr
          : itemNo > 2
          ? [arr[itemNo - 2], arr[itemNo - 1], arr[itemNo]]
          : [arr[0], arr[1], arr[2]];
      showIdx = itemNo == 1 ? 0 : 1;
      console.log("左滑-向左切换")
    }
    // setCurrItemNo(itemNo);
    // setSwpList(swList);
    // setShowIdx(showIdx);

    console.log("itemNo--->", itemNo);
    console.log("showIdx--->", showIdx);
    console.log("swList--->", swList);
    // $.setData({ duration: 0 }, () => {
    //   $.setData(
    //     { currItemNo: itemNo, swList: swList, showIdx: showIdx },
    //     () => {
    //       $.setData({ duration: 500 });
    //     }
    //   );
    // });
  }

  return (
    <View className="index">
      <Text>测试</Text>
      <Swiper
        className="t-swiper"
        duration={duration}
        current={showIdx}
        onAnimationFinish={handleAnimationFinish}
      >
        {swpList.map((item: any, idnex) => {
          return (
            <SwiperItem>
              <View className="t-item-con t-wh-100p">
                <Text>{idnex}</Text>
                <View className="t-item-title">{item.title}</View>
                <View className="t-item-desc">{item.desc}</View>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
}
