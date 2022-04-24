import React from "react";
import WebView from "react-native-webview";
export default function Video({ route, navigation }) {
    const {vidurl}=route.params
    return (
    <WebView
  allowsFullscreenVideo
  allowsInlineMediaPlayback
  mediaPlaybackRequiresUserAction
  source={{ uri: vidurl }} 
/>
  )
}