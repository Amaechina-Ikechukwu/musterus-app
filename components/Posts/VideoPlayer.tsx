import React, { useState, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  View,
  useColorScheme,
  Pressable,
  View as PlainView,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { MStore } from "@/mstore";
import { useShallow } from "zustand/react/shallow";
import { Entypo } from "@expo/vector-icons";

const VideoPlayer = ({ url, comid }: { url: string; comid: string }) => {
  const [postInView] = MStore(useShallow((state) => [state.postInView]));
  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.pause();
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const colorScheme = useColorScheme() ?? "light";

  useEffect(() => {
    if (postInView.includes(comid)) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  }, [postInView]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors[colorScheme].tabIconDefault,
          },
        ]}
      >
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          allowsFullscreen
          allowsPictureInPicture={false}
          pointerEvents="none"
        />
        <Pressable onPress={togglePlayPause} style={styles.touchLayer} />
      </View>
      <PlainView style={styles.controls}>
        <TouchableOpacity onPress={toggleMute}>
          <Entypo
            name={isMuted ? "sound-mute" : "sound"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </PlainView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    aspectRatio: 4 / 3,
  },
  container: {
    borderRadius: 20,
    height: "100%",
    width: "100%",
    position: "relative",
  },
  video: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  touchLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
  },
});

export default VideoPlayer;
