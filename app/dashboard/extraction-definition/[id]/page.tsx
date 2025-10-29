"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2 } from "lucide-react"

type ExtractedColumn = {
  tableName: string
  columnName: string
  dataType: string
  size: string
  groupBy: boolean
}

type ConditionItem = {
  tableName: string
  columnName: string
  operator: string
  value: string
}

const tableDefinitions = [
  {
    name: "申込情報",
    columns: [
      { name: "申込ID", dataType: "VARCHAR", size: "20" },
      { name: "申込者名", dataType: "VARCHAR", size: "100" },
      { name: "申込日", dataType: "DATE", size: "-" },
      { name: "申込金額", dataType: "DECIMAL", size: "15,2" },
      { name: "金融機関コード", dataType: "VARCHAR", size: "10" },
    ],
  },
  {
    name: "審査情報",
    columns: [
      { name: "審査ID", dataType: "VARCHAR", size: "20" },
      { name: "申込ID", dataType: "VARCHAR", size: "20" },
      { name: "審査結果", dataType: "VARCHAR", size: "10" },
      { name: "審査日", dataType: "DATE", size: "-" },
      { name: "審査担当者", dataType: "VARCHAR", size: "50" },
    ],
  },
  {
    name: "金融機関マスタ",
    columns: [
      { name: "金融機関コード", dataType: "VARCHAR", size: "10" },
      { name: "金融機関名", dataType: "VARCHAR", size: "100" },
      { name: "支店コード", dataType: "VARCHAR", size: "10" },
      { name: "支店名", dataType: "VARCHAR", size: "100" },
    ],
  },
]

const extractionDefinitionData = {
  1: {
    selectedTable: "申込情報",
    extractedColumns: [
      { tableName: "申込情報", columnName: "申込ID", dataType: "VARCHAR", size: "20", groupBy: false },
      { tableName: "申込情報", columnName: "申込者名", dataType: "VARCHAR", size: "100", groupBy: false },
      { tableName: "申込情報", columnName: "申込日", dataType: "DATE", size: "-", groupBy: false },
      { tableName: "申込情報", columnName: "申込金額", dataType: "DECIMAL", size: "15,2", groupBy: false },
      { tableName: "申込情報", columnName: "金融機関コード", dataType: "VARCHAR", size: "10", groupBy: true },
    ],
    conditionItems: [
      { tableName: "申込情報", columnName: "申込日", operator: ">=", value: "2024-01-01" },
      { tableName: "申込情報", columnName: "申込金額", operator: ">", value: "1000000" },
    ],
  },
  2: {
    selectedTable: "申込情報",
    extractedColumns: [
      { tableName: "申込情報", columnName: "金融機関コード", dataType: "VARCHAR", size: "10", groupBy: true },
      { tableName: "申込情報", columnName: "申込金額", dataType: "DECIMAL", size: "15,2", groupBy: false },
      { tableName: "申込情報", columnName: "申込日", dataType: "DATE", size: "-", groupBy: false },
    ],
    conditionItems: [{ tableName: "申込情報", columnName: "申込日", operator: ">=", value: "2024-01-01" }],
  },
}

