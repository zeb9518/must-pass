import react, { PropsWithChildren } from 'react'
import { View, Text,Button} from '@tarojs/components'
import './index.scss'

export  default function Index(){
  return (<View className='index'>
  <Text>Hello world!</Text>

  <Button className={"cu-btn round"}>自定义</Button>
</View>)
}
