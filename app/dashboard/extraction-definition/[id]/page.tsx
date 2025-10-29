"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ExtractionDefinitionPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // 抽出定義データ（実際にはAPIから取得する想定）
  const extractionDefinitions = [
    {
      id: 1,
      name: "住宅ローン　申込実績",
      creator: "審査部A",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "金融機関別　申込実績",
      creator: "審査部B",
      createdDate: "2024-01-20",
    },
  ]

  const definition = extractionDefinitions.find((def) => def.id === Number(id))

  if (!definition) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">抽出定義が見つかりません</p>
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold">抽出定義編集</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>抽出定義情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">抽出定義名称</p>
                <p className="text-lg font-semibold">{definition.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">作成者</p>
                <p className="text-lg">{definition.creator}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">作成日</p>
                <p className="text-lg">{definition.createdDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
