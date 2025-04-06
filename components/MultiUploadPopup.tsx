'use client'

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { Upload, X, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface FileWithPreview extends File {
  preview: string;
}

interface MultiUploadPopupProps {
  onSuccess: (urls: string[]) => void
  onClose: () => void
}

export default function MultiUploadPopup({ onSuccess, onClose }: MultiUploadPopupProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<number[]>([])
  const [processing, setProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview])
    setProgress((prevProgress) => [...prevProgress, ...new Array(acceptedFiles.length).fill(0)])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
  })

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview)
    setFiles(files.filter((_, i) => i !== index))
    setProgress(progress.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files")

    setUploading(true)
    setProcessing(false)
    setProgress(new Array(files.length).fill(0))

    const formData = new FormData()
    files.forEach((file) => formData.append("files", file))

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/multiple`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            setProgress(prev => prev.map(() => percent))

            if (percent === 100) {
              setProcessing(true)
            }
          }
        },
      })

      setProcessing(false)
      onSuccess(response.data.urls)
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const isImage = (file: File) => {
    return file.type.startsWith('image/')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Upload Media</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-100 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-5 space-y-4">
          {files.length === 0 && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-3" />
                {isDragActive ? (
                  <p className="text-base text-indigo-600 font-medium">Drop files here...</p>
                ) : (
                  <>
                    <p className="text-base font-medium text-gray-700">Drag & drop files here</p>
                    <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                  </>
                )}
              </div>
            </div>
          )}
          
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Selected Files</h3>
                <div className="flex gap-3">
                  <Badge variant="outline" className="text-xs py-1 px-2">
                    {files.length} {files.length === 1 ? 'file' : 'files'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs font-medium"
                    {...getRootProps()}
                  >
                    Add More
                    <input {...getInputProps()} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2 pb-2">
                {files.map((file, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-square bg-gray-50">
                      {isImage(file) ? (
                        <Image 
                          width={500}
                          height={500}
                          src={file.preview} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-sm text-gray-500 font-medium">{file.type.split('/')[1].toUpperCase()}</span>
                        </div>
                      )}
                      
                      {uploading && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                          <div className="w-full px-4">
                            <div className="bg-white/30 w-full h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-white h-full transition-all duration-300 ease-out"
                                style={{ width: `${progress[index]}%` }}
                              />
                            </div>
                            <p className="text-white text-xs mt-2 text-center font-medium">{progress[index]}%</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    
                    {!uploading && (
                      <button 
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {processing && (
            <div className="mt-4 flex items-center justify-center py-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1.5 px-3 text-sm">
                Processing files...
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={uploading}
            className="font-medium"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={files.length === 0 || uploading}
            className="flex-1 bg-[#4f507f] text-white py-2 px-4 rounded-md hover:bg-[#3e3f63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>
    </div>
  )
}
