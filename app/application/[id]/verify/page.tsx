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

  const sampleApplications = [
    {
      id: 1,
      receivedAt: generateRelativeDatetime(0),
      channel: "Web",
      applicantName: "田中太郎",
      applicantKana: "タナカタロウ",
      birthDate: "1980-05-15",
      gender: "男性",
      phone: "03-1234-5678",
      email: "tanaka@example.com",
      address: "東京都渋谷区1-1-1",
      occupation: "会社員",
      company: "株式会社サンプル",
      annualIncome: "600",
      loanAmount: "3000",
      loanPurpose: "住宅購入",
      loanPeriod: "35",
      status: "受付済み",
    },
    {
      id: 2,
      receivedAt: generateRelativeDatetime(1),
      channel: "電話",
      applicantName: "佐藤花子",
      applicantKana: "サトウハナコ",
      birthDate: "1985-08-22",
      gender: "女性",
      phone: "090-2345-6789",
      email: "sato@example.com",
      address: "大阪府大阪市北区2-2-2",
      occupation: "公務員",
      company: "大阪市役所",
      annualIncome: "500",
      loanAmount: "2500",
      loanPurpose: "マンション購入",
      loanPeriod: "30",
      status: "審査中",
    },
    {
      id: 3,
      receivedAt: generateRelativeDatetime(2),
      channel: "店舗",
      applicantName: "鈴木一郎",
      applicantKana: "スズキイチロウ",
      birthDate: "1975-12-10",
      gender: "男性",
      phone: "045-3456-7890",
      email: "suzuki@example.com",
      address: "神奈川県横浜市西区3-3-3",
      occupation: "自営業",
      company: "鈴木商店",
      annualIncome: "700",
      loanAmount: "4000",
      loanPurpose: "事業資金",
      loanPeriod: "20",
      status: "承認",
    },
    {
      id: 4,
      receivedAt: generateRelativeDatetime(3),
      channel: "Web",
      applicantName: "高橋美咲",
      applicantKana: "タカハシミサキ",
      birthDate: "1990-03-18",
      gender: "女性",
      phone: "052-4567-8901",
      email: "takahashi@example.com",
      address: "愛知県名古屋市中区4-4-4",
      occupation: "会社員",
      company: "名古屋商事株式会社",
      annualIncome: "450",
      loanAmount: "2000",
      loanPurpose: "車購入",
      loanPeriod: "7",
      status: "受付済み",
    },
    {
      id: 5,
      receivedAt: generateRelativeDatetime(4),
      channel: "電話",
      applicantName: "伊藤健太",
      applicantKana: "イトウケンタ",
      birthDate: "1982-07-05",
      gender: "男性",
      phone: "092-5678-9012",
      email: "ito@example.com",
      address: "福岡県福岡市博多区5-5-5",
      occupation: "エンジニア",
      company: "福岡テック株式会社",
      annualIncome: "650",
      loanAmount: "3500",
      loanPurpose: "住宅購入",
      loanPeriod: "35",
      status: "審査中",
    },
    {
      id: 6,
      receivedAt: generateRelativeDatetime(2),
      channel: "店舗",
      applicantName: "渡辺直子",
      applicantKana: "ワタナベナオコ",
      birthDate: "1988-11-30",
      gender: "女性",
      phone: "011-6789-0123",
      email: "watanabe@example.com",
      address: "北海道札幌市中央区6-6-6",
      occupation: "看護師",
      company: "札幌総合病院",
      annualIncome: "480",
      loanAmount: "2200",
      loanPurpose: "住宅購入",
      loanPeriod: "30",
      status: "受付済み",
    },
    {
      id: 7,
      receivedAt: generateRelativeDatetime(3),
      channel: "FAX",
      applicantName: "中村雅人",
      applicantKana: "ナカムラマサト",
      birthDate: "1978-04-12",
      gender: "男性",
      phone: "022-7890-1234",
      email: "nakamura@example.com",
      address: "宮城県仙台市青葉区7-7-7",
      occupation: "教師",
      company: "仙台市立中学校",
      annualIncome: "520",
      loanAmount: "2800",
      loanPurpose: "リフォーム",
      loanPeriod: "15",
      status: "確認中",
    },
    {
      id: 8,
      receivedAt: generateRelativeDatetime(4),
      channel: "メール",
      applicantName: "小林由美",
      applicantKana: "コバヤシユミ",
      birthDate: "1992-09-25",
      gender: "女性",
      phone: "075-8901-2345",
      email: "kobayashi@example.com",
      address: "京都府京都市下京区8-8-8",
      occupation: "デザイナー",
      company: "京都デザイン事務所",
      annualIncome: "420",
      loanAmount: "1800",
      loanPurpose: "教育資金",
      loanPeriod: "10",
      status: "受付中",
    },
  ]

  const getApplicationData = (id: string) => {
    const foundApplication = sampleApplications.find((app) => app.id === Number.parseInt(id))
    if (foundApplication) {
      return {
        applicantName: foundApplication.applicantName,
        applicantKana: foundApplication.applicantKana,
        birthDate: foundApplication.birthDate,
        phone: foundApplication.phone,
        email: foundApplication.email,
        address: foundApplication.address,
        loanAmount: foundApplication.loanAmount,
        loanPurpose: foundApplication.loanPurpose,
      }
    }
    // デフォルトデータ（新規申込の場合）
    return {
      applicantName: "",
      applicantKana: "",
      birthDate: "",
      phone: "",
      email: "",
      address: "",
      loanAmount: "",
      loanPurpose: "",
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [fileType, setFileType] = useState<"pdf" | "image">("pdf")
  const [selectedFile, setSelectedFile] = useState("/sample-application1.pdf")

  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const sampleFiles = [
    { name: "申込書1（PDF）", path: "/sample-application1.pdf", type: "pdf" as const },
    { name: "送付状（PDF）", path: "/documents/cover-letter.pdf", type: "pdf" as const },
    { name: "正式審査申込書（PDF）", path: "/documents/formal-application.pdf", type: "pdf" as const },
  ]

  const [applicationData, setApplicationData] = useState(() => getApplicationData(params.id))

  useEffect(() => {
    setApplicationData(getApplicationData(params.id))
  }, [params.id])

  const [zoomInput, setZoomInput] = useState("100")

  const handleFileChange = (filePath: string) => {
    const file = sampleFiles.find((f) => f.path === filePath)
    if (file) {
      setSelectedFile(filePath)
      setFileType(file.type)
      setCurrentPage(1)
      setTotalPages(file.type === "pdf" ? 3 : 1) // PDFは3ページ、画像は1ページとして設定
      handleResetImage()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setApplicationData((prev) => ({
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
    router.back()
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
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
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
                    value={applicationData.applicantName}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicantKana">申込者名（カナ）</Label>
                  <Input
                    id="applicantKana"
                    value={applicationData.applicantKana}
                    onChange={(e) => handleInputChange("applicantKana", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">生年月日</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={applicationData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">住所</Label>
                  <Textarea
                    id="address"
                    value={applicationData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanAmount">融資希望額（万円）</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={applicationData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">融資目的</Label>
                  <Input
                    id="loanPurpose"
                    value={applicationData.loanPurpose}
                    onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 保存ボタン */}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => router.back()}>
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
