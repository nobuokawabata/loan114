"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, XCircle, AlertTriangle, Eye, Download } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  status: "verified" | "pending" | "rejected" | "missing"
  uploadDate?: string
  size?: string
  required: boolean
}

interface DocumentUploadProps {
  documents: Document[]
  onDocumentUpload: (documentId: string, file: File) => void
  onDocumentVerify: (documentId: string, status: "verified" | "rejected") => void
}

export default function DocumentUpload({ documents, onDocumentUpload, onDocumentVerify }: DocumentUploadProps) {
  const [dragOver, setDragOver] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent, documentId: string) => {
    e.preventDefault()
    setDragOver(documentId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, documentId: string) => {
      e.preventDefault()
      setDragOver(null)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onDocumentUpload(documentId, files[0])
      }
    },
    [onDocumentUpload],
  )

  const handleFileSelect = useCallback(
    (documentId: string, file: File) => {
      onDocumentUpload(documentId, file)
    },
    [onDocumentUpload],
  )

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "missing":
        return <Upload className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">確認済み</Badge>
      case "rejected":
        return <Badge variant="destructive">要再提出</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">確認中</Badge>
      case "missing":
        return <Badge variant="outline">未提出</Badge>
    }
  }

  const getCompletionRate = () => {
    const verifiedCount = documents.filter((doc) => doc.status === "verified").length
    return (verifiedCount / documents.length) * 100
  }

  return (
    <div className="space-y-6">
      {/* 進捗状況 */}
      <Card>
        <CardHeader>
          <CardTitle>書類確認進捗</CardTitle>
          <CardDescription>
            {documents.filter((doc) => doc.status === "verified").length} / {documents.length} 件完了
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={getCompletionRate()} className="w-full" />
        </CardContent>
      </Card>

      {/* 書類一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((document) => (
          <Card
            key={document.id}
            className={`transition-colors ${dragOver === document.id ? "border-primary bg-primary/5" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center">
                  {getStatusIcon(document.status)}
                  <span className="ml-2">{document.name}</span>
                  {document.required && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      必須
                    </Badge>
                  )}
                </CardTitle>
                {getStatusBadge(document.status)}
              </div>
              <CardDescription>{document.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {document.status === "missing" ? (
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDragOver={(e) => handleDragOver(e, document.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, document.id)}
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = ".pdf,.jpg,.jpeg,.png"
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        handleFileSelect(document.id, file)
                      }
                    }
                    input.click()
                  }}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">ファイルをドラッグ&ドロップまたはクリックして選択</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (最大10MB)</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>アップロード日時</span>
                    <span className="text-muted-foreground">{document.uploadDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ファイルサイズ</span>
                    <span className="text-muted-foreground">{document.size}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      プレビュー
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      ダウンロード
                    </Button>
                  </div>

                  {document.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => onDocumentVerify(document.id, "rejected")}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        要再提出
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => onDocumentVerify(document.id, "verified")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        承認
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
