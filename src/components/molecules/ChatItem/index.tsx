import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

type ChatItemProps = {
  isMe: boolean;
  text: string;
  date: string;
  photo?: any;
};

export default function ChatItem({isMe, text, date, photo}: ChatItemProps) {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <Other text={text} date={date} photo={photo} />;
}
