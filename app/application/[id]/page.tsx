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

export default function ApplicationInputPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  // ダッシュボードと同じサンプルデータを定義
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
        gender: foundApplication.gender,
        phone: foundApplication.phone,
        email: foundApplication.email,
        address: foundApplication.address,
        occupation: foundApplication.occupation,
        company: foundApplication.company,
        annualIncome: foundApplication.annualIncome,
        loanAmount: foundApplication.loanAmount,
        loanPurpose: foundApplication.loanPurpose,
        loanPeriod: foundApplication.loanPeriod,
        notes: "",
      }
    }
    // デフォルトデータ（新規申込の場合）
    return {
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
    }
  }

  const [applicationData, setApplicationData] = useState(() => getApplicationData(params.id))

  useEffect(() => {
    setApplicationData(getApplicationData(params.id))
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
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
                    value={applicationData.applicantName}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicantKana">申込者名（カナ）</Label>
                  <Input
                    id="applicantKana"
                    value={applicationData.applicantKana}
                    onChange={(e) => handleInputChange("applicantKana", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">生年月日</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={applicationData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">性別</Label>
                  <Select
                    value={applicationData.gender}
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
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  value={applicationData.address}
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
                    value={applicationData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">勤務先</Label>
                  <Input
                    id="company"
                    value={applicationData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">年収（万円）</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={applicationData.annualIncome}
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
                    value={applicationData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanPeriod">融資期間（年）</Label>
                  <Input
                    id="loanPeriod"
                    type="number"
                    value={applicationData.loanPeriod}
                    onChange={(e) => handleInputChange("loanPeriod", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">融資目的</Label>
                <Input
                  id="loanPurpose"
                  value={applicationData.loanPurpose}
                  onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">備考</Label>
                <Textarea
                  id="notes"
                  value={applicationData.notes}
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
