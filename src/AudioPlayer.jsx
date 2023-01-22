import React, { useEffect, useRef, useState } from 'react'
import Audio from './audio.mp3'

const AudioPlayer = () => {
    const [isPlaying,setIsPlaying] = useState(false)
    const [duration,setDuration] = useState(0)
    const [audioCurrentTime,setAudioCurrentTime] = useState(0)

    const audioRef = useRef(); //for audio renference
    const progressRef = useRef() //for progress renference
    const animationRef = useRef();


    

    useEffect(() => {
        const second = Math.floor(audioRef?.current?.duration)
        setDuration(second)
        progressRef.current.max = second;

    },[audioRef?.current?.loadedmetadata,audioRef?.current?.readyState])

    
    const handlePlay = () => {
        setIsPlaying(!isPlaying)
        if(!isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    }

    

    
    const changeRange = () => {
        audioRef.current.currentTime = progressRef.current.value;
        changePlayerCurrentTime()
    }

    audioRef?.current?.addEventListener("timeupdate" , () => {
        progressRef.current.value = audioRef.current.currentTime;
        changePlayerCurrentTime();
    })




    

    const changePlayerCurrentTime = () => {
        progressRef.current.style.setProperty('--before-width',`${progressRef.current.value / duration * 100}%`)
        setAudioCurrentTime(progressRef.current.value)
    }

    const calculateTime = (seconds) => {
        const minute = Math.floor(seconds / 60);
        const second = Math.floor(seconds % 60)
        const editMinute = minute < 10 ? `0${minute}`  : minute;
        const editSecond = second < 10 ? `0${second}`  : second;
        return `${editMinute}  : ${editSecond}`
    }

    

  return (
    <div className='container'>
        <audio src={Audio} ref={audioRef} type="audio/mpeg" ></audio>
        <button>Back 30</button>
        <button onClick={ handlePlay}>{isPlaying ? 'Playing' : "Pause"}</button>
        <button>Forward 30</button>
        <div>{ calculateTime(audioCurrentTime)}</div>
        <div >
            <input type="range" className='progress' defaultValue="0" ref={progressRef} onChange={changeRange} />
        </div>
        <div>{calculateTime(duration)}</div>
    </div>
  )
}

export default AudioPlayer