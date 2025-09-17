"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Fan as Fax,
  Eye,
  FileText,
  User,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function ResultResponsePage() {
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [responseMethod, setResponseMethod] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [previewOpen, setPreviewOpen] = useState(false)
  const itemsPerPage = 8

  const generateRelativeDate = (daysAgo: number) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() - daysAgo)
    return targetDate.toISOString().split("T")[0]
  }

  const calculateDaysElapsed = (receivedDate: string) => {
    const today = new Date()
    const received = new Date(receivedDate)
    const diffTime = Math.abs(today.getTime() - received.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const resultApplications = [
    {
      id: 38,
      applicantName: "福田明",
      status: "結果回答",
      amount: "3,900万円",
      assignee: "審査部B",
      receivedDate: generateRelativeDate(53),
      result: "承認",
      resultDate: generateRelativeDate(2),
    },
    {
      id: 39,
      applicantName: "上田千春",
      status: "結果回答",
      amount: "2,700万円",
      assignee: "審査部C",
      receivedDate: generateRelativeDate(51),
      result: "条件付承認",
      resultDate: generateRelativeDate(1),
    },
    {
      id: 40,
      applicantName: "杉山俊夫",
      status: "結果回答",
      amount: "4,400万円",
      assignee: "審査部A",
      receivedDate: generateRelativeDate(47),
      result: "否決",
      resultDate: generateRelativeDate(3),
    },
    {
      id: 41,
      applicantName: "内田みどり",
      status: "結果回答",
      amount: "3,200万円",
      assignee: "審査部B",
      receivedDate: generateRelativeDate(46),
      result: "承認",
      resultDate: generateRelativeDate(1),
    },
    {
      id: 42,
      applicantName: "横山和明",
      status: "結果回答",
      amount: "5,600万円",
      assignee: "審査部C",
      receivedDate: generateRelativeDate(43),
      result: "条件付承認",
      resultDate: generateRelativeDate(2),
    },
    {
      id: 47,
      applicantName: "菊地真由美",
      status: "結果回答",
      amount: "4,100万円",
      assignee: "審査部B",
      receivedDate: generateRelativeDate(36),
      result: "承認",
      resultDate: generateRelativeDate(1),
    },
  ]

  const totalPages = Math.ceil(resultApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = resultApplications.slice(startIndex, endIndex)

  const selectedApp = selectedApplication ? resultApplications.find((app) => app.id === selectedApplication) : null

  const getResultColor = (result: string) => {
    switch (result) {
      case "承認":
        return "bg-green-100 text-green-800 border-green-200"
      case "条件付承認":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "否決":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case "承認":
        return <CheckCircle className="h-4 w-4" />
      case "条件付承認":
        return <AlertCircle className="h-4 w-4" />
      case "否決":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const documentData = [
    {
      name: "送付状",
      code: "DOC001",
      received: true,
      receivedDate: "2024-12-15 09:30",
    },
    {
      name: "正式審査申込書",
      code: "DOC002",
      received: true,
      receivedDate: "2024-12-15 09:30",
    },
    {
      name: "本人確認資料",
      code: "DOC003",
      received: true,
      receivedDate: "2024-12-15 10:15",
    },
    {
      name: "源泉徴収票",
      code: "DOC004",
      received: true,
      receivedDate: "2024-12-15 11:00",
    },
  ]

  const handlePreview = () => {
    setPreviewOpen(true)
  }

  const renderPreviewContent = () => {
    if (!selectedApp || !responseMethod) return null

    const isEmail = responseMethod === "email"

    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-white">
          <div className="space-y-3">
            {isEmail ? (
              <>
                <div className="border-b pb-2">
                  <div className="text-sm text-gray-600">件名:</div>
                  <div className="font-medium">ローン審査結果のご連絡</div>
                </div>
                <div className="border-b pb-2">
                  <div className="text-sm text-gray-600">宛先:</div>
                  <div>{selectedApp.applicantName} 様</div>
                </div>
              </>
            ) : (
              <div className="text-center border-b pb-4">
                <div className="text-lg font-bold">ローン審査結果通知書</div>
                <div className="text-sm text-gray-600 mt-2">FAX送信用</div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">申込者名:</span>
                <span>{selectedApp.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">融資金額:</span>
                <span>{selectedApp.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">審査結果:</span>
                <Badge variant="outline" className={getResultColor(selectedApp.result)}>
                  {selectedApp.result}
                </Badge>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="text-sm text-gray-600 mb-2">回答内容:</div>
              <div className="whitespace-pre-wrap">{responseMessage || "回答文言が入力されていません"}</div>
            </div>

            {!isEmail && (
              <div className="border-t pt-3 text-xs text-gray-500">
                <div>送信日時: {new Date().toLocaleString("ja-JP")}</div>
                <div>送信者: ローン審査システム</div>
              </div>
            )}
          </div>
        </div>
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
              <h1 className="text-xl font-bold">結果回答</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Applications Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">結果回答対象案件</h2>

          {/* Pagination controls above the table */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-md">
            <div className="text-sm text-muted-foreground">
              {resultApplications.length}件中 {startIndex + 1}-{Math.min(endIndex, resultApplications.length)}件を表示
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">選択</th>
                      <th className="text-left p-4 font-medium">申込者名</th>
                      <th className="text-left p-4 font-medium">融資金額</th>
                      <th className="text-left p-4 font-medium">担当</th>
                      <th className="text-left p-4 font-medium">受付日</th>
                      <th className="text-left p-4 font-medium">経過日数</th>
                      <th className="text-left p-4 font-medium">審査結果</th>
                      <th className="text-left p-4 font-medium">審査日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((app) => (
                      <tr
                        key={app.id}
                        className={`border-t cursor-pointer hover:bg-muted/30 ${
                          selectedApplication === app.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedApplication(app.id)}
                      >
                        <td className="p-4">
                          <Button size="sm" variant={selectedApplication === app.id ? "default" : "outline"}>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="p-4">{app.applicantName}</td>
                        <td className="p-4">{app.amount}</td>
                        <td className="p-4">{app.assignee}</td>
                        <td className="p-4">{app.receivedDate}</td>
                        <td className="p-4">
                          <span
                            className={calculateDaysElapsed(app.receivedDate) >= 30 ? "text-red-600 font-semibold" : ""}
                          >
                            {calculateDaysElapsed(app.receivedDate)}日
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getResultIcon(app.result)}
                            <Badge variant="outline" className={getResultColor(app.result)}>
                              {app.result}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">{app.resultDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Application Details */}
        {selectedApp && (
          <div className="space-y-6">
            {/* Basic Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>基本情報</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">申込者名</Label>
                    <div className="mt-1">{selectedApp.applicantName}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">融資金額</Label>
                    <div className="mt-1">{selectedApp.amount}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">担当部署</Label>
                    <div className="mt-1">{selectedApp.assignee}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">受付日</Label>
                    <div className="mt-1">{selectedApp.receivedDate}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">審査結果</Label>
                    <div className="mt-1">
                      <Badge variant="outline" className={getResultColor(selectedApp.result)}>
                        {selectedApp.result}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">結果日</Label>
                    <div className="mt-1">{selectedApp.resultDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Section */}
            <Accordion type="single" collapsible defaultValue="">
              <AccordionItem value="documents">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>受領書類確認</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      すべて受領済み
                    </Badge>
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
                            {documentData.map((doc, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-4">{doc.name}</td>
                                <td className="p-4 font-mono text-sm">{doc.code}</td>
                                <td className="p-4">
                                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                    受領
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {doc.receivedDate}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
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

            {/* Result Response Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>審査結果情報</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="responseMethod">審査回答方法</Label>
                    <Select value={responseMethod} onValueChange={setResponseMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="回答方法を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>メール</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fax">
                          <div className="flex items-center space-x-2">
                            <Fax className="h-4 w-4" />
                            <span>FAX</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="responseMessage">回答文言</Label>
                  <Textarea
                    id="responseMessage"
                    placeholder="審査結果の詳細な回答内容を入力してください..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex space-x-2">
                  <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={handlePreview} disabled={!responseMethod}>
                        <Eye className="h-4 w-4 mr-2" />
                        プレビュー
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{responseMethod === "email" ? "メール" : "FAX"}プレビュー</DialogTitle>
                      </DialogHeader>
                      {renderPreviewContent()}
                    </DialogContent>
                  </Dialog>

                  <Button disabled={!responseMethod || !responseMessage.trim()}>
                    <Mail className="h-4 w-4 mr-2" />
                    回答送信
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
