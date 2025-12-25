import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Upload, Youtube, FileText, Loader2 } from "lucide-react";

export default function IngestionZone({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onDataLoaded(data.textSnippet); // Pass the data up to the parent
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/process-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeUrl }),
      });
      const data = await response.json();
      onDataLoaded(data.transcriptSnippet);
    } catch (error) {
      console.error("Video processing failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto mt-10 shadow-lg'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold flex items-center gap-2'>
          <FileText className='text-blue-500' /> Study Source Ingestion
        </CardTitle>
        <CardDescription>
          Upload your Economics textbook chapter or a lecture video.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='pdf' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <TabsTrigger value='pdf' className='flex gap-2'>
              <Upload size={16} /> PDF Upload
            </TabsTrigger>
            <TabsTrigger value='youtube' className='flex gap-2'>
              <Youtube size={16} /> YouTube Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value='pdf' className='space-y-4'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='pdf-upload'>Textbook Chapter (PDF)</Label>
              <Input
                id='pdf-upload'
                type='file'
                accept='.pdf'
                onChange={handleFileUpload}
                disabled={loading}
              />
            </div>
          </TabsContent>

          <TabsContent value='youtube' className='space-y-4'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='yt-url'>YouTube Lecture URL</Label>
              <div className='flex gap-2'>
                <Input
                  id='yt-url'
                  placeholder='https://youtube.com/watch?v=...'
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  disabled={loading}
                />
                <Button
                  onClick={handleYoutubeSubmit}
                  disabled={loading || !youtubeUrl}
                >
                  {loading ? <Loader2 className='animate-spin' /> : "Process"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
