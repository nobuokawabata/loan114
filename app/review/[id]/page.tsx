"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Building2,
  Calculator,
  FileText,
  Eye,
  Send,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCw,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const generateRelativeDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split("T")[0]
}

const generateReviewDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

const reviewData = [
  {
    id: 1,
    applicantName: "山田次郎",
    status: "担保評価",
    amount: "5,000万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(5),
    loanPurpose: "住宅購入",
    annualIncome: "800万円",
    creditScore: 720,
    collateralValue: "5,500万円",
  },
  {
    id: 2,
    applicantName: "松本和子",
    status: "担保評価",
    amount: "3,200万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(8),
    loanPurpose: "借り換え",
    annualIncome: "550万円",
    creditScore: 680,
    collateralValue: "3,700万円",
  },
  {
    id: 3,
    applicantName: "木村正雄",
    status: "担保評価",
    amount: "4,500万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(12),
    loanPurpose: "住宅購入",
    annualIncome: "700万円",
    creditScore: 750,
    collateralValue: "5,000万円",
  },
  {
    id: 4,
    applicantName: "林美香",
    status: "担保評価",
    amount: "2,800万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(15),
    loanPurpose: "リフォーム",
    annualIncome: "450万円",
    creditScore: 690,
    collateralValue: "3,300万円",
  },
  {
    id: 5,
    applicantName: "森田健司",
    status: "担保評価",
    amount: "6,000万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(18),
    loanPurpose: "住宅購入",
    annualIncome: "900万円",
    creditScore: 710,
    collateralValue: "6,500万円",
  },
  {
    id: 6,
    applicantName: "清水恵子",
    status: "担保評価",
    amount: "3,800万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(22),
    loanPurpose: "借り換え",
    annualIncome: "620万円",
    creditScore: 665,
    collateralValue: "4,300万円",
  },
  {
    id: 7,
    applicantName: "池田光男",
    status: "担保評価",
    amount: "4,200万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(25),
    loanPurpose: "住宅購入",
    annualIncome: "680万円",
    creditScore: 780,
    collateralValue: "4,700万円",
  },
  {
    id: 8,
    applicantName: "橋本真理",
    status: "担保評価",
    amount: "2,500万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(3),
    loanPurpose: "リフォーム",
    annualIncome: "480万円",
    creditScore: 700,
    collateralValue: "3,000万円",
  },
  {
    id: 9,
    applicantName: "石川博",
    status: "担保評価",
    amount: "5,500万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(7),
    loanPurpose: "住宅購入",
    annualIncome: "850万円",
    creditScore: 740,
    collateralValue: "6,000万円",
  },
  {
    id: 10,
    applicantName: "青木千代",
    status: "担保評価",
    amount: "3,000万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(10),
    loanPurpose: "借り換え",
    annualIncome: "520万円",
    creditScore: 670,
    collateralValue: "3,500万円",
  },
  {
    id: 11,
    applicantName: "藤田隆志",
    status: "担保評価",
    amount: "4,800万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(35),
    loanPurpose: "住宅購入",
    annualIncome: "750万円",
    creditScore: 720,
    collateralValue: "5,300万円",
  },
  {
    id: 12,
    applicantName: "岡田純子",
    status: "担保評価",
    amount: "2,200万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(2),
    loanPurpose: "リフォーム",
    annualIncome: "420万円",
    creditScore: 685,
    collateralValue: "2,700万円",
  },
  {
    id: 13,
    applicantName: "長谷川修",
    status: "個信照会",
    amount: "3,500万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(40),
    loanPurpose: "住宅購入",
    annualIncome: "600万円",
    creditScore: 695,
    collateralValue: "4,000万円",
  },
  {
    id: 14,
    applicantName: "村上智子",
    status: "個信照会",
    amount: "2,700万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(38),
    loanPurpose: "借り換え",
    annualIncome: "490万円",
    creditScore: 660,
    collateralValue: "3,200万円",
  },
  {
    id: 15,
    applicantName: "近藤大輔",
    status: "個信照会",
    amount: "4,100万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(33),
    loanPurpose: "住宅購入",
    annualIncome: "720万円",
    creditScore: 730,
    collateralValue: "4,600万円",
  },
  {
    id: 16,
    applicantName: "斎藤麻衣",
    status: "個信照会",
    amount: "3,300万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(28),
    loanPurpose: "リフォーム",
    annualIncome: "580万円",
    creditScore: 675,
    collateralValue: "3,800万円",
  },
  {
    id: 17,
    applicantName: "遠藤康夫",
    status: "個信照会",
    amount: "5,200万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(20),
    loanPurpose: "住宅購入",
    annualIncome: "820万円",
    creditScore: 755,
    collateralValue: "5,700万円",
  },
  {
    id: 18,
    applicantName: "三浦由紀",
    status: "個信照会",
    amount: "2,900万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(16),
    loanPurpose: "借り換え",
    annualIncome: "510万円",
    creditScore: 650,
    collateralValue: "3,400万円",
  },
  {
    id: 19,
    applicantName: "坂本誠",
    status: "個信照会",
    amount: "4,600万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(13),
    loanPurpose: "住宅購入",
    annualIncome: "780万円",
    creditScore: 725,
    collateralValue: "5,100万円",
  },
  {
    id: 20,
    applicantName: "井上綾子",
    status: "個信照会",
    amount: "3,700万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(9),
    loanPurpose: "リフォーム",
    annualIncome: "640万円",
    creditScore: 690,
    collateralValue: "4,200万円",
  },
  {
    id: 21,
    applicantName: "前田浩二",
    status: "個信照会",
    amount: "2,400万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(6),
    loanPurpose: "借り換え",
    annualIncome: "460万円",
    creditScore: 655,
    collateralValue: "2,900万円",
  },
  {
    id: 22,
    applicantName: "金子奈美",
    status: "個信照会",
    amount: "5,800万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(4),
    loanPurpose: "住宅購入",
    annualIncome: "920万円",
    creditScore: 770,
    collateralValue: "6,300万円",
  },
  {
    id: 23,
    applicantName: "藤原良一",
    status: "スコアリング",
    amount: "4,300万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(45),
    loanPurpose: "住宅購入",
    annualIncome: "710万円",
    creditScore: 715,
    collateralValue: "4,800万円",
  },
  {
    id: 24,
    applicantName: "吉田理恵",
    status: "スコアリング",
    amount: "3,100万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(42),
    loanPurpose: "リフォーム",
    annualIncome: "540万円",
    creditScore: 680,
    collateralValue: "3,600万円",
  },
  {
    id: 25,
    applicantName: "西村達也",
    status: "スコアリング",
    amount: "5,700万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(39),
    loanPurpose: "住宅購入",
    annualIncome: "880万円",
    creditScore: 760,
    collateralValue: "6,200万円",
  },
  {
    id: 26,
    applicantName: "山口美穂",
    status: "スコアリング",
    amount: "2,600万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(37),
    loanPurpose: "借り換え",
    annualIncome: "470万円",
    creditScore: 665,
    collateralValue: "3,100万円",
  },
  {
    id: 27,
    applicantName: "中島克己",
    status: "スコアリング",
    amount: "4,900万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(24),
    loanPurpose: "住宅購入",
    annualIncome: "790万円",
    creditScore: 735,
    collateralValue: "5,400万円",
  },
  {
    id: 28,
    applicantName: "田村香織",
    status: "スコアリング",
    amount: "3,400万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(19),
    loanPurpose: "リフォーム",
    annualIncome: "590万円",
    creditScore: 685,
    collateralValue: "3,900万円",
  },
  {
    id: 29,
    applicantName: "原田雄介",
    status: "スコアリング",
    amount: "2,100万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(14),
    loanPurpose: "借り換え",
    annualIncome: "410万円",
    creditScore: 645,
    collateralValue: "2,600万円",
  },
  {
    id: 30,
    applicantName: "平野さくら",
    status: "スコアリング",
    amount: "6,200万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(11),
    loanPurpose: "住宅購入",
    annualIncome: "950万円",
    creditScore: 785,
    collateralValue: "6,700万円",
  },
  {
    id: 31,
    applicantName: "加藤信夫",
    status: "与信判定",
    amount: "4,700万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(50),
    loanPurpose: "住宅購入",
    annualIncome: "760万円",
    creditScore: 720,
    collateralValue: "5,200万円",
  },
  {
    id: 32,
    applicantName: "竹内優子",
    status: "与信判定",
    amount: "3,600万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(48),
    loanPurpose: "リフォーム",
    annualIncome: "610万円",
    creditScore: 695,
    collateralValue: "4,100万円",
  },
  {
    id: 33,
    applicantName: "小川哲郎",
    status: "与信判定",
    amount: "2,300万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(44),
    loanPurpose: "借り換え",
    annualIncome: "440万円",
    creditScore: 660,
    collateralValue: "2,800万円",
  },
  {
    id: 34,
    applicantName: "安田恵美",
    status: "与信判定",
    amount: "5,400万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(41),
    loanPurpose: "住宅購入",
    annualIncome: "840万円",
    creditScore: 745,
    collateralValue: "5,900万円",
  },
  {
    id: 35,
    applicantName: "岩田正治",
    status: "与信判定",
    amount: "4,000万円",
    assignee: "審査部B",
    receivedDate: generateRelativeDate(26),
    loanPurpose: "住宅購入",
    annualIncome: "670万円",
    creditScore: 705,
    collateralValue: "4,500万円",
  },
  {
    id: 36,
    applicantName: "松井亜希",
    status: "与信判定",
    amount: "2,800万円",
    assignee: "審査部C",
    receivedDate: generateRelativeDate(23),
    loanPurpose: "リフォーム",
    annualIncome: "500万円",
    creditScore: 675,
    collateralValue: "3,300万円",
  },
  {
    id: 37,
    applicantName: "大野勝彦",
    status: "与信判定",
    amount: "5,100万円",
    assignee: "審査部A",
    receivedDate: generateRelativeDate(17),
    loanPurpose: "住宅購入",
    annualIncome: "810万円",
    creditScore: 750,
    collateralValue: "5,600万円",
  },
  {
    id: 38,
    applicantName: "福田明",
    status: "結果回答",
    amount: "3,900万円",
    assignee: "審査部B",
    receivedDate: "2023-12-01",
    result: "承認",
    conditions: "金利3.5%、期間20年",
    reviewDate: generateReviewDate(2),
    loanPurpose: "住宅購入",
    annualIncome: "650万円",
    creditScore: 710,
    collateralValue: "4,400万円",
  },
  {
    id: 39,
    applicantName: "上田千春",
    status: "結果回答",
    amount: "2,700万円",
    assignee: "審査部C",
    receivedDate: "2023-12-03",
    result: "条件付承認",
    conditions: "保証人追加、金利4.0%",
    reviewDate: generateReviewDate(1),
    loanPurpose: "リフォーム",
    annualIncome: "480万円",
    creditScore: 665,
    collateralValue: "3,200万円",
  },
  {
    id: 40,
    applicantName: "杉山俊夫",
    status: "結果回答",
    amount: "4,400万円",
    assignee: "審査部A",
    receivedDate: "2023-12-07",
    result: "否認",
    conditions: "収入不足のため",
    reviewDate: generateReviewDate(3),
    loanPurpose: "住宅購入",
    annualIncome: "580万円",
    creditScore: 640,
    collateralValue: "4,900万円",
  },
  {
    id: 41,
    applicantName: "内田みどり",
    status: "結果回答",
    amount: "3,200万円",
    assignee: "審査部B",
    receivedDate: "2023-12-08",
    result: "承認",
    conditions: "金利3.2%、期間25年",
    reviewDate: generateReviewDate(0),
    loanPurpose: "借り換え",
    annualIncome: "560万円",
    creditScore: 690,
    collateralValue: "3,700万円",
  },
  {
    id: 42,
    applicantName: "横山和明",
    status: "結果回答",
    amount: "5,600万円",
    assignee: "審査部C",
    receivedDate: "2023-12-11",
    result: "条件付承認",
    conditions: "担保追加、金利3.8%",
    reviewDate: generateReviewDate(1),
    loanPurpose: "住宅購入",
    annualIncome: "890万円",
    creditScore: 765,
    collateralValue: "6,100万円",
  },
]

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("担保評価")
  const [reviewComment, setReviewComment] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const [imageZoom, setImageZoom] = useState(100)
  const [imageRotation, setImageRotation] = useState(0)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const caseData = reviewData.find((item) => item.id === Number.parseInt(params.id)) || {
    id: params.id,
    applicantName: "データなし",
    amount: "未設定",
    loanPurpose: "未設定",
    annualIncome: "未設定",
    creditScore: 0,
    collateralValue: "未設定",
    status: "担保評価",
  }

  const documents = [
    {
      code: "DOC001",
      name: "送付状",
      status: "received" as const,
      receivedDate: "2025-01-08 10:30",
      hasImage: true,
      pdfPath: "/documents/cover-letter.pdf",
    },
    {
      code: "DOC002",
      name: "正式審査申込書",
      status: "received" as const,
      receivedDate: "2025-01-08 10:30",
      hasImage: true,
      pdfPath: "/documents/formal-application.pdf",
    },
    {
      code: "DOC003",
      name: "本人確認資料",
      status: "received" as const,
      receivedDate: "2025-01-08 14:15",
      hasImage: true,
      pdfPath: "/documents/identity-verification.pdf",
    },
    {
      code: "DOC004",
      name: "源泉徴収票",
      status: "not_received" as const,
      receivedDate: null,
      hasImage: false,
      pdfPath: "/documents/tax-withholding.pdf",
    },
  ]

  const reviewSteps = [
    {
      id: "担保評価",
      name: "担保評価",
      icon: Building2,
      status: "in-progress",
      description: "担保物件の評価を実施",
    },
    {
      id: "個信照会",
      name: "個信照会",
      icon: User,
      status: "pending",
      description: "個人信用情報の照会",
    },
    {
      id: "スコアリング",
      name: "スコアリング",
      icon: Calculator,
      status: "pending",
      description: "信用スコアの算出",
    },
    {
      id: "与信判定",
      name: "与信判定",
      icon: CheckCircle,
      status: "pending",
      description: "最終的な与信判定",
    },
    {
      id: "結果回答",
      name: "結果回答",
      icon: CheckCircle,
      status: "pending",
      description: "結果の回答",
    },
  ]

  const getStepStatus = (stepId: string) => {
    const step = reviewSteps.find((s) => s.id === stepId)
    return step?.status || "pending"
  }

  const getProgressValue = () => {
    const currentIndex = reviewSteps.findIndex((step) => step.id === currentStep)
    return ((currentIndex + 1) / reviewSteps.length) * 100
  }

  const handleApprove = () => {
    const currentIndex = reviewSteps.findIndex((step) => step.id === currentStep)
    if (currentIndex < reviewSteps.length - 1) {
      const nextStep = reviewSteps[currentIndex + 1]
      setCurrentStep(nextStep.id)
      alert(`${currentStep}が承認されました。次のステップ: ${nextStep.name}`)
    } else {
      alert("すべての審査が完了しました")
      router.push("/dashboard")
    }
  }

  const handleReject = () => {
    alert(`${currentStep}が否認されました`)
    router.push("/dashboard")
  }

  const handleRequestInfo = () => {
    alert("追加情報の要求を送信しました")
  }

  const handleDocumentRequest = (documentName: string) => {
    alert(`${documentName}の徴求依頼を送信しました`)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "担保評価":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                担保評価
              </CardTitle>
              <CardDescription>担保物件の評価を実施してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">物件種別</Label>
                  <p className="text-sm text-muted-foreground">戸建住宅</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">所在地</Label>
                  <p className="text-sm text-muted-foreground">東京都世田谷区</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">築年数</Label>
                  <p className="text-sm text-muted-foreground">5年</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">評価額</Label>
                  <p className="text-sm font-semibold text-green-600">{caseData.collateralValue}</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  担保評価額が融資希望額を上回っています（LTV: 83%）
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "個信照会":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                個人信用情報照会
              </CardTitle>
              <CardDescription>個人信用情報を確認してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">信用スコア</Label>
                  <p className="text-sm font-semibold text-blue-600">{caseData.creditScore}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">延滞履歴</Label>
                  <p className="text-sm text-green-600">なし</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">他社借入</Label>
                  <p className="text-sm text-muted-foreground">200万円</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">年収</Label>
                  <p className="text-sm text-muted-foreground">{caseData.annualIncome}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  信用情報に問題はありません
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "スコアリング":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                スコアリング
              </CardTitle>
              <CardDescription>信用スコアを算出してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">年収</span>
                  <Badge variant="secondary">85点</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">勤続年数</span>
                  <Badge variant="secondary">90点</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">信用履歴</span>
                  <Badge variant="secondary">95点</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">担保評価</span>
                  <Badge variant="secondary">88点</Badge>
                </div>
                <hr />
                <div className="flex justify-between items-center font-semibold">
                  <span>総合スコア</span>
                  <Badge className="bg-green-500">89点</Badge>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  スコアリング結果: 承認推奨
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "与信判定":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                与信判定
              </CardTitle>
              <CardDescription>最終的な与信判定を行ってください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">融資希望額</Label>
                  <p className="text-sm text-muted-foreground">{caseData.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">推奨融資額</Label>
                  <p className="text-sm font-semibold text-green-600">4,500万円</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">金利</Label>
                  <p className="text-sm text-muted-foreground">1.2%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">融資期間</Label>
                  <p className="text-sm text-muted-foreground">35年</p>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  融資希望額から500万円減額を推奨します
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "結果回答":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                結果回答
              </CardTitle>
              <CardDescription>結果の回答を行ってください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">審査結果</Label>
                  <p className="text-sm text-muted-foreground">{caseData.result}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">条件</Label>
                  <p className="text-sm text-muted-foreground">{caseData.conditions}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">審査日</Label>
                  <p className="text-sm text-muted-foreground">{caseData.reviewDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const handleZoomIn = () => {
    setImageZoom((prev) => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setImageZoom((prev) => Math.max(prev - 25, 25))
  }

  const handleRotateRight = () => {
    setImageRotation((prev) => prev + 90)
  }

  const handleRotateLeft = () => {
    setImageRotation((prev) => prev - 90)
  }

  const handleReset = () => {
    setImageZoom(100)
    setImageRotation(0)
    setImagePosition({ x: 0, y: 0 })
  }

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value >= 25 && value <= 300) {
      setImageZoom(value)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDocumentView = (docName: string) => {
    setSelectedDocument(docName)
    setImageZoom(100)
    setImageRotation(0)
    setImagePosition({ x: 0, y: 0 })
  }

  const hasUnreceivedDocuments = documents.some((doc) => doc.status === "not_received")
  const defaultAccordionValue = ""

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-xl font-bold">審査画面</h1>
            <span className="text-muted-foreground">案件ID: {params.id}</span>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>案件概要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">申込者名</Label>
                  <p className="text-sm text-muted-foreground">{caseData.applicantName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">融資希望額</Label>
                  <p className="text-sm text-muted-foreground">{caseData.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">融資目的</Label>
                  <p className="text-sm text-muted-foreground">{caseData.loanPurpose}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">現在のステータス</Label>
                  <Badge variant="secondary">{caseData.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible defaultValue={defaultAccordionValue}>
            <AccordionItem value="documents">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  <span>受領書類確認</span>
                  {hasUnreceivedDocuments && (
                    <Badge variant="destructive" className="ml-2">
                      未受領あり
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardDescription>提出書類の受領状況を確認してください</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">書類コード</th>
                            <th className="text-left p-3 font-medium">書類名</th>
                            <th className="text-left p-3 font-medium">受領状況</th>
                            <th className="text-left p-3 font-medium">受領日時</th>
                            <th className="text-left p-3 font-medium">表示</th>
                            <th className="text-left p-3 font-medium">アクション</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documents.map((doc) => (
                            <tr key={doc.code} className="border-b hover:bg-muted/50">
                              <td className="p-3 font-mono text-sm">{doc.code}</td>
                              <td className="p-3">{doc.name}</td>
                              <td className="p-3">
                                <Badge
                                  variant={doc.status === "received" ? "default" : "destructive"}
                                  className={doc.status === "received" ? "bg-green-500" : ""}
                                >
                                  {doc.status === "received" ? "受領" : "未受領"}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">{doc.receivedDate || "-"}</td>
                              <td className="p-3">
                                {doc.hasImage ? (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" onClick={() => handleDocumentView(doc.name)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-6xl max-h-[90vh]">
                                      <DialogHeader>
                                        <DialogTitle>{doc.name}</DialogTitle>
                                      </DialogHeader>

                                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <Button variant="outline" size="sm" onClick={handleZoomOut}>
                                            <ZoomOut className="h-4 w-4" />
                                          </Button>
                                          <Button variant="outline" size="sm" onClick={handleZoomIn}>
                                            <ZoomIn className="h-4 w-4" />
                                          </Button>
                                          <div className="flex items-center gap-2 mx-4">
                                            <Input
                                              type="number"
                                              min="25"
                                              max="300"
                                              value={imageZoom}
                                              onChange={handleZoomChange}
                                              className="w-20 h-8"
                                            />
                                            <span className="text-sm text-muted-foreground">%</span>
                                          </div>
                                          <Button variant="outline" size="sm" onClick={handleRotateLeft}>
                                            <RotateCcw className="h-4 w-4" />
                                          </Button>
                                          <Button variant="outline" size="sm" onClick={handleRotateRight}>
                                            <RotateCw className="h-4 w-4" />
                                          </Button>
                                          <Button variant="outline" size="sm" onClick={handleReset}>
                                            <RefreshCw className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>

                                      <div
                                        className="flex justify-center items-center h-96 bg-muted rounded-lg overflow-auto"
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                      >
                                        <div
                                          className="relative w-full h-full"
                                          style={{
                                            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageZoom / 100}) rotate(${imageRotation}deg)`,
                                            cursor: isDragging ? "grabbing" : "grab",
                                            transition: isDragging ? "none" : "transform 0.2s ease",
                                          }}
                                          onMouseDown={handleMouseDown}
                                        >
                                          <iframe
                                            src={doc.pdfPath}
                                            className="w-full h-full border-0"
                                            title={doc.name}
                                          />
                                        </div>
                                      </div>

                                      <div className="flex justify-end gap-2 mt-4">
                                        <Button variant="outline" size="sm">
                                          <Download className="h-4 w-4 mr-2" />
                                          ダウンロード
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                ) : (
                                  <span className="text-muted-foreground text-sm">-</span>
                                )}
                              </td>
                              <td className="p-3">
                                {doc.status === "not_received" && (
                                  <Button variant="outline" size="sm" onClick={() => handleDocumentRequest(doc.name)}>
                                    <Send className="h-4 w-4 mr-2" />
                                    徴求依頼
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span>受領済み: {documents.filter((d) => d.status === "received").length}件</span>
                        <span>未受領: {documents.filter((d) => d.status === "not_received").length}件</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card>
            <CardHeader>
              <CardTitle>審査進捗</CardTitle>
              <CardDescription>現在の審査ステップと進捗状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={getProgressValue()} className="w-full" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {reviewSteps.map((step) => {
                    const Icon = step.icon
                    const isActive = step.id === currentStep
                    const isCompleted = getStepStatus(step.id) === "completed"

                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : isCompleted
                              ? "border-green-200 bg-green-50"
                              : "border-border"
                        }`}
                        onClick={() => setCurrentStep(step.id)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon
                            className={`h-5 w-5 ${
                              isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-foreground"
                            }`}
                          >
                            {step.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {renderStepContent()}

          <Card>
            <CardHeader>
              <CardTitle>審査コメント</CardTitle>
              <CardDescription>審査結果や特記事項を記入してください</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="審査コメントを入力してください..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleRequestInfo}>
              <FileText className="h-4 w-4 mr-2" />
              追加情報要求
            </Button>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleReject}>
                <XCircle className="h-4 w-4 mr-2" />
                否認
              </Button>
              <Button onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                承認
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
