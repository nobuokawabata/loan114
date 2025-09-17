"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight, Eye, Mail, Fan as Fax, Send, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResultTargetPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [responseMethod, setResponseMethod] = useState("email")
  const [responseText, setResponseText] = useState("")
  const [previewOpen, setPreviewOpen] = useState(false)
  const itemsPerPage = 8
  const router = useRouter()

  // 結果回答対象案件データ
  const resultCases = [
    {
      id: 38,
      applicantName: "福田明",
      status: "結果回答",
      amount: "3,900万円",
      assignee: "審査部B",
      receivedDate: "2023-12-01",
      result: "承認",
      conditions: "金利3.5%、期間20年",
      reviewDate: "2023-12-10",
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
      reviewDate: "2023-12-12",
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
      reviewDate: "2023-12-14",
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
      reviewDate: "2023-12-11",
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
      reviewDate: "2023-12-13",
    },
  ]

  // 受領書類データ
  const documents = [
    { name: "送付状", code: "DOC001", received: true, receivedAt: "2024-01-10 09:30" },
    { name: "正式審査申込書", code: "DOC002", received: true, receivedAt: "2024-01-10 09:30" },
    { name: "本人確認資料", code: "DOC003", received: true, receivedAt: "2024-01-10 10:15" },
    { name: "源泉徴収票", code: "DOC004", received: false, receivedAt: null },
  ]

  const totalPages = Math.ceil(resultCases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = resultCases.slice(startIndex, endIndex)

  const selectedCaseData = selectedCase ? resultCases.find((c) => c.id === selectedCase) : null

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            ダッシュボードに戻る
          </Button>
          <h2 className="text-xl font-semibold">結果回答対象案件</h2>
        </div>
      </div>

      {/* 案件一覧テーブル */}
      <Card>
        <CardHeader>
          <CardTitle>結果回答対象案件一覧</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
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
                {currentPageData.map((caseItem) => (
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
                    <td className="p-4">{caseItem.reviewDate || "2023-12-15"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ページネーション */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">
          {resultCases.length}件中 {startIndex + 1}-{Math.min(endIndex, resultCases.length)}件を表示
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

      {/* 選択された案件の詳細 */}
      {selectedCaseData && (
        <div className="space-y-6">
          {/* 基本情報セクション */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <p className="mt-1">{selectedCaseData.reviewDate || "2023-12-15"}</p>
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
            <CardHeader>
              <CardTitle>審査結果情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
