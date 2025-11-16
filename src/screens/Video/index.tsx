import React, { useState, useRef } from 'react';
import { Text, View, Button } from 'react-native';
import { CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useVideoPlayer, VideoView } from 'expo-video';
import { styles } from './styles'
import { ComponentLoading } from '../../components';
import { useEvent } from 'expo';
import { ButtonInterface } from '../../components/ButtonInterface';
export function VideoScreen() {
    const [record, setRecord] = useState('');
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasAudioPermission, setHasAudioPermission] = useMicrophonePermissions();
    const ref = useRef<CameraView>(null)
    const player = useVideoPlayer(record, player => {
        player.loop = true;
        player.play();
    });
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    if (!permission || !hasAudioPermission) {
        return <ComponentLoading />
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permita acessar a Câmera</Text>
                <Button onPress={requestPermission} title="Permitir Câmera" />
            </View>
        );
    }
    if (!hasAudioPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permita acessar o Microfone</Text>
                <Button onPress={setHasAudioPermission} title="Permitir Microfone" />
            </View>
        );
    }
    const takeVideo = async () => {
        if (ref) {
            const data = await ref.current?.recordAsync({
                maxDuration: 10
            })
            if (data) {
                setRecord(data?.uri);
                console.log(data?.uri);
            }
        }
    }
    const stopVideo = async () => {
        ref.current?.stopRecording();
    }
    return (
        <View style={styles.container}>
            <CameraView style={styles.fixedRatio} facing={facing} ref={ref} mode='video' ratio='4:3' />
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            <ButtonInterface onPress={() => isPlaying ? player.pause() : player.play()}
                type='primary' title={isPlaying ? 'Pause' : 'Play'}
            />
            <ButtonInterface onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
                type='primary' title='Inverter Câmera' />
            <ButtonInterface onPress={() => takeVideo()} type='primary' title="Gravar video" />
            <ButtonInterface onPress={() => stopVideo()} type='primary' title="Parar Gravação" />
        </View>
    );
}
