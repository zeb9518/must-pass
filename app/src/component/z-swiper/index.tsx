import { useState, useEffect } from "react";
import { View, Text, Button, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

interface Props {
  text?: string;
}

let list: any = [];
/**
 * 源码地址：https://gitee.com/tiankf/wx-swiper/blob/master/pages/wx-swiper/wx-swiper.js
 * TODO: 存在bug
 * @param props
 * @returns
 */
export default function ZSwiper(props: Props) {
  const [swpList, setSwpList] = useState([] as any); //swiper里的实际item（最多3个）
  const [itemIdx, setItemIdx] = useState(0); //swiper里的实际item（最多3个）需要显示的那个item下标
  const [itemNo, setItemNo] = useState(1); //当前显示item对应在总数里的序号，例如swList共30条数据，currItemNo=15即当前显示的是第15个item
  const [duration, setDuration] = useState(500); // swipper切换动画时间

  useEffect(() => {
    list = Array.from({ length: 100 }, (_, index) => {
      return "[第" + (index + 1) + "个]我是一个无限制数量swiper";
    });
    //初始化
    setSwpList([list[0], list[1], list[2]]);
  }, []);

  /**
   * swiper切换监听
   */
  function handleSwiperChange(e) {
    const {
      detail: { current },
    } = e;

    setItemIdx(current);
    if (current === itemIdx && itemNo < 1) return;
    let num;
    let arr = [...swpList];
    if (
      (itemIdx < current && itemIdx - current === -1) ||
      itemIdx - current === 2
    ) {
      num = itemNo + 1;
      arr[itemIdx] = list[num + 1];
      console.log("向左滑动", itemIdx, current, arr, num);
    } else {
      num = itemNo - 1;
      arr[current] = list[num - 1];
      console.log("向右滑动123", itemIdx, current, arr, num);
    }
    if (num >= 1) {
      setItemNo(num);
      setSwpList([...arr]);
    }
  }

  return (
    <View className="index">
      <Text>测试</Text>
      <Swiper
        className="t-swiper"
        duration={duration}
        current={itemIdx}
        circular
        onChange={handleSwiperChange}
      >
        {swpList.map((item: any, idnex) => {
          return (
            <SwiperItem>
              <View>
                当前swiper下标：<Text>{itemIdx}</Text>
              </View>
              <View className="cu-swiper">
                <Text>{item}</Text>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
}