export default function ExtractionDefinitionPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const isNewMode = id === "new"

  const [selectedTable, setSelectedTable] = useState<string>("")
  const [extractedColumns, setExtractedColumns] = useState<ExtractedColumn[]>([])
  const [draggedColumn, setDraggedColumn] = useState<ExtractedColumn | null>(null)
  const [conditionItems, setConditionItems] = useState<ConditionItem[]>([])
  const [definitionName, setDefinitionName] = useState<string>("")

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

  const definition = isNewMode ? null : extractionDefinitions.find((def) => def.id === Number(id))

  const selectedTableData = tableDefinitions.find((table) => table.name === selectedTable)

  const handleDragStart = (column: { name: string; dataType: string; size: string }) => {
    if (selectedTable) {
      setDraggedColumn({
        tableName: selectedTable,
        columnName: column.name,
        dataType: column.dataType,
        size: column.size,
        groupBy: false,
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedColumn) {
      const isDuplicate = extractedColumns.some(
        (col) => col.tableName === draggedColumn.tableName && col.columnName === draggedColumn.columnName,
      )
      if (!isDuplicate) {
        setExtractedColumns([...extractedColumns, draggedColumn])
      }
      setDraggedColumn(null)
    }
  }

  const handleConditionDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedColumn) {
      const isDuplicate = conditionItems.some(
        (item) => item.tableName === draggedColumn.tableName && item.columnName === draggedColumn.columnName,
      )
      if (!isDuplicate) {
        setConditionItems([
          ...conditionItems,
          {
            tableName: draggedColumn.tableName,
            columnName: draggedColumn.columnName,
            operator: "=",
            value: "",
          },
        ])
      }
      setDraggedColumn(null)
    }
  }

  const handleRemoveColumn = (index: number) => {
    setExtractedColumns(extractedColumns.filter((_, i) => i !== index))
  }

  const handleToggleGroupBy = (index: number) => {
    setExtractedColumns(extractedColumns.map((col, i) => (i === index ? { ...col, groupBy: !col.groupBy } : col)))
  }

  const handleRemoveCondition = (index: number) => {
    setConditionItems(conditionItems.filter((_, i) => i !== index))
  }

  const handleOperatorChange = (index: number, operator: string) => {
    setConditionItems(conditionItems.map((item, i) => (i === index ? { ...item, operator } : item)))
  }

  const handleValueChange = (index: number, value: string) => {
    setConditionItems(conditionItems.map((item, i) => (i === index ? { ...item, value } : item)))
  }

  const handleSave = () => {
    console.log("[v0] 保存処理を実行")
    console.log("[v0] 抽出定義名称:", definitionName || definition?.name)
    console.log("[v0] 選択テーブル:", selectedTable)
    console.log("[v0] 抽出項目:", extractedColumns)
    console.log("[v0] 抽出条件:", conditionItems)
    alert("保存しました")
  }

  useEffect(() => {
    if (!isNewMode && definition) {
      const data = extractionDefinitionData[definition.id as keyof typeof extractionDefinitionData]
      if (data) {
        setSelectedTable(data.selectedTable)
        setExtractedColumns(data.extractedColumns)
        setConditionItems(data.conditionItems)
      }
    }
  }, [isNewMode, definition])

  if (!isNewMode && !definition) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">抽出定義が見つかりません</p>
            <Button variant="outline" onClick={() => router.push("/dashboard?menu=management")} className="mt-4">
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard?menu=management")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          {isNewMode ? (
            <Input
              value={definitionName}
              onChange={(e) => setDefinitionName(e.target.value)}
              placeholder="抽出定義名称を入力"
              className="text-2xl font-bold h-auto py-2 max-w-md"
            />
          ) : (
            <h1 className="text-2xl font-bold">{definition?.name}</h1>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>テーブル情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">テーブル名</label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger>
                    <SelectValue placeholder="テーブルを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDefinitions.map((table) => (
                      <SelectItem key={table.name} value={table.name}>
                        {table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 block">項目情報</label>
                {selectedTableData ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50 border-b">
                          <th className="px-4 py-3 text-left text-sm font-medium">項目名称</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">データ型</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">サイズ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTableData.columns.map((column, index) => (
                          <tr
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(column)}
                            className="border-b last:border-0 hover:bg-muted/30 cursor-move"
                          >
                            <td className="px-4 py-3 text-sm">{column.name}</td>
                            <td className="px-4 py-3 text-sm">{column.dataType}</td>
                            <td className="px-4 py-3 text-sm">{column.size}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border rounded-lg p-8 text-center text-muted-foreground">
                    テーブルを選択してください
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>抽出項目</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="min-h-[200px] border-2 border-dashed rounded-lg p-4"
            >
              {extractedColumns.length === 0 ? (
                <div className="flex items-center justify-center h-[180px] text-muted-foreground">
                  テーブル情報から項目をドラッグ＆ドロップしてください
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium w-16">No</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">テーブル名</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">項目名称</th>
                        <th className="px-4 py-3 text-center text-sm font-medium w-24">グループ化</th>
                        <th className="px-4 py-3 text-left text-sm font-medium w-20">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extractedColumns.map((column, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 text-sm">{column.tableName}</td>
                          <td className="px-4 py-3 text-sm">{column.columnName}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex justify-center items-center">
                              <Checkbox checked={column.groupBy} onCheckedChange={() => handleToggleGroupBy(index)} />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveColumn(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>抽出条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDrop={handleConditionDrop}
              className="min-h-[200px] border-2 border-dashed rounded-lg p-4"
            >
              {conditionItems.length === 0 ? (
                <div className="flex items-center justify-center h-[180px] text-muted-foreground">
                  テーブル情報から項目をドラッグ＆ドロップしてください
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium w-16">No</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">項目名称</th>
                        <th className="px-4 py-3 text-left text-sm font-medium w-32">演算子</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">条件値</th>
                        <th className="px-4 py-3 text-left text-sm font-medium w-20">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conditionItems.map((item, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 text-sm">{item.columnName}</td>
                          <td className="px-4 py-3 text-sm">
                            <Select value={item.operator} onValueChange={(value) => handleOperatorChange(index, value)}>
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="=">=</SelectItem>
                                <SelectItem value=">">{">"}</SelectItem>
                                <SelectItem value=">=">{">="}</SelectItem>
                                <SelectItem value="<">{"<"}</SelectItem>
                                <SelectItem value="<=">{"<="}</SelectItem>
                                <SelectItem value="LIKE">LIKE</SelectItem>
                                <SelectItem value="<>">{"<>"}</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Input
                              value={item.value}
                              onChange={(e) => handleValueChange(index, e.target.value)}
                              placeholder="条件値を入力"
                              className="h-8"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCondition(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            保存
          </Button>
        </div>
      </div>
    </div>
  )
}
