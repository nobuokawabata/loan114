"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  FileText,
  Search,
  CheckCircle,
  Settings,
  Database,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  User,
  Building2,
  Clock,
  Mail,
  Fan as Fax,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("home")
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const router = useRouter()

  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [resultCurrentPage, setResultCurrentPage] = useState(1)
  const [responseMethod, setResponseMethod] = useState("email")
  const [responseText, setResponseText] = useState("")
  const [previewOpen, setPreviewOpen] = useState(false)

  const [dashboardStats, setDashboardStats] = useState<any[]>([])
  const [applicationData, setApplicationData] = useState<any[]>([])
  const [reviewData, setReviewData] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await fetch("/api/dashboard-stats")
      const statsData = await statsRes.json()
      setDashboardStats(statsData)

      const appsRes = await fetch("/api/applications")
      const appsData = await appsRes.json()
      setApplicationData(appsData)

      const reviewsRes = await fetch("/api/reviews")
      const reviewsData = await reviewsRes.json()
      setReviewData(reviewsData)

      const docsRes = await fetch("/api/documents")
      const docsData = await docsRes.json()
      setDocuments(docsData)
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    window.location.href = "/"
  }

  const calculateDaysElapsed = (receivedDate: string) => {
    const today = new Date()
    const received = new Date(receivedDate)
    const diffTime = Math.abs(today.getTime() - received.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const generateRelativeDate = (daysAgo: number) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() - daysAgo)
    return targetDate.toISOString().split("T")[0]
  }

  const generateRelativeDatetime = (daysAgo: number, hour: number, minute: number) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() - daysAgo)
    const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    return `${targetDate.toISOString().split("T")[0]} ${timeString}`
  }

  const generateReviewDate = (daysAgo: number) => {
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return date.toISOString().split("T")[0]
  }

  const menuItems = [
    { id: "home", label: "ホーム", icon: Home },
    { id: "application", label: "申込受付", icon: FileText },
    { id: "review", label: "審査", icon: Search },
    { id: "result", label: "結果回答", icon: CheckCircle },
    { id: "management", label: "案件管理", icon: Database },
    { id: "review-settings", label: "審査設定", icon: Settings },
    { id: "master", label: "マスタ設定", icon: Settings },
  ]

  const icons: { [key: string]: React.ElementType } = {
    FileText,
    Building2,
    User,
    Search,
    CheckCircle,
    Mail,
    Fax,
    Store,
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "FAX":
        return <Fax className="h-4 w-4" />
      case "メール":
        return <Mail className="h-4 w-4" />
      case "店頭":
        return <Store className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "申込受付":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "担保評価":
        return "bg-green-100 text-green-800 border-green-200"
      case "個信照会":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "スコアリング":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "与信判定":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "結果回答":
        return "bg-red-100 text-red-800 border-red-200"
      case "受付中":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "確認中":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredReviewData = reviewData.filter((item) => activeFilter === "all" || item.status === activeFilter)
  const totalPages = Math.ceil(filteredReviewData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = filteredReviewData.slice(startIndex, endIndex)

  const resultFilteredData = reviewData.filter((item) => item.status === "結果回答")
  const resultItemsPerPage = 4
  const resultTotalPages = Math.ceil(resultFilteredData.length / resultItemsPerPage)
  const resultStartIndex = (resultCurrentPage - 1) * resultItemsPerPage
  const resultEndIndex = resultStartIndex + resultItemsPerPage
  const resultCurrentPageData = resultFilteredData.slice(resultStartIndex, resultEndIndex)
  const selectedCaseData = selectedCase ? reviewData.find((c) => c.id === selectedCase) : null

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleApplicationClick = (applicationId: number) => {
    router.push(`/application/${applicationId}`)
  }

  const handleNewApplication = () => {
    const newId = Math.max(...applicationData.map((app) => app.id), ...reviewData.map((review) => review.id)) + 1
    router.push(`/application/${newId}`)
  }

  const handleReviewClick = (reviewId: number) => {
    router.push(`/review/${reviewId}`)
  }

  const handleResultClick = (resultId: number) => {
    setActiveMenu("result")
  }

  const handlePreview = () => {
    setPreviewOpen(true)
  }

  const renderPreviewContent = () => {
    if (!selectedCaseData) return null

    if (responseMethod === "email") {
      return (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg">メール送信プレビュー</h3>
          </div>
          <div className="space-y-2">
            <div>
              <strong>宛先:</strong> {selectedCaseData.applicantName}様
            </div>
            <div>
              <strong>件名:</strong> ローン審査結果のご連絡
            </div>
          </div>
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="whitespace-pre-wrap">{responseText}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg">FAX送信プレビュー</h3>
          </div>
          <div className="border rounded-md p-6 bg-white" style={{ fontFamily: "monospace" }}>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">ローン審査結果通知書</h2>
            </div>
            <div className="space-y-2 mb-6">
              <div>お客様名: {selectedCaseData.applicantName}様</div>
              <div>申込金額: {selectedCaseData.amount}</div>
              <div>審査結果: {selectedCaseData.result}</div>
            </div>
            <div className="border-t pt-4">
              <div className="whitespace-pre-wrap">{responseText}</div>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderMainContent = () => {
    if (activeMenu === "home") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">案件ステータス</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardStats.map((stat: any, index) => {
                const Icon = icons[stat.icon]
                return (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      if (stat.title === "申込受付") {
                        setActiveMenu("application")
                      } else if (["担保評価", "個信照会", "スコアリング", "与信判定"].includes(stat.title)) {
                        setActiveMenu("review")
                        setActiveFilter(stat.title)
                      } else if (stat.title === "結果回答") {
                        setActiveMenu("result")
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.count}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-full`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        {stat.change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : stat.change < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <div className="h-4 w-4 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            stat.change > 0
                              ? "text-green-500"
                              : stat.change < 0
                                ? "text-red-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          {stat.change > 0 ? "+" : ""}
                          {stat.change} 前日比
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    if (activeMenu === "application") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">申込受付一覧</h2>
            <Button onClick={handleNewApplication}>新規申込</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">操作</th>
                      <th className="text-left p-4 font-medium">受付日時</th>
                      <th className="text-left p-4 font-medium">受付チャネル</th>
                      <th className="text-left p-4 font-medium">申込者名</th>
                      <th className="text-left p-4 font-medium">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationData.map((app) => (
                      <tr key={app.id} className="border-t">
                        <td className="p-4">
                          <Button size="sm" variant="outline" onClick={() => handleApplicationClick(app.id)}>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            {app.receivedAt}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            {getChannelIcon(app.channel)}
                            <span className="ml-2">{app.channel}</span>
                          </div>
                        </td>
                        <td className="p-4">{app.applicantName}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (activeMenu === "review") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">審査一覧</h2>
          </div>

          <div className="flex gap-2 flex-wrap">
            {["all", "担保評価", "個信照会", "スコアリング", "与信判定"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(filter)}
              >
                {filter === "all" ? "すべて" : filter}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-md">
            <div className="text-sm text-muted-foreground">
              {filteredReviewData.length}件中 {startIndex + 1}-{Math.min(endIndex, filteredReviewData.length)}
              件を表示
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                前へ
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                次へ
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="text-left p-4 font-medium">操作</th>
                      <th className="text-left p-4 font-medium">申込者名</th>
                      <th className="text-left p-4 font-medium">ステータス</th>
                      <th className="text-left p-4 font-medium">融資金額</th>
                      <th className="text-left p-4 font-medium">担当</th>
                      <th className="text-left p-4 font-medium">受付日</th>
                      <th className="text-left p-4 font-medium">審査結果</th>
                      <th className="text-left p-4 font-medium">審査日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((review) => (
                      <tr key={review.id} className="border-t">
                        <td className="p-4">
                          <Button size="sm" variant="outline" onClick={() => handleReviewClick(review.id)}>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="p-4">{review.applicantName}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={getStatusColor(review.status)}>
                            {review.status}
                          </Badge>
                        </td>
                        <td className="p-4">{review.amount}</td>
                        <td className="p-4">{review.assignee}</td>
                        <td className="p-4">{review.receivedDate}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              review.result === "承認"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : review.result === "条件付承認"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {review.result}
                          </Badge>
                        </td>
                        <td className="p-4">{review.reviewDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (activeMenu === "result") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">結果回答対象案件</h2>
          </div>

          {/* 案件一覧テーブル */}
          <Card>
            <CardContent className="p-0">
              {/* ページネーション上部 */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
                <div className="text-sm text-muted-foreground">
                  {resultFilteredData.length}件中 {resultStartIndex + 1}-
                  {Math.min(resultEndIndex, resultFilteredData.length)}件を表示
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResultCurrentPage(resultCurrentPage - 1)}
                    disabled={resultCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    前へ
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: resultTotalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={resultCurrentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setResultCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResultCurrentPage(resultCurrentPage + 1)}
                    disabled={resultCurrentPage === resultTotalPages}
                  >
                    次へ
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">選択</th>
                      <th className="text-left p-4 font-medium">申込者名</th>
                      <th className="text-left p-4 font-medium">ステータス</th>
                      <th className="text-left p-4 font-medium">融資金額</th>
                      <th className="text-left p-4 font-medium">担当</th>
                      <th className="text-left p-4 font-medium">受付日</th>
                      <th className="text-left p-4 font-medium">審査結果</th>
                      <th className="text-left p-4 font-medium">審査日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultCurrentPageData.map((caseItem) => (
                      <tr
                        key={caseItem.id}
                        className={`border-t cursor-pointer hover:bg-muted/30 ${selectedCase === caseItem.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedCase(caseItem.id)}
                      >
                        <td className="p-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={selectedCase === caseItem.id}
                              onChange={() => setSelectedCase(caseItem.id)}
                              className="h-4 w-4"
                            />
                          </div>
                        </td>
                        <td className="p-4">{caseItem.applicantName}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {caseItem.status}
                          </Badge>
                        </td>
                        <td className="p-4">{caseItem.amount}</td>
                        <td className="p-4">{caseItem.assignee}</td>
                        <td className="p-4">{caseItem.receivedDate}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              caseItem.result === "承認"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : caseItem.result === "条件付承認"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {caseItem.result}
                          </Badge>
                        </td>
                        <td className="p-4">{caseItem.reviewDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 選択された案件の詳細 */}
          {selectedCaseData && (
            <div className="space-y-6">
              {/* 基本情報セクション */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">基本情報</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">申込者名</Label>
                      <p className="mt-1">{selectedCaseData.applicantName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">融資金額</Label>
                      <p className="mt-1">{selectedCaseData.amount}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">担当部署</Label>
                      <p className="mt-1">{selectedCaseData.assignee}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">受付日</Label>
                      <p className="mt-1">{selectedCaseData.receivedDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">審査結果</Label>
                      <p className="mt-1">{selectedCaseData.result}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">条件</Label>
                      <p className="mt-1">{selectedCaseData.conditions}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">審査日</Label>
                      <p className="mt-1">{selectedCaseData.reviewDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 受領書類セクション */}
              <Accordion type="single" collapsible defaultValue="">
                <AccordionItem value="documents">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span>受領書類確認</span>
                      {documents.some((doc) => !doc.received) && (
                        <Badge variant="destructive" className="text-xs">
                          未受領あり
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="text-left p-4 font-medium">書類名</th>
                                <th className="text-left p-4 font-medium">書類コード</th>
                                <th className="text-left p-4 font-medium">受領状況</th>
                                <th className="text-left p-4 font-medium">受領日時</th>
                                <th className="text-left p-4 font-medium">表示</th>
                              </tr>
                            </thead>
                            <tbody>
                              {documents.map((doc, index) => (
                                <tr key={index} className="border-t">
                                  <td className="p-4">{doc.name}</td>
                                  <td className="p-4">{doc.code}</td>
                                  <td className="p-4">
                                    <Badge
                                      variant="outline"
                                      className={
                                        doc.received
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-red-100 text-red-800 border-red-200"
                                      }
                                    >
                                      {doc.received ? "受領" : "未受領"}
                                    </Badge>
                                  </td>
                                  <td className="p-4">{doc.receivedAt || "-"}</td>
                                  <td className="p-4">
                                    {doc.received && (
                                      <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* 審査結果情報セクション */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">審査結果情報</h3>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">審査回答方法</Label>
                      <RadioGroup value={responseMethod} onValueChange={setResponseMethod} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            メール
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fax" id="fax" />
                          <Label htmlFor="fax" className="flex items-center gap-2">
                            <Fax className="h-4 w-4" />
                            FAX
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="response-text" className="text-base font-medium">
                        回答文言
                      </Label>
                      <Textarea
                        id="response-text"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="回答文言を入力してください..."
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={handlePreview}>
                            <Eye className="h-4 w-4 mr-2" />
                            プレビュー
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>送信プレビュー</DialogTitle>
                          </DialogHeader>
                          {renderPreviewContent()}
                        </DialogContent>
                      </Dialog>

                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        送信
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">この機能は開発中です</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">ローン審査システム</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span>所属: 審査部A</span>
              <span>ID: demo</span>
              <span>ユーザー名: デモユーザー</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="ml-4 bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeMenu === item.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">{renderMainContent()}</main>
      </div>
    </div>
  )
}
