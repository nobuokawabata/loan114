"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import DocumentUpload from "@/components/document-upload"

interface Document {
  id: string
  name: string
  type: string
  status: "verified" | "pending" | "rejected" | "missing"
  uploadDate?: string
  size?: string
  required: boolean
}

export default function DocumentVerificationPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "identity",
      name: "本人確認書類",
      type: "運転免許証・パスポート等",
      status: "verified",
      uploadDate: "2024-01-15 10:30",
      size: "2.1MB",
      required: true,
    },
    {
      id: "income",
      name: "収入証明書",
      type: "源泉徴収票・給与明細等",
      status: "pending",
      uploadDate: "2024-01-15 11:00",
      size: "1.8MB",
      required: true,
    },
    {
      id: "residence",
      name: "住民票",
      type: "発行から3ヶ月以内",
      status: "verified",
      uploadDate: "2024-01-15 09:45",
      size: "1.2MB",
      required: true,
    },
    {
      id: "property",
      name: "物件資料",
      type: "登記簿謄本・売買契約書等",
      status: "rejected",
      uploadDate: "2024-01-14 16:20",
      size: "3.5MB",
      required: true,
    },
    {
      id: "bank",
      name: "預金通帳",
      type: "直近3ヶ月分",
      status: "pending",
      uploadDate: "2024-01-15 12:15",
      size: "2.8MB",
      required: false,
    },
    {
      id: "insurance",
      name: "保険証券",
      type: "生命保険・火災保険等",
      status: "missing",
      required: false,
    },
  ])

  const handleDocumentUpload = (documentId: string, file: File) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "pending" as const,
              uploadDate: new Date().toLocaleString("ja-JP"),
              size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
            }
          : doc,
      ),
    )
    alert(`${file.name} をアップロードしました`)
  }

  const handleDocumentVerify = (documentId: string, status: "verified" | "rejected") => {
    setDocuments((prev) => prev.map((doc) => (doc.id === documentId ? { ...doc, status } : doc)))

    const document = documents.find((doc) => doc.id === documentId)
    const statusText = status === "verified" ? "承認" : "要再提出"
    alert(`${document?.name} を${statusText}しました`)
  }

  const handleSave = () => {
    alert("書類確認状況を保存しました")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
              <h1 className="text-xl font-bold">書類確認画面</h1>
              <span className="text-muted-foreground">案件ID: {params.id}</span>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <DocumentUpload
          documents={documents}
          onDocumentUpload={handleDocumentUpload}
          onDocumentVerify={handleDocumentVerify}
        />
      </div>
    </div>
  )
}
