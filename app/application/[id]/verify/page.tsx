"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const generateRelativeDatetime = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const hours = Math.floor(Math.random() * 8) + 9 // 9-17時
  const minutes = Math.floor(Math.random() * 60)
  date.setHours(hours, minutes, 0, 0)
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function VerifyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [sampleFiles, setSampleFiles] = useState<any[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [fileType, setFileType] = useState<"pdf" | "image">("pdf")
  const [selectedFile, setSelectedFile] = useState("")

  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const appRes = await fetch(`/api/applications/${params.id}`)
        if (appRes.ok) {
          const appData = await appRes.json()
          setApplicationData(appData)
        }
      }
      const docsRes = await fetch("/api/documents")
      if (docsRes.ok) {
        const docsData = await docsRes.json()
        const pdfDocs = docsData
          .filter((doc: any) => doc.pdfPath)
          .map((doc: any) => ({
            name: doc.name,
            path: doc.pdfPath,
            type: "pdf" as const,
          }))
        setSampleFiles(pdfDocs)
        if (pdfDocs.length > 0) {
          setSelectedFile(pdfDocs[0].path)
        }
      }
    }
    fetchData()
  }, [params.id])

  const [zoomInput, setZoomInput] = useState("100")

  const handleFileChange = (filePath: string) => {
    const file = sampleFiles.find((f) => f.path === filePath)
    if (file) {
      setSelectedFile(filePath)
      setFileType(file.type)
      setCurrentPage(1)
      // NOTE: PDF page count is not available, so we'll just set it to 1 for now.
      // A more advanced implementation would require a PDF library to get the page count.
      setTotalPages(1)
      handleResetImage()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setApplicationData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleZoomInputChange = (value: string) => {
    setZoomInput(value)
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 25 && numValue <= 300) {
      setImageTransform((prev) => ({
        ...prev,
        scale: numValue / 100,
      }))
    }
  }

  const handleZoomIn = () => {
    setImageTransform((prev) => {
      const newScale = Math.min(prev.scale + 0.25, 3)
      setZoomInput(Math.round(newScale * 100).toString())
      return {
        ...prev,
        scale: newScale,
      }
    })
  }

  const handleZoomOut = () => {
    setImageTransform((prev) => {
      const newScale = Math.max(prev.scale - 0.25, 0.25)
      setZoomInput(Math.round(newScale * 100).toString())
      return {
        ...prev,
        scale: newScale,
      }
    })
  }

  const handleRotateRight = () => {
    setImageTransform((prev) => ({
      ...prev,
      rotation: prev.rotation + 90,
    }))
  }

  const handleRotateLeft = () => {
    setImageTransform((prev) => ({
      ...prev,
      rotation: prev.rotation - 90,
    }))
  }

  const handleResetImage = () => {
    setImageTransform({
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
    })
    setZoomInput("100")
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - imageTransform.x,
      y: e.clientY - imageTransform.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setImageTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSave = () => {
    alert("修正内容を保存しました")
    router.push(`/application/${params.id}`)
  }

  const renderDocumentViewer = () => {
    if (fileType === "pdf") {
      return (
        <div
          className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden"
          style={{
            transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale}) rotate(${imageTransform.rotation}deg)`,
            transformOrigin: "center",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          draggable={false}
        >
          <iframe
            src={`${selectedFile}#page=${currentPage}`}
            className="w-full h-full border-0 pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
              minWidth: "800px",
              minHeight: "1000px",
            }}
            title="PDF Viewer"
          />
        </div>
      )
    } else {
      return (
        <img
          src={selectedFile || "/placeholder.svg"}
          alt="申込書"
          className="max-w-none border border-border rounded shadow-lg pointer-events-none"
          style={{ width: "600px", height: "800px" }}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/application/${params.id}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-xl font-bold">ベリファイ画面</h1>
            <span className="text-muted-foreground">案件ID: {params.id}</span>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 申込書イメージ */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>申込書イメージ</CardTitle>
                <CardDescription>原本を参照して情報を確認してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium">表示ファイル:</Label>
                    <Select value={selectedFile} onValueChange={handleFileChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleFiles.map((file) => (
                          <SelectItem key={file.path} value={file.path}>
                            {file.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {fileType === "pdf" && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage <= 1}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm px-3">
                        {currentPage} / {totalPages}
                      </span>
                      <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted rounded-lg">
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4 mr-1" />
                    拡大
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4 mr-1" />
                    縮小
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotateRight}>
                    <RotateCw className="h-4 w-4 mr-1" />
                    右回転
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotateLeft}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    左回転
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleResetImage}>
                    <Maximize className="h-4 w-4 mr-1" />
                    元の大きさ
                  </Button>
                  <div className="flex items-center gap-2 ml-auto">
                    <Input
                      type="number"
                      min="25"
                      max="300"
                      value={zoomInput}
                      onChange={(e) => handleZoomInputChange(e.target.value)}
                      className="w-16 h-8 text-sm"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div
                  className="bg-gray-100 rounded-lg overflow-hidden border relative cursor-move"
                  style={{ height: "800px" }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {renderDocumentViewer()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 申込情報修正フォーム */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>申込情報修正</CardTitle>
                <CardDescription>申込書と照合して必要に応じて修正してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="applicantName">申込者名</Label>
                  <Input
                    id="applicantName"
                    value={applicationData?.applicantName || ""}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicantKana">申込者名（カナ）</Label>
                  <Input
                    id="applicantKana"
                    value={applicationData?.applicantKana || ""}
                    onChange={(e) => handleInputChange("applicantKana", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">生年月日</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={applicationData?.birthDate || ""}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={applicationData?.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData?.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">住所</Label>
                  <Textarea
                    id="address"
                    value={applicationData?.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanAmount">融資希望額（万円）</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={applicationData?.loanAmount || ""}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">融資目的</Label>
                  <Input
                    id="loanPurpose"
                    value={applicationData?.loanPurpose || ""}
                    onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 保存ボタン */}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => router.push(`/application/${params.id}`)}>
                キャンセル
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                修正内容を保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
