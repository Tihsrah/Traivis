import pyaudio
import wave
from array import array
from struct import pack

def record(outputFile):
    CHUNK=1024
    FORMAT=pyaudio.paInt16
    CHANNELS=2
    RATE=44100
    RECORD_SECONDS=5

    p=pyaudio.PyAudio()
    # Opening stream
    stream=p.open(format=FORMAT,channels=CHANNELS,rate=RATE,input=True,frames_per_buffer=CHUNK)
    print("* recording")
    frames=[]

    for i in range(0,int(RATE/CHUNK*RECORD_SECONDS)):
        data=stream.read(CHUNK)
        frames.append(data)

    print("* done recording")
    stream.stop_stream()
    stream.close()
    p.terminate()

    wf=wave.open(outputFile,'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()
import time
c=0
while(True): 
    try:
        record(f"output{c}.wav")
        c=c+1
        # time.sleep(5)
    except:
        break