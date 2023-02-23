import react, { useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

import ZSwiper from "../../component/z-swiper";

const subjectList = ["马克思", "英语二", "近代史"];

export default function Index() {
  return (
    <View className="index">
      <View>
        {subjectList.map((item) => {
          return (
            <View>
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
      <Button className={"cu-btn round"}>自定义</Button>
      <ZSwiper></ZSwiper>
    </View>
  );
}
