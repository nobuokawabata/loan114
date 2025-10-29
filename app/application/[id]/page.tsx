"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText, Eye, Save } from "lucide-react"

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

interface ApplicationData {
  applicantName: string
  applicantKana: string
  birthDate: string
  gender: string
  phone: string
  email: string
  address: string
  occupation: string
  company: string
  annualIncome: string
  loanAmount: string
  loanPurpose: string
  loanPeriod: string
  notes: string
}

export default function ApplicationInputPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null)

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (params.id) {
        const res = await fetch(`/api/applications/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setApplicationData(data)
        } else {
          // 新規申込としてデフォルトデータをセット
          setApplicationData({
            applicantName: "",
            applicantKana: "",
            birthDate: "",
            gender: "男性",
            phone: "",
            email: "",
            address: "",
            occupation: "",
            company: "",
            annualIncome: "",
            loanAmount: "",
            loanPurpose: "",
            loanPeriod: "",
            notes: "",
          })
        }
      }
    }
    fetchApplicationData()
  }, [params.id])

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleVerify = () => {
    router.push(`/application/${params.id}/verify`)
  }

  const handleComplete = () => {
    alert("申込受付が完了しました")
    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-xl font-bold">申込入力画面</h1>
            <span className="text-muted-foreground">案件ID: {params.id}</span>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* 申込者情報 */}
          <Card>
            <CardHeader>
              <CardTitle>申込者情報</CardTitle>
              <CardDescription>基本情報を確認・修正してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicantName">申込者名</Label>
                  <Input
                    id="applicantName"
                    value={applicationData?.applicantName || ""}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicantKana">申込者名（カナ）</Label>
                  <Input
                    id="applicantKana"
                    value={applicationData?.applicantKana || ""}
                    onChange={(e) => handleInputChange("applicantKana", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">生年月日</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={applicationData?.birthDate || ""}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">性別</Label>
                  <Select
                    value={applicationData?.gender || ""}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男性">男性</SelectItem>
                      <SelectItem value="女性">女性</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={applicationData?.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData?.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  value={applicationData?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* 職業・収入情報 */}
          <Card>
            <CardHeader>
              <CardTitle>職業・収入情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">職業</Label>
                  <Input
                    id="occupation"
                    value={applicationData?.occupation || ""}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">勤務先</Label>
                  <Input
                    id="company"
                    value={applicationData?.company || ""}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">年収（万円）</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={applicationData?.annualIncome || ""}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 融資情報 */}
          <Card>
            <CardHeader>
              <CardTitle>融資情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">融資希望額（万円）</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={applicationData?.loanAmount || ""}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanPeriod">融資期間（年）</Label>
                  <Input
                    id="loanPeriod"
                    type="number"
                    value={applicationData?.loanPeriod || ""}
                    onChange={(e) => handleInputChange("loanPeriod", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">融資目的</Label>
                <Input
                  id="loanPurpose"
                  value={applicationData?.loanPurpose || ""}
                  onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">備考</Label>
                <Textarea
                  id="notes"
                  value={applicationData?.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* アクションボタン */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <FileText className="h-4 w-4 mr-2" />
                {isEditing ? "編集終了" : "編集"}
              </Button>
              {isEditing && (
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                キャンセル
              </Button>
              <Button variant="outline" onClick={handleVerify}>
                <Eye className="h-4 w-4 mr-2" />
                ベリファイ
              </Button>
              <Button onClick={handleComplete}>受付完了</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
