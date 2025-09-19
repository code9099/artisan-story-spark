import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
  Image, 
  Upload, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Flashlight, 
  FlashlightOff,
  Check,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from "lucide-react";

interface CameraUploadProps {
  onClose: () => void;
  onUpload: (files: any[]) => void;
}

const CameraUpload = ({ onClose, onUpload }: CameraUploadProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<any[]>([]);
  const [currentMode, setCurrentMode] = useState<'photo' | 'video'>('photo');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        },
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
            setCapturedMedia(prev => [...prev, {
              type: 'photo',
              file,
              url: URL.createObjectURL(blob),
              timestamp: new Date()
            }]);
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const startVideoRecording = () => {
    if (streamRef.current) {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `video_${Date.now()}.webm`, { type: 'video/webm' });
        setCapturedMedia(prev => [...prev, {
          type: 'video',
          file,
          url: URL.createObjectURL(blob),
          timestamp: new Date(),
          duration: recordingTime
        }]);
        setRecordingTime(0);
      };
      
      recordingRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopVideoRecording = () => {
    if (recordingRef.current && isRecording) {
      recordingRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
    // In real app, this would control camera flash
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const removeMedia = (index: number) => {
    setCapturedMedia(prev => {
      const newMedia = [...prev];
      URL.revokeObjectURL(newMedia[index].url);
      newMedia.splice(index, 1);
      return newMedia;
    });
  };

  const handleUpload = async () => {
    setIsProcessing(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUpload(capturedMedia.map(item => item.file));
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={toggleFlash}
          >
            {isFlashOn ? <Flashlight className="h-5 w-5" /> : <FlashlightOff className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Mode Selector */}
        <div className="absolute top-4 right-4">
          <div className="flex bg-black/50 backdrop-blur-sm rounded-full p-1">
            <Button
              variant={currentMode === 'photo' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-full ${currentMode === 'photo' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setCurrentMode('photo')}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant={currentMode === 'video' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-full ${currentMode === 'video' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setCurrentMode('video')}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Capture Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30"
              onClick={currentMode === 'photo' ? capturePhoto : (isRecording ? stopVideoRecording : startVideoRecording)}
            >
              {currentMode === 'photo' ? (
                <Camera className="h-8 w-8" />
              ) : isRecording ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Captured Media Preview */}
      {capturedMedia.length > 0 && (
        <div className="bg-black/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Captured Media ({capturedMedia.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setCapturedMedia([])}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {capturedMedia.map((media, index) => (
              <div key={index} className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800">
                  {media.type === 'photo' ? (
                    <img
                      src={media.url}
                      alt={`Captured ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <Button
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => removeMedia(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
                {media.type === 'video' && (
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                    {formatTime(media.duration)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {capturedMedia.length > 0 && (
        <div className="p-4 bg-black/50 backdrop-blur-sm">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            onClick={handleUpload}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {capturedMedia.length} item{capturedMedia.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraUpload;
